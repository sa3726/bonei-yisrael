'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function NewCommunicationPage() {
  const router = useRouter()
  const [form, setForm] = useState({ title: '', type: 'Announcement', body: '' })
  const [sending, setSending] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handleSaveDraft(e: React.MouseEvent) {
    e.preventDefault()
    router.push('/dashboard/communications')
  }

  function handleSend(e: React.MouseEvent) {
    e.preventDefault()
    setSending(true)
    setTimeout(() => router.push('/dashboard/communications'), 1000)
  }

  return (
    <div style={{ maxWidth: '680px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <Link href="/dashboard/communications" style={{ color: 'rgba(44,62,80,0.4)', textDecoration: 'none', fontSize: '1.25rem' }}>←</Link>
        <div>
          <p className="by-label" style={{ marginBottom: '0.2rem' }}>Outreach</p>
          <h1 style={{ fontSize: 'var(--by-heading)', fontWeight: 500 }}>New Message</h1>
        </div>
      </div>

      <form className="by-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div>
          <label className="by-label" style={{ display: 'block', marginBottom: '0.4rem' }}>Subject / Title</label>
          <input name="title" value={form.title} onChange={handleChange} required
            className="by-input" placeholder="e.g. Important Community Update" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label className="by-label" style={{ display: 'block', marginBottom: '0.4rem' }}>Type</label>
            <select name="type" value={form.type} onChange={handleChange} className="by-input">
              <option>Announcement</option>
              <option>Newsletter</option>
            </select>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <div style={{ background: 'var(--by-gray)', borderRadius: '0.5rem', padding: '0.625rem 1rem', fontSize: 'var(--by-small)', color: 'var(--by-primary-light)', width: '100%', textAlign: 'center', fontWeight: 300 }}>
              📨 Sending to all members
            </div>
          </div>
        </div>

        <div>
          <label className="by-label" style={{ display: 'block', marginBottom: '0.4rem' }}>Message</label>
          <textarea name="body" value={form.body} onChange={handleChange} rows={12}
            className="by-input" style={{ resize: 'none', fontFamily: 'inherit' }}
            placeholder="Write your message here…" />
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '0.5rem' }}>
          <button type="button" onClick={handleSend} disabled={sending} className="by-btn-primary"
            style={{ opacity: sending ? 0.6 : 1 }}>
            {sending ? 'Sending…' : '📨 Send to All Members'}
          </button>
          <button type="button" onClick={handleSaveDraft} className="by-btn-outline">
            Save Draft
          </button>
        </div>
      </form>
    </div>
  )
}
