const API_BASE = import.meta.env.VITE_API_URL || '/api'

async function fetchJson(path) {
  const response = await fetch(`${API_BASE}${path}`)
  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.error || `Request failed: ${response.status}`)
  }
  return response.json()
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
}

export function getRelatedServices(services, slugs = []) {
  return slugs.map((slug) => services.find((service) => service.slug === slug)).filter(Boolean)
}
