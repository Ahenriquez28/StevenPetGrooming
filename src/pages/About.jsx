import { Arrow, PawTrail } from '../components/ui'
import { Link } from '../router'

export default function About() {
  return (
    <>
      <section className="team page">
        <div className="wrap">
          <PawTrail className="paw-trail--tr" />
          <header className="sec-head">
            <p className="eyebrow">Meet the Owners</p>
            <h1 className="page-title">The Hands Behind Every Groom</h1>
          </header>
          <div className="team-grid">
            <article className="person reveal">
              <h2 className="h3">Steven</h2>
              <p className="person-role">Owner &amp; Groomer</p>
              <p>Hi, I'm Steven! I'm the proud owner and groomer behind Luxe Pups Grooming.</p>
              <p>My love for dogs has always been a huge part of who I am. Over the years, I've had the opportunity to work with so many different pups, personalities, and breeds, and every one of them has taught me something new.</p>
              <p>Grooming became more than just a career for me — it became something I genuinely love. I enjoy getting to know each dog individually, earning their trust, and seeing the transformation not only on the outside, but in how happy and comfortable they feel afterward.</p>
              <p>I started Luxe Pups Grooming because I wanted to create a grooming experience that feels more personal. Instead of your pup spending hours in a busy salon, I bring the salon directly to you and focus on one pup at a time. My goal is for every dog to feel safe, relaxed, and truly cared for.</p>
              <p>When your pup is with me, I treat them the way I would want my own dogs to be treated — with patience, kindness, and plenty of love.</p>
              <p className="person-signoff">Thank you for trusting me with one of the most important members of your family. I can't wait to meet you and your pup!</p>
            </article>
            <article className="person reveal">
              <h2 className="h3">Emily</h2>
              <p className="person-role">Co-Owner &amp; Pet Stylist</p>
              <p>Hi, I'm Emily, a passionate pet stylist who has always believed that our pets are more than just animals — they're family.</p>
              <p>Grooming is something I truly love because it gives me the opportunity to help pets look and feel their best while creating a safe, calm, and loving experience for them. I understand that every pet has their own personality, needs, and comfort level, and I take the time to treat each one with patience, kindness, and care.</p>
              <p>My goal is to make every grooming experience as stress-free and positive as possible, while giving pet parents peace of mind knowing their furry family members are being cared for with genuine love and attention.</p>
              <p>Starting my own grooming business is a dream I'm incredibly proud to pursue. I hope to build lasting relationships with both pets and their families and create a business that feels welcoming, trustworthy, and centered around the well-being of every pet that walks through my door.</p>
              <p className="person-signoff">Thank you for trusting me with your beloved pets. It truly means the world to me!</p>
            </article>
          </div>
        </div>
      </section>

      <section className="breeds">
        <div className="breeds-inner breeds-inner--single">
          <div className="breeds-copy reveal">
            <p className="eyebrow">All Breeds Welcome</p>
            <h2>Expert Care for Every Dog</h2>
            <p>While we specialize in small breeds, our experienced groomers are trained to handle dogs of all sizes and coat types. From fluffy Poodles to scruffy Terriers, every pup gets the Luxe treatment.</p>
            <Link to="/book" className="btn btn-dark">Book an Appointment <Arrow /></Link>
          </div>
        </div>
      </section>
    </>
  )
}
