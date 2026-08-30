import enUS from './en-US.json'

export type MessageValue = string

export const DEFAULT_LOCALE = 'en-US'

export const locales = {
  [DEFAULT_LOCALE]: { messages: enUS },
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

const flatMessages = flatten(enUS)

export function resolveMessage(id: string): string | undefined {
  return flatMessages[id]
}

export function loadMessages(_locale: LocaleKey): Record<string, string> {
  return flatten(locales[_locale].messages)
}
