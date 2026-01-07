export enum Route {
  HOME = '/',
  ABOUT = '/about',
  FACILITIES = '/facilities',
  EXPERIENCES = '/experiences',
  LOCATION = '/location',
  CONTACT = '/contact',
}

export interface NavLink {
  href: Route
  label: string
}
