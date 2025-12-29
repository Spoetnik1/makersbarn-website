export enum Route {
  HOME = '/',
  ABOUT = '/about',
  ACCOMMODATION = '/accommodation',
  CONTACT = '/contact',
}

export interface NavLink {
  href: Route
  label: string
}
