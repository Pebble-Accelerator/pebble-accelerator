import Hero from '@/components/sections/Hero'
import GBAMap from '@/components/sections/GBAMap'
import Services from '@/components/sections/Services'
import Backers from '@/components/sections/Backers'
import WhyHK from '@/components/sections/WhyHK'
import CTAStrip from '@/components/sections/CTAStrip'
import Footer from '@/components/layout/Footer'

const snapSectionStyle = {
  scrollSnapAlign: 'start' as const,
  scrollMarginTop: 60,
  height: '100vh',
  minHeight: '100vh',
  flexShrink: 0,
  boxSizing: 'border-box' as const,
}

const bandDivider = {
  height: '1px',
  flexShrink: 0,
  background: '#d4cfc2',
  border: 'none',
  margin: 0,
} as const

export default function Home() {
  return (
    <>
      <div
        className="snap-container"
        style={{
          height: '100vh',
          overflowY: 'scroll',
          scrollSnapType: 'y proximity',
          WebkitOverflowScrolling: 'touch',
          background: '#f5efe4',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          className="hero-snap-wrapper"
          style={{
            scrollSnapAlign: 'start',
            scrollMarginTop: '60px',
            height: '100vh',
            minHeight: '100vh',
            overflowY: 'auto',
            flexShrink: 0,
            overscrollBehavior: 'contain',
          }}
        >
          <Hero />
        </div>
        <div
          style={{
            scrollSnapAlign: 'start',
            scrollMarginTop: '60px',
            height: '100vh',
            minHeight: '100vh',
            overflow: 'hidden',
            flexShrink: 0,
          }}
        >
          <GBAMap />
        </div>
        <section
          className="snap-section combined-slide"
          style={{
            ...snapSectionStyle,
            display: 'flex',
            flexDirection: 'column',
            background: '#f5efe4',
            overflow: 'hidden',
            borderTop: 'none',
            paddingTop: 0,
            paddingLeft: '5vw',
            paddingRight: '5vw',
          }}
        >
          <div
            className="combined-slide__services"
            style={{
              flex: '0 0 50%',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 0,
              width: '100%',
              background: '#f5efe4',
            }}
          >
            <Services embedded />
          </div>
          <div style={bandDivider} aria-hidden />
          <div
            className="combined-slide__backers"
            style={{
              flex: '0 0 50%',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 0,
              width: '100%',
              background: '#f5efe4',
              paddingBottom: '32px',
            }}
          >
            <Backers embedded />
          </div>
        </section>

        <div className="snap-final-group">
          <section
            className="final-snap-slide"
            style={{
              height: '100vh',
              minHeight: '100vh',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              boxSizing: 'border-box',
              background: '#f5efe4',
            }}
          >
          <div
            className="final-snap-slide__why"
            style={{
              flex: '0 0 58%',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              minHeight: 0,
              background: '#f5efe4',
            }}
          >
            <WhyHK embedded />
          </div>
          <div
            className="final-snap-slide__cta"
            style={{
              flex: '0 0 42%',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              minHeight: 0,
              background: '#0f0f0f',
            }}
          >
            <CTAStrip embedded />
          </div>
          </section>
          <Footer />
        </div>
      </div>
    </>
  )
}
