'use client'

import { useState } from 'react'
import Link from 'next/link'

const mockThreads = [
  {
    id: 1,
    category: 'General',
    title: 'Welcome to the Bonei Yisrael community forum!',
    author: 'Saul Ancona',
    date: '2026-06-01',
    replies: 12,
    views: 84,
    pinned: true,
    lastReply: 'Michael Kraiem · 2 hours ago',
  },
  {
    id: 2,
    category: 'Matobu',
    title: 'Katamonim neighborhood update — June 2026',
    author: 'Jack Srour',
    date: '2026-06-05',
    replies: 8,
    views: 53,
    pinned: false,
    lastReply: 'Isaac Zaccai · 5 hours ago',
  },
  {
    id: 3,
    category: 'Aliyah',
    title: 'Tips for families making the move — what to expect',
    author: 'Erez',
    date: '2026-06-04',
    replies: 21,
    views: 140,
    pinned: false,
    lastReply: 'Rachel Mizrahi · 1 day ago',
  },
  {
    id: 4,
    category: 'Schools',
    title: 'Which schools are available in Afula for our kids?',
    author: 'Sarah Dweck',
    date: '2026-06-03',
    replies: 6,
    views: 37,
    pinned: false,
    lastReply: 'Albert Mizrahi · 2 days ago',
  },
  {
    id: 5,
    category: 'Bnei Rachel',
    title: 'Beit Midrash construction update',
    author: 'Erez',
    date: '2026-06-02',
    replies: 4,
    views: 29,
    pinned: false,
    lastReply: 'Michael H. Mamiye · 3 days ago',
  },
  {
    id: 6,
    category: 'Events',
    title: 'Afula site visit — who is coming in July?',
    author: 'Isaac Zaccai',
    date: '2026-06-06',
    replies: 17,
    views: 92,
    pinned: false,
    lastReply: 'Sammy Saka · 30 min ago',
  },
]

const categories = ['All', 'General', 'Matobu', 'Bnei Rachel', 'Aliyah', 'Schools', 'Events']

const categoryColors: Record<string, string> = {
  General: 'bg-gray-100 text-gray-600',
  Matobu: 'bg-blue-100 text-blue-700',
  'Bnei Rachel': 'bg-purple-100 text-purple-700',
  Aliyah: 'bg-green-100 text-green-700',
  Schools: 'bg-yellow-100 text-yellow-700',
  Events: 'bg-orange-100 text-orange-700',
}

export default function ForumPage() {
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = mockThreads.filter(t => {
    const matchCat = filter === 'All' || t.category === filter
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.author.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const pinned = filtered.filter(t => t.pinned)
  const regular = filtered.filter(t => !t.pinned)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">Community Forum</h1>
          <p className="text-gray-500 text-sm">Discussions, updates & questions</p>
        </div>
        <Link href="/dashboard/forum/new"
          className="rounded-full bg-blue-900 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-800 transition-colors">
          + New Thread
        </Link>
      </div>

      {/* Search + filter */}
      <div className="flex gap-3 mb-6 flex-wrap">
        <input
          type="text"
          placeholder="Search threads…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 min-w-48 rounded-lg border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {categories.map(c => (
          <button key={c} onClick={() => setFilter(c)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === c ? 'bg-blue-900 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-blue-300'
            }`}>
            {c}
          </button>
        ))}
      </div>

      {/* Pinned */}
      {pinned.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2 px-1">📌 Pinned</p>
          <div className="flex flex-col gap-2">
            {pinned.map(t => <ThreadRow key={t.id} thread={t} />)}
          </div>
        </div>
      )}

      {/* Threads */}
      <div className="flex flex-col gap-2">
        {regular.map(t => <ThreadRow key={t.id} thread={t} />)}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-400">No threads found</div>
      )}
    </div>
  )
}

function ThreadRow({ thread }: { thread: typeof mockThreads[0] }) {
  return (
    <Link href={`/dashboard/forum/${thread.id}`}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-5 hover:border-blue-200 hover:shadow-md transition-all">
      {/* Avatar */}
      <div className="hidden sm:flex w-10 h-10 rounded-full bg-blue-100 items-center justify-center text-blue-700 font-bold text-sm shrink-0">
        {thread.author.split(' ').map(n => n[0]).join('').slice(0, 2)}
      </div>

      {/* Main */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${categoryColors[thread.category] || 'bg-gray-100 text-gray-600'}`}>
            {thread.category}
          </span>
          {thread.pinned && <span className="text-xs text-gray-400">📌 Pinned</span>}
        </div>
        <h3 className="font-semibold text-gray-900 truncate">{thread.title}</h3>
        <p className="text-xs text-gray-400 mt-1">
          Posted by {thread.author} · {thread.date}
        </p>
      </div>

      {/* Stats */}
      <div className="hidden md:flex flex-col items-end gap-1 shrink-0 text-right">
        <div className="flex gap-4 text-sm text-gray-500">
          <span>💬 {thread.replies}</span>
          <span>👁 {thread.views}</span>
        </div>
        <p className="text-xs text-gray-400">{thread.lastReply}</p>
      </div>
    </Link>
  )
}
