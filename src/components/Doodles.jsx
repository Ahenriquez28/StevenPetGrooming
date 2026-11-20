// Fine-line, luxury-feel doodles for the peach photo panels: hairline gold and brown strokes,
// no fills or thick outlines. A crown nods to the logo; rings echo its gold + dotted frame.
// Decorative only: aria-hidden, no pointer events.

const GOLD = '#B8923A'
const BROWN = '#6B4C38'
const INK = '#3D2B1F'

// shared stroke style: stays ~1.4px at any size
const line = (color, w = 1.4) => ({
  fill: 'none', stroke: color, strokeWidth: w, strokeLinecap: 'round', strokeLinejoin: 'round', vectorEffect: 'non-scaling-stroke',
})

const SHAPES = {
  sparkle: () => (
    <path d="M32 4C33.5 22 42 30.5 60 32 42 33.5 33.5 42 32 60 30.5 42 22 33.5 4 32 22 30.5 30.5 22 32 4Z" {...line(GOLD, 1.5)} />
  ),

  crown: () => (
    <g {...line(GOLD, 1.5)}>
      <path d="M10 44 8 22l14 12 10-20 10 20 14-12-2 22Z" />
      <path d="M10 51h44" />
      <circle cx="8" cy="20" r="1.8" fill={GOLD} />
      <circle cx="32" cy="12" r="1.8" fill={GOLD} />
      <circle cx="56" cy="20" r="1.8" fill={GOLD} />
    </g>
  ),

  gem: () => (
    <g {...line(GOLD, 1.4)}>
      <path d="M16 22 24 12h16l8 10-16 32Z" />
      <path d="M16 22h32M24 12l8 10 8-10M32 22v32" />
    </g>
  ),

  scissors: () => (
    <g {...line(BROWN, 1.4)}>
      <circle cx="20" cy="48" r="7" />
      <circle cx="44" cy="48" r="7" />
      <path d="M24 42 46 8M40 42 18 8" />
    </g>
  ),

  comb: () => (
    <g {...line(BROWN, 1.4)}>
      <rect x="8" y="14" width="48" height="13" rx="4" />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <path key={i} d={`M${13 + i * 4.75} 27v${i % 2 ? 15 : 19}`} />
      ))}
    </g>
  ),

  brush: () => (
    <g {...line(BROWN, 1.4)}>
      <rect x="11" y="8" width="42" height="24" rx="9" />
      <rect x="27" y="32" width="10" height="23" rx="5" />
      {[0, 1, 2, 3].map((i) => <circle key={`a${i}`} cx={21 + i * 7.3} cy="16.5" r="1" fill={BROWN} stroke="none" />)}
      {[0, 1, 2, 3].map((i) => <circle key={`b${i}`} cx={21 + i * 7.3} cy="24" r="1" fill={BROWN} stroke="none" />)}
    </g>
  ),

  bubbles: () => (
    <g {...line(BROWN, 1.3)}>
      <circle cx="22" cy="40" r="14" />
      <circle cx="46" cy="21" r="9" />
      <circle cx="48" cy="49" r="5" />
      <path d="M13 35a10 10 0 0 1 6-6.5M42 17a6 6 0 0 1 4-2.5" stroke={GOLD} />
    </g>
  ),

  drop: () => (
    <g {...line(GOLD, 1.4)}>
      <path d="M32 7C23 21 17 29 17 39a15 15 0 0 0 30 0c0-10-6-18-15-32Z" />
      <path d="M25 40a8 8 0 0 0 5 8" />
    </g>
  ),

  // gold ring + dotted inner ring, like the logo's frame
  ring: () => (
    <g fill="none" stroke={GOLD} vectorEffect="non-scaling-stroke">
      <circle cx="32" cy="32" r="31" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
      <circle cx="32" cy="32" r="28" strokeWidth="1.2" strokeDasharray="0.1 3.2" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
    </g>
  ),

  paw: () => (
    <g fill={INK}>
      <ellipse cx="32" cy="42" rx="14" ry="12" />
      <ellipse cx="16" cy="26" rx="5.5" ry="7" />
      <ellipse cx="26" cy="19" rx="5.5" ry="7" />
      <ellipse cx="38" cy="19" rx="5.5" ry="7" />
      <ellipse cx="48" cy="26" rx="5.5" ry="7" />
    </g>
  ),
}

function Doodle({ kind, style, className = '' }) {
  return (
    <svg className={`doodle ${className}`} viewBox="0 0 64 64" style={style} aria-hidden="true" focusable="false">
      {SHAPES[kind]()}
    </svg>
  )
}

