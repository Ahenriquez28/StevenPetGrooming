import BeforeAfterSlider from '../components/BeforeAfterSlider'
import { Arrow, Paw, PawTrail } from '../components/ui'
import { DoodleField } from '../components/Doodles'
import { Link } from '../router'
import { FACTS, REVIEWS, TEASER } from '../data'
import { SERVICE_AREAS } from '../serviceAreas'

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <DoodleField variant="copy" />
          <DoodleField variant="left" />
          <svg className="hero-paw" viewBox="0 0 100 100" fill="currentColor" aria-hidden="true">
            <ellipse cx="50" cy="65" rx="25" ry="22" />
            <ellipse cx="28" cy="42" rx="9" ry="11" />
            <ellipse cx="44" cy="36" rx="9" ry="11" />
            <ellipse cx="60" cy="36" rx="9" ry="11" />
            <ellipse cx="74" cy="42" rx="9" ry="11" />
          </svg>
          <p className="eyebrow hero-in" style={{ '--d': '0ms' }}>Mobile Dog &amp; Pet Grooming · Davis County, Utah</p>
          <h1 className="hero-in" style={{ '--d': '80ms' }}>
            Premium Grooming<br />
            <em>At Your Door.</em>
          </h1>
          <p className="hero-lede hero-in" style={{ '--d': '160ms' }}>
            Luxe Pups Grooming brings a 5-star salon experience straight to your driveway. Stress-free for your pup, effortless for you.
          </p>
          <div className="actions hero-in" style={{ '--d': '240ms' }}>
            <Link to="/book" className="btn btn-dark">Book an Appointment <Arrow /></Link>
            <Link to="/services" className="btn btn-line">See Services</Link>
          </div>
          <dl className="hero-stats hero-in" style={{ '--d': '320ms' }}>
            <div>
              <dt>Rated by customers</dt>
              <dd>
                4.9
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-label="stars" role="img"><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3 6.1 20.6l1.3-6.6L2.5 9.4l6.6-.8L12 2.5z" /></svg>
              </dd>
            </div>
            <div>
              <dt>Grooms completed</dt>
              <dd>25,000+</dd>
            </div>
            <div>
              <dt>Utah counties served</dt>
              <dd>{SERVICE_AREAS.length}</dd>
            </div>
          </dl>
        </div>
        <div className="hero-art">
          <DoodleField variant="a" />
          <img src="/MainDog.webp" alt="A freshly groomed dog — Luxe Pups mobile dog grooming in Davis County, Utah" className="hero-dog" width="1280" height="720" fetchPriority="high" />
        </div>
      </section>

      <section className="facts" aria-label="At a glance">
        <ul className="facts-list">
          {FACTS.map(([title, sub]) => (
            <li key={title}>
              <span className="fact-title">{title}</span>
              <span className="fact-sub">{sub}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="why">
        <div className="why-art">
          <DoodleField variant="b" />
          <img src="/MainDog2.webp" alt="A small dog after a mobile groom with Luxe Pups" className="why-dog" width="1280" height="720" loading="lazy" />
        </div>
        <div className="why-copy reveal">
          <DoodleField variant="text" />
          <p className="eyebrow">Why Luxe Pups</p>
          <h2>Dog Grooming for Small Breeds</h2>
          <p className="lead">As small breed specialists, we offer a luxury grooming experience tailored to the unique needs of your dog. Our mobile grooming service brings calming, expert care directly to you — perfect for busy professionals or anyone seeking a higher standard of pet care.</p>
          <div className="actions">
            <Link to="/about" className="btn btn-gold">Meet Steven &amp; Emily</Link>
            <Link to="/services" className="btn btn-line">View Our Services</Link>
          </div>
        </div>
      </section>

      <section className="teaser">
        <div className="wrap">
          <PawTrail className="paw-trail--tr" />
          <header className="sec-head reveal">
            <p className="eyebrow">Services</p>
            <h2>Tailored Grooming for Every Pup</h2>
          </header>
          <ul className="teaser-list">
            {TEASER.map((t, i) => (
              <li key={t.name} className="reveal" style={{ '--d': `${i * 80}ms` }}>
                <h3>{t.name}</h3>
                <p>{t.text}</p>
                <p className="teaser-price"><span>from</span> {t.from}</p>
              </li>
            ))}
          </ul>
          <Link to="/services" className="btn btn-gold btn-xl teaser-cta">See Full Services &amp; Prices <Arrow /></Link>
        </div>
      </section>

      <section className="results">
        <div className="wrap">
          <header className="sec-head sec-head--split reveal">
            <div>
              <p className="eyebrow">Results</p>
              <h2>Before &amp; After</h2>
            </div>
            <p className="sec-lede">See the Luxe Pups difference firsthand.</p>
          </header>
          <div className="results-grid">
            <div className="reveal"><BeforeAfterSlider beforeSrc="/BeforeBrownDog.jpeg" afterSrc="/AfterBrownDog.jpeg" breed="Goldendoodle" /></div>
            <div className="reveal" style={{ '--d': '90ms' }}><BeforeAfterSlider beforeSrc="/BeforeGoldDog.jpeg" afterSrc="/AfterGoldDog.jpeg" breed="Shih Tzu" /></div>
            <div className="reveal" style={{ '--d': '180ms' }}><BeforeAfterSlider beforeSrc="/BeforeWhiteDog.webp" afterSrc="/AfterWhiteDog.webp" breed="Maltese" /></div>
          </div>
        </div>
      </section>

      <section className="reviews">
        <div className="wrap">
          <PawTrail className="paw-trail--bl" />
          <header className="sec-head sec-head--split reveal">
            <div>
              <p className="eyebrow">Reviews</p>
              <h2>What Our Clients Say</h2>
            </div>
            <p className="sec-lede">Our expertise, compassion, and attention to detail have earned us lasting relationships with clients across Utah.</p>
          </header>
          <div className="reviews-layout">
            <figure className="reviews-art reveal">
              <img src="/ReviewDog.jpg" alt="A painting of a beagle clutching a cookie jar" width="495" height="619" loading="lazy" />
            </figure>
            <div className="reviews-grid">
              {REVIEWS.map((r) => (
                <figure key={r.name} className={`review reveal${r.featured ? ' review--lead' : ''}`}>
                  <div className="paws" role="img" aria-label="5 out of 5 paws">
                    {[0, 1, 2, 3, 4].map((i) => <Paw key={i} size={r.featured ? 18 : 15} />)}
                  </div>
                  <blockquote>“{r.text}”</blockquote>
                  <figcaption>
                    <span className="review-name">{r.name}</span>
                    <span className="review-tag">Verified Client</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
