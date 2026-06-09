import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

const campaigns = ['General Fund', 'Schools Initiative', 'Shul Building', 'Safety & Security']

export default async function DonationsPage() {
  const supabase = await createClient()
  const { data: donations } = await supabase
    .from('donations')
    .select('*')
    .order('date', { ascending: false })

  const all = donations ?? []
  const total = all.reduce((sum, d) => sum + Number(d.amount), 0)

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <p className="by-label" style={{ marginBottom: '0.5rem' }}>Finance</p>
          <h1 style={{ fontSize: 'var(--by-hero)', fontWeight: 300, letterSpacing: '-0.015em' }}>Donations</h1>
          <p style={{ fontSize: 'var(--by-small)', color: 'rgba(44,62,80,0.45)', marginTop: '0.25rem', fontWeight: 300 }}>${total.toLocaleString()} raised total</p>
        </div>
        <Link href="/dashboard/donations/new" className="by-btn-primary">+ Record Donation</Link>
      </div>

      {/* Campaign breakdown */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" style={{ marginBottom: '1.5rem' }}>
        {campaigns.map(c => {
          const amount = all.filter(d => d.campaign === c).reduce((s, d) => s + Number(d.amount), 0)
          return (
            <div key={c} className="by-card" style={{ padding: '1.25rem' }}>
              <div style={{ fontSize: 'var(--by-subheading)', fontWeight: 500 }}>${amount.toLocaleString()}</div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(44,62,80,0.5)', marginTop: '0.25rem', fontWeight: 300 }}>{c}</div>
            </div>
          )
        })}
      </div>

      <div className="by-card" style={{ overflow: 'hidden', padding: 0 }}>
        <table style={{ width: '100%', fontSize: 'var(--by-small)', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--by-gray)', borderBottom: '1px solid rgba(44,62,80,0.06)' }}>
              {['Donor', 'Amount', 'Campaign', 'Date'].map(h => (
                <th key={h} className="by-label" style={{ textAlign: 'left', padding: '0.75rem 1.5rem' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {all.map((d, i) => (
              <tr key={d.id} style={{ borderTop: i > 0 ? '1px solid rgba(44,62,80,0.05)' : 'none' }}>
                <td style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>
                  {d.anonymous ? 'Anonymous' : (d.donor_name || '—')}
                </td>
                <td style={{ padding: '1rem 1.5rem', fontWeight: 500, color: 'var(--by-primary)' }}>
                  ${Number(d.amount).toLocaleString()}
                </td>
                <td style={{ padding: '1rem 1.5rem', color: 'rgba(44,62,80,0.6)', fontWeight: 300 }}>{d.campaign ?? '—'}</td>
                <td style={{ padding: '1rem 1.5rem', color: 'rgba(44,62,80,0.5)', fontWeight: 300 }}>
                  {d.date ? new Date(d.date + 'T12:00:00').toLocaleDateString() : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {all.length > 0 && (
          <div style={{ padding: '0.875rem 1.5rem', borderTop: '1px solid rgba(44,62,80,0.06)', display: 'flex', justifyContent: 'space-between', background: 'var(--by-gray)' }}>
            <span style={{ fontSize: 'var(--by-small)', color: 'rgba(44,62,80,0.5)', fontWeight: 300 }}>{all.length} donations</span>
            <span style={{ fontSize: 'var(--by-small)', fontWeight: 500 }}>Total: ${total.toLocaleString()}</span>
          </div>
        )}
        {all.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'rgba(44,62,80,0.35)', fontWeight: 300, fontSize: 'var(--by-small)' }}>
            No donations recorded yet.
          </div>
        )}
      </div>
    </div>
  )
}
