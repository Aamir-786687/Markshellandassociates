const API_BASE = import.meta.env.VITE_API_URL || '/api'

async function fetchJson(path, options) {
  const response = await fetch(`${API_BASE}${path}`, options)
  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.error || `Request failed: ${response.status}`)
  }
  return response.json()
}

async function postJson(path, body) {
  return fetchJson(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

export const api = {
  getStatistics: () => fetchJson('/statistics'),
  getTeam: () => fetchJson('/team'),
  getBlogPosts: () => fetchJson('/blog'),
  getBlogPost: (slug) => fetchJson(`/blog/${slug}`),
  getServices: () => fetchJson('/services'),
  getService: (slug) => fetchJson(`/services/${slug}`),
  getLegalDocument: (slug) => fetchJson(`/legal/${slug}`),
  getTestimonials: () => fetchJson('/testimonials'),
  getIndustries: () => fetchJson('/industries'),
  getCareers: () => fetchJson('/careers'),
  getFaqs: () => fetchJson('/faqs'),
  getTrustClientLogos: () => fetchJson('/trust-client-logos'),
  submitContactMessage: (data) => postJson('/messages', data),
}

export function getRelatedServices(services, slugs = []) {
  return slugs.map((slug) => services.find((service) => service.slug === slug)).filter(Boolean)
}
