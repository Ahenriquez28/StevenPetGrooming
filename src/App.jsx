import { useState } from 'react'
import BeforeAfterSlider from './components/BeforeAfterSlider'

export default function App() {
  const [submitted, setSubmitted] = useState(false)

  const scrollTo = (e, id) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }


  return (
    <>
      {/* NAV */}
      <nav>
        <a href="#" onClick={(e) => scrollTo(e, '')} className="nav-logo-link" aria-label="Luxe Pups Grooming home">
          <img src="/Logo.png" alt="Luxe Pups Grooming" className="nav-logo-img" />
        </a>
        <ul>
          <li><a href="#services" onClick={(e) => scrollTo(e, 'services')}>Services</a></li>
          <li><a href="#how" onClick={(e) => scrollTo(e, 'how')}>How It Works</a></li>
          <li><a href="#booking" className="nav-cta" onClick={(e) => scrollTo(e, 'booking')}>Book Now</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg-paws" aria-hidden="true">
          <span>🐾</span>
          <span>🐾</span>
          <span>🐾</span>
        </div>
        <div className="hero-left">
          <div className="hero-paw-watermark" aria-hidden="true">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="var(--brown)">
              <ellipse cx="50" cy="65" rx="25" ry="22" />
              <ellipse cx="28" cy="42" rx="9" ry="11" />
              <ellipse cx="44" cy="36" rx="9" ry="11" />
              <ellipse cx="60" cy="36" rx="9" ry="11" />
              <ellipse cx="74" cy="42" rx="9" ry="11" />
            </svg>
          </div>
          <h1>
            Premium Grooming<br />
            <em>At Your Door.</em>
          </h1>
          <p>Luxe Pups Grooming brings a 5-star salon experience straight to your driveway. Stress-free for your pup, effortless for you.</p>
          <div className="hero-actions">
            <a href="#booking" className="btn-primary" onClick={(e) => scrollTo(e, 'booking')}>Book an Appointment</a>
            <a href="#services" className="btn-outline" onClick={(e) => scrollTo(e, 'services')}>See Services</a>
          </div>
        </div>
        <div className="hero-right">
          <img src="/MainDog.png" alt="Groomed dog" className="hero-dog-img" />
        </div>
      </section>

      {/* SECTION 2 — Dog Grooming for Small Breeds */}
      <section className="about-split">
        <div className="about-img-col">
          <div className="about-img-paws" aria-hidden="true">
            <span>🐾</span>
            <span>🐾</span>
            <span>🐾</span>
            <span>🐾</span>
            <span>🐾</span>
            <span>🐾</span>
            <span>🐾</span>
          </div>
          <img src="/MainDog2.png" alt="Small breed dog grooming" className="about-img" />
        </div>
        <div className="about-text-col">
          <p className="eyebrow">WHY LUXE PUPS</p>
          <h2>Dog Grooming for Small Breeds</h2>
          <p>As small breed specialists, we offer a luxury grooming experience tailored to the unique needs of your dog. Our mobile grooming service brings calming, expert care directly to you — perfect for busy professionals or anyone seeking a higher standard of pet care.</p>
          <p>Trusted by local veterinarians and discerning dog owners alike, our groomers are known for their gentle approach, breed-specific knowledge, and unwavering attention to detail. We understand that small dogs thrive on familiarity and routine, which is why we prioritize personalized service in the comfort of your own home.</p>
          <p>Every session is designed for comfort, safety, and style, ensuring your pup receives the same level of care you would expect from a luxury spa.</p>
          <div className="about-actions">
            <a href="#services" className="btn-gold" onClick={(e) => scrollTo(e, 'services')}>View Our Services</a>
            <a href="#booking" className="btn-outline-brown" onClick={(e) => scrollTo(e, 'booking')}>Book an Appointment</a>
          </div>
        </div>
      </section>

      {/* SECTION 3 — Before & After Slider */}
      <section className="ba-section">
        <div className="section-header">
          <p className="eyebrow">RESULTS</p>
          <h2>Before &amp; After</h2>
          <p className="section-sub">See the Luxe Pups difference firsthand.</p>
        </div>
        <div className="ba-grid">
          <BeforeAfterSlider beforeSrc="/BeforeBrownDog.jpeg" afterSrc="/AfterBrownDog.jpeg" breed="Goldendoodle" />
          <BeforeAfterSlider beforeSrc="/BeforeGoldDog.jpeg" afterSrc="/AfterGoldDog.jpeg" breed="Shih Tzu" />
          <BeforeAfterSlider beforeSrc="/BeforeWhiteDog.png" afterSrc="/AfterWhiteDog.png" breed="Maltese" />
        </div>
      </section>

      {/* SECTION 4 — Services & Pricing */}
      <section className="services" id="services">
        <div className="section-header">
          <p className="eyebrow">SERVICES</p>
          <h2>Tailored Grooming for Every Pup</h2>
        </div>
        <div className="services-grid">
          <div className="service-card">
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
            <h3>Luxe Touch Up</h3>
            <p>A quick freshen-up between full grooms. Includes brush-out, nail trim, ear cleaning, and a spritz.</p>
            <div className="service-price">From $45 <span>/ session</span></div>
          </div>
          <div className="service-card">
            <h3>The Luxe Groom</h3>
            <p>Everything in the Spa Bath plus a breed-specific haircut and styling.</p>
            <div className="service-price">From $95 <span>/ session</span></div>
          </div>
          <div className="service-card">
            <h3>DeLuxe Groom Package</h3>
            <p>The full works — deep conditioning, teeth brushing, paw balm, bandana, and a treat bag.</p>
            <div className="service-price">From $130 <span>/ session</span></div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — For All Breeds */}
      <section className="all-breeds">
        <div className="all-breeds-split">
          <div className="all-breeds-img-col">
            <BeforeAfterSlider beforeSrc="/BeforeBrownDog.jpeg" afterSrc="/AfterBrownDog.jpeg" breed="Goldendoodle" />
          </div>
          <div className="all-breeds-text-col">
            <p className="eyebrow">ALL BREEDS WELCOME</p>
            <h2>Expert Care for Every Dog</h2>
            <p>While we specialize in small breeds, our experienced groomers are trained to handle dogs of all sizes and coat types. From fluffy Poodles to scruffy Terriers, every pup gets the Luxe treatment.</p>
            <a href="#booking" className="btn-primary" onClick={(e) => scrollTo(e, 'booking')}>Book an Appointment</a>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="reviews">
        <div className="reviews-inner">
          <div className="section-header reviews-header">
            <p className="eyebrow">REVIEWS</p>
            <h2>What Our Clients Say</h2>
            <p className="section-sub">Our expertise, compassion, and attention to detail have earned us lasting relationships with clients across Utah.</p>
          </div>
          <div className="reviews-grid">
            <div className="review-card">
              <div className="review-paws">🐾🐾🐾🐾🐾</div>
              <p className="review-text">"Wanda was love at first sight — not just for me but Osso and Luna both got totally smitten. She is so joyful, engaged, and professional. It was above and beyond my expectations."</p>
              <div className="review-author">
                <span className="review-name">Alexandra</span>
                <span className="review-verified">Verified Client</span>
              </div>
            </div>
            <div className="review-card review-card--featured">
              <div className="review-paws">🐾🐾🐾🐾🐾</div>
              <p className="review-text">"Luxury Groomer is the best thing that happened to our maltepoo Bean. She loves the comfort of at-home grooming sessions, no stress involved, and she looks more chic than ever. Stylist Ani has great taste and Bean adores her."</p>
              <div className="review-author">
                <span className="review-name">Anna</span>
                <span className="review-verified">Verified Client</span>
              </div>
            </div>
            <div className="review-card">
              <div className="review-paws">🐾🐾🐾🐾🐾</div>
              <p className="review-text">"Our experience with Wanda was amazing. She went above and beyond. Luxe Pups really made a difference for us and more importantly for Dewey."</p>
              <div className="review-author">
                <span className="review-name">Greg</span>
                <span className="review-verified">Verified Client</span>
              </div>
            </div>
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
          <div className="section-header booking-header">
            <p className="section-tag">Reserve Your Spot</p>
            <h2>Book an Appointment</h2>
          </div>

          <div className="deposit-notice">
            <p><strong>$40 deposit required to confirm your booking.</strong> This amount is applied toward your final service total. The remaining balance is due at time of service.</p>
          </div>

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
              <label htmlFor="dogBreed">Breed</label>
              <input id="dogBreed" type="text" placeholder="Golden Retriever" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="service">Service</label>
              <select id="service">
                <option>Luxury Spa Bath — from $65</option>
                <option>Luxe Touch Up — from $45</option>
                <option>The Luxe Groom — from $95</option>
                <option>DeLuxe Groom Package — from $130</option>
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

          <button
            className="submit-btn"
            onClick={() => setSubmitted(true)}
            disabled={submitted}
          >
            {submitted ? 'Submitted!' : 'Submit'}
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="footer-logo-wrap">
              <img src="/Logo.png" alt="Luxe Pups Grooming" className="footer-logo" />
            </div>
            <p className="footer-tagline">Utah In-home Mobile Dog Groomer</p>
            <p className="footer-desc">Luxe Pups is a mobile in-home grooming service serving Utah. We are small dog breed specialists.</p>
            <div className="footer-socials">
              <a href="#" aria-label="Facebook" className="footer-social-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
                <span>Facebook</span>
              </a>
              <a href="#" aria-label="Instagram" className="footer-social-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
                <span>Instagram</span>
              </a>
              <a href="#" aria-label="Twitter / X" className="footer-social-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span>Twitter</span>
              </a>
              <a href="#" aria-label="YouTube" className="footer-social-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                  <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="black" />
                </svg>
                <span>YouTube</span>
              </a>
              <a href="#" aria-label="TikTok" className="footer-social-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.77a4.85 4.85 0 0 1-1.01-.08z" />
                </svg>
                <span>TikTok</span>
              </a>
            </div>
            <a href="tel:3476992293" className="footer-phone">(347) 699-2293</a>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#services" onClick={(e) => scrollTo(e, 'services')}>Grooming Services</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Press</a></li>
              <li><a href="#">Podcast</a></li>
              <li><a href="#">Before &amp; After Gallery</a></li>
              <li><a href="#booking" onClick={(e) => scrollTo(e, 'booking')}>Book Appointment</a></li>
              <li><a href="#">Disclaimer</a></li>
            </ul>
          </div>

          <div className="footer-hours">
            <h4>Hours of Operation</h4>
            <ul>
              <li><span>Sunday</span><span>10AM – 6PM</span></li>
              <li><span>Monday</span><span>10AM – 6PM</span></li>
              <li><span>Tuesday</span><span>10AM – 6PM</span></li>
              <li><span>Wednesday</span><span>10AM – 6PM</span></li>
              <li><span>Thursday</span><span>10AM – 6PM</span></li>
              <li><span>Friday</span><span>10AM – 6PM</span></li>
              <li><span>Saturday</span><span>10AM – 6PM</span></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Luxe Pups Grooming. All rights reserved.</p>
          <p>Serving Utah and surrounding areas.</p>
        </div>
      </footer>
    </>
  )
}
