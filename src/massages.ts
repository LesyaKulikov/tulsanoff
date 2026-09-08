export interface Massage {
  id: string
  image: string
}

const MASSAGES: Massage[] = [
  { id: 'meditsinskiy', image: '/images/hero.jpg' },
  { id: 'massazh-litsa', image: '/images/video-frame.jpg' },
  { id: 'dlya-par', image: '/images/cta-band.png' },
  { id: 'relaks', image: '/images/gallery-1.jpg' },
  { id: 'sport', image: '/images/gallery-2.jpg' },
  { id: 'glubokotkanniy', image: '/images/gallery-3.jpg' },
  { id: 'shvedskiy', image: '/images/big-card-a.jpg' },
  { id: 'limfaticheskiy', image: '/images/big-card-b.jpg' },
  { id: 'anti-tsellyulit', image: '/images/spa-bleed.png' },
]

export function getMassage(id: string): Massage | undefined {
  return MASSAGES.find((m) => m.id === id)
}

export const MASSAGE_IDS = MASSAGES.map((m) => m.id)
