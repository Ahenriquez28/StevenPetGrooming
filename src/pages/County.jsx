import { Arrow } from '../components/ui'
import { Link } from '../router'
import { COUNTY_PAGES } from '../countyCopy'
import { SERVICE_AREAS, PHONE_DISPLAY, PHONE_TEL } from '../serviceAreas'
import { TEASER } from '../data'

export default function County({ slug }) {
  const page = COUNTY_PAGES.find((c) => c.slug === slug)
  const towns = SERVICE_AREAS.find((a) => a.county === page.county).towns
  const others = COUNTY_PAGES.filter((c) => c.slug !== slug)

  return (
    <>
      <section className="cty-top">
        <div className="wrap">
          <p className="eyebrow">Service area</p>
          <h1 className="page-title">Mobile Dog &amp; Pet Grooming in {page.county}, Utah</h1>
          <p className="cty-lead">{page.lead}</p>
          <p className="cty-p">{page.more}</p>
          <div className="actions cty-actions">
            <Link to="/book" className="btn btn-dark">Book an Appointment <Arrow /></Link>
            <Link to="/services" className="btn btn-line">See Services &amp; Prices</Link>
          </div>
        </div>
      </section>

      <section className="cty-section cty-section--white">
        <div className="wrap">
          <h2 className="cty-h2">Towns we serve in {page.county}</h2>
          <ul className="towns">{towns.map((t) => <li key={t}>{t}</li>)}</ul>
        </div>
      </section>

      <section className="cty-section cty-section--blush">
        <div className="wrap">
          <h2 className="cty-h2">Grooming prices at a glance</h2>
          <ul className="teaser-list">
            {TEASER.map((t) => (
              <li key={t.name}>
                <h3>{t.name}</h3>
                <p>{t.text}</p>
                <p className="teaser-price"><span>from</span> {t.from}</p>
              </li>
            ))}
          </ul>
          <p className="cty-p"><Link to="/services" className="text-link">See all services &amp; pricing <Arrow /></Link></p>
        </div>
      </section>

      <section className="cty-section">
        <div className="wrap">
          <h2 className="cty-h2">Common questions</h2>
          <dl className="faq">
            <dt>Do you groom dogs at my home in {page.county}?</dt>
            <dd>Yes. Luxe Pups is a mobile groomer, so we come to your address in any of the {page.county} towns listed above and groom your dog in our fully equipped van.</dd>
            <dt>How much does dog grooming cost in {page.county}?</dt>
            <dd>Pricing is by dog size. Bath &amp; Brush starts at $85, Full Groom at $125, and Puppy's First Groom at $100. Final pricing depends on breed, coat condition and grooming time.</dd>
            <dt>How do I book?</dt>
            <dd>Request an appointment online or call <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>. A $40 deposit confirms your booking and is applied to your final total; the balance is due at your appointment. We are open Monday 10AM–2PM and Tuesday–Saturday 10AM–6PM, and closed Sundays.</dd>
          </dl>
        </div>
      </section>

      <section className="cty-section cty-section--white cty-other">
        <div className="wrap">
          <h2 className="cty-h2">Other areas we serve</h2>
          <p className="other-links">
            {others.map((c) => <Link key={c.slug} to={`/${c.slug}`}>{c.county}</Link>)}
            <Link to="/areas">All service areas</Link>
          </p>
        </div>
      </section>
    </>
  )
}
