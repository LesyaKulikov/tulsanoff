export const ROUTES = {
  home: '/',
  services: '/services',
  certificates: '/certificates',
  about: '/about',
  contacts: '/contacts',
} as const

export type RouteKey = keyof typeof ROUTES
