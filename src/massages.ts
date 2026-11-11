export interface Massage {
  id: string
  image: string
}

export const MASSAGES: Massage[] = [
  { id: 'meditsinskiy', image: `${import.meta.env.BASE_URL}images/meditsinskiy.jpg`' },
  { id: 'massazh-litsa', image: `${import.meta.env.BASE_URL}images/massazh-litsa.jpg`' },
  { id: 'relaks', image: `${import.meta.env.BASE_URL}images/relaks.jpg`' },
  { id: 'sport', image: `${import.meta.env.BASE_URL}images/sport.jpg`' },
  { id: 'shvedskiy', image: `${import.meta.env.BASE_URL}images/video-frame.jpg`' },
  { id: 'limfaticheskiy', image: `${import.meta.env.BASE_URL}images/limfaticheskiy.jpg`' },
  { id: 'anti-tsellyulit', image: `${import.meta.env.BASE_URL}images/anti-tsellyulit.jpg`' },
  { id: 'dlya-par', image: `${import.meta.env.BASE_URL}images/dlya-par.jpg`' },
]

export function getMassage(id: string): Massage | undefined {
  return MASSAGES.find((m) => m.id === id)
}

export const MASSAGE_IDS = MASSAGES.map((m) => m.id)
