import nodemailer from 'nodemailer'

export function getSmtpConfig(env) {
  const host = env.SMTP_HOST
  const port = Number(env.SMTP_PORT || 587)
  const user = env.SMTP_USER
  const pass = env.SMTP_PASS
  const from = env.SMTP_FROM || user

  if (!host || !user || !pass || !from) {
    return null
  }

  return {
    host,
    port,
    secure: env.SMTP_SECURE === 'true' || port === 465,
    auth: { user, pass },
    from,
  }
}

export function getNotifyEmail(env, type = 'contact') {
  if (type === 'career') {
    return env.CAREER_NOTIFY_EMAIL || env.CONTACT_NOTIFY_EMAIL || env.SMTP_USER
  }
  return env.CONTACT_NOTIFY_EMAIL || env.CAREER_NOTIFY_EMAIL || env.SMTP_USER
}

export function createMailTransporter(smtp) {
  return nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.secure,
    auth: smtp.auth,
  })
}

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

export function cleanEmail(value) {
  return cleanText(value, 254).toLowerCase()
}

export function cleanPhone(value) {
  return cleanText(value, 30).replace(/[^\d+\s()-]/g, '')
}

export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export { cleanText }
