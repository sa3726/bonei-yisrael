'use client'

import { useState } from 'react'
import Link from 'next/link'

const mockAnnouncements = [
  { id: 1, title: 'Shavuot Issue #3 Newsletter', type: 'Newsletter', date: '2026-06-01', recipients: 120, status: 'Sent' },
  { id: 2, title: 'Important: Afula Site Visit Registration Open', type: 'Announcement', date: '2026-05-28', recipients: 98, status: 'Sent' },
  { id: 3, title: 'Pesach Issue #2 Newsletter', type: 'Newsletter', date: '2026-04-10', recipients: 110, status: 'Sent' },
  { id: 4, title: 'Summer Community Trip Details', type: 'Announcement', date: '2026-06-15', recipients: 0, status: 'Draft' },
  { id: 5, title: 'Tu Bishvat Issue #1 Newsletter', type: 'Newsletter', date: '2026-02-01', recipients: 85, status: 'Sent' },
]

const typeColors: Record<string, string> = {
  Newsletter: 'bg-purple-100 text-purple-700',
  Announcement: 'bg-blue-100 text-blue-700',
}

export default function CommunicationsPage() {
  const [filter, setFilter] = useState('All')

  const filtered = filter === 'All' ? mockAnnouncements : mockAnnouncements.filter(a => a.type === filter || a.status === filter)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">Communications</h1>
          <p className="text-gray-500 text-sm">Newsletters & announcements</p>
        </div>
        <Link
          href="/dashboard/communications/new"
          className="rounded-full bg-blue-900 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-800 transition-colors"
        >
          + New Message
        </Link>
      </div>

      <div className="flex gap-3 mb-6">
        {['All', 'Newsletter', 'Announcement', 'Draft'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === f ? 'bg-blue-900 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-blue-300'
            }`}>
            {f}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-6 py-3 font-medium text-gray-500">Title</th>
              <th className="text-left px-6 py-3 font-medium text-gray-500">Type</th>
              <th className="text-left px-6 py-3 font-medium text-gray-500">Date</th>
              <th className="text-left px-6 py-3 font-medium text-gray-500">Recipients</th>
              <th className="text-left px-6 py-3 font-medium text-gray-500">Status</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map(a => (
              <tr key={a.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">{a.title}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${typeColors[a.type]}`}>{a.type}</span>
                </td>
                <td className="px-6 py-4 text-gray-500">{a.date}</td>
                <td className="px-6 py-4 text-gray-600">{a.recipients > 0 ? a.recipients : '—'}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    a.status === 'Sent' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {a.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:text-blue-800 text-xs font-medium">
                    {a.status === 'Draft' ? 'Edit' : 'View'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
