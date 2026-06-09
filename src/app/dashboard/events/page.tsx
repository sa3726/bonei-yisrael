import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function EventsPage() {
  const supabase = await createClient()
  const { data: events } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: true })

  const all = events ?? []
  const today = new Date().toISOString().split('T')[0]
  const upcoming = all.filter(e => e.date >= today)
  const past = all.filter(e => e.date < today)

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <p className="by-label" style={{ marginBottom: '0.5rem' }}>Calendar</p>
          <h1 style={{ fontSize: 'var(--by-hero)', fontWeight: 300, letterSpacing: '-0.015em' }}>Events</h1>
          <p style={{ fontSize: 'var(--by-small)', color: 'rgba(44,62,80,0.45)', marginTop: '0.25rem', fontWeight: 300 }}>{upcoming.length} upcoming</p>
        </div>
        <Link href="/dashboard/events/new" className="by-btn-primary">+ Create Event</Link>
      </div>

      {upcoming.length > 0 && (
        <>
          <p className="by-label" style={{ marginBottom: '0.75rem' }}>Upcoming</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
            {upcoming.map(ev => <EventRow key={ev.id} ev={ev} />)}
          </div>
        </>
      )}

      {past.length > 0 && (
        <>
          <p className="by-label" style={{ marginBottom: '0.75rem', opacity: 0.5 }}>Past</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', opacity: 0.6 }}>
            {past.map(ev => <EventRow key={ev.id} ev={ev} />)}
          </div>
        </>
      )}

      {all.length === 0 && (
        <div className="by-card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <p style={{ fontSize: 'var(--by-body)', color: 'rgba(44,62,80,0.4)', marginBottom: '1.25rem', fontWeight: 300 }}>No events yet.</p>
          <Link href="/dashboard/events/new" className="by-btn-primary">Create First Event</Link>
        </div>
      )}
    </div>
  )
}

function EventRow({ ev }: { ev: any }) {
  const d = ev.date ? new Date(ev.date + 'T12:00:00') : null
  return (
    <div className="by-card" style={{ padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        {d && (
          <div style={{ textAlign: 'center', background: 'var(--by-gray)', borderRadius: '0.75rem', padding: '0.5rem 1rem', minWidth: '3.5rem' }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--by-primary-light)' }}>
              {d.toLocaleDateString('en-US', { month: 'short' })}
            </div>
            <div style={{ fontSize: 'var(--by-heading)', fontWeight: 500, color: 'var(--by-primary)', lineHeight: 1.1 }}>
              {d.getDate()}
            </div>
          </div>
        )}
        <div>
          <h3 style={{ fontSize: 'var(--by-body)', fontWeight: 500 }}>{ev.title}</h3>
          <p style={{ fontSize: 'var(--by-small)', color: 'rgba(44,62,80,0.5)', marginTop: '0.2rem', fontWeight: 300 }}>
            {[ev.time, ev.location].filter(Boolean).join(' · ') || 'No details'}
          </p>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexShrink: 0 }}>
        {ev.capacity && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 'var(--by-body)', fontWeight: 500 }}>{ev.capacity}</div>
            <div style={{ fontSize: '0.7rem', color: 'rgba(44,62,80,0.4)', fontWeight: 300 }}>Capacity</div>
          </div>
        )}
        <span style={{ fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', border: '1px solid rgba(44,62,80,0.15)', borderRadius: '9999px', padding: '0.2rem 0.7rem', color: 'var(--by-primary-light)' }}>
          {ev.status ?? 'Upcoming'}
        </span>
      </div>
    </div>
  )
}
