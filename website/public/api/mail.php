<?php

declare(strict_types=1);

function api_json_response(int $status, array $payload): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($payload);
    exit;
}

function api_load_config(): array
{
    $path = __DIR__ . '/config.php';
    if (!is_file($path)) {
        api_json_response(503, ['error' => 'CONTACT_NOT_CONFIGURED']);
    }

    $config = require $path;
    if (!is_array($config)) {
        api_json_response(503, ['error' => 'CONTACT_NOT_CONFIGURED']);
    }

    return $config;
}

function api_read_json_body(): array
{
    $raw = file_get_contents('php://input');
    if ($raw === false || trim($raw) === '') {
        return [];
    }

    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}

function api_clean_text($value, int $maxLength = 500): string
{
    if (!is_string($value)) {
        return '';
    }

    $value = trim($value);
    $value = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $value) ?? '';
    return mb_substr($value, 0, $maxLength);
}

function api_clean_email($value): string
{
    return strtolower(api_clean_text($value, 254));
}

function api_clean_phone($value): string
{
    return preg_replace('/[^\d+\s()-]/', '', api_clean_text($value, 30)) ?? '';
}

function api_is_valid_email(string $email): bool
{
    return (bool) filter_var($email, FILTER_VALIDATE_EMAIL);
}

function api_require_post(): void
{
    if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
        header('Allow: POST');
        api_json_response(405, ['error' => 'Method not allowed']);
    }
}

function api_send_mail(array $config, string $to, string $subject, string $textBody, string $htmlBody, ?string $replyTo = null, array $attachments = []): bool
{
    $host = $config['smtp_host'] ?? '';
    $port = (int) ($config['smtp_port'] ?? 587);
    $user = $config['smtp_user'] ?? '';
    $pass = $config['smtp_pass'] ?? '';
    $from = $config['smtp_from'] ?? $user;
    $fromName = $config['smtp_from_name'] ?? 'Markshell & Associates';
    $secure = strtolower((string) ($config['smtp_secure'] ?? 'tls'));

    if ($host === '' || $user === '' || $pass === '' || $from === '' || $to === '') {
        return false;
    }

    $transport = $secure === 'ssl' ? "ssl://{$host}" : $host;
    $socket = @fsockopen($transport, $port, $errno, $errstr, 30);
    if (!$socket) {
        return false;
    }

    stream_set_timeout($socket, 30);

    $read = function () use ($socket): string {
        $response = '';
        while ($line = fgets($socket, 515)) {
            $response .= $line;
            if (isset($line[3]) && $line[3] === ' ') {
                break;
            }
        }
        return $response;
    };

    $write = function (string $command) use ($socket, $read): string {
        fwrite($socket, $command . "\r\n");
        return $read();
    };

    $read();
    $write('EHLO markshellandassociates.com');

    if ($secure === 'tls') {
        $write('STARTTLS');
        if (!stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
            fclose($socket);
            return false;
        }
        $write('EHLO markshellandassociates.com');
    }

    $write('AUTH LOGIN');
    $write(base64_encode($user));
    $auth = $write(base64_encode($pass));
    if (strpos($auth, '235') === false) {
        fclose($socket);
        return false;
    }

    $write('MAIL FROM:<' . $from . '>');
    $write('RCPT TO:<' . $to . '>');
    $write('DATA');

    $boundary = 'b_' . bin2hex(random_bytes(8));
    $headers = [
        'From: ' . sprintf('"%s" <%s>', addslashes($fromName), $from),
        'To: <' . $to . '>',
        'Subject: ' . $subject,
        'MIME-Version: 1.0',
    ];

    if ($replyTo) {
        $headers[] = 'Reply-To: <' . $replyTo . '>';
    }

    if ($attachments) {
        $headers[] = 'Content-Type: multipart/mixed; boundary="' . $boundary . '"';
        $body = "--{$boundary}\r\n";
        $body .= "Content-Type: text/html; charset=UTF-8\r\n\r\n";
        $body .= $htmlBody . "\r\n";
        foreach ($attachments as $attachment) {
            $body .= "--{$boundary}\r\n";
            $body .= 'Content-Type: ' . $attachment['contentType'] . '; name="' . $attachment['filename'] . "\"\r\n";
            $body .= "Content-Transfer-Encoding: base64\r\n";
            $body .= 'Content-Disposition: attachment; filename="' . $attachment['filename'] . "\"\r\n\r\n";
            $body .= chunk_split($attachment['data']) . "\r\n";
        }
        $body .= "--{$boundary}--";
    } else {
        $headers[] = 'Content-Type: text/html; charset=UTF-8';
        $body = $htmlBody;
    }

    $message = implode("\r\n", $headers) . "\r\n\r\n" . $body . "\r\n.\r\n";
    fwrite($socket, $message);
    $result = $read();
    $write('QUIT');
    fclose($socket);

    return strpos($result, '250') !== false;
}
