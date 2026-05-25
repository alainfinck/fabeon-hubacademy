import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

const SCROLL_THRESHOLD = 400

export function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SCROLL_THRESHOLD)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Remonter en haut de la page"
      title="Haut de page"
      className={`fixed bottom-6 right-6 z-40 flex items-center justify-center w-12 h-12 rounded-full bg-brand-600 hover:bg-brand-500 text-white shadow-lg shadow-brand-900/25 border border-brand-500/30 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-slate-950 ${
        visible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <ArrowUp className="w-5 h-5" strokeWidth={2.5} />
    </button>
  )
}
