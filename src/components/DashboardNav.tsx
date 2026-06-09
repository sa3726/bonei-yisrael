'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import BoneiLogo from '@/components/BoneiLogo'

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: '🏠' },
  { label: 'Members', href: '/dashboard/members', icon: '👥' },
  { label: 'Events', href: '/dashboard/events', icon: '📅' },
  { label: 'Forum', href: '/dashboard/forum', icon: '💬' },
  { label: 'Chat', href: '/dashboard/chat', icon: '⚡' },
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
    <aside className="w-56 flex flex-col min-h-screen shrink-0" style={{ background: '#2C3E50' }}>
      <div className="px-5 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <BoneiLogo variant="light" size="sm" href="/dashboard" />
      </div>
      <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5">
        {navItems.map(item => {
          const active = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link key={item.href} href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors"
              style={{
                background: active ? 'rgba(255,255,255,0.1)' : 'transparent',
                color: active ? '#ffffff' : 'rgba(255,255,255,0.5)',
              }}>
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>
      <div className="px-6 py-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <p className="text-xs truncate mb-2" style={{ color: 'rgba(255,255,255,0.3)' }}>{user.email}</p>
        <button onClick={handleSignOut}
          className="text-sm transition-colors"
          style={{ color: 'rgba(255,255,255,0.4)' }}
          onMouseOver={e => (e.currentTarget.style.color = 'white')}
          onMouseOut={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}>
          Sign out
        </button>
      </div>
    </aside>
  )
}
