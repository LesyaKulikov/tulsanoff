import enUS from './en-US.json'
import ruRU from './ru-RU.json'

export type MessageValue = string

export const DEFAULT_LOCALE = 'ru-RU'

export const locales = {
  [DEFAULT_LOCALE]: { messages: ruRU },
  'en-US': { messages: enUS },
} as const

export type LocaleKey = keyof typeof locales

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
  'en-US': flatten(enUS),
}

export function resolveMessage(id: string, locale: LocaleKey): string | undefined {
  return flatMessages[locale][id]
}

/**
 * True when `id` has copy in `locale`. Lets a section decide it has nothing to
 * show yet instead of falling back to rendering the id itself.
 */
export function hasMessage(id: string, locale: LocaleKey): boolean {
  const value = flatMessages[locale][id]
  return typeof value === 'string' && value.length > 0
}

export function loadMessages(locale: LocaleKey): Record<string, string> {
  return flatten(locales[locale].messages)
}
