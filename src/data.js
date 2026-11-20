// Site content: prices, lists, reviews. Edit here, not in the page components.
export const SIZES = [
  { size: 'XS', weight: '0–15 lbs', full: '$125', bath: '$85' },
  { size: 'S', weight: '16–25 lbs', full: '$140', bath: '$95' },
  { size: 'M', weight: '26–40 lbs', full: '$160', bath: '$110' },
  { size: 'L', weight: '41–65 lbs', full: '$180', bath: '$125' },
  { size: 'XL', weight: '66–80 lbs', full: '$200', bath: '$140' },
  { size: 'XXL', weight: '81–100+ lbs', full: '$225+', bath: '$155+' },
]

export const FULL_INCLUDES = [
  'Premium bath & conditioner', 'Blow dry', 'Brush-out', 'Haircut & styling', 'Face trim',
  'Sanitary trim', 'Paw pads', 'Nail trim', 'Ear cleaning', 'Finishing spray', 'Bow or bandana',
]
// What Full Groom adds on top of Bath & Brush (keep in sync with the two lists above/below)
export const FULL_EXTRAS = ['Haircut & styling', 'Face trim', 'Sanitary trim', 'Paw pads', 'Bow or bandana']

export const BATH_INCLUDES = [
  'Premium shampoo & conditioner', 'Blow dry', 'Brush-out', 'Nail trim', 'Ear cleaning', 'Finishing spray',
]

export const PUPPY_INCLUDES = [
  'Gentle bath',
  'Blow dry introduction',
  'Brush-out, face, feet & sanitary trim',
  'Nail trim & ear cleaning',
  'Puppy-safe finishing, lots of patience',
]

export const ADDONS = [
  ['De-Shedding Treatment', '+$25–$45+'],
  ['Doodle / Thick Coat Upgrade', '+$20–$50+'],
  ['Hand Scissoring / Specialty Styling', '+$25–$50+'],
  ['Light Dematting', '+$20+'],
  ['Extensive Dematting', '$1 / minute'],
  ['Nail Grind', '+$10'],
  ['Teeth Brushing', '+$10'],
  ['Flea Treatment', '+$25+'],
  ['Specialty / Medicated Shampoo', '+$15'],
]

export const SPA = [
  { name: 'Luxury Shed Control', desc: 'Deep-cleanse shampoo + conditioner + professional de-shedding treatment', price: 'Starting at $25' },
  { name: 'Luxe Facial', desc: 'Gentle facial cleanse to help remove dirt, tear buildup & facial debris', price: '$15' },
  { name: 'Pawdicure', desc: 'Nail grind + paw pad cleanup + moisturizing paw treatment', price: '$20' },
  { name: 'Luxe Smile', desc: 'Tooth brushing + fresh breath treatment', price: '$15' },
]

export const POLICY_ITEMS = [
  'Severely matted or impacted coats',
  'Excessive shedding',
  'Very long or dense coats',
  'Extensive hand-scissoring',
  'Breed-specific styling',
  'Dogs requiring additional grooming time',
  'Excessive movement or difficult behavior',
  'Fleas or other coat-related concerns',
]

export const REVIEWS = [
  {
    name: 'Anna',
    featured: true,
    text: 'Luxury Groomer is the best thing that happened to our maltepoo Bean. She loves the comfort of at-home grooming sessions, no stress involved, and she looks more chic than ever. Stylist Ani has great taste and Bean adores her.',
  },
  {
    name: 'Alexandra',
    text: 'Emily was love at first sight — not just for me but Osso and Luna both got totally smitten. Emily is so joyful, engaged, and professional. It was above and beyond my expectations.',
  },
  {
    name: 'Greg',
    text: 'Our experience with Steven was amazing. Steven went above and beyond. Luxe Pups really made a difference for us and more importantly for Dewey.',
  },
]

export const STEPS = [
  ['Book Online', 'Fill out the form and choose your service and time.'],
  ['Pay $40 Deposit', 'Secure your appointment with a quick card payment.'],
  ['We Arrive', 'Our groomer pulls up in the fully-equipped van right to your address.'],
  ['Enjoy!', 'Pick up your freshly groomed pup and pay the remaining balance.'],
]

export const FACTS = [
  ['Mobile', 'We come to your door'],
  ['Small-breed specialists', 'All sizes and coats welcome'],
  ['Serving Utah', 'and surrounding areas'],
  ['Open Monday – Saturday', 'Closed Sundays'],
]


// Short service summary used on the Home page and the county pages
export const TEASER = [
  { name: 'Full Groom', from: '$125', text: 'Premium bath, haircut & styling, nail trim, ear cleaning, and a bow or bandana.' },
  { name: 'Bath & Brush', from: '$85', text: 'Shampoo & conditioner, blow dry, brush-out, nail trim and ear cleaning.' },
  { name: "Puppy's First Groom", from: '$100', text: 'For puppies learning to love the grooming experience.' },
]
