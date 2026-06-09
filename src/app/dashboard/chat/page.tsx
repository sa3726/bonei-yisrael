import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function ChatPage() {
  const supabase = await createClient()
  const { data: channels } = await supabase
    .from('chat_channels')
    .select('*')
    .order('name')

  const all = channels ?? []

  return (
    <div>
      <div style={{ marginBottom: '2.5rem' }}>
        <p className="by-label" style={{ marginBottom: '0.5rem' }}>Community</p>
        <h1 style={{ fontSize: 'var(--by-hero)', fontWeight: 300, letterSpacing: '-0.015em' }}>Chat</h1>
        <p style={{ fontSize: 'var(--by-small)', color: 'rgba(44,62,80,0.45)', marginTop: '0.25rem', fontWeight: 300 }}>Real-time messaging with fellow members</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {all.map((ch: any) => (
          <Link key={ch.id} href={`/dashboard/chat/${ch.id}`} className="by-card" style={{ padding: '1.5rem', textDecoration: 'none', display: 'block' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '1rem', fontWeight: 500, color: 'rgba(44,62,80,0.35)' }}>#</span>
              <h3 style={{ fontSize: 'var(--by-body)', fontWeight: 500 }}>{ch.name}</h3>
            </div>
            <p style={{ fontSize: 'var(--by-small)', color: 'rgba(44,62,80,0.5)', fontWeight: 300 }}>{ch.description}</p>
          </Link>
        ))}
        {all.length === 0 && (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 0' }}>
            <p style={{ fontSize: 'var(--by-body)', color: 'rgba(44,62,80,0.35)', fontWeight: 300 }}>No channels yet.</p>
            <p style={{ fontSize: 'var(--by-small)', color: 'rgba(44,62,80,0.25)', marginTop: '0.5rem', fontWeight: 300 }}>Run the database schema in Supabase to create channels.</p>
          </div>
        )}
      </div>
    </div>
  )
}
