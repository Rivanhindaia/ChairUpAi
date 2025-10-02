import './globals.css'
import { Suspense } from 'react'
import Link from 'next/link'

export const metadata = { title: 'ChairUp', description: 'Book with confidence' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900">
        <header className="container py-5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-2xl bg-black text-white flex items-center justify-center font-bold">Cu</div>
            <div className="text-lg font-bold">Chair<span className="text-sky-500">Up</span></div>
          </Link>
          <nav className="flex gap-4 text-sm">
            <Link href="/app" className="hover:underline">Find appointments</Link>
            <Link href="/dashboard" className="hover:underline">Provider</Link>
            <Link href="/sign-in" className="btn">Sign in</Link>
          </nav>
        </header>
        <main className="container pb-24">
          <Suspense fallback={null}>{children}</Suspense>
        </main>
      </body>
    </html>
  )
}
