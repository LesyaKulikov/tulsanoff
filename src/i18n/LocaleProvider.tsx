import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
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

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<LocaleKey>(readStoredLocale)
  const localeRef = useRef(locale)
  useEffect(() => { localeRef.current = locale }, [locale])

  const [anim] = useState<string>('blur')

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('lang-anim-blur', 'lang-anim-slide', 'lang-anim-stagger')
    root.classList.add('lang-anim-' + anim)
  }, [anim])

  const commitLocale = useCallback((next: LocaleKey) => {
    const root = document.documentElement
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      root.classList.remove('lang-switching')
      setLocaleState(next)
      persist(next)
      return
    }
    root.classList.add('lang-switching')
    window.setTimeout(() => {
      setLocaleState(next)
      persist(next)
      window.setTimeout(() => root.classList.remove('lang-switching'), 80)
    }, 170)
  }, [])

  const setLocale = useCallback((next: LocaleKey) => {
    commitLocale(next)
  }, [commitLocale])

  const toggleLocale = useCallback(() => {
    commitLocale(nextLocale(localeRef.current))
  }, [commitLocale])

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