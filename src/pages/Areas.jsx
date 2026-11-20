import { Arrow, Fold, PawTrail } from '../components/ui'
import { Link } from '../router'
import { SERVICE_AREAS } from '../serviceAreas'
import { COUNTY_PAGES } from '../countyCopy'

export default function Areas() {
  return (
    <section className="areas page">
      <div className="wrap">
        <PawTrail className="paw-trail--tr" />
        <header className="sec-head">
          <p className="eyebrow">Service Areas</p>
          <h1 className="page-title">Mobile Dog &amp; Pet Grooming Across Davis County and Northern Utah</h1>
          <p className="sec-lede page-lede">Luxe Pups comes to your door in Davis County and the counties around it.</p>
        </header>
        <div className="folds">
          {SERVICE_AREAS.map((a) => (
            <Fold key={a.county} title={a.county} meta={`${a.towns.length} towns`}>
              <p className="fold-text">{a.towns.join(', ')}</p>
              {COUNTY_PAGES.find((c) => c.county === a.county) && (
                <p className="fold-text"><Link to={`/${COUNTY_PAGES.find((c) => c.county === a.county).slug}`} className="text-link">{a.county} grooming page <Arrow /></Link></p>
              )}
            </Fold>
          ))}
        </div>
        <div className="page-cta"><Link to="/book" className="btn btn-dark">Book an Appointment <Arrow /></Link></div>
      </div>
    </section>
  )
}
