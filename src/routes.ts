export const ROUTES = {
  home: '/',
  services: '/services',
  certificates: '/certificates',
  about: '/about',
  contacts: '/contacts',
} as const

export type RouteKey = keyof typeof ROUTES

export function massageRoute(id: string): string {
  return `${ROUTES.services}/${id}`
}
