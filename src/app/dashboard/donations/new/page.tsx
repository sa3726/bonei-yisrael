'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function NewDonationPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    donor: '', email: '', amount: '', campaign: 'General Fund',
    date: new Date().toISOString().split('T')[0], anonymous: false, notes: '',
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const target = e.target as HTMLInputElement
    setForm(f => ({ ...f, [target.name]: target.type === 'checkbox' ? target.checked : target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    router.push('/dashboard/donations')
  }

  return (
    <div style={{ maxWidth: '680px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <Link href="/dashboard/donations" style={{ color: 'rgba(44,62,80,0.4)', textDecoration: 'none', fontSize: '1.25rem' }}>←</Link>
        <div>
          <p className="by-label" style={{ marginBottom: '0.2rem' }}>Finance</p>
          <h1 style={{ fontSize: 'var(--by-heading)', fontWeight: 500 }}>Record Donation</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="by-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label className="by-label" style={{ display: 'block', marginBottom: '0.4rem' }}>Donor Name</label>
            <input name="donor" value={form.donor} onChange={handleChange} required={!form.anonymous}
              disabled={!!form.anonymous} className="by-input"
              style={{ opacity: form.anonymous ? 0.5 : 1 }} />
          </div>
          <div>
            <label className="by-label" style={{ display: 'block', marginBottom: '0.4rem' }}>Donor Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange}
              disabled={!!form.anonymous} className="by-input"
              style={{ opacity: form.anonymous ? 0.5 : 1 }} />
          </div>
        </div>

        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: 'var(--by-small)', color: 'rgba(44,62,80,0.6)', cursor: 'pointer', fontWeight: 300 }}>
          <input type="checkbox" name="anonymous" checked={!!form.anonymous} onChange={handleChange} />
          Anonymous donation
        </label>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label className="by-label" style={{ display: 'block', marginBottom: '0.4rem' }}>Amount ($)</label>
            <input name="amount" type="number" min="1" value={form.amount} onChange={handleChange} required
              className="by-input" placeholder="0.00" />
          </div>
          <div>
            <label className="by-label" style={{ display: 'block', marginBottom: '0.4rem' }}>Campaign</label>
            <select name="campaign" value={form.campaign} onChange={handleChange} className="by-input">
              {['General Fund', 'Schools Initiative', 'Shul Building', 'Safety & Security'].map(c => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="by-label" style={{ display: 'block', marginBottom: '0.4rem' }}>Date</label>
          <input name="date" type="date" value={form.date} onChange={handleChange} required className="by-input" />
        </div>

        <div>
          <label className="by-label" style={{ display: 'block', marginBottom: '0.4rem' }}>Notes</label>
          <textarea name="notes" value={form.notes} onChange={handleChange} rows={3}
            className="by-input" style={{ resize: 'none', fontFamily: 'inherit' }} />
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '0.5rem' }}>
          <button type="submit" className="by-btn-primary">Save Donation</button>
          <Link href="/dashboard/donations" className="by-btn-outline">Cancel</Link>
        </div>
      </form>
    </div>
  )
}
