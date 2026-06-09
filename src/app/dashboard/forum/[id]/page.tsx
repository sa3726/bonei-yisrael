'use client'

import { useState } from 'react'
import Link from 'next/link'

const mockThread = {
  id: 1,
  category: 'General',
  title: 'Welcome to the Bonei Yisrael community forum!',
  author: 'Saul Ancona',
  date: 'June 1, 2026',
  body: `Shalom everyone! 🎉

We're excited to launch this community forum as a space for all Bonei Yisrael members to connect, share updates, ask questions, and support one another on this incredible journey.

Use this forum to:
- Get updates on Matobu and Bnei Rachel projects
- Ask questions about making aliyah
- Discuss schools, shuls, and community life in Israel
- Share your experiences and stories
- Connect with fellow families

Building the Future. In Our Land. Together.

— Saul & Michael`,
}

const mockReplies = [
  {
    id: 1,
    author: 'Michael Kraiem',
    initials: 'MK',
    date: 'June 1, 2026 · 2:30 PM',
    body: 'So excited for this! This is exactly what our community needs. Looking forward to connecting with everyone here.',
  },
  {
    id: 2,
    author: 'Jack Srour',
    initials: 'JS',
    date: 'June 2, 2026 · 10:15 AM',
    body: 'Great initiative. I\'ll be posting Matobu updates here regularly. Stay tuned for some exciting news about the Katamonim development!',
  },
  {
    id: 3,
    author: 'Isaac Zaccai',
    initials: 'IZ',
    date: 'June 3, 2026 · 4:00 PM',
    body: 'The 2026 pilot trip planning is underway. Will be sharing details here soon. Who\'s interested in joining?',
  },
]

export default function ThreadPage() {
  const [reply, setReply] = useState('')
  const [replies, setReplies] = useState(mockReplies)
  const [submitting, setSubmitting] = useState(false)

  function handleReply(e: React.FormEvent) {
    e.preventDefault()
    if (!reply.trim()) return
    setSubmitting(true)
    // Optimistic UI — TODO: save to Supabase
    setTimeout(() => {
      setReplies(r => [...r, {
        id: r.length + 1,
        author: 'You',
        initials: 'ME',
        date: 'Just now',
        body: reply,
      }])
      setReply('')
      setSubmitting(false)
    }, 300)
  }

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/dashboard/forum" className="text-gray-400 hover:text-gray-600 text-sm">← Back to Forum</Link>
      </div>

      {/* Thread */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">{mockThread.category}</span>
        </div>
        <h1 className="text-xl font-bold text-blue-900 mb-4">{mockThread.title}</h1>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">
            {mockThread.author.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800">{mockThread.author}</p>
            <p className="text-xs text-gray-400">{mockThread.date}</p>
          </div>
        </div>
        <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-line border-t border-gray-50 pt-5">
          {mockThread.body}
        </div>
      </div>

      {/* Replies */}
      <div className="flex flex-col gap-3 mb-6">
        <p className="text-sm font-semibold text-gray-500">{replies.length} replies</p>
        {replies.map(r => (
          <div key={r.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-700 font-bold text-xs">
                {r.initials}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">{r.author}</p>
                <p className="text-xs text-gray-400">{r.date}</p>
              </div>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">{r.body}</p>
          </div>
        ))}
      </div>

      {/* Reply box */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <p className="text-sm font-semibold text-gray-700 mb-3">Write a reply</p>
        <form onSubmit={handleReply} className="flex flex-col gap-3">
          <textarea
            value={reply}
            onChange={e => setReply(e.target.value)}
            rows={4}
            placeholder="Share your thoughts…"
            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
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
