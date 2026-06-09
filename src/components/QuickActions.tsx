'use client'
import Link from 'next/link'

const actions = [
  { label: 'Add Member', href: '/dashboard/members/new', icon: '➕' },
  { label: 'Create Event', href: '/dashboard/events/new', icon: '📅' },
  { label: 'Send Message', href: '/dashboard/communications/new', icon: '📢' },
  { label: 'Record Donation', href: '/dashboard/donations/new', icon: '💛' },
]

export default function QuickActions() {
  return (
    <div className="grid grid-cols-2 gap-2">
      {actions.map(a => (
        <Link key={a.label} href={a.href}
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', borderRadius: '0.75rem', border: '1px solid rgba(44,62,80,0.08)', textDecoration: 'none', transition: 'background 0.2s' }}
          onMouseOver={e => (e.currentTarget.style.background = 'rgba(44,62,80,0.04)')}
          onMouseOut={e => (e.currentTarget.style.background = 'transparent')}>
          <span style={{ fontSize: '1.1rem' }}>{a.icon}</span>
          <span style={{ fontSize: 'var(--by-small)', fontWeight: 500, color: 'var(--by-primary)' }}>{a.label}</span>
        </Link>
      ))}
    </div>
  )
}
