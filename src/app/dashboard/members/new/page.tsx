'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function NewMemberPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    familySize: '', status: 'Exploring', address: '', notes: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError('')
    const supabase = createClient()
    const { error } = await supabase.from('profiles').upsert({
      full_name: `${form.firstName} ${form.lastName}`.trim(),
      first_name: form.firstName,
      last_name: form.lastName,
      phone: form.phone || null,
      family_size: form.familySize ? parseInt(form.familySize) : null,
      status: form.status,
    })
    if (error) { setError(error.message); setLoading(false); return }
    router.push('/dashboard/members')
  }

  const field = (label: string, name: string, opts?: { type?: string; placeholder?: string; min?: string }) => (
    <div>
      <label className="by-label" style={{ display: 'block', marginBottom: '0.4rem' }}>{label}</label>
      <input name={name} type={opts?.type ?? 'text'} value={(form as any)[name]} onChange={handleChange}
        min={opts?.min} placeholder={opts?.placeholder} className="by-input" />
    </div>
  )

  return (
    <div style={{ maxWidth: '680px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <Link href="/dashboard/members" style={{ color: 'rgba(44,62,80,0.4)', textDecoration: 'none', fontSize: '1.25rem' }}>←</Link>
        <div>
          <p className="by-label" style={{ marginBottom: '0.2rem' }}>Members</p>
          <h1 style={{ fontSize: 'var(--by-heading)', fontWeight: 500 }}>Add Member</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="by-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          {field('First Name', 'firstName')}
          {field('Last Name', 'lastName')}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          {field('Email', 'email', { type: 'email' })}
          {field('Phone', 'phone', { type: 'tel' })}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          {field('Family Size', 'familySize', { type: 'number', min: '1' })}
          <div>
            <label className="by-label" style={{ display: 'block', marginBottom: '0.4rem' }}>Status</label>
            <select name="status" value={form.status} onChange={handleChange} className="by-input">
              <option>Exploring</option>
              <option>Interested</option>
              <option>Committed</option>
            </select>
          </div>
        </div>
        {field('Address', 'address')}
        <div>
          <label className="by-label" style={{ display: 'block', marginBottom: '0.4rem' }}>Notes</label>
          <textarea name="notes" value={form.notes} onChange={handleChange} rows={3}
            className="by-input" style={{ resize: 'none', fontFamily: 'inherit' }} />
        </div>

        {error && (
          <div style={{ background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.15)', borderRadius: '0.5rem', padding: '0.75rem 1rem' }}>
            <p style={{ fontSize: 'var(--by-small)', color: '#dc2626' }}>{error}</p>
          </div>
        )}

        <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '0.5rem' }}>
          <button type="submit" className="by-btn-primary" disabled={loading} style={{ opacity: loading ? 0.6 : 1 }}>
            {loading ? 'Saving…' : 'Save Member'}
          </button>
          <Link href="/dashboard/members" className="by-btn-outline">Cancel</Link>
        </div>
      </form>
    </div>
  )
}
