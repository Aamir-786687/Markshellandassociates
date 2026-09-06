<?php

declare(strict_types=1);

function api_json_response(int $status, array $payload): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($payload);
    exit;
}

function api_normalize_config(array $config): array
{
    $normalized = $config;

    if (isset($normalized['smtp_pass']) && is_string($normalized['smtp_pass'])) {
        // Gmail app passwords are often copied with spaces — remove them.
        $normalized['smtp_pass'] = str_replace(' ', '', trim($normalized['smtp_pass']));
    }

    if (empty($normalized['smtp_from']) && !empty($normalized['smtp_user'])) {
        $normalized['smtp_from'] = $normalized['smtp_user'];
    }

    return $normalized;
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

    return api_normalize_config($config);
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

function api_encode_subject(string $subject): string
{
    if (preg_match('/[^\x20-\x7E]/', $subject)) {
        return '=?UTF-8?B?' . base64_encode($subject) . '?=';
    }

    return $subject;
}

function api_send_mail_php(array $config, string $to, string $subject, string $htmlBody, ?string $replyTo = null): bool
{
    $from = $config['smtp_from'] ?? $config['smtp_user'] ?? '';
    $fromName = $config['smtp_from_name'] ?? 'Markshell & Associates';

    if ($from === '' || $to === '') {
        return false;
    }

    $headers = [
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=UTF-8',
        'From: ' . sprintf('"%s" <%s>', addslashes($fromName), $from),
    ];

    if ($replyTo) {
        $headers[] = 'Reply-To: <' . $replyTo . '>';
    }

    return @mail($to, api_encode_subject($subject), $htmlBody, implode("\r\n", $headers));
}

function api_smtp_expect(string $response, array $codes): bool
{
    $code = (int) substr($response, 0, 3);
    return in_array($code, $codes, true);
}

function api_send_mail_smtp(array $config, string $to, string $subject, string $htmlBody, ?string $replyTo = null): bool
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
    $socket = @stream_socket_client(
        "{$transport}:{$port}",
        $errno,
        $errstr,
        30,
        STREAM_CLIENT_CONNECT
    );

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

    $greeting = $read();
    if (!api_smtp_expect($greeting, [220])) {
        fclose($socket);
        return false;
    }

    $ehlo = $write('EHLO markshellandassociates.com');
    if (!api_smtp_expect($ehlo, [250])) {
        fclose($socket);
        return false;
    }

    if ($secure === 'tls') {
        $startTls = $write('STARTTLS');
        if (!api_smtp_expect($startTls, [220])) {
            fclose($socket);
            return false;
        }

        $cryptoMethod = STREAM_CRYPTO_METHOD_TLS_CLIENT;
        if (defined('STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT')) {
            $cryptoMethod = STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT;
            if (defined('STREAM_CRYPTO_METHOD_TLSv1_3_CLIENT')) {
                $cryptoMethod |= STREAM_CRYPTO_METHOD_TLSv1_3_CLIENT;
            }
        }

        if (!stream_socket_enable_crypto($socket, true, $cryptoMethod)) {
            fclose($socket);
            return false;
        }

        $ehlo = $write('EHLO markshellandassociates.com');
        if (!api_smtp_expect($ehlo, [250])) {
            fclose($socket);
            return false;
        }
    }

    $authPrompt = $write('AUTH LOGIN');
    if (!api_smtp_expect($authPrompt, [334])) {
        fclose($socket);
        return false;
    }

    $userPrompt = $write(base64_encode($user));
    if (!api_smtp_expect($userPrompt, [334])) {
        fclose($socket);
        return false;
    }

    $authResult = $write(base64_encode($pass));
    if (!api_smtp_expect($authResult, [235])) {
        fclose($socket);
        return false;
    }

    if (!api_smtp_expect($write('MAIL FROM:<' . $from . '>'), [250])) {
        fclose($socket);
        return false;
    }

    if (!api_smtp_expect($write('RCPT TO:<' . $to . '>'), [250, 251])) {
        fclose($socket);
        return false;
    }

    if (!api_smtp_expect($write('DATA'), [354])) {
        fclose($socket);
        return false;
    }

    $headers = [
        'From: ' . sprintf('"%s" <%s>', addslashes($fromName), $from),
        'To: <' . $to . '>',
        'Subject: ' . api_encode_subject($subject),
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=UTF-8',
        'Content-Transfer-Encoding: 8bit',
    ];

    if ($replyTo) {
        $headers[] = 'Reply-To: <' . $replyTo . '>';
    }

    $message = implode("\r\n", $headers) . "\r\n\r\n" . $htmlBody . "\r\n.\r\n";
    fwrite($socket, $message);
    $result = $read();

    $write('QUIT');
    fclose($socket);

    return api_smtp_expect($result, [250]);
}

function api_send_mail(array $config, string $to, string $subject, string $textBody, string $htmlBody, ?string $replyTo = null, array $attachments = []): bool
{
    if ($attachments) {
        return api_send_mail_smtp($config, $to, $subject, $htmlBody, $replyTo);
    }

    if (api_send_mail_smtp($config, $to, $subject, $htmlBody, $replyTo)) {
        return true;
    }

    return api_send_mail_php($config, $to, $subject, $htmlBody, $replyTo);
}
