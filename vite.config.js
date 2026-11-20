import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { SERVICE_AREAS, PHONE_E164, HOURS } from './src/serviceAreas.js'

// Fills two placeholders in index.html from src/serviceAreas.js so the crawlable
// markup (JSON-LD + keywords) always matches the on-page "Service Areas" section.
function seoFromServiceAreas() {
  const counties = SERVICE_AREAS.map((a) => a.county)
  const towns = SERVICE_AREAS.flatMap((a) => a.towns)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Luxe Pups Grooming',
    description:
      'Premium in-home mobile dog and pet grooming serving Davis, Weber, Morgan and Salt Lake counties, Utah. Small breed specialists.',
    url: 'https://luxepupsutah.com/',
    telephone: PHONE_E164,
    email: 'Luxepupsut@gmail.com',
    image: 'https://luxepupsutah.com/MainDog.png',
    logo: 'https://luxepupsutah.com/Logo.png',
    priceRange: '$$',
    areaServed: [
      { '@type': 'State', name: 'Utah' },
      ...counties.map((c) => ({ '@type': 'AdministrativeArea', name: `${c}, Utah` })),
      ...SERVICE_AREAS.flatMap((a) =>
        a.towns.map((t) => ({ '@type': 'City', name: `${t}, Utah`, containedInPlace: { '@type': 'AdministrativeArea', name: `${a.county}, Utah` } }))
      ),
    ],
    openingHoursSpecification: HOURS.filter((h) => !h.closed).map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
  }

  const keywords = [
    'mobile dog grooming', 'mobile pet grooming', 'in-home dog grooming', 'dog groomer', 'pet groomer',
    'small breed dog grooming', 'dog grooming Utah', 'pet grooming Utah', 'mobile dog groomer near me',
    ...counties,
    ...towns.map((t) => `dog grooming ${t} Utah`),
  ].join(', ')

  return {
    name: 'seo-from-service-areas',
    transformIndexHtml(html) {
      return html
        .replace('__LOCAL_BUSINESS_JSONLD__', JSON.stringify(jsonLd, null, 2))
        .replace('__SEO_KEYWORDS__', keywords)
    },
  }
}

export default defineConfig({
  plugins: [react(), seoFromServiceAreas()],
  base: '/',
})
