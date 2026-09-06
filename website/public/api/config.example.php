<?php
/**
 * SMTP settings for contact & career forms on Hostinger/Apache hosting.
 *
 * 1. Copy this file to config.php in the same folder on your server.
 * 2. Fill in real credentials.
 * 3. Do NOT commit config.php to git.
 *
 * Hostinger (recommended on markshellandassociates.com):
 *   smtp_host => smtp.hostinger.com
 *   smtp_port => 587
 *   smtp_secure => tls
 *   smtp_user => noreply@markshellandassociates.com
 *   smtp_pass => your Hostinger email password
 *
 * Gmail (may be blocked on some shared hosts):
 *   Use a 16-character App Password with NO spaces.
 *   https://myaccount.google.com/apppasswords
 */
return [
    'smtp_host' => 'smtp.hostinger.com',
    'smtp_port' => 587,
    'smtp_secure' => 'tls',
    'smtp_user' => 'noreply@markshellandassociates.com',
    'smtp_pass' => 'your-email-password',
    'smtp_from' => 'noreply@markshellandassociates.com',
    'smtp_from_name' => 'Markshell & Associates',
    'contact_notify_email' => 'markshellassociates@gmail.com',
    'career_notify_email' => 'markshellassociates@gmail.com',
];
