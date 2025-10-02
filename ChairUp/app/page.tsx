import Link from 'next/link'

export default function Home() {
  return (
    <div className="space-y-20">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl border bg-white">
        <div className="hero-ink" aria-hidden />
        <div className="px-6 md:px-10 py-14 md:py-20 relative">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border bg-white/70 backdrop-blur px-3 py-1 text-xs font-medium text-slate-700 shadow-soft">
              <span className="h-2 w-2 rounded-full bg-emerald-500" /> Book faster, no back-and-forth
            </div>

            <h1 className="mt-5 text-4xl leading-tight tracking-tight font-extrabold md:text-6xl">
              Appointments that feel <span className="gradient-text">effortless</span>
            </h1>

            <p className="mt-5 text-lg text-slate-600 md:text-xl">
              Chair<span className="text-sky-500 font-extrabold">Up</span> is the cleanest way to book
              barbers, stylists, lash techs, trainers, tutors—<b>any service</b>.
              Smart suggestions, nearby results, one-tap booking.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/app" className="btn btn-primary">Find appointments</Link>
              <Link href="/dashboard" className="btn">I’m a provider</Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-slate-600">
              <div className="stat-badge"><b>2 min</b> average booking flow</div>
              <div className="stat-badge"><b>AI</b> style suggestions</div>
              <div className="stat-badge"><b>Secure</b> Supabase Auth</div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section>
        <h2 className="section-title">Popular categories</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Barbers', emoji: '💈', href: '/app?category=Barber', gradient: 'from-sky-100 to-sky-50' },
            { label: 'Hair Stylists', emoji: '💇‍♀️', href: '/app?category=Hair', gradient: 'from-fuchsia-100 to-pink-50' },
            { label: 'Lash & Brow', emoji: '✨', href: '/app?category=Lashes', gradient: 'from-amber-100 to-yellow-50' },
            { label: 'Fitness & Wellness', emoji: '🏋️‍♀️', href: '/app?category=Fitness', gradient: 'from-emerald-100 to-green-50' },
          ].map((c) => (
            <Link
              key={c.label}
              href={c.href}
              className={`group card hover:shadow-lg transition border-slate-200 bg-gradient-to-b ${c.gradient}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl">{c.emoji}</div>
                  <div className="mt-2 text-lg font-semibold">{c.label}</div>
                </div>
                <div className="rounded-2xl border bg-white px-2 py-1 text-xs text-slate-600 group-hover:translate-x-0.5 transition">
                  Explore →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section>
        <h2 className="section-title">How it works</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              step: '01',
              title: 'Describe or browse',
              text: 'Tell us what you want or pick a service. We’ll suggest a duration with AI.',
            },
            {
              step: '02',
              title: 'Pick time & provider',
              text: 'See real availability near you and choose the pro that fits.',
            },
            {
              step: '03',
              title: 'Confirm & get an invite',
              text: 'One tap and you’re set. We drop an .ics calendar invite instantly.',
            },
          ].map((s) => (
            <div key={s.step} className="card glass">
              <div className="text-slate-400 font-mono text-sm">{s.step}</div>
              <div className="mt-2 text-lg font-semibold">{s.title}</div>
              <p className="mt-2 text-slate-600">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="rounded-3xl border bg-white p-6 md:p-10">
        <h2 className="section-title">What people say</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            {
              quote: 'Literally booked a skin fade in two minutes. No DMs, no phone calls.',
              author: 'Marcus • San Diego',
            },
            {
              quote: 'The suggestions nailed my layered trim. It felt like magic.',
              author: 'Alyssa • Austin',
            },
            {
              quote: 'I switched from Google Forms to ChairUp—clients love the flow.',
              author: 'Keisha • Stylist',
            },
          ].map((t) => (
            <div key={t.author} className="card">
              <p className="text-slate-700">“{t.quote}”</p>
              <div className="mt-3 text-sm text-slate-500">{t.author}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden rounded-3xl border bg-slate-900 text-white">
        <div className="cta-ink" aria-hidden />
        <div className="px-6 md:px-10 py-14 md:py-16 relative">
          <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Ready to book better?
          </h3>
          <p className="mt-3 text-slate-300">
            Find a time that works, add to calendar, show up confident.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/app" className="btn btn-primary border-white bg-white text-slate-900 hover:opacity-90">
              Start booking
            </Link>
            <Link href="/dashboard" className="btn btn-ghost text-white border-white/30 hover:bg-white/10">
              I’m a provider
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
