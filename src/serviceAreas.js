// Single source of truth for where Luxe Pups works.
// Used by (1) the "Service Areas" section on the page and (2) vite.config.js,
// which injects the same list into the page's JSON-LD and meta keywords at build time.
// To add or remove a county or town, edit this file only.

export const SERVICE_AREAS = [
  {
    county: 'Davis County',
    towns: [
      'Bountiful', 'Centerville', 'Clearfield', 'Clinton', 'Farmington', 'Fruit Heights',
      'Kaysville', 'Layton', 'North Salt Lake', 'South Weber', 'Sunset', 'Syracuse',
      'West Bountiful', 'West Point', 'Woods Cross',
    ],
  },
  {
    county: 'Weber County',
    towns: [
      'Farr West', 'Harrisville', 'Hooper', 'Huntsville', 'Marriott-Slaterville', 'North Ogden',
      'Ogden', 'Plain City', 'Pleasant View', 'Riverdale', 'Roy', 'South Ogden', 'Uintah',
      'Washington Terrace', 'West Haven', 'Eden', 'Liberty',
    ],
  },
  {
    county: 'Morgan County',
    towns: ['Morgan', 'Mountain Green', 'Peterson', 'Croydon', 'Enterprise', 'Milton', 'Porterville', 'Stoddard'],
  },
  {
    county: 'Salt Lake County',
    towns: [
      'Alta', 'Bluffdale', 'Brighton', 'Copperton', 'Cottonwood Heights', 'Draper',
      'Emigration Canyon', 'Herriman', 'Holladay', 'Kearns', 'Magna', 'Midvale', 'Millcreek',
      'Murray', 'Riverton', 'Salt Lake City', 'Sandy', 'South Jordan', 'South Salt Lake',
      'Taylorsville', 'West Jordan', 'West Valley City', 'White City',
    ],
  },
]

export const PHONE_DISPLAY = '(385) 514-2999'
export const PHONE_TEL = '3855142999'
export const PHONE_E164 = '+1-385-514-2999'

// Business hours. Rendered in the footer and injected into the Google business data.
// Sunday is closed. `opens`/`closes` are 24h for structured data; `label` is what visitors see.
export const HOURS = [
  { days: ['Sunday'], label: 'Sunday', closed: true },
  { days: ['Monday'], label: 'Monday', opens: '10:00', closes: '14:00', text: '10AM – 2PM' },
  { days: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], label: 'Tuesday – Saturday', opens: '10:00', closes: '18:00', text: '10AM – 6PM' },
]
