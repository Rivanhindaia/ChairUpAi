'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'

const categories = [
  { name: 'Barbers', emoji: '💈', href: '/customer?cat=Barber' },
  { name: 'Hairstylists', emoji: '💇‍♀️', href: '/customer?cat=Hairstylist' },
  { name: 'Nail Techs', emoji: '💅', href: '/customer?cat=Nail%20Technician' },
  { name: 'Makeup', emoji: '💄', href: '/customer?cat=Makeup%20Artist' },
  { name: 'Tattoo', emoji: '🖋️', href: '/customer?cat=Tattoo%20Artist' },
  { name: 'Brows & Lashes', emoji: '👁️', href: '/customer' },
]

const quickIdeas = [
  'Skin fade', 'Silk press', 'Beard trim', 'Acrylic set', 'Braids',
]

export default function Home() {
  const [service, setService] = useState('')
  const [city, setCity] = useState('')
  const [date, setDate] = useState('')

  const suggestions = useMemo(() => {
    const s = service.trim().toLowerCase()
    if (!s) return quickIdeas.slice(0, 5)
    return quickIdeas.filter(x => x.toLowerCase().includes(s)).slice(0, 5)
  }, [service])

  return (
    <div>
      {/* HERO — vibrant, modern, airy */}
      <section className="section pt-14">
        <div className="container grid lg:grid-cols-2 gap-10 items-center">
          {/* Left: copy + search */}
          <div className="space-y-6">
            <span className="badge">Built for barbers, stylists & more</span>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Book <span className="grad-title">top-rated</span> beauty & grooming pros
            </h1>
            <p className="text-gray-600 text-lg">
              A clean, modern experience powered by AI — search naturally, see clear prices,
              and lock a time in seconds.
            </p>

            {/* Search panel with aura glow */}
            <div className="panel p-3 md:p-4 aura">
              <form action="/customer" className="grid md:grid-cols-[1.2fr,0.9fr,0.8fr,auto] gap-2">
                <input
                  className="input"
                  name="q"
                  value={service}
                  onChange={e=>setService(e.target.value)}
                  placeholder="Service (e.g., skin fade)"
                />
                <input
                  className="input"
                  name="city"
                  value={city}
                  onChange={e=>setCity(e.target.value)}
                  placeholder="City (e.g., El Cajon)"
                />
                <input
                  className="input"
                  name="date"
                  value={date}
                  onChange={e=>setDate(e.target.value)}
                  placeholder="Date (MM/DD/YYYY)"
                />
                <button className="btn btn-primary">Search</button>
              </form>

              {/* Inline suggestions */}
              <div className="flex flex-wrap gap-2 pt-2">
                {suggestions.map(s => (
                  <button
                    type="button"
                    key={s}
                    className="chip hover:border-black hover:text-black"
                    onClick={() => setService(s)}
                    aria-label={`Use suggestion ${s}`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* AI quick actions (unique twist) */}
              <div className="flex flex-wrap gap-2 pt-3">
                <form action="/api/ai" method="post">
                  <input type="hidden" name="q" value="Find me the earliest 45-min barber appointment tomorrow near El Cajon." />
                  <button className="btn btn-outline" type="submit">Find me a slot</button>
                </form>
                <form action="/api/ai" method="post">
                  <input type="hidden" name="q" value="Suggest a style for a round face and short hair." />
                  <button className="btn btn-outline" type="submit">Style suggestion</button>
                </form>
                <form action="/api/ai" method="post">
                  <input type="hidden" name="q" value="Reschedule my next booking to after 5pm Friday." />
                  <button className="btn btn-outline" type="submit">Reschedule for me</button>
                </form>
              </div>
            </div>

            {/* Primary CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link className="btn btn-primary" href="/customer">Explore pros</Link>
              <Link className="btn btn-ghost" href="/sign-up">Join as a pro</Link>
            </div>

            {/* Social proof */}
            <div className="grid grid-cols-3 gap-4">
              {[
                ['12k+', 'Monthly bookings'],
                ['4.8★', 'Avg rating'],
                ['2k+', 'Verified pros'],
              ].map(([n, l]) => (
                <div key={l} className="card p-4 text-center lift">
                  <div className="text-2xl font-bold">{n}</div>
                  <div className="text-xs text-gray-600">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: visual mock / “app preview” */}
          <div className="relative">
            {/* Gradient plate behind */}
            <div className="absolute -inset-6 rounded-3xl opacity-30 blur-2xl"
                 style={{background: 'radial-gradient(80% 60% at 30% 10%, #22d3ee55, transparent 60%), radial-gradient(60% 50% at 80% 20%, #6366f155, transparent 60%)'}} />
            <div className="relative grid gap-4">
              <div className="card p-5 float">
                <div className="h-8 w-24 rounded-full skel mb-4" />
                <div className="grid grid-cols-3 gap-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="rounded-xl border border-gray-200 p-3">
                      <div className="h-16 w-full rounded-lg skel mb-2" />
                      <div className="h-3 w-2/3 rounded skel" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="card p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="h-6 w-40 skel rounded"></div>
                  <div className="h-6 w-24 skel rounded"></div>
                </div>
                <div className="space-y-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg skel" />
                      <div className="flex-1">
                        <div className="h-3 w-1/3 skel rounded mb-1" />
                        <div className="h-3 w-1/4 skel rounded" />
                      </div>
                      <div className="h-8 w-20 skel rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CATEGORIES — colorful, quick entry */}
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

      {/* VALUE PROPS — super clear */}
      <section className="section">
        <div className="container grid md:grid-cols-3 gap-6">
          {[
            ['⚡️ Instant booking', 'Pick a time and confirm in seconds — no phone tag.'],
            ['💳 Clear pricing', 'Know exactly what you’ll pay before you go.'],
            ['🤖 AI assist', 'Find openings, reschedule, or ask style questions.'],
          ].map(([t, d]) => (
            <div key={t} className="card p-6 lift">
              <div className="text-lg font-semibold">{t}</div>
              <p className="text-gray-600 mt-2">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS — simple snap carousel */}
      <section className="section">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">People love ChairUp</h2>
          <div className="overflow-x-auto flex gap-4 pb-2 -mx-4 px-4 snap-x">
            {[
              ['“I book between meetings now.”', 'Elijah, Customer'],
              ['“No-shows dropped big time.”', 'Ava, Barber'],
              ['“The UI makes scheduling calm.”', 'Noah, Nail Tech'],
              ['“I find last-minute cuts easily.”', 'Mia, Customer'],
            ].map(([q, who]) => (
              <div key={who} className="min-w-[280px] md:min-w-[360px] card p-6 snap-start lift">
                <p className="text-gray-900">{q}</p>
                <p className="text-gray-500 mt-3 text-sm">— {who}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA — bold & minimal */}
      <section className="section pt-0">
        <div className="container">
          <div className="panel p-8 md:p-10 text-center aura">
            <h3 className="text-2xl md:text-3xl font-bold">Ready to look fresh?</h3>
            <p className="text-gray-600 mt-2">Join thousands who book effortlessly with ChairUp.</p>
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
