/**
 * The studio's real-world contact details and social channels.
 *
 * These are structured data rather than message ids because they carry a second
 * value the copy alone cannot: the `tel:`/`mailto:`/map target. The *display*
 * labels still come from the locale files so they translate.
 *
 * Consumers: Hero, Footer and ContactsPage — previously each carried its own
 * copy of these links, and the Facebook entry had no URL at all so it silently
 * navigated to the homepage.
 */

export interface SocialLink {
  key: 'telegram' | 'instagram' | 'whatsapp'
  href: string
  /** Locale id for the accessible name. */
  labelId: string
  icon: 'telegram' | 'instagram' | 'whatsapp'
}

export const SOCIAL_LINKS: readonly SocialLink[] = [
  {
    key: 'telegram',
    href: 'https://t.me/tulsanoff_massage_studio',
    labelId: 'footer.social.tgAlt',
    icon: 'telegram',
  },
  {
    key: 'whatsapp',
    href: 'https://wa.me/972504082976',
    labelId: 'footer.social.waAlt',
    icon: 'whatsapp',
  },
  {
    key: 'instagram',
    href: 'https://www.instagram.com/tulsanoff_massage',
    labelId: 'footer.social.igAlt',
    icon: 'instagram',
  },
]

export interface Phone {
  /** Already-formatted number, shown to the user. */
  display: string
  /** E.164 form used by the `tel:` link. */
  href: string
}

export const PHONES: readonly Phone[] = [
  { display: '+972 50 408 2976', href: '+972504082976' },
  { display: '+972 53 583 3823', href: '+972535833823' },
]

export const EMAIL = 'LMLMASSAGE@gmail.com'

export interface Branch {
  key: string
  /** Locale id for the branch name. */
  nameId: string
  /** Locale id for the street address. */
  addressId: string
  /** Query string handed to Google Maps. */
  mapQuery: string
}

export const BRANCHES: readonly Branch[] = [
  {
    key: 'petah-tikva',
    nameId: 'contacts.branch.0',
    addressId: 'footer.addresses.0',
    mapQuery: 'Odem+St+8+Petah+Tikva',
  },
  {
    key: 'ramat-gan',
    nameId: 'contacts.branch.1',
    addressId: 'footer.addresses.1',
    mapQuery: 'Bialik+63+Ramat+Gan',
  },
]

export function mapsUrl(mapQuery: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${mapQuery}`
}
