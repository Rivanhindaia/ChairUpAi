'use client'

import { useEffect, useMemo, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import ProCard from '@/components/ProCard'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type Biz = { id: string; name: string; category: string | null; city: string | null }

const CATS = ['All','Barber','Hairstylist','Nail Technician','Makeup Artist','Tattoo Artist','Brows & Lashes'] as const

export default function CustomerPage() {
  const [rows, setRows] = useState<Biz[]>([])
  const [q, setQ] = useState('')
  const [cat, setCat] = useState<string>('All')
  const [city, setCity] = useState('')
  const [sort, setSort] = useState<'name'|'category'|'city'>('name')

  useEffect(() => {
    supabase.from('businesses').select('id,name,category,city').then(({ data }) => setRows(data ?? []))
  }, [])

  const filtered = useMemo(() => {
    const list = rows
      .filter(r => (cat==='All' ? true : (r.category||'').toLowerCase() === cat.toLowerCase()))
      .filter(r => (city ? (r.city||'').toLowerCase().includes(city.toLowerCase()) : true))
      .filter(r => (q ? (r.name + (r.category||'') + (r.city||'')).toLowerCase().includes(q.toLowerCase()) : true))
      .sort((a,b) => String(a[sort]||'').localeCompare(String(b[sort]||'')))
    return list
  }, [rows, q, cat, city, sort])

  return (
    <div className="container section space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold">Find a pro</h1>
        <p className="text-gray-600">Filter by category & city. Save favorites soon.</p>
      </header>

      <div className="panel p-4">
        <div className="grid lg:grid-cols-4 gap-3">
          <input className="input" placeholder="Search by name or service…" value={q} onChange={e=>setQ(e.target.value)} />
          <div className="flex gap-2 overflow-auto">
            {CATS.map(c => (
              <button key={c} onClick={()=>setCat(c)} className={`chip whitespace-nowrap ${cat===c?'border-black text-black':''}`}>{c}</button>
            ))}
          </div>
          <input className="input" placeholder="City (e.g., El Cajon)" value={city} onChange={e=>setCity(e.target.value)} />
          <select className="select" value={sort} onChange={e=>setSort(e.target.value as any)}>
            <option value="name">Sort: Name</option>
            <option value="category">Sort: Category</option>
            <option value="city">Sort: City</option>
          </select>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(b => (
          <ProCard key={b.id} id={b.id} name={b.name} category={b.category} city={b.city} />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full card p-10 text-center text-gray-500">
            No results. Try broadening your filters or add businesses via Onboarding.
          </div>
        )}
      </div>
    </div>
  )
}
