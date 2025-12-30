export enum Route {
  HOME = '/',
  ABOUT = '/about',
  FACILITIES = '/facilities',
  CONTACT = '/contact',
}

export interface NavLink {
  href: Route
  label: string
}
