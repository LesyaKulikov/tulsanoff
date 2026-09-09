import { AboutHero } from '../components/AboutHero/AboutHero'
import { AboutGallery } from '../components/AboutGallery/AboutGallery'
import { AboutIntro } from '../components/AboutIntro/AboutIntro'
import { AboutMasters } from '../components/AboutMasters/AboutMasters'
import { AboutFaq } from '../components/AboutFaq/AboutFaq'
import { AboutCta } from '../components/AboutCta/AboutCta'

export function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutGallery />
      <AboutIntro />
      <AboutMasters />
      <AboutFaq />
      <AboutCta />
    </>
  )
}