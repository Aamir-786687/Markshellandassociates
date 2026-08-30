import nodemailer from 'nodemailer'

const MAX_RESUME_BYTES = 2 * 1024 * 1024
const ALLOWED_RESUME_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
])

function cleanText(value, maxLength = 500) {
  if (typeof value !== 'string') return ''
  return value
    .trim()
    .split('')
    .filter((char) => {
      const code = char.charCodeAt(0)
      return code >= 32 && code !== 127
    })
    .join('')
    .slice(0, maxLength)
}

function cleanEmail(value) {
  return cleanText(value, 254).toLowerCase()
}

function cleanPhone(value) {
  return cleanText(value, 30).replace(/[^\d+\s()-]/g, '')
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function getSmtpConfig(env) {
  const host = env.SMTP_HOST
  const port = Number(env.SMTP_PORT || 587)
  const user = env.SMTP_USER
  const pass = env.SMTP_PASS
  const from = env.SMTP_FROM || user
  const notifyEmail = env.CAREER_NOTIFY_EMAIL || env.SMTP_USER

  if (!host || !user || !pass || !from || !notifyEmail) {
    return null
  }

  return {
    host,
    port,
    secure: env.SMTP_SECURE === 'true' || port === 465,
    auth: { user, pass },
    from,
    notifyEmail,
  }
}

function normalizeResume(raw) {
  if (!raw || typeof raw !== 'object') return null

  const filename = cleanText(raw.filename || 'resume', 120)
  const contentType = cleanText(raw.contentType || '', 120)
  const data = typeof raw.data === 'string' ? raw.data : ''

  if (!data || !filename) return null
  if (!ALLOWED_RESUME_TYPES.has(contentType)) {
    throw new Error('INVALID_RESUME_TYPE')
  }

  const buffer = Buffer.from(data, 'base64')
  if (buffer.length === 0 || buffer.length > MAX_RESUME_BYTES) {
    throw new Error('INVALID_RESUME_SIZE')
  }

  return { filename, contentType, buffer }
}

export function normalizeCareerApplication(raw = {}) {
  return {
    jobSlug: cleanText(raw.jobSlug, 80),
    jobTitle: cleanText(raw.jobTitle, 120),
    name: cleanText(raw.name, 120),
    email: cleanEmail(raw.email),
    phone: cleanPhone(raw.phone || ''),
    linkedin: cleanText(raw.linkedin || '', 300),
    message: cleanText(raw.message, 5000),
    resume: raw.resume,
  }
}

export function validateCareerApplication(fields) {
  if (!fields.jobSlug || !fields.jobTitle) return 'Job information is missing.'
  if (!fields.name) return 'Full name is required.'
  if (!fields.email || !isValidEmail(fields.email)) return 'A valid email is required.'
  if (!fields.message) return 'Cover letter or message is required.'
  return null
}

function buildApplicantEmail({ name, email, jobTitle, from }) {
  return {
    from,
    to: email,
    subject: `Application Received — ${jobTitle} | Markshell & Associates`,
    text: [
      `Dear ${name},`,
      '',
      `Thank you for applying for the ${jobTitle} position at Markshell & Associates.`,
      'We have received your application and our team will review it shortly.',
      'If your profile matches our requirements, we will contact you for the next steps.',
      '',
      'Best regards,',
      'Markshell & Associates',
      'markshellassociates@gmail.com',
    ].join('\n'),
    html: `
      <p>Dear ${name},</p>
      <p>Thank you for applying for the <strong>${jobTitle}</strong> position at Markshell & Associates.</p>
      <p>We have received your application and our team will review it shortly. If your profile matches our requirements, we will contact you for the next steps.</p>
      <p>Best regards,<br/>Markshell & Associates<br/>markshellassociates@gmail.com</p>
    `,
  }
}

function buildAdminEmail({ fields, resume, from, notifyEmail }) {
  const lines = [
    `New career application received`,
    '',
    `Position: ${fields.jobTitle}`,
    `Slug: ${fields.jobSlug}`,
    `Name: ${fields.name}`,
    `Email: ${fields.email}`,
    `Phone: ${fields.phone || 'Not provided'}`,
    `LinkedIn: ${fields.linkedin || 'Not provided'}`,
    '',
    'Message:',
    fields.message,
  ]

  const mail = {
    from,
    to: notifyEmail,
    replyTo: fields.email,
    subject: `New Application — ${fields.jobTitle} — ${fields.name}`,
    text: lines.join('\n'),
    html: `
      <h2>New career application received</h2>
      <p><strong>Position:</strong> ${fields.jobTitle}</p>
      <p><strong>Name:</strong> ${fields.name}</p>
      <p><strong>Email:</strong> ${fields.email}</p>
      <p><strong>Phone:</strong> ${fields.phone || 'Not provided'}</p>
      <p><strong>LinkedIn:</strong> ${fields.linkedin || 'Not provided'}</p>
      <p><strong>Message:</strong></p>
      <p>${fields.message.replace(/\n/g, '<br/>')}</p>
    `,
  }

  if (resume) {
    mail.attachments = [
      {
        filename: resume.filename,
        content: resume.buffer,
        contentType: resume.contentType,
      },
    ]
  }

  return mail
}

export async function submitCareerApplication(rawPayload, env = process.env) {
  const smtp = getSmtpConfig(env)
  if (!smtp) {
    return { ok: false, status: 503, error: 'CAREER_APPLY_NOT_CONFIGURED' }
  }

  let fields
  let resume = null

  try {
    fields = normalizeCareerApplication(rawPayload)
    resume = normalizeResume(fields.resume)
  } catch (error) {
    if (error instanceof Error && error.message === 'INVALID_RESUME_TYPE') {
      return { ok: false, status: 400, error: 'Resume must be a PDF or Word document.' }
    }
    if (error instanceof Error && error.message === 'INVALID_RESUME_SIZE') {
      return { ok: false, status: 400, error: 'Resume must be smaller than 2 MB.' }
    }
    return { ok: false, status: 400, error: 'Invalid application data.' }
  }

  const validationError = validateCareerApplication(fields)
  if (validationError) {
    return { ok: false, status: 400, error: validationError }
  }

  const transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.secure,
    auth: smtp.auth,
  })

  try {
    await transporter.sendMail(
      buildApplicantEmail({ name: fields.name, email: fields.email, jobTitle: fields.jobTitle, from: smtp.from }),
    )

    await transporter.sendMail(buildAdminEmail({ fields, resume, from: smtp.from, notifyEmail: smtp.notifyEmail }))

    return { ok: true }
  } catch {
    return { ok: false, status: 500, error: 'SUBMIT_FAILED' }
  }
}
