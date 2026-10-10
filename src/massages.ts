export interface Massage {
  id: string
  image: string
}

const MASSAGES: Massage[] = [
  { id: 'meditsinskiy', image: '/images/meditsinskiy.jpg' },
  { id: 'massazh-litsa', image: '/images/massazh-litsa.jpg' },
  { id: 'dlya-par', image: '/images/dlya-par.jpg' },
  { id: 'relaks', image: '/images/relaks.jpg' },
  { id: 'sport', image: '/images/sport.jpg' },
  { id: 'glubokotkanniy', image: '/images/gallery-3.jpg' },
  { id: 'shvedskiy', image: '/images/big-card-a.jpg' },
  { id: 'limfaticheskiy', image: '/images/limfaticheskiy.jpg' },
  { id: 'anti-tsellyulit', image: '/images/anti-tsellyulit.jpg' },
]

export function getMassage(id: string): Massage | undefined {
  return MASSAGES.find((m) => m.id === id)
}

export const MASSAGE_IDS = MASSAGES.map((m) => m.id)
