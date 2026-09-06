<?php

declare(strict_types=1);

require __DIR__ . '/mail.php';

header('Content-Type: application/json; charset=utf-8');

$checks = [
    'php' => PHP_VERSION,
    'config_exists' => is_file(__DIR__ . '/config.php'),
    'mail_function' => function_exists('mail'),
    'openssl' => extension_loaded('openssl'),
    'sockets' => function_exists('stream_socket_client'),
];

if ($checks['config_exists']) {
    $config = require __DIR__ . '/config.php';
    if (is_array($config)) {
        $config = api_normalize_config($config);
        $checks['smtp_host'] = $config['smtp_host'] ?? '';
        $checks['smtp_user_set'] = !empty($config['smtp_user']);
        $checks['smtp_pass_set'] = !empty($config['smtp_pass']);
    }
}

echo json_encode([
    'ok' => $checks['config_exists'] && ($checks['smtp_user_set'] ?? false) && ($checks['smtp_pass_set'] ?? false),
    'checks' => $checks,
]);
