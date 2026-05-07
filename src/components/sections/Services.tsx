'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useScrollEntranceMode } from '@/hooks/useScrollEntranceMode'
import SectionLabelLine from '@/components/ui/SectionLabelLine'

export default function Services() {
  const framerReduced = useReducedMotion()
  const { ref: sectionRef, mode } = useScrollEntranceMode(!framerReduced)

  const hidden = { opacity: 0, y: 20 }
  const visible = { opacity: 1, y: 0 }

  const services = [
    {
      name: 'Investment',
      desc: 'We deploy starting capital of US$200K alongside deep operational support, leveraging our investor network to accelerate the milestones that matter.',
      tags: 'Seed · Series A bridge · Follow-on',
    },
    {
      name: 'Consulting',
      desc: 'For companies beyond our investment scope, we serve as your extension in Hong Kong — opening doors to China, accessing government grants, building the right partnerships.',
      tags: 'Market entry · HK grants · China access',
    },
  ]

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#ffffff',
        padding: '120px 5vw',
      }}
    >
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
      }}>
        <SectionLabelLine marginBottom="64px">
          <span style={{
            fontSize: '11px',
            color: '#aaa',
            letterSpacing: '0.12em',
            textTransform: 'uppercase' as const,
            fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
            flexShrink: 0,
          }}>
            What we do
          </span>
        </SectionLabelLine>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '96px',
        }}>
          {services.map((svc, i) => {
            const runMotion =
              !framerReduced &&
              mode === 'animate'

            const instantShow =
              framerReduced ||
              mode === 'static'

            return (
              <motion.div
                key={svc.name}
                initial={instantShow ? false : hidden}
                animate={
                  instantShow || runMotion
                    ? visible
                    : hidden
                }
                transition={{
                  duration: instantShow ? 0 : 0.5,
                  ease: 'easeOut',
                  delay:
                    instantShow || !runMotion
                      ? 0
                      : i * 0.15,
                }}
              >
                <h3 style={{
                  fontSize: '22px',
                  fontWeight: 500,
                  color: '#0f0f0f',
                  marginBottom: '20px',
                  marginTop: 0,
                  fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
                }}>
                  {svc.name}
                </h3>
                <p style={{
                  fontSize: '15px',
                  fontWeight: 300,
                  color: '#666',
                  lineHeight: 1.85,
                  marginBottom: '24px',
                  marginTop: 0,
                  fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
                }}>
                  {svc.desc}
                </p>
                <span style={{
                  fontSize: '12px',
                  color: '#bbb',
                  letterSpacing: '0.04em',
                  fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
                }}>
                  {svc.tags}
                </span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
