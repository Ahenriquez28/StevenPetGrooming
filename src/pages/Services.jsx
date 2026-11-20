import { Arrow, Fold } from '../components/ui'
import { Link } from '../router'
import { ADDONS, BATH_INCLUDES, FULL_EXTRAS, POLICY_ITEMS, PUPPY_INCLUDES, SIZES, SPA } from '../data'

export default function Services() {
  return (
    <>
      <section className="svc-top">
        <div className="wrap svc-top-inner">
          <h1 className="page-title">Mobile Dog Grooming Services &amp; Prices</h1>
        </div>
      </section>

      {/* 01 — the two main grooms */}
      <section className="svc svc--white" id="grooms">
        <div className="wrap">
          <header className="svc-head">
            <h2>Choose your groom</h2>
            <p className="svc-lede">Both start with the same bath. Full Groom adds the haircut and finishing touches.</p>
          </header>
          <div className="groom-grid">
            <article className="groom-card groom-card--full">
              <header className="groom-head">
                <h3>Full Groom</h3>
                <span className="groom-from">from $125</span>
              </header>
              <div className="groom-body">
                <ul className="price-list">
                  {SIZES.map((s) => (
                    <li key={s.size}><span><span className="sz">{s.size}</span><span className="wt">{s.weight}</span></span><span className="price">{s.full}</span></li>
                  ))}
                </ul>
                <p className="incl-title">Everything in Bath &amp; Brush, plus</p>
                <ul className="incl">{FULL_EXTRAS.map((t) => <li key={t}>{t}</li>)}</ul>
              </div>
            </article>

            <article className="groom-card groom-card--bath">
              <header className="groom-head">
                <h3>Bath &amp; Brush</h3>
                <span className="groom-from">from $85</span>
              </header>
              <div className="groom-body">
                <ul className="price-list">
                  {SIZES.map((s) => (
                    <li key={s.size}><span><span className="sz">{s.size}</span><span className="wt">{s.weight}</span></span><span className="price">{s.bath}</span></li>
                  ))}
                </ul>
                <p className="incl-title">Includes</p>
                <ul className="incl">{BATH_INCLUDES.map((t) => <li key={t}>{t}</li>)}</ul>
              </div>
            </article>
          </div>
          <p className="note svc-note">Final pricing may vary based on breed, coat condition, haircut, behavior, and grooming time.</p>
        </div>
      </section>

      {/* 02 — puppies */}
      <section className="svc svc--blush" id="puppy">
        <div className="wrap puppy-band">
          <div>
            <h2>Puppy's First Groom</h2>
            <p className="svc-lede">For puppies learning to love the grooming experience.</p>
            <p className="price-big">Starting at $100</p>
            <p className="note">Pricing based on size, coat, and grooming needs.</p>
          </div>
          <ul className="dash-list">{PUPPY_INCLUDES.map((t) => <li key={t}>{t}</li>)}</ul>
        </div>
      </section>

      {/* 03 — add-ons */}
      <section className="svc svc--cream" id="addons">
        <div className="wrap addon-grid">
          <div>
            <header className="svc-head">
              <h2>Luxe Add-Ons</h2>
              <p className="svc-lede">Add to any groom.</p>
            </header>
            <dl className="addon-list">
              {ADDONS.map(([name, price]) => (
                <div className="addon" key={name}>
                  <dt>{name}</dt>
                  <dd>{price}</dd>
                </div>
              ))}
            </dl>
          </div>
          <aside className="callout">
            <h3 className="callout-title">Multi-dog household</h3>
            <p className="callout-save">$10 <span>off each additional dog</span></p>
            <p className="note">Grooming multiple dogs at the same location? When two or more dogs are groomed during the same appointment. Discount applies to the lower-priced service(s) and cannot be combined with other promotions.</p>
          </aside>
        </div>
      </section>

      {/* 04 — spa */}
      <section className="svc svc--dark" id="spa">
        <div className="wrap">
          <header className="svc-head">
            <h2>Luxe Spa Treatments</h2>
          </header>
          <ul className="spa-list">
            {SPA.map((s) => (
              <li key={s.name}>
                <h3 className="h4">{s.name}</h3>
                <p>{s.desc}</p>
                <span className="price-sm">{s.price}</span>
              </li>
            ))}
          </ul>
          <div className="package">
            <div>
              <h3 className="h4">Full Luxe Package</h3>
              <p>Luxury Shed Control + Luxe Facial + Pawdicure + Luxe Smile</p>
            </div>
            <span className="price-big">Starting at $55</span>
          </div>
        </div>
      </section>

      {/* 05 — policies */}
      <section className="svc svc--white" id="good-to-know">
        <div className="wrap">
          <header className="svc-head">
            <h2>Before your appointment</h2>
          </header>
          <ul className="check-list check-list--row">
            <li>No driving across town</li>
            <li>No crowded salons</li>
            <li>No long kennel stays</li>
            <li>No waiting rooms</li>
          </ul>
          <div className="folds">
            <Fold title="Coat & behavior policy" meta="When extra charges apply">
              <p className="fold-text">Our prices are based on weight and standard grooming time. Additional charges may apply for:</p>
              <ul className="dot-list">{POLICY_ITEMS.map((t) => <li key={t}>{t}</li>)}</ul>
              <p className="note">Safety comes first. If a coat is severely matted, the safest grooming option may be a shorter haircut. Any additional charges will be discussed with the owner before proceeding whenever possible.</p>
            </Fold>
          </div>
          <p className="footnote">Prices are starting prices. Final pricing is determined after evaluating the dog's size, breed, coat condition, behavior, and requested style.</p>
          <div className="page-cta"><Link to="/book" className="btn btn-dark btn-xl">Book an Appointment <Arrow /></Link></div>
        </div>
      </section>
    </>
  )
}
