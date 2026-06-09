import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import QuickActions from '@/components/QuickActions'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const today = new Date().toISOString().split('T')[0]

  const [
    { count: memberCount },
    { count: upcomingCount },
    { data: nextEvent },
    { count: sentCount },
    { count: draftCount },
    { data: donationData },
  ] = await Promise.all([
    supabase.from('members').select('*', { count: 'exact', head: true }),
    supabase.from('events').select('*', { count: 'exact', head: true }).gte('date', today),
    supabase.from('events').select('title,date').gte('date', today).order('date', { ascending: true }).limit(1),
    supabase.from('communications').select('*', { count: 'exact', head: true }).eq('status', 'Sent'),
    supabase.from('communications').select('*', { count: 'exact', head: true }).eq('status', 'Draft'),
    supabase.from('donations').select('amount'),
  ])

  const totalRaised = (donationData ?? []).reduce((s, d) => s + Number(d.amount), 0)
  const nextEventLabel = nextEvent?.[0]
    ? new Date(nextEvent[0].date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    : null

  const stats = [
    { label: 'Total Members', value: String(memberCount ?? 0), sub: 'in the community', icon: '👥', href: '/dashboard/members' },
    { label: 'Upcoming Events', value: String(upcomingCount ?? 0), sub: nextEventLabel ? `Next: ${nextEventLabel}` : 'None scheduled', icon: '📅', href: '/dashboard/events' },
    { label: 'Messages Sent', value: String(sentCount ?? 0), sub: `${draftCount ?? 0} draft${draftCount !== 1 ? 's' : ''}`, icon: '📢', href: '/dashboard/communications' },
    { label: 'Total Raised', value: `$${totalRaised.toLocaleString()}`, sub: 'across all campaigns', icon: '💛', href: '/dashboard/donations' },
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
          <QuickActions />
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
