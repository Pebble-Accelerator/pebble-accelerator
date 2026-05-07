import Hero from '@/components/sections/Hero'
import Stats from '@/components/sections/Stats'
import About from '@/components/sections/About'
import Services from '@/components/sections/Services'
import Backers from '@/components/sections/Backers'
import WhyHK from '@/components/sections/WhyHK'
import CTAStrip from '@/components/sections/CTAStrip'

export default function Home() {
  return (
    <div style={{ backgroundColor: '#ffffff', paddingTop: '60px' }}>
      <Hero />
      <div style={{
        width: '100%',
        height: '40px',
        overflow: 'hidden',
        background: '#ffffff',
        position: 'relative',
      }}>
        <svg
          viewBox="0 0 1440 40"
          preserveAspectRatio="none"
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: '40px',
          }}
        >
          <path
            d="M0,20 C180,5 360,35 540,20 C720,5 900,35 1080,20 C1260,5 1380,30 1440,20"
            fill="none"
            stroke="rgba(45,106,90,0.15)"
            strokeWidth="1.5"
          />
        </svg>
      </div>
      <Stats />
      <About />
      <Services />
      <Backers />
      <WhyHK />
      <CTAStrip />
    </div>
  )
}
