export default function Hero({ name, title, about, stats }) {
  return (
    <section
      id="home"
      className="px-6 py-16 sm:px-10 lg:px-12 lg:py-12"
    >
      {/* İSİM */}
      <h1 className="font-name text-4xl leading-[0.95] sm:text-6xl lg:text-8xl">
        <span className="name-gradient">
          {name}
        </span>

        <span className="ml-1 inline-block h-[0.85em] w-[4px] translate-y-1 rounded-sm bg-lime-400 cursor-blink" />
      </h1>

      {/* ÜNVAN */}
      <h2 className="mt-3 font-display text-2xl font-bold text-lime-400 sm:text-4xl lg:text-5xl">
        {title}
      </h2>

      {/* HAKKINDA */}
      <p
        id="about"
        className="mt-8 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg"
      >
        {about}
      </p>

      {/* İSTATİSTİKLER */}
      <div className="mt-10 flex flex-wrap gap-6 border-t border-zinc-800/80 pt-8 sm:mt-14 sm:gap-10 sm:pt-10">
        {stats.map(({ value, label, color }) => (
          <div key={label} className="min-w-[120px]">
            <p className={`font-display text-4xl font-bold ${color}`}>
              {value}
            </p>

            <p className="mt-1 text-sm text-zinc-500">
              {label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
