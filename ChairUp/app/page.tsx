'use client'

import Link from 'next/link'
import NeonSign from '@/components/NeonSign'
import BarberPole from '@/components/BarberPole'
import ParallaxScene from '@/components/ParallaxScene'
import AmbientToggle from '@/components/AmbientToggle'
import { useMemo, useState } from 'react'

const categories = [
  { name: 'Barbers', emoji: '💈', href: '/customer?cat=Barber' },
  { name: 'Hairstylists', emoji: '💇‍♀️', href: '/customer?cat=Hairstylist' },
  { name: 'Nail Techs', emoji: '💅', href: '/customer?cat=Nail%20Technician' },
  { name: 'Makeup Artists', emoji: '💄', href: '/customer?cat=Makeup%20Artist' },
  { name: 'Tattoo Artists', emoji: '🖋️', href: '/customer?cat=Tattoo%20Artist' },
  { name: 'Brows & Lashes', emoji: '👁️', href: '/customer' }
]

export default function Home() {
  const [q, setQ] = useState('')
  const suggestions = useMemo(() => {
    const s = q.trim().toLowerCase()
    return s ? categories.filter(c => c.name.toLowerCase().includes(s)).slice(0,4) : []
  }, [q])

  return (
    <ParallaxScene>
      {/* HERO — Shop feel */}
      <section className="section">
        <div className="container grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <NeonSign text="OPEN" />
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Step into the <span className="grad-text">ChairUp</span> shop
            </h1>
            <p className="text-gray-600 text-lg">
              A modern barbershop in your browser — discover pros, book instantly, and get reminded.
            </p>

            {/* Search with quick suggestions */}
            <div className="glass p-2">
              <form action="/customer" className="flex gap-2">
                <input
                  name="q"
                  value={q}
                  onChange={e=>setQ(e.target.value)}
                  placeholder='Try: "skin fade in El Cajon"'
                  className="input"
                />
                <button className="btn btn-primary">Search</button>
              </form>
              {suggestions.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {suggestions.map(s => (
                    <Link key={s.name} href={s.href} className="pill hover:border-brand hover:text-brand">
                      <span className="opacity-90 mr-1">{s.emoji}</span> {s.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link className="btn btn-primary" href="/customer">Find pros</Link>
              <Link className="btn btn-ghost" href="/sign-up">Join as a pro</Link>
            </div>

            {/* Ambient toggle */}
            <AmbientToggle />
          </div>

          {/* Spinning pole + stat tiles */}
          <div className="grid gap-6">
            <div className="card p-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                {[['12k+', 'Monthly bookings'], ['4.8★', 'Avg rating'], ['2k+', 'Verified pros']].map(([n,l]) => (
                  <div key={l}>
                    <div className="text-2xl font-bold">{n}</div>
                    <div className="text-xs text-gray-600">{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="card p-6 flex items-center justify-center">
              <BarberPole />
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

      {/* HOW IT WORKS */}
      <section className="section">
        <div className="container grid md:grid-cols-3 gap-6">
          {[
            ['Walk in (online)', 'Find pros by category, price, rating & availability.'],
            ['Take a seat', 'Pick a time — we confirm instantly.'],
            ['Fresh cut', 'We’ll remind you; pay and tip cashless.']
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
    </ParallaxScene>
  )
}
