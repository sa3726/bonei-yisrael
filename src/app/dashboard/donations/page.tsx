'use client'

import { useState } from 'react'
import Link from 'next/link'

const mockDonations = [
  { id: 1, donor: 'David Cohen', amount: 5000, campaign: 'General Fund', date: '2026-06-01', status: 'Completed' },
  { id: 2, donor: 'Joseph Sassoon', amount: 10000, campaign: 'Schools Initiative', date: '2026-05-28', status: 'Completed' },
  { id: 3, donor: 'Anonymous', amount: 1800, campaign: 'General Fund', date: '2026-05-20', status: 'Completed' },
  { id: 4, donor: 'Michael Sutton', amount: 2500, campaign: 'Shul Building', date: '2026-05-15', status: 'Completed' },
  { id: 5, donor: 'Rachel Mizrahi', amount: 500, campaign: 'General Fund', date: '2026-05-10', status: 'Completed' },
]

const campaigns = ['General Fund', 'Schools Initiative', 'Shul Building', 'Safety & Security']

export default function DonationsPage() {
  const [filter, setFilter] = useState('All')
  const total = mockDonations.reduce((sum, d) => sum + d.amount, 0)
  const filtered = filter === 'All' ? mockDonations : mockDonations.filter(d => d.campaign === filter)

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

      {/* Campaign cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" style={{ marginBottom: '1.5rem' }}>
        {campaigns.map(c => {
          const amount = mockDonations.filter(d => d.campaign === c).reduce((s, d) => s + d.amount, 0)
          return (
            <div key={c} className="by-card" style={{ padding: '1.25rem' }}>
              <div style={{ fontSize: 'var(--by-subheading)', fontWeight: 500 }}>${amount.toLocaleString()}</div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(44,62,80,0.5)', marginTop: '0.25rem', fontWeight: 300 }}>{c}</div>
            </div>
          )
        })}
      </div>

      {/* Filter */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        {['All', ...campaigns].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            style={{
              padding: '0.4rem 1rem', borderRadius: '9999px', fontSize: 'var(--by-small)', fontWeight: 500, cursor: 'pointer', border: 'none',
              background: filter === f ? 'var(--by-primary)' : 'white',
              color: filter === f ? 'white' : 'rgba(44,62,80,0.6)',
              boxShadow: filter === f ? 'none' : '0 0 0 1px rgba(44,62,80,0.12)',
            }}>
            {f}
          </button>
        ))}
      </div>

      <div className="by-card" style={{ overflow: 'hidden', padding: 0 }}>
        <table style={{ width: '100%', fontSize: 'var(--by-small)', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--by-gray)', borderBottom: '1px solid rgba(44,62,80,0.06)' }}>
              {['Donor', 'Amount', 'Campaign', 'Date', 'Status'].map(h => (
                <th key={h} className="by-label" style={{ textAlign: 'left', padding: '0.75rem 1.5rem' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((d, i) => (
              <tr key={d.id} style={{ borderTop: i > 0 ? '1px solid rgba(44,62,80,0.05)' : 'none' }}>
                <td style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>{d.donor}</td>
                <td style={{ padding: '1rem 1.5rem', fontWeight: 500, color: 'var(--by-primary)' }}>${d.amount.toLocaleString()}</td>
                <td style={{ padding: '1rem 1.5rem', color: 'rgba(44,62,80,0.6)', fontWeight: 300 }}>{d.campaign}</td>
                <td style={{ padding: '1rem 1.5rem', color: 'rgba(44,62,80,0.5)', fontWeight: 300 }}>{d.date}</td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', border: '1px solid rgba(44,62,80,0.15)', borderRadius: '9999px', padding: '0.2rem 0.6rem', color: 'var(--by-primary-light)' }}>
                    {d.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ padding: '0.875rem 1.5rem', borderTop: '1px solid rgba(44,62,80,0.06)', display: 'flex', justifyContent: 'space-between', background: 'var(--by-gray)' }}>
          <span style={{ fontSize: 'var(--by-small)', color: 'rgba(44,62,80,0.5)', fontWeight: 300 }}>{filtered.length} donations</span>
          <span style={{ fontSize: 'var(--by-small)', fontWeight: 500 }}>Total: ${filtered.reduce((s, d) => s + d.amount, 0).toLocaleString()}</span>
        </div>
      </div>
    </div>
  )
}
