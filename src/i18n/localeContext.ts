import { createContext, useContext } from 'react'
import type { LocaleKey } from './messages'

export interface LocaleContextValue {
  locale: LocaleKey
  setLocale: (locale: LocaleKey) => void
  /** Advances to the next locale in the switcher cycle. */
  toggleLocale: () => void
}

/**
 * Lives in its own module so `useLocale` can be imported without pulling the
 * provider component along, which keeps fast refresh working.
 */
export const LocaleContext = createContext<LocaleContextValue | null>(null)

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be used inside <LocaleProvider>')
  return ctx
}
