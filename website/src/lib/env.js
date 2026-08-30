const DEFAULT_SITE_URL = 'https://www.markshelland.com'

/** Public site URL used for canonical links and Open Graph tags. */
export const SITE_URL = (import.meta.env.VITE_SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, '')

export const CONTACT_API = import.meta.env.VITE_CONTACT_API || '/api/contact'
export const CAREER_APPLY_API = import.meta.env.VITE_CAREER_APPLY_API || '/api/career-apply'

export const isContactFormConfigured = Boolean(CONTACT_API)
export const isCareerApplyConfigured = Boolean(CAREER_APPLY_API)
