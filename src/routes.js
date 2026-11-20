// One list of pages. Used by the client router (App.jsx) and by vite.config.js, which
// writes a real HTML file per route at build time so each URL has its own title/description.
import { COUNTY_PAGES } from './countyCopy.js'

export const SITE = 'https://luxepupsutah.com'

export const ROUTES = [
  {
    path: '/',
    label: 'Home',
    title: 'Mobile Dog & Pet Grooming in Davis County, Utah | Luxe Pups Grooming',
    description:
      'Luxe Pups Grooming — premium in-home mobile dog and pet grooming in Davis, Weber, Morgan and Salt Lake counties, Utah. Small breed specialists.',
  },
  {
    path: '/services',
    label: 'Services',
    title: 'Dog Grooming Services & Prices — Mobile Grooming in Utah | Luxe Pups Grooming',
    description:
      'Full Groom, Bath & Brush, Puppy\'s First Groom, spa treatments and add-ons. Pricing by dog size for mobile dog grooming in Davis County and northern Utah.',
  },
  {
    path: '/about',
    label: 'About',
    title: 'About Luxe Pups Grooming — Steven & Emily, Mobile Dog Groomers in Utah',
    description:
      'Meet Steven and Emily, the owners of Luxe Pups Grooming — small breed specialists bringing calm, one-on-one mobile dog grooming to your door in Utah.',
  },
  {
    path: '/areas',
    label: 'Areas',
    title: 'Mobile Dog Grooming in Davis, Weber, Morgan & Salt Lake Counties, Utah | Luxe Pups',
    description:
      'Luxe Pups Grooming serves Davis County, Weber County, Morgan County and Salt Lake County, Utah — including Layton, Bountiful, Farmington, Ogden, Salt Lake City and more.',
  },
  {
    path: '/book',
    label: 'Book',
    title: 'Book Mobile Dog Grooming in Davis County, Utah | Luxe Pups Grooming',
    description:
      'Request a mobile dog grooming appointment with Luxe Pups Grooming. $40 deposit confirms your booking; we come to your door anywhere in our Utah service area.',
  },
  ...COUNTY_PAGES.map((c) => ({
    path: `/${c.slug}`,
    label: c.county,
    title: c.title,
    description: c.description,
  })),
]
