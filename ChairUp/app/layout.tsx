import './globals.css'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'ChairUp — Book Local Pros',
  description: 'Booking platform for barbers, hairstylists, nail techs, and more.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b border-white/10">
          <nav className="container flex items-center gap-6 h-16">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <img src="/logo.svg" alt="ChairUp" className="h-8 w-auto" />
            </Link>
            <div className="ml-auto flex items-center gap-4">
              <Link href="/customer" className="hover:text-brand">Find Pros</Link>
              <Link href="/dashboard" className="hover:text-brand">Business</Link>
              <Link href="/sign-in" className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20">Sign in</Link>
            </div>
          </nav>
        </header>
        <main className="min-h-[calc(100vh-4rem)]">{children}</main>
        <footer className="border-t border-white/10 py-8 mt-12">
          <div className="container text-sm text-white/60">© {new Date().getFullYear()} ChairUp</div>
        </footer>
      </body>
    </html>
  )
}
