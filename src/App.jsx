import { useState } from 'react'
import BeforeAfterSlider from './components/BeforeAfterSlider'

const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:8787' : 'https://api.luxepupsutah.com')

export default function App() {
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [formError, setFormError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const [page, setPage] = useState('home')

  const showPage = (e, next) => {
    e.preventDefault()
    setPage(next)
    window.scrollTo(0, 0)
  }

  const submitBooking = async (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget))
    const errors = {}
    if (!data.name.trim()) errors.name = 'Please enter your name.'
    if (!data.phone.trim()) errors.phone = 'Please enter a phone number.'
    if (!/^\S+@\S+\.\S+$/.test(data.email.trim())) errors.email = 'Please enter a valid email address.'
    setFieldErrors(errors)
    if (Object.keys(errors).length) {
      document.getElementById(Object.keys(errors)[0] === 'name' ? 'ownerName' : Object.keys(errors)[0])?.focus()
      return
    }
    setStatus('sending')
    setFormError('')
    try {
      const res = await fetch(`${API_URL}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, preferredDate: data.preferredDate || null }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || 'Something went wrong.')
      }
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setFormError(
        err instanceof TypeError
          ? "We couldn't reach our booking system. Please try again, or call (201) 978-7960."
          : `${err.message} Please try again, or call (201) 978-7960.`
      )
    }
  }

  const scrollTo = (e, id) => {
    e.preventDefault()
    if (page !== 'home') {
      setPage('home')
      setTimeout(() => document.getElementById(id)?.scrollIntoView(), 0)
      return
    }
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
          <li><a href="#about" onClick={(e) => showPage(e, 'about')}>About Us</a></li>
          <li><a href="#services" onClick={(e) => scrollTo(e, 'services')}>Services</a></li>
          <li><a href="#how" onClick={(e) => scrollTo(e, 'how')}>How It Works</a></li>
          <li><a href="#booking" className="nav-cta" onClick={(e) => scrollTo(e, 'booking')}>Book Now</a></li>
        </ul>
      </nav>

      {page === 'about' ? (
        <>
        <section className="team about-page" id="about">
          <div className="section-header">
            <p className="eyebrow">MEET THE OWNERS</p>
            <h2>The Hands Behind Every Groom</h2>
          </div>
          <div className="team-grid">
            <div className="team-card">
              <h3>Steven</h3>
              <p className="team-role">Owner &amp; Groomer</p>
              <p>Hi, I'm Steven! I'm the proud owner and groomer behind Luxe Pups Grooming.</p>
              <p>My love for dogs has always been a huge part of who I am. Over the years, I've had the opportunity to work with so many different pups, personalities, and breeds, and every one of them has taught me something new.</p>
              <p>Grooming became more than just a career for me — it became something I genuinely love. I enjoy getting to know each dog individually, earning their trust, and seeing the transformation not only on the outside, but in how happy and comfortable they feel afterward.</p>
              <p>I started Luxe Pups Grooming because I wanted to create a grooming experience that feels more personal. Instead of your pup spending hours in a busy salon, I bring the salon directly to you and focus on one pup at a time. My goal is for every dog to feel safe, relaxed, and truly cared for.</p>
              <p>When your pup is with me, I treat them the way I would want my own dogs to be treated — with patience, kindness, and plenty of love.</p>
              <p className="team-signoff">Thank you for trusting me with one of the most important members of your family. I can't wait to meet you and your pup!</p>
            </div>
            <div className="team-card">
              <h3>Emily</h3>
              <p className="team-role">Co-Owner &amp; Pet Stylist</p>
              <p>Hi, I'm Emily, a passionate pet stylist who has always believed that our pets are more than just animals — they're family.</p>
              <p>Grooming is something I truly love because it gives me the opportunity to help pets look and feel their best while creating a safe, calm, and loving experience for them. I understand that every pet has their own personality, needs, and comfort level, and I take the time to treat each one with patience, kindness, and care.</p>
              <p>My goal is to make every grooming experience as stress-free and positive as possible, while giving pet parents peace of mind knowing their furry family members are being cared for with genuine love and attention.</p>
              <p>Starting my own grooming business is a dream I'm incredibly proud to pursue. I hope to build lasting relationships with both pets and their families and create a business that feels welcoming, trustworthy, and centered around the well-being of every pet that walks through my door.</p>
              <p className="team-signoff">Thank you for trusting me with your beloved pets. It truly means the world to me!</p>
            </div>
          </div>
        </section>
        </>
      ) : (
        <>
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
            <p className="eyebrow">SERVICES &amp; PRICING</p>
            <h2>Tailored Grooming for Every Pup</h2>
          </div>

          <div className="pricing-grid">
            <div className="service-card service-card--table">
              <h3>Full Groom</h3>
              <p className="service-includes">Premium bath &amp; conditioner · Blow dry · Brush-out · Haircut &amp; styling · Face trim · Sanitary trim · Paw pads · Nail trim · Ear cleaning · Finishing spray · Bow or bandana</p>
              <div className="price-table">
                <div className="price-row"><span className="size-label">XS <em>0–15 lbs</em></span><span className="size-price">$125</span></div>
                <div className="price-row"><span className="size-label">S <em>16–25 lbs</em></span><span className="size-price">$140</span></div>
                <div className="price-row"><span className="size-label">M <em>26–40 lbs</em></span><span className="size-price">$160</span></div>
                <div className="price-row"><span className="size-label">L <em>41–65 lbs</em></span><span className="size-price">$180</span></div>
                <div className="price-row"><span className="size-label">XL <em>66–80 lbs</em></span><span className="size-price">$200</span></div>
                <div className="price-row"><span className="size-label">XXL <em>81–100+ lbs</em></span><span className="size-price">$225+</span></div>
              </div>
              <p className="price-note">Final pricing may vary based on breed, coat condition, haircut, behavior, and grooming time.</p>
            </div>

            <div className="service-card service-card--table">
              <h3>Bath &amp; Brush</h3>
              <p className="service-includes">Premium shampoo &amp; conditioner · Blow dry · Brush-out · Nail trim · Ear cleaning · Finishing spray</p>
              <div className="price-table">
                <div className="price-row"><span className="size-label">XS <em>0–15 lbs</em></span><span className="size-price">$85</span></div>
                <div className="price-row"><span className="size-label">S <em>16–25 lbs</em></span><span className="size-price">$95</span></div>
                <div className="price-row"><span className="size-label">M <em>26–40 lbs</em></span><span className="size-price">$110</span></div>
                <div className="price-row"><span className="size-label">L <em>41–65 lbs</em></span><span className="size-price">$125</span></div>
                <div className="price-row"><span className="size-label">XL <em>66–80 lbs</em></span><span className="size-price">$140</span></div>
                <div className="price-row"><span className="size-label">XXL <em>81–100+ lbs</em></span><span className="size-price">$155+</span></div>
              </div>
            </div>
          </div>

          <div className="pricing-secondary">
            <div className="service-card">
              <h3>Puppy's First Groom</h3>
              <p className="service-includes">For puppies learning to love the grooming experience.</p>
              <div className="service-price">Starting at $100</div>
              <ul className="service-list">
                <li>Gentle bath</li>
                <li>Blow dry introduction</li>
                <li>Brush-out, face, feet &amp; sanitary trim</li>
                <li>Nail trim &amp; ear cleaning</li>
                <li>Puppy-safe finishing, lots of patience</li>
              </ul>
              <p className="price-note">Pricing based on size, coat, and grooming needs.</p>
            </div>

            <div className="service-card">
              <h3>Luxe Add-Ons</h3>
              <div className="addon-list">
                <div className="addon-row"><span>De-Shedding Treatment</span><span>+$25–$45+</span></div>
                <div className="addon-row"><span>Doodle / Thick Coat Upgrade</span><span>+$20–$50+</span></div>
                <div className="addon-row"><span>Hand Scissoring / Specialty Styling</span><span>+$25–$50+</span></div>
                <div className="addon-row"><span>Light Dematting</span><span>+$20+</span></div>
                <div className="addon-row"><span>Extensive Dematting</span><span>$1 / minute</span></div>
                <div className="addon-row"><span>Nail Grind</span><span>+$10</span></div>
                <div className="addon-row"><span>Teeth Brushing</span><span>+$10</span></div>
                <div className="addon-row"><span>Flea Treatment</span><span>+$25+</span></div>
                <div className="addon-row"><span>Specialty / Medicated Shampoo</span><span>+$15</span></div>
              </div>
            </div>
          </div>

          <div className="spa-section">
            <h3>Luxe Spa Treatments</h3>
            <div className="spa-grid">
              <div className="spa-item">
                <h4>Luxury Shed Control</h4>
                <p>Deep-cleanse shampoo + conditioner + professional de-shedding treatment</p>
                <div className="service-price">Starting at $25</div>
              </div>
              <div className="spa-item">
                <h4>Luxe Facial</h4>
                <p>Gentle facial cleanse to help remove dirt, tear buildup &amp; facial debris</p>
                <div className="service-price">$15</div>
              </div>
              <div className="spa-item">
                <h4>Pawdicure</h4>
                <p>Nail grind + paw pad cleanup + moisturizing paw treatment</p>
                <div className="service-price">$20</div>
              </div>
              <div className="spa-item">
                <h4>Luxe Smile</h4>
                <p>Tooth brushing + fresh breath treatment</p>
                <div className="service-price">$15</div>
              </div>
            </div>
            <div className="spa-package">
              <h4>Full Luxe Package</h4>
              <p>Luxury Shed Control + Luxe Facial + Pawdicure + Luxe Smile</p>
              <div className="service-price">Starting at $55</div>
            </div>
          </div>

          <div className="multi-dog-banner">
            <div>
              <h4>Multi-Dog Household</h4>
              <p>Grooming multiple dogs at the same location?</p>
            </div>
            <div className="multi-dog-save">$10 <span>off each additional dog</span></div>
            <p className="price-note">When two or more dogs are groomed during the same appointment. Discount applies to the lower-priced service(s) and cannot be combined with other promotions.</p>
          </div>

          <div className="policy-grid">
            <div className="policy-card">
              <h4>Mobile Grooming — We Come to You</h4>
              <ul className="check-list">
                <li>No driving across town</li>
                <li>No crowded salons</li>
                <li>No long kennel stays</li>
                <li>No waiting rooms</li>
              </ul>
            </div>
            <div className="policy-card">
              <h4>Coat &amp; Behavior Policy</h4>
              <p>Our prices are based on weight and standard grooming time. Additional charges may apply for:</p>
              <ul className="plain-list">
                <li>Severely matted or impacted coats</li>
                <li>Excessive shedding</li>
                <li>Very long or dense coats</li>
                <li>Extensive hand-scissoring</li>
                <li>Breed-specific styling</li>
                <li>Dogs requiring additional grooming time</li>
                <li>Excessive movement or difficult behavior</li>
                <li>Fleas or other coat-related concerns</li>
              </ul>
              <p className="price-note">Safety comes first. If a coat is severely matted, the safest grooming option may be a shorter haircut. Any additional charges will be discussed with the owner before proceeding whenever possible.</p>
            </div>
          </div>

          <p className="pricing-footnote">Prices are starting prices. Final pricing is determined after evaluating the dog's size, breed, coat condition, behavior, and requested style.</p>
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

            {status === 'success' ? (
              <div className="form-success" role="status">
                <h3>Request received</h3>
                <p>Thanks! We'll contact you shortly to confirm your appointment and collect the $40 deposit. A confirmation has been sent to your email.</p>
              </div>
            ) : (
              <form onSubmit={submitBooking} noValidate>
                <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hp-field" />
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="ownerName">Your Name</label>
                    <input id="ownerName" name="name" type="text" autoComplete="name" placeholder="Jane Smith" required aria-invalid={!!fieldErrors.name} aria-describedby={fieldErrors.name ? 'err-name' : undefined} />
                    {fieldErrors.name && <p className="field-error" id="err-name">{fieldErrors.name}</p>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="(555) 000-0000" required aria-invalid={!!fieldErrors.phone} aria-describedby={fieldErrors.phone ? 'err-phone' : undefined} />
                    {fieldErrors.phone && <p className="field-error" id="err-phone">{fieldErrors.phone}</p>}
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input id="email" name="email" type="email" autoComplete="email" placeholder="jane@email.com" required aria-invalid={!!fieldErrors.email} aria-describedby={fieldErrors.email ? 'err-email' : undefined} />
                  {fieldErrors.email && <p className="field-error" id="err-email">{fieldErrors.email}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="address">Service Address</label>
                  <input id="address" name="address" type="text" autoComplete="street-address" placeholder="123 Main St, Your City, State ZIP" />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="dogName">Dog's Name</label>
                    <input id="dogName" name="dogName" type="text" placeholder="Biscuit" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="dogBreed">Breed</label>
                    <input id="dogBreed" name="dogBreed" type="text" placeholder="Golden Retriever" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="service">Service</label>
                    <select id="service" name="service">
                      <option>Full Groom — from $125</option>
                      <option>Bath &amp; Brush — from $85</option>
                      <option>Puppy's First Groom — from $100</option>
                      <option>Not sure — add notes below</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="date">Preferred Date</label>
                    <input id="date" name="preferredDate" type="date" min={new Date().toISOString().slice(0, 10)} />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="notes">Notes (optional)</label>
                  <textarea id="notes" name="notes" placeholder="Allergies, behavior notes, special requests..."></textarea>
                </div>

                {status === 'error' && <p className="form-error" role="alert">{formError}</p>}

                <button className="submit-btn" type="submit" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending…' : 'Request Appointment'}
                </button>
              </form>
            )}
          </div>
        </section>

        </>
      )}

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
            <a href="tel:2019787960" className="footer-phone">(201) 978-7960</a>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#" onClick={(e) => showPage(e, 'home')}>Home</a></li>
              <li><a href="#about" onClick={(e) => showPage(e, 'about')}>About Us</a></li>
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
