'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function NewEventPage() {
  const router = useRouter()
  const [form, setForm] = useState({ title: '', date: '', time: '', location: '', description: '', capacity: '' })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
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
            <input name="time" type="time" value={form.time} onChange={handleChange} className="by-input" />
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label className="by-label" style={{ display: 'block', marginBottom: '0.4rem' }}>Location</label>
            <input name="location" value={form.location} onChange={handleChange} className="by-input" placeholder="e.g. Deal, NJ" />
          </div>
          <div>
            <label className="by-label" style={{ display: 'block', marginBottom: '0.4rem' }}>Capacity</label>
            <input name="capacity" type="number" min="1" value={form.capacity} onChange={handleChange} className="by-input" placeholder="Max attendees" />
          </div>
        </div>
        <div>
          <label className="by-label" style={{ display: 'block', marginBottom: '0.4rem' }}>Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows={4}
            className="by-input" style={{ resize: 'none', fontFamily: 'inherit' }}
            placeholder="What should members know about this event?" />
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '0.5rem' }}>
          <button type="submit" className="by-btn-primary">Create Event</button>
          <Link href="/dashboard/events" className="by-btn-outline">Cancel</Link>
        </div>
      </form>
    </div>
  )
}