// positions are percentages of the panel; w is the doodle width, r its tilt, t its drift time
const FIELDS = {
  // poodle panel
  a: [
    { k: 'ring', top: '5%', left: '5%', w: '90cqw', r: 0, t: 0, still: true, soft: true },
    { k: 'sparkle', top: '10%', left: '10%', w: '6cqw', r: -6, t: 9 },
    { k: 'crown', top: '8%', right: '9%', w: '9cqw', r: 10, t: 10 },
    { k: 'sparkle', top: '30%', right: '8%', w: '3.6cqw', r: 8, t: 8 },
    { k: 'scissors', top: '44%', left: '5%', w: '9cqw', r: -32, t: 11 },
    { k: 'bubbles', bottom: '12%', left: '8%', w: '10cqw', r: -4, t: 10 },
    { k: 'comb', bottom: '17%', right: '6%', w: '9cqw', r: 18, t: 9 },
    { k: 'gem', top: '58%', right: '5%', w: '5cqw', r: 12, t: 8, hide: true },
  ],
  // gray-and-white dog panel
  b: [
    { k: 'ring', top: '4%', left: '6%', w: '88cqw', r: 0, t: 0, still: true, soft: true },
    { k: 'crown', top: '7%', left: '9%', w: '9cqw', r: -10, t: 10 },
    { k: 'sparkle', top: '12%', right: '10%', w: '6cqw', r: 8, t: 9 },
    { k: 'brush', top: '40%', right: '5%', w: '9cqw', r: 24, t: 11 },
    { k: 'sparkle', top: '36%', left: '8%', w: '3.6cqw', r: -8, t: 8 },
    { k: 'gem', bottom: '22%', left: '7%', w: '6cqw', r: -10, t: 9 },
    { k: 'drop', bottom: '14%', right: '8%', w: '5.5cqw', r: 10, t: 10 },
    { k: 'bubbles', top: '56%', left: '5%', w: '8cqw', r: -6, t: 10, hide: true },
  ],
  // The three below sit behind white text areas: plain static light-gray paws only.
  // empty left margin of the hero on wide screens
  left: [
    { k: 'paw', top: '8%', left: '3%', w: '3vw', r: -16 },
    { k: 'paw', top: '24%', left: '10%', w: '2.4vw', r: 18 },
    { k: 'paw', top: '40%', left: '3%', w: '3.2vw', r: -8 },
    { k: 'paw', top: '56%', left: '11%', w: '2.6vw', r: 24 },
    { k: 'paw', top: '72%', left: '4%', w: '3vw', r: -20 },
    { k: 'paw', bottom: '6%', left: '12%', w: '2.4vw', r: 12 },
  ],
  // beside the hero heading
  copy: [
    { k: 'paw', top: '4%', left: '30%', w: '2.4vw', r: 14 },
    { k: 'paw', top: '6%', right: '4%', w: '3.4vw', r: 18 },
    { k: 'paw', top: '22%', right: '2%', w: '2.4vw', r: -14 },
    { k: 'paw', bottom: '4%', left: '42%', w: '2.6vw', r: -18 },
    { k: 'paw', bottom: '10%', right: '14%', w: '3vw', r: 10 },
    { k: 'paw', bottom: '30%', right: '3%', w: '2.4vw', r: -22 },
  ],
  // right-hand margin beside the "Why Luxe Pups" text
  text: [
    { k: 'paw', top: '6%', right: '5%', w: '4vw', r: 16 },
    { k: 'paw', top: '5%', left: '56%', w: '2.2vw', r: -12 },
    { k: 'paw', top: '24%', right: '3%', w: '2.8vw', r: -18 },
    { k: 'paw', top: '44%', right: '9%', w: '3.4vw', r: 22 },
    { k: 'paw', top: '62%', right: '3%', w: '2.6vw', r: -10 },
    { k: 'paw', bottom: '16%', right: '12%', w: '3.2vw', r: 14 },
    { k: 'paw', bottom: '5%', right: '4%', w: '3.6vw', r: -20 },
    { k: 'paw', bottom: '5%', left: '42%', w: '2.4vw', r: 18 },
  ],
}

export function DoodleField({ variant = 'a' }) {
  return (
    <div className={`doodle-field doodle-field--${variant}${variant === 'a' || variant === 'b' ? '' : ' doodle-field--static'}`} aria-hidden="true">
      {FIELDS[variant].map((d, i) => (
        <Doodle
          key={i}
          kind={d.k}
          className={`${d.faint ? 'doodle--faint' : ''}${d.still ? ' doodle--still' : ''}${d.soft ? ' doodle--soft' : ''}${d.hide ? ' doodle--hide' : ''}`}
          style={{ top: d.top, bottom: d.bottom, left: d.left, right: d.right, '--w': d.w, '--r': `${d.r}deg`, '--t': `${d.t}s` }}
        />
      ))}
    </div>
  )
}
