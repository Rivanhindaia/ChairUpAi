'use client'
import { createClient } from '@supabase/supabase-js'
import { useState } from 'react'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
export default function SignIn() {
  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')
  const [msg, setMsg] = useState<string | null>(null)
  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({ email, password: pwd })
    setMsg(error ? error.message : 'Signed in!')
  }
  return (
    <div className="container max-w-lg py-16">
      <h1 className="text-3xl font-bold mb-6">Sign in</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <input className="w-full px-3 py-2 rounded bg-white/10" placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="w-full px-3 py-2 rounded bg-white/10" placeholder="Password" type="password" value={pwd} onChange={e=>setPwd(e.target.value)} />
        <button className="px-4 py-2 rounded bg-brand hover:bg-brand-dark">Sign in</button>
      </form>
      {msg && <p className="mt-4 text-white/70">{msg}</p>}
      <p className="mt-6 text-sm text-white/60">No account? <a className="underline" href="/sign-up">Create one</a></p>
    </div>
  )
}
