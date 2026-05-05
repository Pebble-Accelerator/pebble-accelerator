const stats = [
  { number: '18+', label: 'Companies financed' },
  { number: '30+', label: 'Companies accelerated' },
  { number: '100m', label: 'Patient pool by 2030' },
]

export default function Stats() {
  return (
    <section className="border-b border-[#e8e8e8]">
      <div className="mx-auto max-w-[1200px] grid grid-cols-1 md:grid-cols-3">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`py-7 px-10 border-b md:border-b-0 border-[#e8e8e8] ${i < stats.length - 1 ? 'md:border-r' : ''}`}
          >
            <p className="font-display text-[42px] font-normal tracking-[-0.02em] text-[#0f0f0f] leading-none">
              {stat.number}
            </p>
            <p className="text-[12px] text-[#999] mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
