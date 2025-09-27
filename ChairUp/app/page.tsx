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
            <span className="badge">Trusted by 2,000+ pros</span>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Book <span className="grad-text">top-rated</span> beauty & grooming pros near you
            </h1>
            <p className="text-gray-600 text-lg">
              Instant search. Transparent pricing. Smart scheduling powered by AI.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link className="btn btn-primary" href="/customer">Find pros</Link>
              <Link className="btn btn-ghost" href="/sign-up">Join as a pro</Link>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 text-center">
              {[['12k+', 'Monthly bookings'], ['4.8★', 'Avg rating'], ['2k+', 'Verified pros']].map(([n,l]) => (
                <div key={l} className="card p-4 lift">
                  <div className="text-2xl font-bold">{n}</div>
                  <div className="text-xs text-gray-600">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Assistant card */}
          <div className="card p-6">
            <div className="rounded-xl border border-gray-200 p-4 bg-white">
              <div className="text-sm text-gray-500 mb-3">AI Booking Assistant (demo)</div>
              <form action="/api/ai" method="post" className="flex gap-2">
                <input name="q" placeholder="I need a fade at 3pm tomorrow in El Cajon..." className="input" />
                <button className="btn btn-primary" type="submit">Ask</button>
              </form>
              <p className="text-xs text-gray-500 mt-3">We’ll suggest times & services.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="section">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Browse by category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map(c => (
              <Link key={c.name} href={c.href} className="card p-4 lift">
                <div className="text-2xl">{c.emoji}</div>
                <div className="mt-2 font-medium">{c.name}</div>
                <div className="text-xs text-gray-500 mt-1">Explore {c.name.toLowerCase()}</div>
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
            <div key={title} className="card p-6 lift">
              <div className="text-brand font-semibold">{String(i+1).padStart(2,'0')}</div>
              <h3 className="text-xl font-semibold mt-2">{title}</h3>
              <p className="text-gray-600 mt-2">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BUSINESS STRIP */}
      <section className="section py-10">
        <div className="container">
          <div className="glass p-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-sm text-gray-500">Built for businesses</div>
              <h3 className="text-xl font-semibold">A clean dashboard that helps you grow</h3>
              <p className="text-gray-600 text-sm mt-1">Services, availability, bookings, and insights — all in one place.</p>
            </div>
            <div className="flex gap-3">
              <Link href="/dashboard" className="btn btn-ghost">View dashboard</Link>
              <Link href="/onboarding" className="btn btn-primary">Start onboarding</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
