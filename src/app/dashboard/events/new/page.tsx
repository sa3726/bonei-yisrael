'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function NewEventPage() {
  const router = useRouter()
  const [form, setForm] = useState({ title: '', date: '', time: '', location: '', description: '', capacity: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError('')
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    const { error } = await supabase.from('events').insert({
      title: form.title,
      date: form.date || null,
      time: form.time || null,
      location: form.location || null,
      description: form.description || null,
      capacity: form.capacity ? parseInt(form.capacity) : null,
      created_by: user?.id ?? null,
    })
    if (error) { setError(error.message); setLoading(false); return }
    router.push('/dashboard/events')
  }

  return (
    <div style={{ maxWidth: '680px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <Link href="/dashboard/events" style={{ color: 'rgba(44,62,80,0.4)', textDecoration: 'none', fontSize: '1.25rem' }}>←</Link>
        <div>
          <p className="by-label" style={{ marginBottom: '0.2rem' }}>Calendar</p>
          <h1 style={{ fontSize: 'var(--by-heading)', fontWeight: 500 }}>Create Event</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="by-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {error && <div style={{ background: '#fff0f0', border: '1px solid #ffcccc', borderRadius: '0.5rem', padding: '0.75rem 1rem', fontSize: 'var(--by-small)', color: '#c0392b' }}>{error}</div>}

        <div>
          <label className="by-label" style={{ display: 'block', marginBottom: '0.4rem' }}>Event Title</label>
          <input name="title" value={form.title} onChange={handleChange} required
            className="by-input" placeholder="e.g. Community Info Night" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label className="by-label" style={{ display: 'block', marginBottom: '0.4rem' }}>Date</label>
            <input name="date" type="date" value={form.date} onChange={handleChange} required className="by-input" />
          </div>
          <div>
            <label className="by-label" style={{ display: 'block', marginBottom: '0.4rem' }}>Time</label>
            <input name="time" value={form.time} onChange={handleChange} className="by-input" placeholder="e.g. 7:00 PM" />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label className="by-label" style={{ display: 'block', marginBottom: '0.4rem' }}>Location</label>
            <input name="location" value={form.location} onChange={handleChange} className="by-input" placeholder="e.g. Deal, NJ" />
          </div>
          <div>
            <label className="by-label" style={{ display: 'block', marginBottom: '0.4rem' }}>Capacity</label>
            <input name="capacity" type="number" min="1" value={form.capacity} onChange={handleChange} className="by-input" placeholder="Optional" />
          </div>
        </div>

        <div>
          <label className="by-label" style={{ display: 'block', marginBottom: '0.4rem' }}>Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows={4}
            className="by-input" style={{ resize: 'none', fontFamily: 'inherit' }}
            placeholder="What should members know about this event?" />
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '0.5rem' }}>
          <button type="submit" className="by-btn-primary" disabled={loading} style={{ opacity: loading ? 0.6 : 1 }}>
            {loading ? 'Saving…' : 'Create Event'}
          </button>
          <Link href="/dashboard/events" className="by-btn-outline">Cancel</Link>
        </div>
      </form>
    </div>
  )
}
