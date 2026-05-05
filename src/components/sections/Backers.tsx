import FadeIn from '@/components/ui/FadeIn'
import backers from '@/data/backers'

export default function Backers() {
  const mobileRows = Math.ceil(backers.length / 2)

  return (
    <section className="border-b border-[#e8e8e8]">
      <div className="mx-auto max-w-[1200px] grid grid-cols-1 md:grid-cols-[200px_1fr]">
        {/* Label */}
        <div className="w-[200px] border-b md:border-b-0 md:border-r border-[#e8e8e8] p-5 md:p-10 md:pt-11 self-start flex items-start">
          <span className="text-[12px] text-[#aaa]">Backed by</span>
        </div>

        {/* Backer items */}
        <FadeIn className="flex flex-wrap p-5 md:py-10 md:px-12">
          {backers.map((backer, i) => (
            // Mobile uses two items per row with adjusted borders.
            <a
              key={backer.name}
              href={backer.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-1/2 md:w-auto px-10 py-8 flex flex-col transition-colors duration-150 border-[#e8e8e8] ${
                i % 2 === 0 ? 'border-r md:border-r-0' : ''
              } ${
                Math.floor(i / 2) < mobileRows - 1 ? 'border-b md:border-b-0' : ''
              } ${
                i < backers.length - 1 ? 'md:border-r' : ''
              }`}
            >
              <span className="text-[14px] text-[#555] font-normal block mb-1">
                {backer.name}
              </span>
              <span className="text-[11px] text-[#bbb] block">{backer.type}</span>
            </a>
          ))}
        </FadeIn>
      </div>
    </section>
  )
}
