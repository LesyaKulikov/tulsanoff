import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './components/Header/Header'
import { CtaBand } from './components/CtaBand/CtaBand'
import { Footer } from './components/Footer/Footer'
import { EASE } from './animation/variants'
import { ROUTES } from './routes'

export function Layout() {
  const location = useLocation()

  useEffect(() => {
    const offset = location.pathname !== ROUTES.home
    document.documentElement.classList.toggle('bg-offset', offset)
    document.body.classList.toggle('bg-offset', offset)
  }, [location.pathname])

  return (
    <div className="app">
      <Header />
      <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
        <motion.main
          key={location.pathname}
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
