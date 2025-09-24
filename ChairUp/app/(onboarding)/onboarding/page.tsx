'use client'
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
const CATEGORIES = ['Barber','Hairstylist','Nail Technician','Makeup Artist','Tattoo Artist'] as const
type Cat = typeof CATEGORIES[number]
export default function Onboarding() {
  const [cat, setCat] = useState<Cat | null>(null)
  const [bizName, setBizName] = useState('')
  const [city, setCity] = useState('')
  const [msg, setMsg] = useState<string | null>(null)
  async function save() {
    const user = (await supabase.auth.getUser()).data.user
    if (!user) return setMsg('Please sign in.')
    const { error } = await supabase.from('businesses').insert({ owner_id: user.id, name: bizName || 'My Business', category: cat, city })
    setMsg(error ? error.message : 'Saved! Go to Dashboard →')
  }
  return (
    <div className="container max-w-2xl py-16 space-y-6">
      <h1 className="text-3xl font-bold">Tell us about your business</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {CATEGORIES.map(c => (
          <button key={c} onClick={()=>setCat(c)} className={`px-3 py-2 rounded border border-white/10 ${cat===c?'bg-white/10':''}`}>{c}</button>
        ))}
      </div>
      <input className="w-full px-3 py-2 rounded bg-white/10" placeholder="Business name" value={bizName} onChange={e=>setBizName(e.target.value)} />
      <input className="w-full px-3 py-2 rounded bg-white/10" placeholder="City" value={city} onChange={e=>setCity(e.target.value)} />
      <div className="flex gap-3">
        <button onClick={save} className="px-4 py-2 rounded bg-brand hover:bg-brand-dark">Save</button>
        <a href="/dashboard" className="px-4 py-2 rounded bg-white/10 hover:bg-white/20">Dashboard</a>
      </div>
      {msg && <p className="text-white/70">{msg}</p>}
    </div>
  )
}
