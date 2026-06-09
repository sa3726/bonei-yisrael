'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: '🏠' },
  { label: 'Members', href: '/dashboard/members', icon: '👥' },
  { label: 'Events', href: '/dashboard/events', icon: '📅' },
  { label: 'Communications', href: '/dashboard/communications', icon: '📢' },
  { label: 'Donations', href: '/dashboard/donations', icon: '💛' },
]

export default function DashboardNav({ user }: { user: { email?: string } }) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <aside className="w-60 bg-blue-950 text-white flex flex-col min-h-screen">
      <div className="px-6 py-6 border-b border-blue-900">
        <div className="font-bold text-lg">Bonei Yisrael</div>
        <div className="text-blue-400 text-xs">בוני ישראל</div>
      </div>
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {navItems.map(item => {
          const active = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                active ? 'bg-blue-800 text-white' : 'text-blue-300 hover:bg-blue-900 hover:text-white'
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>
      <div className="px-6 py-4 border-t border-blue-900">
        <p className="text-blue-400 text-xs truncate mb-2">{user.email}</p>
        <button
          onClick={handleSignOut}
          className="text-sm text-blue-300 hover:text-white transition-colors"
        >
          Sign out
        </button>
      </div>
    </aside>
  )
}
