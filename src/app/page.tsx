import Hero from '@/components/sections/Hero'
import GBAMap from '@/components/sections/GBAMap'
import Services from '@/components/sections/Services'
import Backers from '@/components/sections/Backers'
import SaltaGen from '@/components/sections/SaltaGen'
import CTAStrip from '@/components/sections/CTAStrip'
import Footer from '@/components/layout/Footer'
import HomeScrollController from '@/components/home/HomeScrollController'

const snapWrapperStyle = {
  height: '100vh',
  minHeight: '100vh',
  overflow: 'hidden' as const,
  flexShrink: 0,
}

export default function Home() {
  return (
    <>
      <div
        className="snap-container"
        style={{
          height: '100vh',
          overflowY: 'scroll',
          WebkitOverflowScrolling: 'touch',
          background: '#f5efe4',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          className="hero-snap-wrapper home-slide"
          style={{
            height: '100vh',
            minHeight: '100vh',
            overflow: 'visible',
            position: 'relative',
            flexShrink: 0,
          }}
        >
          <Hero />
        </div>
        <div
          className="home-slide"
          style={{
            // GBA grows to fit its content (left column can exceed 100vh on
            // shorter viewports). Open the overflow so nothing clips; the
            // slideshow controller now handles taller-than-viewport slides
            // by stepping through them in viewport-sized chunks.
            minHeight: '100vh',
            overflow: 'visible',
            flexShrink: 0,
          }}
        >
          <GBAMap />
        </div>
        <div className="home-slide" style={snapWrapperStyle}>
          <Services embedded />
        </div>

        <div className="home-slide" style={snapWrapperStyle}>
          <Backers embedded />
        </div>

        <div className="home-slide" style={snapWrapperStyle}>
          <SaltaGen embedded />
        </div>

        <div className="home-slide" style={snapWrapperStyle}>
          <CTAStrip embedded />
        </div>
        <div className="home-slide">
          <Footer />
        </div>
      </div>
      <HomeScrollController />
    </>
  )
}
