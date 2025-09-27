'use client'
import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'

type Suggest = { label: string; href: string }

const base: Suggest[] = [
  { label: 'Skin fade', href: '/customer?cat=Barber&q=skin%20fade' },
  { label: 'Silk press', href: '/customer?cat=Hairstylist&q=silk%20press' },
  { label: 'Acrylic set', href: '/customer?cat=Nail%20Technician&q=acrylic' },
  { label: 'Beard trim', href: '/customer?cat=Barber&q=beard' },
  { label: 'Braids', href: '/customer?cat=Hairstylist&q=braids' },
]

export default function SearchBar() {
  const [service, setService] = useState('')
  const [location, setLocation] = useState('')
  const [when, setWhen] = useState('')
  const [focus, setFocus] = useState<'service'|'location'|null>(null)

  const suggestions = useMemo(() => {
    const s = service.trim().toLowerCase()
    if (!s) return base.slice(0,5)
    return base.filter(x => x.label.toLowerCase().includes(s)).slice(0,5)
  }, [service])

  useEffect(() => {
    // auto-fill “today” / “tomorrow” keywords into date field (simple UX sugar)
    if (/tomorrow/i.test(when)) setWhen(new Date(Date.now()+86400000).toLocaleDateString())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [when])

  return (
    <div className="panel p-3 md:p-4">
      <form action="/customer" className="grid md:grid-cols-[1.2fr,1fr,0.8fr,auto] gap-2">
        <div className="relative">
          <input className="input" name="q" value={service} onChange={e=>setService(e.target.value)} placeholder="Search services (e.g., skin fade)" onFocus={()=>setFocus('service')} onBlur={()=>setTimeout(()=>setFocus(null),150)} />
          {focus==='service' && suggestions.length>0 && (
            <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-10">
              {suggestions.map(s => (
                <Link key={s.label} href={s.href} className="block px-3 py-2 hover:bg-gray-50 text-sm">{s.label}</Link>
              ))}
              <div className="px-3 py-2 text-xs text-gray-500 border-t">💡 Tip: Describe it naturally — “low taper, El Cajon, 3pm”.</div>
            </div>
          )}
        </div>
        <input className="input" name="city" value={location} onChange={e=>setLocation(e.target.value)} placeholder="Location (e.g., El Cajon)" onFocus={()=>setFocus('location')} onBlur={()=>setTimeout(()=>setFocus(null),150)} />
        <input className="input" name="date" value={when} onChange={e=>setWhen(e.target.value)} placeholder="Date (e.g., 10/12/2025)" />
        <button className="btn btn-primary">Search</button>
      </form>
      <div className="flex flex-wrap gap-2 pt-2">
        <Link href="/customer?cat=Barber" className="chip">Barbers</Link>
        <Link href="/customer?cat=Hairstylist" className="chip">Hairstylists</Link>
        <Link href="/customer?cat=Nail%20Technician" className="chip">Nail techs</Link>
        <Link href="/customer" className="chip">Nearby</Link>
      </div>
    </div>
  )
}
