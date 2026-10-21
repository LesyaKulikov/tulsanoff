import enUS from './en-US.json'
import heIL from './he-IL.json'
import ruRU from './ru-RU.json'

export type MessageValue = string

/**
 * Russian is the language TULSANOFF ships in. `he-IL` is the second locale the
 * switcher offers; `en-US` is kept complete but is not exposed in the UI yet.
 */
export const DEFAULT_LOCALE = 'ru-RU'

export const locales = {
  'ru-RU': { messages: ruRU, dir: 'ltr' },
  'he-IL': { messages: heIL, dir: 'rtl' },
  'en-US': { messages: enUS, dir: 'ltr' },
} as const

export type LocaleKey = keyof typeof locales

// Keeps DEFAULT_LOCALE honest if the locale set above ever changes.
const _defaultIsRegistered: LocaleKey = DEFAULT_LOCALE
void _defaultIsRegistered

/** Locales reachable from the header switcher, in the order they cycle. */
export const SWITCHER_LOCALES: readonly LocaleKey[] = [DEFAULT_LOCALE, 'he-IL']

export function isLocaleKey(value: string): value is LocaleKey {
  return Object.prototype.hasOwnProperty.call(locales, value)
}

/** Text direction for a locale — Hebrew is right-to-left. */
export function getDirection(locale: LocaleKey): 'ltr' | 'rtl' {
  return locales[locale].dir
}

/** The next locale in the switcher cycle. */
export function nextLocale(locale: LocaleKey): LocaleKey {
  const i = SWITCHER_LOCALES.indexOf(locale)
  return SWITCHER_LOCALES[(i + 1) % SWITCHER_LOCALES.length]
}

/** Short code shown on the switcher for the locale you would switch TO. */
export function switcherLabel(locale: LocaleKey): string {
  return locale === 'he-IL' ? 'עברית' : 'Рус'
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function flatten(
  source: Record<string, unknown>,
  prefix = '',
  out: Record<string, string> = {},
): Record<string, string> {
  for (const [key, value] of Object.entries(source)) {
    const path = prefix ? `${prefix}.${key}` : key
    if (isRecord(value)) {
      flatten(value, path, out)
    } else if (typeof value === 'string') {
      out[path] = value
    }
  }
  return out
}

const flatMessages: Record<LocaleKey, Record<string, string>> = {
  'ru-RU': flatten(ruRU),
  'he-IL': flatten(heIL),
  'en-US': flatten(enUS),
}

/**
 * `locale` is typed as LocaleKey but arrives as a raw string from
 * `intl.locale`, so it is re-checked here. An unknown locale degrades to the
 * default rather than throwing on the first `<Message>`.
 */
function messagesFor(locale: string): Record<string, string> {
  return flatMessages[isLocaleKey(locale) ? locale : DEFAULT_LOCALE]
}

export function resolveMessage(id: string, locale: string): string | undefined {
  return messagesFor(locale)[id]
}

/**
 * True when `id` has copy in `locale`. Lets a section decide it has nothing to
 * show yet instead of falling back to rendering the id itself.
 */
export function hasMessage(id: string, locale: string): boolean {
  const value = messagesFor(locale)[id]
  return typeof value === 'string' && value.length > 0
}

export function loadMessages(locale: LocaleKey): Record<string, string> {
  return flatMessages[locale]
}
