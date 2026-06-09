'use client'

import { useState } from 'react'
import Link from 'next/link'

const mockAnnouncements = [
  { id: 1, title: 'Shavuot Issue #3 Newsletter', type: 'Newsletter', date: '2026-06-01', recipients: 120, status: 'Sent' },
  { id: 2, title: 'Important: Afula Site Visit Registration Open', type: 'Announcement', date: '2026-05-28', recipients: 98, status: 'Sent' },
  { id: 3, title: 'Pesach Issue #2 Newsletter', type: 'Newsletter', date: '2026-04-10', recipients: 110, status: 'Sent' },
  { id: 4, title: 'Summer Community Trip Details', type: 'Announcement', date: '2026-06-15', recipients: 0, status: 'Draft' },
  { id: 5, title: 'Tu Bishvat Issue #1 Newsletter', type: 'Newsletter', date: '2026-02-01', recipients: 85, status: 'Sent' },
]

export default function CommunicationsPage() {
  const [filter, setFilter] = useState('All')
  const filtered = filter === 'All' ? mockAnnouncements : mockAnnouncements.filter(a => a.type === filter || a.status === filter)

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <p className="by-label" style={{ marginBottom: '0.5rem' }}>Outreach</p>
          <h1 style={{ fontSize: 'var(--by-hero)', fontWeight: 300, letterSpacing: '-0.015em' }}>Communications</h1>
          <p style={{ fontSize: 'var(--by-small)', color: 'rgba(44,62,80,0.45)', marginTop: '0.25rem', fontWeight: 300 }}>Newsletters & announcements</p>
        </div>
        <Link href="/dashboard/communications/new" className="by-btn-primary">+ New Message</Link>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {['All', 'Newsletter', 'Announcement', 'Draft'].map(f => (
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
              {['Title', 'Type', 'Date', 'Recipients', 'Status', ''].map((h, i) => (
                <th key={i} className="by-label" style={{ textAlign: 'left', padding: '0.75rem 1.5rem' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((a, i) => (
              <tr key={a.id} style={{ borderTop: i > 0 ? '1px solid rgba(44,62,80,0.05)' : 'none' }}>
                <td style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>{a.title}</td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', border: '1px solid rgba(44,62,80,0.15)', borderRadius: '9999px', padding: '0.2rem 0.6rem', color: 'var(--by-primary-light)' }}>
                    {a.type}
                  </span>
                </td>
                <td style={{ padding: '1rem 1.5rem', color: 'rgba(44,62,80,0.5)', fontWeight: 300 }}>{a.date}</td>
                <td style={{ padding: '1rem 1.5rem', color: 'rgba(44,62,80,0.6)', fontWeight: 300 }}>{a.recipients > 0 ? a.recipients : '—'}</td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', border: '1px solid rgba(44,62,80,0.15)', borderRadius: '9999px', padding: '0.2rem 0.6rem', color: a.status === 'Sent' ? 'var(--by-primary)' : 'rgba(44,62,80,0.5)' }}>
                    {a.status}
                  </span>
                </td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <button style={{ fontSize: 'var(--by-small)', color: 'var(--by-primary-light)', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer' }}>
                    {a.status === 'Draft' ? 'Edit' : 'View'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
