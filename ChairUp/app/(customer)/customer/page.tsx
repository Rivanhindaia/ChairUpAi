'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
type Biz = { id: string; name: string; category: string | null; city: string | null }
export default function CustomerPage() {
  const [q, setQ] = useState('')
  const [rows, setRows] = useState<Biz[]>([])
  useEffect(()=>{ supabase.from('businesses').select('id,name,category,city').then(({ data })=> setRows(data ?? [])) },[])
  const filtered = rows.filter(r => (r.name + r.category + r.city).toLowerCase().includes(q.toLowerCase()))
  return (
    <div className="container py-10 space-y-6">
      <h1 className="text-3xl font-bold">Find a pro</h1>
      <input className="w-full px-3 py-2 rounded bg-white/10" placeholder="Search by name, category, city..." value={q} onChange={e=>setQ(e.target.value)} />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(b => (
          <a key={b.id} href={`/customer/${b.id}`} className="rounded-xl border border-white/10 p-4 hover:bg-white/5">
            <div className="font-semibold">{b.name}</div>
            <div className="text-sm text-white/60">{b.category ?? '—'} • {b.city ?? '—'}</div>
            <div className="mt-3 text-xs text-white/50">Tap to view services & book</div>
          </a>
        ))}
        {filtered.length === 0 && <div className="text-white/60">No results yet — try adding a business in Onboarding.</div>}
      </div>
    </div>
  )
}
