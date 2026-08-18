import { useQuery } from '@tanstack/react-query'
import { api } from '@/api/client'

export function useStatistics() {
  return useQuery({ queryKey: ['statistics'], queryFn: api.getStatistics })
}

export function useTeam() {
  return useQuery({ queryKey: ['team'], queryFn: api.getTeam })
}

export function useBlogPosts() {
  return useQuery({ queryKey: ['blog'], queryFn: api.getBlogPosts })
}

export function useBlogPost(slug) {
  return useQuery({
    queryKey: ['blog', slug],
    queryFn: () => api.getBlogPost(slug),
    enabled: Boolean(slug),
  })
}

export function useServices() {
  return useQuery({ queryKey: ['services'], queryFn: api.getServices })
}

export function useService(slug) {
  return useQuery({
    queryKey: ['services', slug],
    queryFn: () => api.getService(slug),
    enabled: Boolean(slug),
  })
}

export function useLegalDocument(slug) {
  return useQuery({
    queryKey: ['legal', slug],
    queryFn: () => api.getLegalDocument(slug),
    enabled: Boolean(slug),
  })
}

export function useTestimonials() {
  return useQuery({ queryKey: ['testimonials'], queryFn: api.getTestimonials })
}

export function useIndustries() {
  return useQuery({ queryKey: ['industries'], queryFn: api.getIndustries })
}

export function useCareers() {
  return useQuery({ queryKey: ['careers'], queryFn: api.getCareers })
}

export function useFaqs() {
  return useQuery({ queryKey: ['faqs'], queryFn: api.getFaqs })
}
