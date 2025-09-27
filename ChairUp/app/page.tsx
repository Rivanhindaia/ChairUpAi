'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'

const categories = [
  { name: 'Barbers', emoji: '💈', href: '/customer?cat=Barber' },
  { name: 'Hairstylists', emoji: '💇‍♀️', href: '/customer?cat=Hairstylist' },
  { name: 'Nail Techs', emoji: '💅', href: '/customer?cat=Nail%20Technician' },
  { name: 'Makeup Artists', emoji: '💄', href: '/customer?cat=Makeup%20Artist' },
  { name: 'Tattoo Artists', emoji: '🖋️', href: '/customer?cat=Tattoo%20Artist' },
  { name: 'Brows & Lashes', emoji: '👁️', href: '/customer' }
]

const logos = ['Andis','Wahl','Olaplex','Biolage','Redken','Aveda','ClippersCo','SalonPro']

export default function Home() {
  const [query, setQuery] = useState('')
  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return categories
      .filter(c => c.name.toLowerCase().includes(q))
      .slice(0, 5)
  }, [query])

  return (
    <div>
      {/* HERO */}
      <section className="section">
        <div className="container grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <motion.p
              initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="badge"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-400 inline-block" /> Your time matters
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl font-extrabold leading-tight"
            >
              Book <span className="grad-text">top-rated</span> beauty & grooming pros near you
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-white/70 text-lg"
            >
              Instant search. Transparent pricing. Smart scheduling powered by AI.
            </motion.p>

            {/* Interactive search bar */}
            <motion.div
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass p-2"
            >
              <form
                action="/customer"
                className="flex items-center gap-2"
                onSubmit={(e) => {
                  if (!query) return
                  // Send as querystring
                }}
              >
                <input
                  name="q"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Try: “skin fade in El Cajon at 3pm”"
                  className="flex-1 px-3 py-3 rounded-xl bg-white/10 outline-none"
                />
                <button className="btn btn-primary">Search</button>
              </form>
              {suggestions.length > 0 && (
                <div className="mt-2 grid sm:grid-cols-5 grid-cols-2 gap-2">
                  {suggestions.map(s => (
                    <Link key={s.name} href={s.href} className="text-xs btn-ghost btn">
                      <span className="opacity-80">{s.emoji}</span> {s.name}
                    </Link>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Stats */}
            <motion.div
              initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
              className="grid grid-cols-3 gap-4 pt-2 text-center"
            >
              {[
                ['12k+', 'Monthly bookings'],
                ['4.8★', 'Avg rating'],
                ['2k+', 'Verified pros']
              ].map(([n,l]) => (
                <motion.div
                  key={l} variants={{ hidden: { opacity: 0, y: 6 }, show: { opacity: 1, y: 0 } }}
                  className="glass p-4"
                >
                  <div className="text-2xl font-bold">{n}</div>
                  <div className="text-xs text-white/60">{l}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
              <div className="flex flex-wrap gap-3">
                <Link className="btn btn-primary shadow-lg" href="/customer">Find pros</Link>
                <Link className="btn btn-ghost" href="/sign-up">Join as a pro</Link>
              </div>
            </motion.div>
          </div>

          {/* AI Assistant card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass p-6"
          >
            <div className="rounded-xl border border-white/10 p-4 bg-black">
              <div className="text-sm text-white/60 mb-3">AI Booking Assistant (demo)</div>
              <form action="/api/ai" method="post" className="flex gap-2">
                <input name="q" placeholder="I need a fade at 3pm tomorrow in El Cajon..." className="flex-1 px-3 py-2 rounded bg-white/10 outline-none" />
                <button className="btn btn-primary" type="submit">Ask</button>
              </form>
              <p className="text-xs text-white/50 mt-3">We’ll suggest times & services.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TRUST STRIP (marquee) */}
      <section className="py-8">
        <div className="container marquee">
          <div className="marquee-track">
            {logos.concat(logos).map((l, i) => (
              <span key={i} className="mx-6 text-white/40 text-sm">• {l}</span>
            ))}
          </div>
        </div>
      </section>

      {/* QUICK CATEGORIES */}
      <section className="section">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Browse by category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map(c => (
              <Link key={c.name} href={c.href} className="card group">
                <div className="text-2xl transition-transform group-hover:scale-110">{c.emoji}</div>
                <div className="mt-2 font-medium">{c.name}</div>
                <div className="text-xs text-white/50 mt-1">Explore {c.name.toLowerCase()}</div>
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
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card"
            >
              <div className="text-brand font-semibold">{String(i+1).padStart(2,'0')}</div>
              <h3 className="text-xl font-semibold mt-2">{title}</h3>
              <p className="text-white/70 mt-2">{desc}</p>
            </motion.div>
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
              <p className="text-white/60 text-sm mt-1">Services, availability, bookings, and insights — all in one place.</p>
            </div>
            <div className="flex gap-3">
              <Link href="/dashboard" className="btn btn-ghost">View dashboard</Link>
              <Link href="/onboarding" className="btn btn-primary">Start onboarding</Link>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS (scroll-snap carousel) */}
      <section className="section">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Loved by pros & customers</h2>
          <div className="overflow-x-auto snap-x flex gap-4 pb-2 -mx-4 px-4">
            {[
              ['“My no-shows dropped to near zero.”', 'Alex, Barber'],
              ['“I can fill gaps in my day with one tap.”', 'Maya, Nail Tech'],
              ['“Finding a last-minute cut is so easy now.”', 'Riley, Customer'],
              ['“The dashboard is clean and fast.”', 'Jordan, Stylist']
            ].map(([quote, who]) => (
              <div key={who} className="min-w-[280px] md:min-w-[360px] snap-start card">
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

      {/* Sticky bottom bar (mobile CTA) */}
      <div className="md:hidden fixed bottom-4 inset-x-0 px-4">
        <div className="glass px-4 py-3 flex items-center justify-between">
          <span className="text-sm text-white/80">Find a pro near you</span>
          <Link href="/customer" className="btn btn-primary">Go</Link>
        </div>
      </div>
    </div>
  )
}
