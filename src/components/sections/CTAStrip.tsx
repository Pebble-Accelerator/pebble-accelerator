import ForestCTA from '@/components/sections/ForestCTA'

type CTAStripProps = {
  embedded?: boolean
}

/** Forest editorial CTA ; shared with homepage slide and services/contact footers. */
export default function CTAStrip({ embedded = false }: CTAStripProps) {
  return <ForestCTA embedded={embedded} />
}
