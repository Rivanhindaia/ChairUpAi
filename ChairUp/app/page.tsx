import Link from 'next/link'
import SearchBar from '@/components/SearchBar'

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
              Book <span className="text-black">top-rated</span> beauty & grooming pros
            </h1>
            <p className="text-gray-600 text-lg">Fast search. Clear pricing. AI that finds times for you.</p>
            <SearchBar />
            <div className="flex flex-wrap gap-3">
              <Link className="btn btn-primary" href="/customer">Find pros</Link>
              <Link className="btn btn-ghost" href="/sign-up">Join as a pro</Link>
            </div>
          </div>

          <div className="card p-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                ['12k+', 'Monthly bookings'],
                ['4.8★', 'Avg rating'],
                ['2k+', 'Verified pros']
              ].map(([n,l]) => (
                <div key={l}>
                  <div className="text-2xl font-bold">{n}</div>
                  <div className="text-xs text-gray-600">{l}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 panel p-4">
              <div className="text-sm text-gray-500 mb-2">AI quick actions</div>
              <div className="flex flex-wrap gap-2">
                <form action="/api/ai" method="post">
                  <input type="hidden" name="q" value="Find me the earliest 45-min barber appointment tomorrow near El Cajon." />
                  <button className="btn btn-outline" type="submit">Find me a slot</button>
                </form>
                <form action="/api/ai" method="post">
                  <input type="hidden" name="q" value="Recommend a service based on a photo for my hair type." />
                  <button className="btn btn-outline" type="submit">Recommend a service</button>
                </form>
                <form action="/api/ai" method="post">
                  <input type="hidden" name="q" value="Reschedule my upcoming booking to any time after 5pm Friday." />
                  <button className="btn btn-outline" type="submit">Reschedule for me</button>
                </form>
              </div>
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
              <Link key={c.name} href={c.href} className="card p-5 lift">
                <div className="text-2xl">{c.emoji}</div>
                <div className="mt-2 font-semibold">{c.name}</div>
                <div className="text-xs text-gray-500 mt-1">Explore {c.name.toLowerCase()}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BUSINESS STRIP */}
      <section className="section py-10">
        <div className="container">
          <div className="panel p-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-sm text-gray-500">Built for businesses</div>
              <h3 className="text-xl font-semibold">Dashboard that drives growth</h3>
              <p className="text-gray-600 text-sm mt-1">Services, availability, bookings & insights — all in one place.</p>
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
