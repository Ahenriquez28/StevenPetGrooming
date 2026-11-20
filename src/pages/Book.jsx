import { useState } from 'react'
import { STEPS } from '../data'
import { PHONE_DISPLAY, PHONE_TEL } from '../serviceAreas'

const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:8787' : 'https://api.luxepupsutah.com')

export default function Book() {
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [formError, setFormError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})

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
          ? `We couldn't reach our booking system. Please try again, or call ${PHONE_DISPLAY}.`
          : `${err.message} Please try again, or call ${PHONE_DISPLAY}.`
      )
    }
  }

  return (
    <section className="booking page">
      <div className="wrap booking-grid">
        <div className="booking-intro">
          <p className="eyebrow">Reserve Your Spot</p>
          <h1 className="page-title">Book an Appointment</h1>
          <p className="deposit"><strong>$40 deposit required to confirm your booking.</strong> This amount is applied toward your final service total. The remaining balance is due at time of service.</p>
          <p className="booking-call">Prefer to talk? Call <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a></p>
          <ol className="mini-steps" aria-label="How booking works">
            {STEPS.map(([title, text], i) => (
              <li key={title}>
                <span className="mini-num" aria-hidden="true">{i + 1}</span>
                <div><strong>{title}</strong><span>{text}</span></div>
              </li>
            ))}
          </ol>
        </div>

        <div className="booking-form">
          {status === 'success' ? (
            <div className="form-success" role="status">
              <h2 className="h3">Request received</h2>
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
                  <input id="date" name="preferredDate" type="date" min={new Date().toISOString().slice(0, 10)} suppressHydrationWarning />
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
      </div>
    </section>
  )
}
