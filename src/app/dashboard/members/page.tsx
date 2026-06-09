import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

const statusColors: Record<string, string> = {
  Committed: 'bg-green-100 text-green-700',
  Interested: 'bg-yellow-100 text-yellow-700',
  Exploring: 'bg-blue-100 text-blue-700',
}

export default async function MembersPage() {
  const supabase = await createClient()
  const { data: members } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })

  const all = members ?? []
  const committed = all.filter(m => m.status === 'Committed').length
  const interested = all.filter(m => m.status === 'Interested').length
  const exploring = all.filter(m => m.status === 'Exploring').length

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <p className="by-label" style={{ marginBottom: '0.5rem' }}>Organization</p>
          <h1 style={{ fontSize: 'var(--by-hero)', fontWeight: 300, letterSpacing: '-0.015em' }}>Members</h1>
          <p style={{ fontSize: 'var(--by-small)', color: 'rgba(44,62,80,0.45)', marginTop: '0.25rem', fontWeight: 300 }}>{all.length} total members</p>
        </div>
        <Link href="/dashboard/members/new" className="by-btn-primary">+ Add Member</Link>
      </div>

      <div className="grid grid-cols-3 gap-4" style={{ marginBottom: '1.5rem' }}>
        {[['Committed', committed], ['Interested', interested], ['Exploring', exploring]].map(([label, count]) => (
          <div key={label as string} className="by-card" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: 'var(--by-heading)', fontWeight: 500 }}>{count}</div>
            <div style={{ fontSize: 'var(--by-small)', color: 'rgba(44,62,80,0.5)', marginTop: '0.2rem', fontWeight: 300 }}>{label}</div>
          </div>
        ))}
      </div>

      <div className="by-card" style={{ overflow: 'hidden', padding: 0 }}>
        <table style={{ width: '100%', fontSize: 'var(--by-small)', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--by-gray)', borderBottom: '1px solid rgba(44,62,80,0.06)' }}>
              {['Name', 'Contact', 'Family', 'Status', 'Joined'].map(h => (
                <th key={h} className="by-label" style={{ textAlign: 'left', padding: '0.75rem 1.5rem', fontWeight: 500 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {all.map((m, i) => (
              <tr key={m.id} style={{ borderTop: i > 0 ? '1px solid rgba(44,62,80,0.05)' : 'none' }}>
                <td style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>
                  {m.full_name || `${m.first_name ?? ''} ${m.last_name ?? ''}`.trim() || '—'}
                </td>
                <td style={{ padding: '1rem 1.5rem', color: 'rgba(44,62,80,0.5)', fontWeight: 300 }}>
                  <div style={{ fontSize: '0.7rem', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>{m.id}</div>
                  <div style={{ fontSize: '0.75rem', marginTop: '0.15rem' }}>{m.phone ?? '—'}</div>
                </td>
                <td style={{ padding: '1rem 1.5rem', color: 'rgba(44,62,80,0.55)', fontWeight: 300 }}>{m.family_size ? `${m.family_size}` : '—'}</td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', border: '1px solid rgba(44,62,80,0.15)', borderRadius: '9999px', padding: '0.2rem 0.6rem', color: 'var(--by-primary-light)' }}>
                    {m.status ?? 'Exploring'}
                  </span>
                </td>
                <td style={{ padding: '1rem 1.5rem', color: 'rgba(44,62,80,0.4)', fontWeight: 300 }}>
                  {m.created_at ? new Date(m.created_at).toLocaleDateString() : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {all.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'rgba(44,62,80,0.35)', fontWeight: 300, fontSize: 'var(--by-small)' }}>
            No members yet. Add your first member above.
          </div>
        )}
      </div>
    </div>
  )
}
