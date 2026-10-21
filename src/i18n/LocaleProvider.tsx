import { useCallback, useEffect, useMemo, useState } from 'react'
import { IntlProvider } from 'react-intl'
import {
  DEFAULT_LOCALE,
  getDirection,
  isLocaleKey,
  loadMessages,
  nextLocale,
  type LocaleKey,
} from './messages'
import { LocaleContext, type LocaleContextValue } from './localeContext'

const STORAGE_KEY = 'tulsanoff.locale'

function readStoredLocale(): LocaleKey {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored && isLocaleKey(stored)) return stored
  } catch {
    // Private mode / disabled storage — fall through to the default.
  }
  return DEFAULT_LOCALE
}

function persist(locale: LocaleKey) {
  try {
    window.localStorage.setItem(STORAGE_KEY, locale)
  } catch {
    // Preference simply won't persist.
  }
}

/**
 * Owns the active locale: feeds react-intl, persists the choice, and keeps
 * `<html lang>` and `<html dir>` in sync so screen readers announce the language
 * correctly and Hebrew lays out right-to-left.
 */
export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<LocaleKey>(readStoredLocale)

  const setLocale = useCallback((next: LocaleKey) => {
    setLocaleState(next)
    persist(next)
  }, [])

  const toggleLocale = useCallback(() => {
    setLocaleState((current) => {
      const next = nextLocale(current)
      persist(next)
      return next
    })
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.lang = locale
    root.dir = getDirection(locale)
  }, [locale])

  const value = useMemo<LocaleContextValue>(
    () => ({ locale, setLocale, toggleLocale }),
    [locale, setLocale, toggleLocale],
  )

  return (
    <LocaleContext.Provider value={value}>
      <IntlProvider locale={locale} messages={loadMessages(locale)} defaultLocale={DEFAULT_LOCALE}>
        {children}
      </IntlProvider>
    </LocaleContext.Provider>
  )
}
