<?php

declare(strict_types=1);

require __DIR__ . '/mail.php';

api_require_post();
$config = api_load_config();
$data = api_read_json_body();

$jobSlug = api_clean_text($data['jobSlug'] ?? '', 80);
$jobTitle = api_clean_text($data['jobTitle'] ?? '', 120);
$name = api_clean_text($data['name'] ?? '', 120);
$email = api_clean_email($data['email'] ?? '');
$phone = api_clean_phone($data['phone'] ?? '');
$linkedin = api_clean_text($data['linkedin'] ?? '', 300);
$message = api_clean_text($data['message'] ?? '', 5000);
$resume = is_array($data['resume'] ?? null) ? $data['resume'] : null;

if ($jobSlug === '' || $jobTitle === '') {
    api_json_response(400, ['error' => 'Job information is missing.']);
}
if ($name === '') {
    api_json_response(400, ['error' => 'Full name is required.']);
}
if ($email === '' || !api_is_valid_email($email)) {
    api_json_response(400, ['error' => 'A valid email is required.']);
}
if ($message === '') {
    api_json_response(400, ['error' => 'Cover letter or message is required.']);
}

$notifyEmail = $config['career_notify_email'] ?? $config['contact_notify_email'] ?? $config['smtp_user'] ?? '';
if ($notifyEmail === '') {
    api_json_response(503, ['error' => 'CAREER_APPLY_NOT_CONFIGURED']);
}

$attachments = [];
if ($resume) {
    $filename = api_clean_text($resume['filename'] ?? 'resume', 120);
    $contentType = api_clean_text($resume['contentType'] ?? '', 120);
    $fileData = is_string($resume['data'] ?? null) ? $resume['data'] : '';
    $allowed = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    if (!in_array($contentType, $allowed, true)) {
        api_json_response(400, ['error' => 'Resume must be a PDF or Word document.']);
    }

    $decoded = base64_decode($fileData, true);
    if ($decoded === false || strlen($decoded) === 0 || strlen($decoded) > 2 * 1024 * 1024) {
        api_json_response(400, ['error' => 'Resume must be smaller than 2 MB.']);
    }

    $attachments[] = [
        'filename' => $filename,
        'contentType' => $contentType,
        'data' => base64_encode($decoded),
    ];
}

$userHtml = '
  <p>Dear ' . htmlspecialchars($name, ENT_QUOTES, 'UTF-8') . ',</p>
  <p>Thank you for applying for the <strong>' . htmlspecialchars($jobTitle, ENT_QUOTES, 'UTF-8') . '</strong> position at Markshell &amp; Associates.</p>
  <p>We have received your application and our team will review it shortly.</p>
  <p>Best regards,<br/>Markshell &amp; Associates<br/>markshellassociates@gmail.com</p>
';

$adminHtml = '
  <h2>New career application received</h2>
  <p><strong>Position:</strong> ' . htmlspecialchars($jobTitle, ENT_QUOTES, 'UTF-8') . '</p>
  <p><strong>Name:</strong> ' . htmlspecialchars($name, ENT_QUOTES, 'UTF-8') . '</p>
  <p><strong>Email:</strong> ' . htmlspecialchars($email, ENT_QUOTES, 'UTF-8') . '</p>
  <p><strong>Phone:</strong> ' . htmlspecialchars($phone !== '' ? $phone : 'Not provided', ENT_QUOTES, 'UTF-8') . '</p>
  <p><strong>LinkedIn:</strong> ' . htmlspecialchars($linkedin !== '' ? $linkedin : 'Not provided', ENT_QUOTES, 'UTF-8') . '</p>
  <p><strong>Message:</strong></p>
  <p>' . nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8')) . '</p>
';

$userSent = api_send_mail(
    $config,
    $email,
    'Application Received — ' . $jobTitle . ' | Markshell & Associates',
    strip_tags($userHtml),
    $userHtml
);

$adminSent = api_send_mail(
    $config,
    $notifyEmail,
    'New Application — ' . $jobTitle . ' — ' . $name,
    strip_tags($adminHtml),
    $adminHtml,
    $email,
    $attachments
);

if (!$userSent || !$adminSent) {
    api_json_response(500, ['error' => 'SUBMIT_FAILED']);
}

api_json_response(200, ['success' => true]);
