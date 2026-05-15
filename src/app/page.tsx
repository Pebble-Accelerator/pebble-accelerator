import Hero from '@/components/sections/Hero'
import GBAMap from '@/components/sections/GBAMap'
import Services from '@/components/sections/Services'
import Backers from '@/components/sections/Backers'
import WhyHK from '@/components/sections/WhyHK'
import CTAStrip from '@/components/sections/CTAStrip'

export default function Home() {
  return (
    <>
      <div
        className="snap-container"
        style={{
          height: '100vh',
          overflowY: 'scroll',
          scrollSnapType: 'y mandatory',
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <Hero />
        <GBAMap />
        <section
          className="snap-section combined-services-backers"
          style={{
            height: '100vh',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            background: '#f5efe4',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              flex: '0 0 55%',
              overflow: 'hidden',
              minHeight: 0,
            }}
          >
            <Services embedded />
          </div>
          <div
            style={{
              height: '1px',
              flexShrink: 0,
              background: '#d4cfc2',
            }}
            aria-hidden
          />
          <div
            style={{
              flex: 1,
              overflow: 'hidden',
              minHeight: 0,
              background: '#f5efe4',
            }}
          >
            <Backers embedded />
          </div>
        </section>
      </div>

      <WhyHK />
      <CTAStrip />
    </>
  )
}
