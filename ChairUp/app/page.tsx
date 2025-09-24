import Link from 'next/link'

export default function Page() {
  return (
    <section className="container grid lg:grid-cols-2 gap-10 py-16 items-center">
      <div className="space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Book the best <span className="text-brand">barbers & stylists</span> near you
        </h1>
        <p className="text-white/70">ChairUp makes it effortless for customers to discover, book, and pay. Businesses get clean tools for schedules, services, and growth.</p>
        <div className="flex gap-3">
          <Link className="px-4 py-2 rounded-lg bg-brand hover:bg-brand-dark" href="/customer">Browse pros</Link>
          <Link className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20" href="/dashboard">I’m a pro</Link>
        </div>
      </div>
      <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 p-6">
        <div className="rounded-xl border border-white/10 p-4 bg-black">
          <div className="text-sm text-white/60 mb-3">AI Booking Assistant (demo)</div>
          <form action="/api/ai" method="post" className="flex gap-2">
            <input name="q" placeholder="I need a fade at 3pm tomorrow..." className="flex-1 px-3 py-2 rounded bg-white/10 outline-none" />
            <button className="px-4 py-2 rounded-lg bg-brand hover:bg-brand-dark" type="submit">Ask</button>
          </form>
          <p className="text-xs text-white/50 mt-3">Connects to OpenAI in /app/api/ai/route.ts</p>
        </div>
      </div>
    </section>
  )
}
