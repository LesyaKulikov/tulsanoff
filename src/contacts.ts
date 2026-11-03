/**
 * The studio's real-world contact details and social channels.
 *
 * These are structured data rather than message ids because they carry a second
 * value the copy alone cannot: the `tel:`/`mailto:`/map target. The *display*
 * labels still come from the locale files so they translate.
 *
 * Consumers: Hero, Footer and ContactsPage each render a different subset via
 * the shared `SocialLinks` component, so the rows are defined separately rather
 * than as one shared list. Facebook now has a public URL and renders as a
 * normal link like the other channels.
 * WhatsApp is deliberately *not* a social channel here: it is the booking line,
 * linked from the CTA buttons (`WHATSAPP_URL`).
 */

export interface SocialLink {
  key: 'telegram' | 'instagram' | 'facebook'
  /** Absent for channels without a public URL yet (Facebook renders as a non-link). */
  href?: string
  /** Locale id for the accessible name. */
  labelId: string
  icon: 'telegram' | 'instagram' | 'facebook'
}

/** WhatsApp booking line — lives on the CTA buttons, not in the social rows. */
export const WHATSAPP_URL = 'https://wa.me/972504082976'

const TELEGRAM: SocialLink = {
  key: 'telegram',
  href: 'https://t.me/tulsanoff_massage_studio',
  labelId: 'footer.social.tgAlt',
  icon: 'telegram',
}

const INSTAGRAM: SocialLink = {
  key: 'instagram',
  href: 'https://www.instagram.com/tulsanoff_massage',
  labelId: 'footer.social.igAlt',
  icon: 'instagram',
}

const FACEBOOK: SocialLink = {
  key: 'facebook',
  href: 'https://www.facebook.com/share/1G9TiUoRDR/',
  labelId: 'footer.social.fbAlt',
  icon: 'facebook',
}

/** Hero social row: telegram + instagram only. */
export const HERO_SOCIAL_LINKS: readonly SocialLink[] = [TELEGRAM, INSTAGRAM]

/** Footer social row: telegram + instagram + facebook. */
export const FOOTER_SOCIAL_LINKS: readonly SocialLink[] = [TELEGRAM, INSTAGRAM, FACEBOOK]

/** Contacts page social row (matches the footer). */
export const CONTACTS_SOCIAL_LINKS: readonly SocialLink[] = [TELEGRAM, INSTAGRAM, FACEBOOK]

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
