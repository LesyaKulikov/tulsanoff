import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { AboutHero } from '../components/AboutHero/AboutHero'
import { AboutMasters } from '../components/AboutMasters/AboutMasters'
import { FaqList } from '../components/FaqList/FaqList'

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
      <AboutMasters />
      <FaqList />
    </>
  )
}