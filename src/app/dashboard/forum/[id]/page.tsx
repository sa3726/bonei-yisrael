'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function ThreadPage() {
  const { id } = useParams()
  const [thread, setThread] = useState<any>(null)
  const [replies, setReplies] = useState<any[]>([])
  const [reply, setReply] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [user, setUser] = useState<any>(null)
  const supabase = createClient()

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      const { data: t } = await supabase
        .from('forum_threads')
        .select('*, author:profiles(full_name, first_name, last_name)')
        .eq('id', id).single()
      setThread(t)
      const { data: r } = await supabase
        .from('forum_replies')
        .select('*, author:profiles(full_name, first_name, last_name)')
        .eq('thread_id', id).order('created_at', { ascending: true })
      setReplies(r ?? [])
    }
    load()

    const channel = supabase
      .channel(`thread-${id}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'forum_replies', filter: `thread_id=eq.${id}` },
        async (payload) => {
          const { data } = await supabase
            .from('forum_replies')
            .select('*, author:profiles(full_name, first_name, last_name)')
            .eq('id', payload.new.id).single()
          if (data) setReplies(r => [...r, data])
        })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [id])

  async function handleReply(e: React.FormEvent) {
    e.preventDefault()
    if (!reply.trim() || !user) return
    setSubmitting(true)
    await supabase.from('forum_replies').insert({ thread_id: id, body: reply, author_id: user.id })
    setReply('')
    setSubmitting(false)
  }

  function getName(p: any) {
    return p?.full_name || `${p?.first_name ?? ''} ${p?.last_name ?? ''}`.trim() || 'Member'
  }
  function getInitials(name: string) {
    return name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()
  }

  if (!thread) return (
    <div style={{ padding: '3rem', color: 'rgba(44,62,80,0.4)', fontSize: 'var(--by-small)', fontWeight: 300 }}>Loading…</div>
  )

  const authorName = getName(thread.author)

  return (
    <div style={{ maxWidth: '720px' }}>
      <Link href="/dashboard/forum" style={{ fontSize: 'var(--by-small)', color: 'rgba(44,62,80,0.4)', textDecoration: 'none', display: 'inline-block', marginBottom: '1.5rem', fontWeight: 300 }}>
        ← Back to Forum
      </Link>

      {/* Thread */}
      <div className="by-card" style={{ padding: '2rem', marginBottom: '1rem' }}>
        <span style={{ fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', border: '1px solid rgba(44,62,80,0.15)', borderRadius: '9999px', padding: '0.2rem 0.6rem', color: 'var(--by-primary-light)', display: 'inline-block', marginBottom: '1rem' }}>
          {thread.category}
        </span>
        <h1 style={{ fontSize: 'var(--by-subheading)', fontWeight: 500, marginBottom: '1.25rem' }}>{thread.title}</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <div style={{ width: '2.25rem', height: '2.25rem', borderRadius: '9999px', background: 'var(--by-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 500, flexShrink: 0 }}>
            {getInitials(authorName)}
          </div>
          <div>
            <p style={{ fontSize: 'var(--by-small)', fontWeight: 500 }}>{authorName}</p>
            <p style={{ fontSize: '0.75rem', color: 'rgba(44,62,80,0.4)', fontWeight: 300 }}>{new Date(thread.created_at).toLocaleDateString()}</p>
          </div>
        </div>
        <div style={{ fontSize: 'var(--by-body)', color: 'rgba(44,62,80,0.75)', lineHeight: 1.7, whiteSpace: 'pre-line', borderTop: '1px solid rgba(44,62,80,0.06)', paddingTop: '1.25rem', fontWeight: 300 }}>
          {thread.body}
        </div>
      </div>

      {/* Replies */}
      {replies.length > 0 && (
        <p style={{ fontSize: 'var(--by-small)', fontWeight: 500, marginBottom: '0.75rem', color: 'rgba(44,62,80,0.5)' }}>
          {replies.length} {replies.length === 1 ? 'reply' : 'replies'}
        </p>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
        {replies.map(r => {
          const rName = getName(r.author)
          return (
            <div key={r.id} className="by-card" style={{ padding: '1.25rem 1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div style={{ width: '2rem', height: '2rem', borderRadius: '9999px', background: 'var(--by-gray)', color: 'var(--by-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 500, flexShrink: 0 }}>
                  {getInitials(rName)}
                </div>
                <div>
                  <p style={{ fontSize: 'var(--by-small)', fontWeight: 500 }}>{rName}</p>
                  <p style={{ fontSize: '0.75rem', color: 'rgba(44,62,80,0.4)', fontWeight: 300 }}>{new Date(r.created_at).toLocaleString()}</p>
                </div>
              </div>
              <p style={{ fontSize: 'var(--by-small)', color: 'rgba(44,62,80,0.7)', lineHeight: 1.6, whiteSpace: 'pre-line', fontWeight: 300 }}>{r.body}</p>
            </div>
          )
        })}
      </div>

      {/* Reply box */}
      <div className="by-card" style={{ padding: '1.5rem' }}>
        <p style={{ fontSize: 'var(--by-small)', fontWeight: 500, marginBottom: '1rem' }}>Write a reply</p>
        <form onSubmit={handleReply} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <textarea value={reply} onChange={e => setReply(e.target.value)} rows={4}
            placeholder="Share your thoughts…"
            className="by-input" style={{ resize: 'none', fontFamily: 'inherit' }} />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="by-btn-primary" disabled={submitting || !reply.trim()}
              style={{ opacity: submitting || !reply.trim() ? 0.5 : 1 }}>
              {submitting ? 'Posting…' : 'Post Reply'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
