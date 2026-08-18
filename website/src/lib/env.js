const DEFAULT_SITE_URL = 'https://www.markshelland.com'

/** Public site URL used for canonical links and Open Graph tags. */
export const SITE_URL = (import.meta.env.VITE_SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, '')

export const CONTACT_FORM_ENDPOINT = import.meta.env.VITE_CONTACT_FORM_ENDPOINT || ''
export const CONTACT_FORM_ACCESS_KEY = import.meta.env.VITE_CONTACT_FORM_ACCESS_KEY || ''

export const isContactFormConfigured = Boolean(CONTACT_FORM_ENDPOINT)
