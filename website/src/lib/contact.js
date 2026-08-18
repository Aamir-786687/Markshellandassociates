import { CONTACT_FORM_ACCESS_KEY, CONTACT_FORM_ENDPOINT } from '@/lib/env'
import { sanitizeEmail, sanitizePhone, sanitizeText } from '@/lib/sanitize'

const ALLOWED_ENDPOINTS = [
  'https://api.web3forms.com/submit',
  'https://formspree.io/',
]

function isAllowedEndpoint(url) {
  try {
    const parsed = new URL(url)
    return ALLOWED_ENDPOINTS.some((allowed) => {
      const allowedUrl = new URL(allowed)
      return parsed.origin === allowedUrl.origin || parsed.href.startsWith(allowed)
    })
  } catch {
    return false
  }
}

export function normalizeContactPayload(raw) {
  return {
    name: sanitizeText(raw.name, 120),
    email: sanitizeEmail(raw.email),
    phone: sanitizePhone(raw.phone || ''),
    service: sanitizeText(raw.service || '', 80),
    message: sanitizeText(raw.message, 5000),
    subject: `Contact inquiry from ${sanitizeText(raw.name, 120)}`,
  }
}

export async function submitContactForm(raw) {
  if (!CONTACT_FORM_ENDPOINT) {
    throw new Error('CONTACT_NOT_CONFIGURED')
  }

  if (!isAllowedEndpoint(CONTACT_FORM_ENDPOINT)) {
    throw new Error('CONTACT_ENDPOINT_NOT_ALLOWED')
  }

  const fields = normalizeContactPayload(raw)
  const body = CONTACT_FORM_ACCESS_KEY
    ? { access_key: CONTACT_FORM_ACCESS_KEY, ...fields, from_name: fields.name, replyto: fields.email }
    : fields

  const response = await fetch(CONTACT_FORM_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    throw new Error('SUBMIT_FAILED')
  }

  return response.json().catch(() => ({}))
}
