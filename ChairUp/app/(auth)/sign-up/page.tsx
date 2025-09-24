'use client'
import { createClient } from '@supabase/supabase-js'
import { useState } from 'react'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
export default function SignUp() {
  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')
  const [role, setRole] = useState<'customer' | 'business'>('customer')
  const [msg, setMsg] = useState<string | null>(null)
  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const { error } = await supabase.auth.signUp({ email, password: pwd, options: { data: { role }}})
    setMsg(error ? error.message : 'Account created! Check your email.')
  }
  return (
    <div className="container max-w-lg py-16">
      <h1 className="text-3xl font-bold mb-6">Create your account</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <label className={`rounded border border-white/10 p-3 cursor-pointer ${role==='customer'?'bg-white/10':''}`}>
            <input type="radio" name="role" className="mr-2" checked={role==='customer'} onChange={()=>setRole('customer')} />
            I’m a Customer
          </label>
          <label className={`rounded border border-white/10 p-3 cursor-pointer ${role==='business'?'bg-white/10':''}`}>
            <input type="radio" name="role" className="mr-2" checked={role==='business'} onChange={()=>setRole('business')} />
            I’m a Business
          </label>
        </div>
        <input className="w-full px-3 py-2 rounded bg-white/10" placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="w-full px-3 py-2 rounded bg-white/10" placeholder="Password" type="password" value={pwd} onChange={e=>setPwd(e.target.value)} />
        <button className="px-4 py-2 rounded bg-brand hover:bg-brand-dark">Create account</button>
      </form>
      {msg && <p className="mt-4 text-white/70">{msg}</p>}
      <p className="mt-6 text-sm text-white/60">Already have an account? <a className="underline" href="/sign-in">Sign in</a></p>
    </div>
  )
}
