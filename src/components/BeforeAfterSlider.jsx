import { useState, useRef, useCallback } from 'react'

export default function BeforeAfterSlider({ beforeSrc, afterSrc, breed }) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const containerRef = useRef(null)

  const updatePosition = useCallback((clientX) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const pct = Math.min(100, Math.max(0, (x / rect.width) * 100))
    setSliderPosition(pct)
  }, [])

  const onMouseDown = (e) => {
    e.preventDefault()
    const onMove = (e) => updatePosition(e.clientX)
    const onUp = () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }

  const onTouchStart = () => {
    const onMove = (e) => { e.preventDefault(); updatePosition(e.touches[0].clientX) }
    const onEnd = () => {
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('touchend', onEnd)
    }
    window.addEventListener('touchmove', onMove, { passive: false })
    window.addEventListener('touchend', onEnd)
  }

  return (
    <div className="ba-wrapper">
      <div className="ba-card" ref={containerRef}>
        <img src={beforeSrc} alt="Before grooming" className="ba-img" />
        <img
          src={afterSrc}
          alt="After grooming"
          className="ba-img ba-after"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        />
        <div
          className="ba-divider"
          style={{ left: `${sliderPosition}%` }}
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
        >
          <div className="ba-handle">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
              <polyline points="9 18 3 12 9 6" transform="scale(-1,1) translate(-24,0)" />
            </svg>
          </div>
        </div>
        <span className="ba-label ba-label-before">BEFORE</span>
        <span className="ba-label ba-label-after">AFTER</span>
      </div>
      {breed && <p className="ba-breed">{breed}</p>}
    </div>
  )
}
