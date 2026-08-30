import { Outlet } from 'react-router-dom'
import { TopBar } from '@/components/layout/TopBar'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/layout/WhatsAppButton'
import { ScrollToTop } from '@/components/layout/ScrollToTop'
import { useLenis } from '@/hooks/useLenis'

export function Layout() {
  useLenis()

  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-navy focus:px-4 focus:py-2 focus:text-white">
        Skip to main content
      </a>
      <header className="relative z-50" role="banner">
        <TopBar />
        <Navbar />
      </header>
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
