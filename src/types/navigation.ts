export enum Route {
  HOME = '/',
  ABOUT = '/about',
  FACILITIES = '/facilities',
  EXPERIENCES = '/experiences',
  SHANTI_DEVA_RETREAT = '/experiences/shanti-deva-retreat',
  SURROUNDINGS = '/surroundings',
  CONTACT = '/contact',
}

export interface NavLink {
  href: Route
  label: string
}
