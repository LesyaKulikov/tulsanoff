import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './components/Header/Header'
import { CtaBand } from './components/CtaBand/CtaBand'
import { Footer } from './components/Footer/Footer'
import { EASE } from './animation/variants'
import { ROUTES } from './routes'
import { Message } from './i18n/Message'

export function Layout() {
  const location = useLocation()
  const mainRef = useRef<HTMLElement>(null)

  // The page that has finished transitioning. Driving the background offset from
  // this rather than from `location` keeps the backdrop from sliding out from
  // under the outgoing page while it is still fading out.
  const [renderedPath, setRenderedPath] = useState(location.pathname)

  useEffect(() => {
    const offset = renderedPath !== ROUTES.home
    const root = document.documentElement
    root.classList.toggle('bg-offset', offset)
    document.body.classList.toggle('bg-offset', offset)
    return () => {
      root.classList.remove('bg-offset')
      document.body.classList.remove('bg-offset')
    }
  }, [renderedPath])

  return (
    <div className="app">
      <a className="skipLink" href="#main-content">
        <Message id="a11y.skipToContent" />
      </a>
      <Header />
      <AnimatePresence
        mode="wait"
        onExitComplete={() => {
          setRenderedPath(location.pathname)
          // Hash navigation is handled by the target page, which smooth-scrolls
          // to the anchor; resetting to the top here would race it.
          if (!window.location.hash) window.scrollTo(0, 0)
          // Return focus to the new page so keyboard and screen-reader users are
          // not stranded on a link that just unmounted.
          mainRef.current?.focus()
        }}
      >
        <motion.main
          id="main-content"
          key={location.pathname}
          ref={mainRef}
          tabIndex={-1}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.22, ease: EASE } }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <CtaBand />
      <Footer />
    </div>
  )
}
