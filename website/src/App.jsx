import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { AnimatePresence } from 'framer-motion'
import { Layout } from '@/components/layout/Layout'

const HomePage = lazy(() => import('@/pages/HomePage'))
const AboutPage = lazy(() => import('@/pages/AboutPage'))
const ServicesPage = lazy(() => import('@/pages/ServicesPage'))
const ServiceDetailPage = lazy(() => import('@/pages/ServiceDetailPage'))
const TeamPage = lazy(() => import('@/pages/TeamPage'))
const BlogPage = lazy(() => import('@/pages/BlogPage'))
const BlogDetailPage = lazy(() => import('@/pages/BlogDetailPage'))
const CareerPage = lazy(() => import('@/pages/CareerPage'))
const FAQsPage = lazy(() => import('@/pages/FAQsPage'))
const ContactPage = lazy(() => import('@/pages/ContactPage'))
const LegalDocumentPage = lazy(() => import('@/pages/LegalDocumentPage'))

function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center" role="status" aria-label="Loading">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-navy border-t-transparent" />
    </div>
  )
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Suspense fallback={<PageLoader />}><HomePage /></Suspense>} />
              <Route path="about" element={<Suspense fallback={<PageLoader />}><AboutPage /></Suspense>} />
              <Route path="services" element={<Suspense fallback={<PageLoader />}><ServicesPage /></Suspense>} />
              <Route path="services/:slug" element={<Suspense fallback={<PageLoader />}><ServiceDetailPage /></Suspense>} />
              <Route path="team" element={<Suspense fallback={<PageLoader />}><TeamPage /></Suspense>} />
              <Route path="blog" element={<Suspense fallback={<PageLoader />}><BlogPage /></Suspense>} />
              <Route path="blog/:slug" element={<Suspense fallback={<PageLoader />}><BlogDetailPage /></Suspense>} />
              <Route path="career" element={<Suspense fallback={<PageLoader />}><CareerPage /></Suspense>} />
              <Route path="faqs" element={<Suspense fallback={<PageLoader />}><FAQsPage /></Suspense>} />
              <Route path="contact" element={<Suspense fallback={<PageLoader />}><ContactPage /></Suspense>} />
              <Route path="privacy-policy" element={<Suspense fallback={<PageLoader />}><LegalDocumentPage /></Suspense>} />
              <Route path="terms-of-service" element={<Suspense fallback={<PageLoader />}><LegalDocumentPage /></Suspense>} />
              <Route path="legal-disclaimer" element={<Suspense fallback={<PageLoader />}><LegalDocumentPage /></Suspense>} />
            </Route>
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </HelmetProvider>
  )
}
