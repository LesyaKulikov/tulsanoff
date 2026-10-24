export const ROUTES = {
  home: '/',
  services: '/services',
  /** Route pattern for a single Massage detail page. */
  serviceDetail: '/services/:id',
  certificates: '/certificates',
  about: '/about',
  contacts: '/contacts',
  /** Catch-all — matches anything the routes above do not. */
  notFound: '*',
} as const

export type RouteKey = keyof typeof ROUTES

export function massageRoute(id: string): string {
  return `${ROUTES.services}/${encodeURIComponent(id)}`
}
