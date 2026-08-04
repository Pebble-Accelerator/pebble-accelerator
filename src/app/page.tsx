import Hero from '@/components/sections/Hero'
import GBAMap from '@/components/sections/GBAMap'
import PortfolioHome from '@/components/sections/PortfolioHome'
import Services from '@/components/sections/Services'
import Backers from '@/components/sections/Backers'
import SaltaGen from '@/components/sections/SaltaGen'
import CTAStrip from '@/components/sections/CTAStrip'

/**
 * Homepage — a normal long-scroll document.
 *
 * This was previously a `.snap-container` scroll surface holding eight 100vh
 * `.home-slide` wrappers driven by a wheel/touch/key hijack. That capped every
 * section at exactly one screen. Sections now stack as ordinary siblings and set
 * their own height, which is what lets the redesign vary them.
 *
 * The footer is NOT rendered here — `layout.tsx` renders the only one. While the
 * hijack existed this page rendered a second `<Footer/>` as the last slide and a
 * CSS rule hid the layout one; both halves of that arrangement are gone.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <GBAMap />
      <PortfolioHome />
      <Services />
      <Backers />
      <SaltaGen />
      <CTAStrip />
    </>
  )
}
