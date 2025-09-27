'use client'

import { useEffect, useMemo, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type Service = { id: string; name: string; price_cents: number; duration_min: number }
type Booking = { id: string; start_at: string; end_at: string; status: 'scheduled'|'completed'|'canceled' }

export default function Dashboard() {
  const [services, setServices] = useState<Service[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [name, setName] = useState('')
  const [price, setPrice] = useState(3000)
  const [dur, setDur] = useState(30)

  useEffect(() => {
    (async () => {
      const user = (await supabase.auth.getUser()).data.user
      if (!user) return
      const { data: svc } = await supabase.from('services').select('id,name,price_cents,duration_min').eq('owner_id', user.id).order('created_at', { ascending: false })
      setServices(svc ?? [])

      const { data: bks } = await supabase.from('bookings').select('id,start_at,end_at,status').order('start_at', { ascending: true }).limit(12)
      setBookings(bks ?? [])
    })()
  }, [])

  async function addService() {
    const user = (await supabase.auth.getUser()).data.user
    if (!user) return alert('Please sign in.')
    const { data, error } = await supabase.from('services').insert({ owner_id: user.id, name, price_cents: price, duration_min: dur }).select()
    if (error) return alert(error.message)
    setServices(prev => [...(data ?? []), ...prev])
    setName(''); setPrice(3000); setDur(30)
  }

  const kpis = useMemo(() => {
    const upcoming = bookings.filter(b => b.status === 'scheduled').length
    const avgDur = services.length ? Math.round(services.reduce((a,s)=>a+s.duration_min,0)/services.length) : 0
    const avgPrice = services.length ? (services.reduce((a,s)=>a+s.price_cents,0)/services.length)/100 : 0
    return { upcoming, avgDur, avgPrice }
  }, [bookings, services])

  return (
    <div className="container section space-y-10">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Business Dashboard</h1>
          <p className="text-gray-600">Manage services, pricing, and bookings.</p>
        </div>
        <a href="/onboarding" className="btn btn-outline">Edit Profile</a>
      </header>

      {/* KPIs */}
      <section className="grid sm:grid-cols-3 gap-4">
        <div className="card p-5">
          <div className="text-sm text-gray-500">Upcoming bookings</div>
          <div className="mt-2 text-3xl font-semibold">{kpis.upcoming}</div>
        </div>
        <div className="card p-5">
          <div className="text-sm text-gray-500">Avg duration</div>
          <div className="mt-2 text-3xl font-semibold">{kpis.avgDur} min</div>
        </div>
        <div className="card p-5">
          <div className="text-sm text-gray-500">Avg price</div>
          <div className="mt-2 text-3xl font-semibold">${kpis.avgPrice.toFixed(2)}</div>
        </div>
      </section>

      {/* Services */}
      <section className="grid lg:grid-cols-3 gap-6">
        <div className="panel p-6 space-y-4 lg:col-span-1">
          <h2 className="font-semibold">Add a Service</h2>
          <input className="input" placeholder="Service name (e.g., Skin Fade)" value={name} onChange={e=>setName(e.target.value)} />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-500">Price (USD)</label>
              <input className="input" type="number" value={(price/100).toFixed(2)} onChange={e=>setPrice(Math.round(parseFloat(e.target.value||'0')*100))} />
            </div>
            <div>
              <label className="text-xs text-gray-500">Duration (min)</label>
              <input className="input" type="number" value={dur} onChange={e=>setDur(parseInt(e.target.value||'0'))} />
            </div>
          </div>
          <button onClick={addService} className="btn btn-primary w-full">Add service</button>
          <p className="text-xs text-gray-500">Edit anytime from the list.</p>
        </div>

        <div className="lg:col-span-2 card p-0 overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="font-semibold">Your Services</h2>
            <span className="text-sm text-gray-500">{services.length} total</span>
          </div>
          <div className="divide-y divide-gray-200">
            {services.map(s => (
              <div key={s.id} className="p-4 flex items-center justify-between">
                <div>
                  <div className="font-medium">{s.name}</div>
                  <div className="text-xs text-gray-500">{s.duration_min} min</div>
                </div>
                <div className="font-mono">${(s.price_cents/100).toFixed(2)}</div>
              </div>
            ))}
            {services.length === 0 && <div className="p-8 text-center text-gray-500">No services yet.</div>}
          </div>
        </div>
      </section>

      {/* Bookings */}
      <section className="card overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="font-semibold">Upcoming Bookings</h2>
          <span className="text-sm text-gray-500">{bookings.length} records</span>
        </div>
        <div className="divide-y divide-gray-200">
          {bookings.length === 0 && <div className="p-6 text-gray-500">No bookings yet.</div>}
          {bookings.map(b => (
            <div key={b.id} className="p-4 flex items-center justify-between">
              <div>
                <div className="font-medium">{new Date(b.start_at).toLocaleString()}</div>
                <div className="text-xs text-gray-500">Ends {new Date(b.end_at).toLocaleTimeString()}</div>
              </div>
              <div className="chip">{b.status}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
