export const WHATSAPP_PHONE = '919211978238'

export function isMobileDevice() {
  if (typeof navigator === 'undefined') return false
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i.test(navigator.userAgent)
}

export function getWhatsAppUrl(message) {
  const text = encodeURIComponent(message)

  if (isMobileDevice()) {
    return `https://wa.me/${WHATSAPP_PHONE}?text=${text}`
  }

  return `https://web.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${text}`
}

export function getCareerApplyMessage(jobTitle) {
  return `Hello! I would like to apply for the ${jobTitle} position at Markshell & Associates.`
}

export const DEFAULT_WHATSAPP_MESSAGE = 'Hello! I would like to inquire about your IP services.'
