export interface Massage {
  id: string
  image: string
}

export const MASSAGES: Massage[] = [
  { id: 'meditsinskiy', image: '/tulsanoff/images/meditsinskiy.jpg' },
  { id: 'massazh-litsa', image: '/tulsanoff/images/massazh-litsa.jpg' },
  { id: 'relaks', image: '/tulsanoff/images/relaks.jpg' },
  { id: 'sport', image: '/tulsanoff/images/sport.jpg' },
  { id: 'shvedskiy', image: '/tulsanoff/images/video-frame.jpg' },
  { id: 'limfaticheskiy', image: '/tulsanoff/images/limfaticheskiy.jpg' },
  { id: 'anti-tsellyulit', image: '/tulsanoff/images/anti-tsellyulit.jpg' },
  { id: 'dlya-par', image: '/tulsanoff/images/dlya-par.jpg' },
]

export function getMassage(id: string): Massage | undefined {
  return MASSAGES.find((m) => m.id === id)
}

export const MASSAGE_IDS = MASSAGES.map((m) => m.id)
