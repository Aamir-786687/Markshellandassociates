/** Strip control characters and enforce max length on user text. */
export function sanitizeText(value, maxLength = 500) {
  if (typeof value !== 'string') return ''
  const cleaned = value
    .trim()
    .split('')
    .filter((char) => {
      const code = char.charCodeAt(0)
      return code >= 32 && code !== 127
    })
    .join('')
  return cleaned.slice(0, maxLength)
}

export function sanitizeEmail(value) {
  return sanitizeText(value, 254).toLowerCase()
}

export function sanitizePhone(value) {
  return sanitizeText(value, 30).replace(/[^\d+\s()-]/g, '')
}
