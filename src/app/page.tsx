import Hero from '@/components/sections/Hero'
import Stats from '@/components/sections/Stats'
import About from '@/components/sections/About'
import Services from '@/components/sections/Services'
import Portfolio from '@/components/sections/Portfolio'
import Backers from '@/components/sections/Backers'
import WhyHK from '@/components/sections/WhyHK'
import CTAStrip from '@/components/sections/CTAStrip'

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <About />
      <Services />
      <Portfolio limit={5} />
      <Backers />
      <WhyHK />
      <CTAStrip />
    </>
  )
}
