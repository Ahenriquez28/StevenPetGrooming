import { useState, useRef, useCallback } from 'react'

// Before/after reveal. The "before" photo sits on top and is clipped from the
// right, so dragging right shows more of the original coat.
export default function BeforeAfterSlider({ beforeSrc, afterSrc, breed, caption = true }) {
  const [pos, setPos] = useState(50)
  const [touched, setTouched] = useState(false)
  const cardRef = useRef(null)

  const update = useCallback((clientX) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const pct = ((clientX - rect.left) / rect.width) * 100
    setPos(Math.min(100, Math.max(0, pct)))
  }, [])

  // Pointer events cover mouse, touch and pen. touch-action: pan-y in the CSS
  // lets the page keep scrolling vertically while a horizontal drag moves the slider.
  const onPointerDown = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    setTouched(true)
    update(e.clientX)
  }
  const onPointerMove = (e) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) update(e.clientX)
  }

  const onKeyDown = (e) => {
    const step = e.shiftKey ? 10 : 2
    if (e.key === 'ArrowLeft') setPos((p) => Math.max(0, p - step))
    else if (e.key === 'ArrowRight') setPos((p) => Math.min(100, p + step))
    else if (e.key === 'Home') setPos(0)
    else if (e.key === 'End') setPos(100)
    else return
    setTouched(true)
    e.preventDefault()
  }

  return (
    <figure className="ba">
      <div
        className="ba-card"
        ref={cardRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
      >
        <img src={afterSrc} alt="" className="ba-img" loading="lazy" draggable="false" />
        <img
          src={beforeSrc}
          alt=""
          className="ba-img"
          loading="lazy"
          draggable="false"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        />
        <span className="ba-tag ba-tag-before">Before</span>
        <span className="ba-tag ba-tag-after">After</span>
        <div
          className="ba-divider"
          style={{ left: `${pos}%` }}
          onKeyDown={onKeyDown}
          tabIndex={0}
          role="slider"
          aria-label={`Before and after comparison${breed ? `, ${breed}` : ''}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          aria-valuetext={`${Math.round(pos)}% before`}
        >
          <span className={`ba-handle${touched ? '' : ' ba-handle--hint'}`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 7l-5 5 5 5" />
              <path d="M15 7l5 5-5 5" />
            </svg>
          </span>
        </div>
      </div>
      {caption && breed && (
        <figcaption className="ba-caption">
          <span className="ba-breed">{breed}</span>
          <span className="ba-hint">Drag to compare</span>
        </figcaption>
      )}
    </figure>
  )
}
