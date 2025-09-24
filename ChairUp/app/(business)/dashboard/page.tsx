'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
type Service = { id: string; name: string; price_cents: number; duration_min: number }
export default function Dashboard() {
  const [services, setServices] = useState<Service[]>([])
  const [name, setName] = useState('')
  const [price, setPrice] = useState(2500)
  const [dur, setDur] = useState(30)
  useEffect(()=>{ (async ()=>{
      const user = (await supabase.auth.getUser()).data.user
      if (!user) return
      const { data } = await supabase.from('services').select('id,name,price_cents,duration_min').eq('owner_id', user.id)
      setServices(data ?? [])
    })()
  },[])
  async function addService() {
    const user = (await supabase.auth.getUser()).data.user
    if (!user) return alert('Please sign in.')
    const { data, error } = await supabase.from('services').insert({ owner_id: user.id, name, price_cents: price, duration_min: dur }).select()
    if (error) alert(error.message)
    else setServices(prev => [...prev, ...(data ?? [])])
  }
  return (
    <div className="container py-10 space-y-6">
      <h1 className="text-3xl font-bold">Business Dashboard</h1>
      <section className="grid md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-white/10 p-4">
          <h2 className="font-semibold mb-3">Add a Service</h2>
          <div className="grid gap-2">
            <input className="px-3 py-2 rounded bg-white/10" placeholder="Service name (e.g., Fade)" value={name} onChange={e=>setName(e.target.value)} />
            <div className="grid grid-cols-2 gap-2">
              <input className="px-3 py-2 rounded bg-white/10" type="number" value={price} onChange={e=>setPrice(parseInt(e.target.value||'0'))} />
              <input className="px-3 py-2 rounded bg-white/10" type="number" value={dur} onChange={e=>setDur(parseInt(e.target.value||'0'))} />
            </div>
            <div className="text-xs text-white/60">Price in cents; Duration in minutes.</div>
            <button onClick={addService} className="px-4 py-2 rounded bg-brand hover:bg-brand-dark w-max">Add service</button>
          </div>
        </div>
        <div className="rounded-xl border border-white/10 p-4">
          <h2 className="font-semibold mb-3">Your Services</h2>
          <ul className="space-y-2">
            {services.map(s => (
              <li key={s.id} className="rounded border border-white/10 p-3 flex justify-between">
                <div>
                  <div className="font-semibold">{s.name}</div>
                  <div className="text-xs text-white/60">{s.duration_min} min</div>
                </div>
                <div className="font-mono">${(s.price_cents/100).toFixed(2)}</div>
              </li>
            ))}
            {services.length === 0 && <div className="text-white/60">No services yet.</div>}
          </ul>
        </div>
      </section>
    </div>
  )
}
