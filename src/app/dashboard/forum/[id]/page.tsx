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
        .eq('id', id)
        .single()
      setThread(t)

      const { data: r } = await supabase
        .from('forum_replies')
        .select('*, author:profiles(full_name, first_name, last_name)')
        .eq('thread_id', id)
        .order('created_at', { ascending: true })
      setReplies(r ?? [])
    }
    load()

    // Realtime subscription for new replies
    const channel = supabase
      .channel(`thread-${id}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'forum_replies', filter: `thread_id=eq.${id}` },
        async (payload) => {
          const { data } = await supabase
            .from('forum_replies')
            .select('*, author:profiles(full_name, first_name, last_name)')
            .eq('id', payload.new.id)
            .single()
          if (data) setReplies(r => [...r, data])
        })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [id])

  async function handleReply(e: React.FormEvent) {
    e.preventDefault()
    if (!reply.trim() || !user) return
    setSubmitting(true)
    await supabase.from('forum_replies').insert({
      thread_id: id,
      body: reply,
      author_id: user.id,
    })
    setReply('')
    setSubmitting(false)
  }

  function getName(profile: any) {
    return profile?.full_name || `${profile?.first_name ?? ''} ${profile?.last_name ?? ''}`.trim() || 'Member'
  }

  function getInitials(name: string) {
    return name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()
  }

  if (!thread) return <div className="text-gray-400 p-8">Loading…</div>

  const authorName = getName(thread.author)

  return (
    <div className="max-w-3xl">
      <Link href="/dashboard/forum" className="text-gray-400 hover:text-gray-600 text-sm mb-6 inline-block">← Back to Forum</Link>

      {/* Thread */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-4">
        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 mb-3 inline-block">{thread.category}</span>
        <h1 className="text-xl font-bold text-blue-900 mb-4">{thread.title}</h1>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">
            {getInitials(authorName)}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800">{authorName}</p>
            <p className="text-xs text-gray-400">{new Date(thread.created_at).toLocaleDateString()}</p>
          </div>
        </div>
        <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-line border-t border-gray-50 pt-5">
          {thread.body}
        </div>
      </div>

      {/* Replies */}
      <div className="flex flex-col gap-3 mb-6">
        {replies.length > 0 && <p className="text-sm font-semibold text-gray-500">{replies.length} {replies.length === 1 ? 'reply' : 'replies'}</p>}
        {replies.map(r => {
          const rName = getName(r.author)
          return (
            <div key={r.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-700 font-bold text-xs">
                  {getInitials(rName)}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">{rName}</p>
                  <p className="text-xs text-gray-400">{new Date(r.created_at).toLocaleString()}</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{r.body}</p>
            </div>
          )
        })}
      </div>

      {/* Reply box */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <p className="text-sm font-semibold text-gray-700 mb-3">Write a reply</p>
        <form onSubmit={handleReply} className="flex flex-col gap-3">
          <textarea value={reply} onChange={e => setReply(e.target.value)} rows={4}
            placeholder="Share your thoughts…"
            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
          <div className="flex justify-end">
            <button type="submit" disabled={submitting || !reply.trim()}
              className="rounded-full bg-blue-900 px-6 py-2 text-sm font-semibold text-white hover:bg-blue-800 transition-colors disabled:opacity-50">
              {submitting ? 'Posting…' : 'Post Reply'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
