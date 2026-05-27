'use client'

import Services from './Services'
import Backers from './Backers'

export default function CombinedServicesBackers() {
  return (
    <section className="snap-section combined-services-backers">
      <div className="combined-services-backers__top">
        <Services embedded />
      </div>
      <div className="combined-services-backers__divider" aria-hidden />
      <div className="combined-services-backers__bottom">
        <Backers embedded />
      </div>
    </section>
  )
}
