'use client'

import { useState } from 'react'
import Link from 'next/link'

const mockEvents = [
  { id: 1, title: 'Afula Community Info Night', date: '2026-06-20', time: '7:00 PM', location: 'Deal, NJ', attendees: 34, status: 'Upcoming' },
  { id: 2, title: 'Shabbaton in Afula', date: '2026-07-11', time: '6:00 PM', location: 'Afula, Israel', attendees: 12, status: 'Upcoming' },
  { id: 3, title: 'Town Hall: Schools & Education', date: '2026-06-15', time: '8:00 PM', location: 'Brooklyn, NY', attendees: 55, status: 'Upcoming' },
  { id: 4, title: 'Pesach Community Gathering', date: '2026-04-18', time: '6:30 PM', location: 'Deal, NJ', attendees: 80, status: 'Past' },
  { id: 5, title: 'Tu Bishvat Kickoff Event', date: '2026-02-01', time: '7:00 PM', location: 'Brooklyn, NY', attendees: 60, status: 'Past' },
]

export default function EventsPage() {
  const [filter, setFilter] = useState('Upcoming')
  const filtered = filter === 'All' ? mockEvents : mockEvents.filter(e => e.status === filter)
  const upcoming = mockEvents.filter(e => e.status === 'Upcoming').length

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <p className="by-label" style={{ marginBottom: '0.5rem' }}>Calendar</p>
          <h1 style={{ fontSize: 'var(--by-hero)', fontWeight: 300, letterSpacing: '-0.015em' }}>Events</h1>
          <p style={{ fontSize: 'var(--by-small)', color: 'rgba(44,62,80,0.45)', marginTop: '0.25rem', fontWeight: 300 }}>{upcoming} upcoming</p>
        </div>
        <Link href="/dashboard/events/new" className="by-btn-primary">+ Create Event</Link>
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        {['Upcoming', 'Past', 'All'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            style={{
              padding: '0.4rem 1.1rem', borderRadius: '9999px', fontSize: 'var(--by-small)', fontWeight: 500, cursor: 'pointer', border: 'none',
              background: filter === f ? 'var(--by-primary)' : 'white',
              color: filter === f ? 'white' : 'rgba(44,62,80,0.6)',
              boxShadow: filter === f ? 'none' : '0 0 0 1px rgba(44,62,80,0.12)',
              transition: 'all 0.2s',
            }}>
            {f}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {filtered.map(ev => (
          <div key={ev.id} className="by-card" style={{ padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div style={{ textAlign: 'center', background: 'var(--by-gray)', borderRadius: '0.75rem', padding: '0.5rem 1rem', minWidth: '3.5rem' }}>
                <div style={{ fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--by-primary-light)' }}>
                  {new Date(ev.date).toLocaleDateString('en-US', { month: 'short' })}
                </div>
                <div style={{ fontSize: 'var(--by-heading)', fontWeight: 500, color: 'var(--by-primary)', lineHeight: 1.1 }}>
                  {new Date(ev.date).getDate()}
                </div>
              </div>
              <div>
                <h3 style={{ fontSize: 'var(--by-body)', fontWeight: 500 }}>{ev.title}</h3>
                <p style={{ fontSize: 'var(--by-small)', color: 'rgba(44,62,80,0.5)', marginTop: '0.2rem', fontWeight: 300 }}>{ev.time} · {ev.location}</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexShrink: 0 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 'var(--by-body)', fontWeight: 500 }}>{ev.attendees}</div>
                <div style={{ fontSize: '0.7rem', color: 'rgba(44,62,80,0.4)', fontWeight: 300 }}>Registered</div>
              </div>
              <span style={{ fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', border: '1px solid rgba(44,62,80,0.15)', borderRadius: '9999px', padding: '0.2rem 0.7rem', color: ev.status === 'Upcoming' ? 'var(--by-primary)' : 'rgba(44,62,80,0.4)' }}>
                {ev.status}
              </span>
              <button style={{ fontSize: 'var(--by-small)', color: 'var(--by-primary-light)', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer' }}>Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
