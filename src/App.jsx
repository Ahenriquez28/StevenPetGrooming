import { useState } from 'react'

/*
 * Luxe Pups Grooming — temporary landing page.
 * This is the homepage rendered at the domain root. Build out additional
 * pages/components from here as functionality grows.
 *
 * LOGO: a styled text wordmark is used as a placeholder. To use the real logo,
 * drop the image at  public/logo.png  and swap each <Wordmark .../> below for:
 *     <img src="/logo.png" alt="Luxe Pups Grooming" className="nav-logo-img" />
 *     <img src="/logo.png" alt="Luxe Pups Grooming" className="hero-logo" />
 *     <img src="/logo.png" alt="Luxe Pups Grooming" className="footer-logo" />
 */

function Wordmark({ variant }) {
  const cls =
    variant === 'hero'
      ? 'wordmark hero-wordmark'
      : variant === 'footer'
      ? 'wordmark footer-wordmark'
      : 'wordmark'
  return (
    <span className={cls}>
      <span className="wm-top">Luxe <span>Pups</span></span>
      <span className="wm-sub">Grooming</span>
    </span>
  )
}

export default function App() {
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [booking, setBooking] = useState({
    label: 'Pay $40 Deposit & Confirm Booking →',
    style: {},
  })

  const scrollTo = (e, id) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const formatCard = (value) => {
    const v = value.replace(/\D/g, '').substring(0, 16)
    return v.replace(/(.{4})/g, '$1 ').trim()
  }

  const formatExpiry = (value) => {
    let v = value.replace(/\D/g, '').substring(0, 4)
    if (v.length >= 3) v = v.slice(0, 2) + ' / ' + v.slice(2)
    return v
  }

  const handleBooking = () => {
    setBooking({ label: '⏳ Processing...', style: { opacity: 0.8 } })
    setTimeout(() => {
      setBooking({
        label: "✅ Booking Confirmed! We'll be in touch shortly.",
        style: { background: 'linear-gradient(135deg, #8FA89A, #a8c4b8)' },
      })
    }, 1800)
  }

  return (
    <>
      {/* NAV */}
      <nav>
        <a href="#" onClick={(e) => scrollTo(e, '')} aria-label="Luxe Pups Grooming home">
          <Wordmark />
        </a>
        <ul>
          <li><a href="#services" onClick={(e) => scrollTo(e, 'services')}>Services</a></li>
          <li><a href="#how" onClick={(e) => scrollTo(e, 'how')}>How It Works</a></li>
          <li><a href="#booking" className="nav-cta" onClick={(e) => scrollTo(e, 'booking')}>Book Now</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-paw">🐾</div>
        <div className="hero-content">
          <Wordmark variant="hero" />
          <div className="hero-badge">✨ We Come To You</div>
          <h1>Premium Grooming <em>At Your Door.</em></h1>
          <p>Luxe Pups Grooming brings a 5-star salon experience straight to your driveway. Stress-free for your pup, effortless for you.</p>
          <div className="hero-actions">
            <a href="#booking" className="btn-primary" onClick={(e) => scrollTo(e, 'booking')}>Book an Appointment</a>
            <a href="#services" className="btn-outline" onClick={(e) => scrollTo(e, 'services')}>See Services</a>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <div className="trust-strip">
        <div className="trust-item"><span className="icon">🐕</span> Professional Groomers</div>
        <div className="trust-item"><span className="icon">🚐</span> Fully Equipped Mobile Van</div>
        <div className="trust-item"><span className="icon">🔒</span> Secure $40 Deposit to Book</div>
        <div className="trust-item"><span className="icon">💳</span> Debit &amp; Credit Accepted</div>
        <div className="trust-item"><span className="icon">⭐</span> 5-Star Rated</div>
      </div>

      {/* SERVICES */}
      <section className="services" id="services">
        <div className="section-header">
          <p className="section-tag">Our Services</p>
          <h2>Tailored Grooming for Every Pup</h2>
        </div>
        <div className="services-grid">
          <div className="service-card">
            <span className="service-icon">🛁</span>
            <h3>Luxury Spa Bath</h3>
            <p>Full shampoo &amp; conditioner treatment, blow-dry, brush-out, ear cleaning, and nail trim.</p>
            <div className="price-table">
              <div className="price-row"><span className="size-label">XS <em>1–15 lbs</em></span><span className="size-price">$65</span></div>
              <div className="price-row"><span className="size-label">S <em>16–30 lbs</em></span><span className="size-price">$70</span></div>
              <div className="price-row"><span className="size-label">M <em>31–45 lbs</em></span><span className="size-price">$75</span></div>
              <div className="price-row"><span className="size-label">L <em>46–70 lbs</em></span><span className="size-price">$80</span></div>
              <div className="price-row"><span className="size-label">XL <em>71–90 lbs</em></span><span className="size-price">$85</span></div>
              <div className="price-row"><span className="size-label">XXL <em>91+ lbs</em></span><span className="size-price">$95</span></div>
            </div>
          </div>
          <div className="service-card">
            <span className="service-icon">✂️</span>
            <h3>The Luxe Groom</h3>
            <p>Everything in Bath &amp; Brush plus a breed-specific haircut, styling, and finishing spritz.</p>
            <div className="service-price">From $95 <span>/ session</span></div>
          </div>
          <div className="service-card">
            <span className="service-icon">💅</span>
            <h3>Puppy's First Groom</h3>
            <p>A gentle intro grooming experience designed to make your pup feel safe and comfortable.</p>
            <div className="service-price">From $55 <span>/ session</span></div>
          </div>
          <div className="service-card">
            <span className="service-icon">👑</span>
            <h3>Luxe Package</h3>
            <p>The full works — deep conditioning, teeth brushing, paw balm, bandana, and a treat bag.</p>
            <div className="service-price">From $130 <span>/ session</span></div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-it-works" id="how">
        <div className="how-inner">
          <div className="section-header">
            <p className="section-tag">The Process</p>
            <h2>Simple Booking in 4 Steps</h2>
          </div>
          <div className="steps">
            <div className="step">
              <div className="step-num">1</div>
              <h4>Book Online</h4>
              <p>Fill out the form and choose your service and time.</p>
            </div>
            <div className="step">
              <div className="step-num">2</div>
              <h4>Pay $40 Deposit</h4>
              <p>Secure your appointment with a quick card payment.</p>
            </div>
            <div className="step">
              <div className="step-num">3</div>
              <h4>We Arrive</h4>
              <p>Our groomer pulls up in the fully-equipped van right to your address.</p>
            </div>
            <div className="step">
              <div className="step-num">4</div>
              <h4>Enjoy!</h4>
              <p>Pick up your freshly groomed pup and pay the remaining balance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* BOOKING FORM */}
      <section className="booking" id="booking">
        <div className="booking-card">
          <div className="section-header">
            <p className="section-tag">Reserve Your Spot</p>
            <h2>Book an Appointment</h2>
          </div>

          <div className="deposit-notice">
            <span className="icon">🔒</span>
            <p><strong>$40 deposit required to confirm your booking.</strong> This amount is applied toward your final service total. The remaining balance is due at time of service.</p>
          </div>

          {/* PET & OWNER INFO */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="ownerName">Your Name</label>
              <input id="ownerName" type="text" placeholder="Jane Smith" />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input id="phone" type="tel" placeholder="(555) 000-0000" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input id="email" type="email" placeholder="jane@email.com" />
          </div>
          <div className="form-group">
            <label htmlFor="address">Service Address</label>
            <input id="address" type="text" placeholder="123 Main St, Your City, State ZIP" />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="dogName">Dog's Name</label>
              <input id="dogName" type="text" placeholder="Biscuit" />
            </div>
            <div className="form-group">
              <label htmlFor="breed">Breed</label>
              <input id="breed" type="text" placeholder="Golden Retriever" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="service">Service</label>
              <select id="service">
                <option>Bath &amp; Brush — from $65</option>
                <option>Full Groom — from $95</option>
                <option>Puppy's First Groom — from $55</option>
                <option>Luxe Package — from $130</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="date">Preferred Date</label>
              <input id="date" type="date" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="notes">Notes (optional)</label>
            <textarea id="notes" placeholder="Allergies, behavior notes, special requests..."></textarea>
          </div>

          {/* PAYMENT */}
          <div className="payment-section">
            <h3>Payment Details</h3>

            <div className="card-icons">
              <div className="card-icon">💳 Visa</div>
              <div className="card-icon">💳 Mastercard</div>
              <div className="card-icon">💳 Amex</div>
              <div className="card-icon">🏦 Debit</div>
              <div className="card-icon">💳 Discover</div>
            </div>

            <div className="form-group">
              <label htmlFor="cardName">Name on Card</label>
              <input id="cardName" type="text" placeholder="Jane Smith" />
            </div>
            <div className="form-group card-input-wrap">
              <label htmlFor="cardNumber">Card Number</label>
              <input
                id="cardNumber"
                type="text"
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCard(e.target.value))}
              />
              <span className="card-icon-overlay">💳</span>
            </div>
            <div className="expiry-cvv">
              <div className="form-group">
                <label htmlFor="expiry">Expiry Date</label>
                <input
                  id="expiry"
                  type="text"
                  placeholder="MM / YY"
                  maxLength={7}
                  value={expiry}
                  onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                />
              </div>
              <div className="form-group">
                <label htmlFor="cvv">CVV</label>
                <input id="cvv" type="text" placeholder="123" maxLength={4} />
              </div>
            </div>
            <div className="secure-note">🔐 Your payment info is encrypted and secure.</div>
          </div>

          {/* TOTAL */}
          <div className="deposit-total">
            <span>Deposit Due Today</span>
            <strong>$40.00</strong>
          </div>

          <button className="submit-btn" style={booking.style} onClick={handleBooking}>
            {booking.label}
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <Wordmark variant="footer" />
        <p>
          📍 Serving your area &nbsp;|&nbsp; 📞 <a href="tel:5550001234">(555) 000-1234</a> &nbsp;|&nbsp; ✉️ <a href="mailto:hello@luxepupsgrooming.com">hello@luxepupsgrooming.com</a>
        </p>
        <p style={{ marginTop: '14px' }}>© 2026 Luxe Pups Grooming. All rights reserved.</p>
      </footer>
    </>
  )
}
