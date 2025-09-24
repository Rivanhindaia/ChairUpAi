import Link from 'next/link'

const categories = [
  { name: 'Barbers', emoji: '💈', href: '/customer?cat=Barber' },
  { name: 'Hairstylists', emoji: '💇‍♀️', href: '/customer?cat=Hairstylist' },
  { name: 'Nail Techs', emoji: '💅', href: '/customer?cat=Nail%20Technician' },
  { name: 'Makeup Artists', emoji: '💄', href: '/customer?cat=Makeup%20Artist' },
  { name: 'Tattoo Artists', emoji: '🖋️', href: '/customer?cat=Tattoo%20Artist' },
  { name: 'Brows & Lashes', emoji: '👁️', href: '/customer' }
]

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="section">
        <div className="container grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <p className="text-xs tracking-widest uppercase text-white/60">Your time matters</p>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Book <span className="grad-text">top-rated</span> beauty & grooming pros near you
            </h1>
            <p className="text-white/70 text-lg">
              Instant search. Transparent pricing. Smart scheduling powered by AI.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link className="btn btn-primary shadow-glow" href="/customer">Find pros</Link>
              <Link className="btn btn-ghost" href="/sign-up">Join as a pro</Link>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-6 text-center">
              {[['12k+', 'Monthly bookings'], ['4.8★', 'Avg rating'], ['2k+', 'Verified pros']].map(([n,l]) => (
                <div key={l} className="glass p-4">
                  <div className="text-2xl font-bold">{n}</div>
                  <div className="text-xs text-white/60">{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="glass p-6">
            <div className="rounded-xl border border-white/10 p-4 bg-black">
              <div className="text-sm text-white/60 mb-3">AI Booking Assistant (demo)</div>
              <form action="/api/ai" method="post" className="flex gap-2">
                <input
                  name="q"
                  placeholder="I need a fade at 3pm tomorrow in El Cajon..."
                  className="flex-1 px-3 py-2 rounded bg-white/10 outline-none"
                />
                <button className="btn btn-primary" type="submit">Ask</button>
              </form>
              <p className="text-xs text-white/50 mt-3">We’ll suggest times & services.</p>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK CATEGORIES */}
      <section className="section">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Browse by category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map(c => (
              <Link key={c.name} href={c.href} className="glass p-4 hover:bg-white/10 transition">
                <div className="text-2xl">{c.emoji}</div>
                <div className="mt-2 font-medium">{c.name}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section">
        <div className="container grid md:grid-cols-3 gap-6">
          {[
            ['Search', 'Find nearby pros by category, price, rating and availability.'],
            ['Book', 'Choose a time that works — we’ll confirm instantly.'],
            ['Show up', 'We remind you automatically; pay and tip cashless.']
          ].map(([title, desc], i) => (
            <div key={title} className="glass p-6">
              <div className="text-brand font-semibold">{String(i+1).padStart(2,'0')}</div>
              <h3 className="text-xl font-semibold mt-2">{title}</h3>
              <p className="text-white/70 mt-2">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED STRIP */}
      <section className="section py-10">
        <div className="container">
          <div className="glass p-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-sm text-white/60">Built for businesses</div>
              <h3 className="text-xl font-semibold">A clean dashboard that helps you grow</h3>
            </div>
            <div className="flex gap-3">
              <Link href="/dashboard" className="btn btn-ghost">View dashboard</Link>
              <Link href="/onboarding" className="btn btn-primary">Start onboarding</Link>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Loved by pros & customers</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              ['“My no-shows dropped to near zero.”', 'Alex, Barber'],
              ['“I can fill gaps in my day with one tap.”', 'Maya, Nail Tech'],
              ['“Finding a last-minute cut is so easy now.”', 'Riley, Customer']
            ].map(([quote, who]) => (
              <div key={who} className="glass p-6">
                <p className="text-white/90">{quote}</p>
                <p className="text-white/60 mt-3 text-sm">— {who}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section">
        <div className="container text-center">
          <div className="glass p-10">
            <h3 className="text-2xl md:text-3xl font-bold">Ready to get started?</h3>
            <p className="text-white/70 mt-2">Join thousands of pros growing their business on ChairUp.</p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link className="btn btn-primary" href="/sign-up">Create a pro account</Link>
              <Link className="btn btn-ghost" href="/customer">Browse nearby pros</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
