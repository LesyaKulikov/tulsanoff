import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { AboutHero } from '../components/AboutHero/AboutHero'
import { AboutDescription } from '../components/AboutDescription/AboutDescription'
import { AboutMasters } from '../components/AboutMasters/AboutMasters'
import { FaqList } from '../components/FaqList/FaqList'

const ABOUT_FAQ_ROWS = ['0', '1', '2', '3', '4', '5'] as const

export function AboutPage() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) return
    const el = document.querySelector(location.hash)
    el?.scrollIntoView({ behavior: 'smooth' })
  }, [location])

  return (
    <>
      <AboutHero />
      <AboutDescription />
      <AboutMasters />
      <FaqList base="aboutPage.faq" rowIds={ABOUT_FAQ_ROWS} testId="about-faq" />
    </>
  )
}