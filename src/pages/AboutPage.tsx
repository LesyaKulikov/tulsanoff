import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useReducedMotion } from 'framer-motion'
import { AboutHero } from '../components/AboutHero/AboutHero'
import { AboutDescription } from '../components/AboutDescription/AboutDescription'
import { AboutMasters } from '../components/AboutMasters/AboutMasters'
import { FaqList } from '../components/FaqList/FaqList'

const ABOUT_FAQ_ROWS = ['0', '1', '2', '3', '4', '5'] as const

export function AboutPage() {
  const location = useLocation()
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!location.hash) return
    // `location.hash` is user-controlled: `#`, `#123abc` and friends are not
    // valid CSS selectors, so querySelector would throw and blank the app.
    // getElementById takes any string, and a malformed escape (`%zz`) must not
    // take the page down either.
    let id = location.hash.slice(1)
    try {
      id = decodeURIComponent(id)
    } catch {
      /* keep the raw id — getElementById simply won't match it */
    }
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })
  }, [location.pathname, location.hash, reduce])

  return (
    <>
      <AboutHero />
      <AboutDescription />
      <AboutMasters />
      <FaqList base="aboutPage.faq" rowIds={ABOUT_FAQ_ROWS} testId="about-faq" />
    </>
  )
}
