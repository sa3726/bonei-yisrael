import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

const categoryColors: Record<string, string> = {
  General: 'bg-gray-100 text-gray-600',
  Matobu: 'bg-blue-100 text-blue-700',
  'Bnei Rachel': 'bg-purple-100 text-purple-700',
  Aliyah: 'bg-green-100 text-green-700',
  Schools: 'bg-yellow-100 text-yellow-700',
  Events: 'bg-orange-100 text-orange-700',
}

export default async function ForumPage() {
  const supabase = await createClient()
  const { data: threads } = await supabase
    .from('forum_threads')
    .select(`*, author:profiles(full_name, first_name, last_name), replies:forum_replies(count)`)
    .order('pinned', { ascending: false })
    .order('created_at', { ascending: false })

  const all = threads ?? []

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <p className="by-label" style={{ marginBottom: '0.5rem' }}>Community</p>
          <h1 style={{ fontSize: 'var(--by-hero)', fontWeight: 300, letterSpacing: '-0.015em' }}>Forum</h1>
          <p style={{ fontSize: 'var(--by-small)', color: 'rgba(44,62,80,0.45)', marginTop: '0.25rem', fontWeight: 300 }}>Discussions, updates & questions</p>
        </div>
        <Link href="/dashboard/forum/new" className="by-btn-primary">+ New Thread</Link>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {all.map((t: any) => {
          const name = t.author?.full_name || `${t.author?.first_name ?? ''} ${t.author?.last_name ?? ''}`.trim() || 'Member'
          const initials = name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()
          const replyCount = t.replies?.[0]?.count ?? 0
          return (
            <Link key={t.id} href={`/dashboard/forum/${t.id}`} className="by-card"
              style={{ padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem', textDecoration: 'none' }}>
              <div style={{ width: '2.25rem', height: '2.25rem', borderRadius: '9999px', background: 'var(--by-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 500, flexShrink: 0 }}>
                {initials}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--by-primary-light)', border: '1px solid rgba(44,62,80,0.15)', borderRadius: '9999px', padding: '0.15rem 0.6rem' }}>
                    {t.category}
                  </span>
                  {t.pinned && <span style={{ fontSize: '0.7rem', color: 'rgba(44,62,80,0.4)' }}>📌 Pinned</span>}
                </div>
                <h3 style={{ fontSize: 'var(--by-body)', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.title}</h3>
                <p style={{ fontSize: '0.75rem', color: 'rgba(44,62,80,0.4)', marginTop: '0.2rem', fontWeight: 300 }}>
                  {name} · {new Date(t.created_at).toLocaleDateString()}
                </p>
              </div>
              <div style={{ fontSize: 'var(--by-small)', color: 'rgba(44,62,80,0.4)', flexShrink: 0, fontWeight: 300 }}>
                💬 {replyCount}
              </div>
            </Link>
          )
        })}
        {all.length === 0 && (
          <div className="by-card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <p style={{ fontSize: 'var(--by-body)', color: 'rgba(44,62,80,0.4)', marginBottom: '1.25rem', fontWeight: 300 }}>No threads yet. Start the conversation!</p>
            <Link href="/dashboard/forum/new" className="by-btn-primary">Create First Thread</Link>
          </div>
        )}
      </div>
    </div>
  )
}
