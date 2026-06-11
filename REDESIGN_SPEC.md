Luxe Pups Grooming — Homepage Redesign Spec

You are rebuilding the homepage (src/App.jsx and src/index.css) of a Vite + React project for a premium mobile dog grooming business called Luxe Pups Grooming. The domain is luxepupsutah.com.


Design Direction


Keep the existing color palette — do not change these CSS variables:


css  --cream: #FAF6F0;
  --warm-white: #FFFDF9;
  --gold: #C9A84C;
  --gold-light: #E8CC7A;
  --brown: #3D2B1F;
  --brown-mid: #6B4C38;
  --blush: #F0D9C8;
  --sage: #8FA89A;
  --text: #2C1F14;


Flat, clean aesthetic — no gradients on backgrounds, no heavy drop shadows, no glassmorphism. Use solid flat colors from the palette above.
No emojis anywhere — replace all emoji icons with clean SVG icons or plain text labels.
No AI-generated feel — avoid generic card grids with identical padding, avoid excessive rounded corners, avoid centered hero text with a subtitle and two buttons as the only layout. Be deliberate and specific.
Typography: Keep Playfair Display for headings and DM Sans for body. Already loaded via Google Fonts in index.html.
All images live in /public/ — reference them as /logo.png, /MainDog.png, /MainDog2.png, and the before/after images described below.



Fonts already in index.html

html<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />


Nav

Keep the existing nav structure:


Logo image on the left: <img src="/logo.png" alt="Luxe Pups Grooming" />
Nav links: Services | How It Works | Book Now (CTA button in gold)
Fixed, transparent background with subtle bottom border



Section 1 — Hero (full viewport height)

Layout: Two-column split. Left column has text, right column has the dog image flush to the right edge.

Left side (text):


Logo image at top: <img src="/logo.png" /> — keep it modest, around 120px tall
Large background paw print watermark text behind the heading (keep from current design, use --brown at 4% opacity)
Heading: "Premium Grooming" on line 1, "At Your Door." on line 2 in gold italic (Playfair Display, large, ~5rem)
Subtext: "Luxe Pups Grooming brings a 5-star salon experience straight to your driveway. Stress-free for your pup, effortless for you."
Two buttons: "Book an Appointment" (filled, --brown background) and "See Services" (outlined)


Right side (image):


Image: /MainDog.png
Positioned flush to the right edge of the viewport, vertically centered
The image should feel like it's "coming out" of the right side — no card, no border, no shadow
The image should be tall, taking up most of the viewport height


Background: Flat --cream, no gradients.


Section 2 — "Dog Grooming for Small Breeds" (content split)

Layout: Two columns. Left = image, Right = text.

Left side:


Image: /MainDog2.png
Full height of the section, object-fit cover, no border radius


Right side (text):


Eyebrow label: "WHY LUXE PUPS" in small caps, gold color
Heading: "Dog Grooming for Small Breeds" in Playfair Display
Body copy (use exactly this text):

"As small breed specialists, we offer a luxury grooming experience tailored to the unique needs of your dog. Our mobile grooming service brings calming, expert care directly to you — perfect for busy professionals or anyone seeking a higher standard of pet care.

Trusted by local veterinarians and discerning dog owners alike, our groomers are known for their gentle approach, breed-specific knowledge, and unwavering attention to detail. We understand that small dogs thrive on familiarity and routine, which is why we prioritize personalized service in the comfort of your own home.

Every session is designed for comfort, safety, and style, ensuring your pup receives the same level of care you would expect from a luxury spa."




Two buttons below: "View Our Services" (filled gold) and "Book an Appointment" (outlined brown)



Section 3 — Before & After Slider (3 cards)

Concept: Three side-by-side cards. Each card contains a before/after image reveal slider — a vertical divider line the user drags left/right to reveal the "after" image over the "before" image. This is built in React with mouse and touch drag events (no external library).

Images (all in /public/):


Card 1: before = /before1.png, after = /after1.png
Card 2: before = /before2.png, after = /after2.png
Card 3: before = /before3.png, after = /after3.png


Card design:


Fixed aspect ratio (square or 4:5 portrait)
The slider handle in the center is a thin vertical line (--gold color, 2px wide) with a small circular drag handle
"BEFORE" label bottom-left, "AFTER" label bottom-right — small, white, flat (no pill background, just text with a subtle text-shadow)
Cards have a small label below: e.g. "Goldendoodle", "Shih Tzu", "Maltese" (use these breed names)
No card border radius beyond 4px — keep it flat and clean


Section header:


Eyebrow: "RESULTS"
Heading: "Before & After"
Subtext: "See the Luxe Pups difference firsthand."


Layout: Three cards in a row on desktop, stacked on mobile.

Implementation — BeforeAfterSlider component:

jsx// Build this as a reusable component: src/components/BeforeAfterSlider.jsx
// Props: beforeSrc, afterSrc, breed
// Internal state: sliderPosition (0–100, default 50)
// On mousedown/touchstart on the handle, track drag and update sliderPosition
// Use clip-path or absolute positioning + overflow:hidden to reveal the after image
// The after image is clipped to show only the left `sliderPosition`% of the card


Section 4 — Services

Services list (in order):


Luxury Spa Bath — Full shampoo & conditioner treatment, blow-dry, brush-out, ear cleaning, and nail trim. Pricing by size (XS $65 / S $70 / M $75 / L $80 / XL $85 / XXL $95)
Luxe Touch Up — A quick freshen-up between full grooms. Includes brush-out, nail trim, ear cleaning, and a spritz. From $45.
The Luxe Groom — Everything in the Spa Bath plus a breed-specific haircut and styling. From $95.
DeLuxe Groom Package — The full works — deep conditioning, teeth brushing, paw balm, bandana, and a treat bag. From $130.


Layout: Horizontal list on desktop (4 columns), stacked on mobile. Each service is a flat card:


Flat --warm-white background
Thin top border in --gold (3px, full width) instead of a hover gradient
Service name in Playfair Display
Short description in DM Sans
Price in gold Playfair Display
No emojis — use a simple SVG icon or none at all


Section header:


Eyebrow: "SERVICES"
Heading: "Tailored Grooming for Every Pup"



Section 5 — "For All Breeds" (full-width image + text + before/after)

Layout: Two parts stacked:

Part A — Split section:


Left: Large image (use /MainDog2.png or a second crop — use object-position: center so it works for any image dropped in)
Right: Text block

Eyebrow: "ALL BREEDS WELCOME"
Heading: "Expert Care for Every Dog"
Body: "While we specialize in small breeds, our experienced groomers are trained to handle dogs of all sizes and coat types. From fluffy Poodles to scruffy Terriers, every pup gets the Luxe treatment."
Button: "Book an Appointment" (filled --brown)





Part B — Single before/after card, centered:


Reuse the BeforeAfterSlider component
Use /before1.png and /after1.png
Center it, max-width 480px
Breed label below: "Goldendoodle"



How It Works (keep existing section)

Keep the existing 4-step process section as-is, just remove emojis from step numbers — the numbered circles are already clean.


Booking Form (keep existing section)

Keep the existing booking form as-is. No changes needed here.


Footer (keep existing)

Keep existing footer. Replace any emojis used as icons with plain text or SVG.


File Structure

Only modify these two files:


src/App.jsx — full page component
src/index.css — all styles


Create one new file:


src/components/BeforeAfterSlider.jsx — the reusable slider component


Do not modify index.html, vite.config.js, package.json, or anything in public/.


Important Implementation Notes


Smooth scroll on nav links — keep existing behavior (scrollIntoView({ behavior: 'smooth' }))
Mobile responsive — hero stacks vertically on mobile (image above text or hidden), all sections stack to single column below 768px
No emojis — anywhere in the UI. Use SVG or text.
Flat colors only — no linear-gradient on section backgrounds. Gradients are allowed only on buttons.
Images are placeholders — the owner will drop real images into /public/. Make sure <img> tags use object-fit: cover so any image dimension works gracefully.
Before/after images — if the image files don't exist yet, the cards should still render gracefully (grey placeholder background is fine).
Keep src/App.css deleted (it was already removed).
The <Wordmark> component from the current App.jsx can be removed — we're using the real logo image now.