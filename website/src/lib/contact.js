import { CONTACT_API } from '@/lib/env'
import { getServiceBySlug } from '@/data/services'
import { sanitizeEmail, sanitizePhone, sanitizeText } from '@/lib/sanitize'

export function normalizeContactPayload(raw) {
  const service = sanitizeText(raw.service || '', 80)
  const serviceRecord = service ? getServiceBySlug(service) : null

  return {
    name: sanitizeText(raw.name, 120),
    email: sanitizeEmail(raw.email),
    phone: sanitizePhone(raw.phone || ''),
    service,
    serviceTitle: serviceRecord?.title || '',
    message: sanitizeText(raw.message, 5000),
  }
}

export async function submitContactForm(raw) {
  const payload = normalizeContactPayload(raw)

  const response = await fetch(CONTACT_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    const error = new Error(data.error || 'SUBMIT_FAILED')
    error.code = data.error
    throw error
  }

  return data
}
