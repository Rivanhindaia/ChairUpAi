// app/app/page.tsx
'use client'
import { useEffect, useState } from 'react'

// stop prerender/SSR for this route
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function Page() {
  const [Comp, setComp] = useState<null | React.ComponentType>(null)

  useEffect(() => {
    let mounted = true
    import('./AppClient').then(mod => mounted && setComp(() => mod.default))
    return () => { mounted = false }
  }, [])

  if (!Comp) return <div className="container py-8">Loading…</div>
  return <Comp />
}
