import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const stats = [
    { label: 'Total Members', value: '5', sub: '3 committed', icon: '👥', href: '/dashboard/members' },
    { label: 'Upcoming Events', value: '3', sub: 'Next: Jun 15', icon: '📅', href: '/dashboard/events' },
    { label: 'Messages Sent', value: '5', sub: '1 draft', icon: '📢', href: '/dashboard/communications' },
    { label: 'Total Raised', value: '$19,800', sub: 'Across 4 campaigns', icon: '💛', href: '/dashboard/donations' },
  ]

  const quickActions = [
    { label: 'Add Member', href: '/dashboard/members/new', icon: '➕' },
    { label: 'Create Event', href: '/dashboard/events/new', icon: '📅' },
    { label: 'Send Message', href: '/dashboard/communications/new', icon: '📢' },
    { label: 'Record Donation', href: '/dashboard/donations/new', icon: '💛' },
  ]

  return (
    <div>
      <div style={{ marginBottom: '2.5rem' }}>
        <p className="by-label" style={{ marginBottom: '0.5rem' }}>Dashboard</p>
        <h1 style={{ fontSize: 'var(--by-hero)', fontWeight: 300, letterSpacing: '-0.015em' }}>Shalom 👋</h1>
        <p style={{ fontSize: 'var(--by-small)', color: 'rgba(44,62,80,0.45)', marginTop: '0.25rem', fontWeight: 300 }}>{user?.email} · Bonei Yisrael</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(s => (
          <Link key={s.label} href={s.href} className="by-card" style={{ padding: '1.5rem', textDecoration: 'none' }}>
            <div style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>{s.icon}</div>
            <div style={{ fontSize: 'var(--by-heading)', fontWeight: 500, letterSpacing: '-0.01em' }}>{s.value}</div>
            <div style={{ fontSize: 'var(--by-small)', fontWeight: 500, marginTop: '0.25rem' }}>{s.label}</div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(44,62,80,0.4)', marginTop: '0.25rem', fontWeight: 300 }}>{s.sub}</div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="by-card" style={{ padding: '1.75rem' }}>
          <h2 style={{ fontSize: 'var(--by-body)', fontWeight: 500, marginBottom: '1.25rem' }}>Quick Actions</h2>
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map(a => (
              <Link key={a.label} href={a.href} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', borderRadius: '0.75rem', border: '1px solid rgba(44,62,80,0.08)', textDecoration: 'none', transition: 'background 0.2s' }}
                onMouseOver={e => (e.currentTarget.style.background = 'rgba(44,62,80,0.04)')}
                onMouseOut={e => (e.currentTarget.style.background = 'transparent')}>
                <span style={{ fontSize: '1.1rem' }}>{a.icon}</span>
                <span style={{ fontSize: 'var(--by-small)', fontWeight: 500 }}>{a.label}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="by-card" style={{ padding: '1.75rem' }}>
          <h2 style={{ fontSize: 'var(--by-body)', fontWeight: 500, marginBottom: '1.25rem' }}>Five Pillars</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {[
              { label: 'Community', hebrew: 'קהילה', icon: '🏘️' },
              { label: 'Schools', hebrew: 'חינוך', icon: '📚' },
              { label: 'Shuls', hebrew: 'בתי כנסת', icon: '🕍' },
              { label: 'Safety', hebrew: 'ביטחון', icon: '🛡️' },
              { label: 'Opportunity', hebrew: 'הזדמנות', icon: '💼' },
            ].map(p => (
              <div key={p.label} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.4rem 0' }}>
                <span style={{ fontSize: '1.1rem' }}>{p.icon}</span>
                <span style={{ fontSize: 'var(--by-small)', fontWeight: 500 }}>{p.label}</span>
                <span style={{ fontSize: 'var(--by-small)', color: 'rgba(44,62,80,0.35)', fontWeight: 300 }}>{p.hebrew}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
