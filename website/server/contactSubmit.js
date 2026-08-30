import {
  cleanEmail,
  cleanPhone,
  cleanText,
  createMailTransporter,
  getNotifyEmail,
  getSmtpConfig,
  isValidEmail,
} from './smtp.js'

export function normalizeContactSubmission(raw = {}) {
  return {
    name: cleanText(raw.name, 120),
    email: cleanEmail(raw.email),
    phone: cleanPhone(raw.phone || ''),
    service: cleanText(raw.service || '', 80),
    serviceTitle: cleanText(raw.serviceTitle || '', 120),
    message: cleanText(raw.message, 5000),
  }
}

export function validateContactSubmission(fields) {
  if (!fields.name) return 'Full name is required.'
  if (!fields.email || !isValidEmail(fields.email)) return 'A valid email is required.'
  if (!fields.message) return 'Message is required.'
  return null
}

function buildUserEmail({ name, email, from }) {
  return {
    from,
    to: email,
    subject: 'We Received Your Message | Markshell & Associates',
    text: [
      `Dear ${name},`,
      '',
      'Thank you for contacting Markshell & Associates.',
      'We have received your message and will respond within 24 hours.',
      '',
      'Best regards,',
      'Markshell & Associates',
      'markshellassociates@gmail.com',
    ].join('\n'),
    html: `
      <p>Dear ${name},</p>
      <p>Thank you for contacting <strong>Markshell & Associates</strong>.</p>
      <p>We have received your message and will respond within 24 hours.</p>
      <p>Best regards,<br/>Markshell & Associates<br/>markshellassociates@gmail.com</p>
    `,
  }
}

function buildAdminEmail({ fields, from, notifyEmail }) {
  const serviceLine = fields.serviceTitle || fields.service || 'Not specified'

  return {
    from,
    to: notifyEmail,
    replyTo: fields.email,
    subject: `New Contact Inquiry — ${fields.name}`,
    text: [
      'New contact form submission',
      '',
      `Name: ${fields.name}`,
      `Email: ${fields.email}`,
      `Phone: ${fields.phone || 'Not provided'}`,
      `Service Interest: ${serviceLine}`,
      '',
      'Message:',
      fields.message,
    ].join('\n'),
    html: `
      <h2>New contact form submission</h2>
      <p><strong>Name:</strong> ${fields.name}</p>
      <p><strong>Email:</strong> ${fields.email}</p>
      <p><strong>Phone:</strong> ${fields.phone || 'Not provided'}</p>
      <p><strong>Service Interest:</strong> ${serviceLine}</p>
      <p><strong>Message:</strong></p>
      <p>${fields.message.replace(/\n/g, '<br/>')}</p>
    `,
  }
}

export async function submitContactSubmission(rawPayload, env = process.env) {
  const smtp = getSmtpConfig(env)
  if (!smtp) {
    return { ok: false, status: 503, error: 'CONTACT_NOT_CONFIGURED' }
  }

  const notifyEmail = getNotifyEmail(env, 'contact')
  if (!notifyEmail) {
    return { ok: false, status: 503, error: 'CONTACT_NOT_CONFIGURED' }
  }

  const fields = normalizeContactSubmission(rawPayload)
  const validationError = validateContactSubmission(fields)
  if (validationError) {
    return { ok: false, status: 400, error: validationError }
  }

  const transporter = createMailTransporter(smtp)

  try {
    await transporter.sendMail(buildUserEmail({ name: fields.name, email: fields.email, from: smtp.from }))
    await transporter.sendMail(buildAdminEmail({ fields, from: smtp.from, notifyEmail }))
    return { ok: true }
  } catch {
    return { ok: false, status: 500, error: 'SUBMIT_FAILED' }
  }
}
