import './globals.css'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'ChairUp — Book Local Pros',
  description: 'Discover, book, and manage beauty & grooming appointments with ease.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-gray-200">
          <nav className="container flex items-center gap-6 h-16">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <img src="/logo.svg" alt="ChairUp" className="h-8 w-auto" />
              <span className="hidden sm:block">ChairUp</span>
            </Link>
            <div className="ml-auto hidden md:flex items-center gap-6 text-sm">
              <Link href="/customer" className="hover:text-brand">Find Pros</Link>
              <Link href="/dashboard" className="hover:text-brand">Business</Link>
              <Link href="/sign-in" className="btn btn-ghost">Sign in</Link>
              <Link href="/sign-up" className="btn btn-primary">Get started</Link>
            </div>
            <div className="md:hidden ml-auto">
              <Link href="/sign-up" className="btn btn-primary">Start</Link>
            </div>
          </nav>
        </header>

        <main>{children}</main>

        <footer className="border-t border-gray-200 bg-white">
          <div className="container py-10 grid sm:grid-cols-2 md:grid-cols-4 gap-6 text-sm text-gray-600">
            <div>
              <div className="font-semibold text-gray-900 mb-3">ChairUp</div>
              <p>Book barbers, hairstylists, nail techs & more — fast.</p>
            </div>
            <div>
              <div className="font-semibold text-gray-900 mb-3">Product</div>
              <ul className="space-y-2">
                <li><a href="/customer" className="hover:text-gray-900">Find pros</a></li>
                <li><a href="/dashboard" className="hover:text-gray-900">Business</a></li>
                <li><a href="/onboarding" className="hover:text-gray-900">Onboarding</a></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-gray-900 mb-3">Resources</div>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-gray-900">Help Center</a></li>
                <li><a href="#" className="hover:text-gray-900">Safety</a></li>
                <li><a href="#" className="hover:text-gray-900">Privacy</a></li>
              </ul>
            </div>
            <div className="text-gray-500">© {new Date().getFullYear()} ChairUp</div>
          </div>
        </footer>
      </body>
    </html>
  )
}
