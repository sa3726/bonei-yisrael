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
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-blue-900">Shalom! 👋</h1>
        <p className="text-gray-500 text-sm mt-1">{user?.email} · Bonei Yisrael Admin</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map(s => (
          <Link key={s.label} href={s.href}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all">
            <div className="text-3xl mb-3">{s.icon}</div>
            <div className="text-2xl font-bold text-blue-900">{s.value}</div>
            <div className="text-sm font-medium text-gray-700">{s.label}</div>
            <div className="text-xs text-gray-400 mt-1">{s.sub}</div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-bold text-blue-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map(a => (
              <Link key={a.label} href={a.href}
                className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-colors">
                <span className="text-xl">{a.icon}</span>
                <span className="text-sm font-medium text-blue-900">{a.label}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-bold text-blue-900 mb-4">Our Five Pillars</h2>
          <div className="flex flex-col gap-2">
            {[
              { label: 'Community', hebrew: 'קהילה', icon: '🏘️' },
              { label: 'Schools', hebrew: 'חינוך', icon: '📚' },
              { label: 'Shuls', hebrew: 'בתי כנסת', icon: '🕍' },
              { label: 'Safety', hebrew: 'ביטחון', icon: '🛡️' },
              { label: 'Opportunity', hebrew: 'הזדמנות', icon: '💼' },
            ].map(p => (
              <div key={p.label} className="flex items-center gap-3 py-1.5">
                <span className="text-lg">{p.icon}</span>
                <span className="text-sm font-medium text-gray-800">{p.label}</span>
                <span className="text-sm text-gray-400 mr-auto">{p.hebrew}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
