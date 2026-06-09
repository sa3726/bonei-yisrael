'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function NewThreadPage() {
  const router = useRouter()
  const [form, setForm] = useState({ title: '', category: 'General', body: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError('')
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setError('Not logged in'); setLoading(false); return }
    const { data, error } = await supabase.from('forum_threads').insert({
      title: form.title, category: form.category, body: form.body, author_id: user.id,
    }).select().single()
    if (error) { setError(error.message); setLoading(false); return }
    router.push(`/dashboard/forum/${data.id}`)
  }

  return (
    <div style={{ maxWidth: '680px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <Link href="/dashboard/forum" style={{ color: 'rgba(44,62,80,0.4)', textDecoration: 'none', fontSize: '1.25rem' }}>←</Link>
        <div>
          <p className="by-label" style={{ marginBottom: '0.2rem' }}>Forum</p>
          <h1 style={{ fontSize: 'var(--by-heading)', fontWeight: 500 }}>New Thread</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="by-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div>
          <label className="by-label" style={{ display: 'block', marginBottom: '0.4rem' }}>Title</label>
          <input name="title" value={form.title} onChange={handleChange} required
            className="by-input" placeholder="What's on your mind?" />
        </div>
        <div>
          <label className="by-label" style={{ display: 'block', marginBottom: '0.4rem' }}>Category</label>
          <select name="category" value={form.category} onChange={handleChange} className="by-input">
            {['General', 'Matobu', 'Bnei Rachel', 'Aliyah', 'Schools', 'Events'].map(c => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="by-label" style={{ display: 'block', marginBottom: '0.4rem' }}>Message</label>
          <textarea name="body" value={form.body} onChange={handleChange} required rows={10}
            className="by-input" style={{ resize: 'none', fontFamily: 'inherit' }}
            placeholder="Share your thoughts, questions, or updates…" />
        </div>
        {error && (
          <div style={{ background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.15)', borderRadius: '0.5rem', padding: '0.75rem 1rem' }}>
            <p style={{ fontSize: 'var(--by-small)', color: '#dc2626' }}>{error}</p>
          </div>
        )}
        <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '0.5rem' }}>
          <button type="submit" className="by-btn-primary" disabled={loading} style={{ opacity: loading ? 0.6 : 1 }}>
            {loading ? 'Posting…' : 'Post Thread'}
          </button>
          <Link href="/dashboard/forum" className="by-btn-outline">Cancel</Link>
        </div>
      </form>
    </div>
  )
}
