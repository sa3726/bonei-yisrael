import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function CommunicationsPage() {
  const supabase = await createClient()
  const { data: comms } = await supabase
    .from('communications')
    .select('*')
    .order('created_at', { ascending: false })

  const all = comms ?? []
  const sent = all.filter(c => c.status === 'Sent').length
  const drafts = all.filter(c => c.status === 'Draft').length

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <p className="by-label" style={{ marginBottom: '0.5rem' }}>Outreach</p>
          <h1 style={{ fontSize: 'var(--by-hero)', fontWeight: 300, letterSpacing: '-0.015em' }}>Communications</h1>
          <p style={{ fontSize: 'var(--by-small)', color: 'rgba(44,62,80,0.45)', marginTop: '0.25rem', fontWeight: 300 }}>
            {sent} sent · {drafts} draft{drafts !== 1 ? 's' : ''}
          </p>
        </div>
        <Link href="/dashboard/communications/new" className="by-btn-primary">+ New Message</Link>
      </div>

      <div className="by-card" style={{ overflow: 'hidden', padding: 0 }}>
        <table style={{ width: '100%', fontSize: 'var(--by-small)', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--by-gray)', borderBottom: '1px solid rgba(44,62,80,0.06)' }}>
              {['Title', 'Type', 'Date', 'Status'].map((h, i) => (
                <th key={i} className="by-label" style={{ textAlign: 'left', padding: '0.75rem 1.5rem' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {all.map((a, i) => (
              <tr key={a.id} style={{ borderTop: i > 0 ? '1px solid rgba(44,62,80,0.05)' : 'none' }}>
                <td style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>{a.title}</td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', border: '1px solid rgba(44,62,80,0.15)', borderRadius: '9999px', padding: '0.2rem 0.6rem', color: 'var(--by-primary-light)' }}>
                    {a.type}
                  </span>
                </td>
                <td style={{ padding: '1rem 1.5rem', color: 'rgba(44,62,80,0.5)', fontWeight: 300 }}>
                  {a.sent_at
                    ? new Date(a.sent_at).toLocaleDateString()
                    : new Date(a.created_at).toLocaleDateString()}
                </td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', border: '1px solid rgba(44,62,80,0.15)', borderRadius: '9999px', padding: '0.2rem 0.6rem', color: a.status === 'Sent' ? 'var(--by-primary)' : 'rgba(44,62,80,0.5)' }}>
                    {a.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {all.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'rgba(44,62,80,0.35)', fontWeight: 300, fontSize: 'var(--by-small)' }}>
            No messages yet. Create your first announcement above.
          </div>
        )}
      </div>
    </div>
  )
}
