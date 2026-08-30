<?php

declare(strict_types=1);

require __DIR__ . '/mail.php';

api_require_post();
$config = api_load_config();
$data = api_read_json_body();

$name = api_clean_text($data['name'] ?? '', 120);
$email = api_clean_email($data['email'] ?? '');
$phone = api_clean_phone($data['phone'] ?? '');
$service = api_clean_text($data['service'] ?? '', 80);
$serviceTitle = api_clean_text($data['serviceTitle'] ?? '', 120);
$message = api_clean_text($data['message'] ?? '', 5000);

if ($name === '') {
    api_json_response(400, ['error' => 'Full name is required.']);
}
if ($email === '' || !api_is_valid_email($email)) {
    api_json_response(400, ['error' => 'A valid email is required.']);
}
if ($message === '') {
    api_json_response(400, ['error' => 'Message is required.']);
}

$notifyEmail = $config['contact_notify_email'] ?? $config['smtp_user'] ?? '';
if ($notifyEmail === '') {
    api_json_response(503, ['error' => 'CONTACT_NOT_CONFIGURED']);
}

$serviceLine = $serviceTitle !== '' ? $serviceTitle : ($service !== '' ? $service : 'Not specified');

$userHtml = '
  <p>Dear ' . htmlspecialchars($name, ENT_QUOTES, 'UTF-8') . ',</p>
  <p>Thank you for contacting <strong>Markshell &amp; Associates</strong>.</p>
  <p>We have received your message and will respond within 24 hours.</p>
  <p>Best regards,<br/>Markshell &amp; Associates<br/>markshellassociates@gmail.com</p>
';

$adminHtml = '
  <h2>New contact form submission</h2>
  <p><strong>Name:</strong> ' . htmlspecialchars($name, ENT_QUOTES, 'UTF-8') . '</p>
  <p><strong>Email:</strong> ' . htmlspecialchars($email, ENT_QUOTES, 'UTF-8') . '</p>
  <p><strong>Phone:</strong> ' . htmlspecialchars($phone !== '' ? $phone : 'Not provided', ENT_QUOTES, 'UTF-8') . '</p>
  <p><strong>Service Interest:</strong> ' . htmlspecialchars($serviceLine, ENT_QUOTES, 'UTF-8') . '</p>
  <p><strong>Message:</strong></p>
  <p>' . nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8')) . '</p>
';

$userSent = api_send_mail(
    $config,
    $email,
    'We Received Your Message | Markshell & Associates',
    strip_tags($userHtml),
    $userHtml
);

$adminSent = api_send_mail(
    $config,
    $notifyEmail,
    'New Contact Inquiry — ' . $name,
    strip_tags($adminHtml),
    $adminHtml,
    $email
);

if (!$userSent || !$adminSent) {
    api_json_response(500, ['error' => 'SUBMIT_FAILED']);
}

api_json_response(200, ['success' => true]);
