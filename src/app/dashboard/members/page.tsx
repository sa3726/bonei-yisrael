'use client'

import { useState } from 'react'
import Link from 'next/link'

const mockMembers = [
  { id: 1, name: 'David Cohen', email: 'david@example.com', phone: '(718) 555-0101', status: 'Committed', family: 4, joined: '2025-01-15' },
  { id: 2, name: 'Rachel Mizrahi', email: 'rachel@example.com', phone: '(718) 555-0102', status: 'Interested', family: 3, joined: '2025-02-20' },
  { id: 3, name: 'Joseph Sassoon', email: 'joseph@example.com', phone: '(516) 555-0103', status: 'Committed', family: 5, joined: '2025-01-30' },
  { id: 4, name: 'Sarah Dweck', email: 'sarah@example.com', phone: '(718) 555-0104', status: 'Exploring', family: 2, joined: '2025-03-10' },
  { id: 5, name: 'Michael Sutton', email: 'michael@example.com', phone: '(718) 555-0105', status: 'Committed', family: 6, joined: '2025-01-08' },
]

const statusColors: Record<string, string> = {
  Committed: 'bg-green-100 text-green-700',
  Interested: 'bg-yellow-100 text-yellow-700',
  Exploring: 'bg-blue-100 text-blue-700',
}

export default function MembersPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')

  const filtered = mockMembers.filter(m => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'All' || m.status === filter
    return matchSearch && matchFilter
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">Members</h1>
          <p className="text-gray-500 text-sm">{mockMembers.length} total members</p>
        </div>
        <Link
          href="/dashboard/members/new"
          className="rounded-full bg-blue-900 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-800 transition-colors"
        >
          + Add Member
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {['Committed', 'Interested', 'Exploring'].map(s => (
          <div key={s} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <div className="text-xl font-bold text-blue-900">
              {mockMembers.filter(m => m.status === s).length}
            </div>
            <div className="text-sm text-gray-500">{s}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-4 flex-wrap">
        <input
          type="text"
          placeholder="Search members…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 min-w-48 rounded-lg border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {['All', 'Committed', 'Interested', 'Exploring'].map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === s ? 'bg-blue-900 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-blue-300'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-6 py-3 font-medium text-gray-500">Name</th>
              <th className="text-left px-6 py-3 font-medium text-gray-500">Contact</th>
              <th className="text-left px-6 py-3 font-medium text-gray-500">Family Size</th>
              <th className="text-left px-6 py-3 font-medium text-gray-500">Status</th>
              <th className="text-left px-6 py-3 font-medium text-gray-500">Joined</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map(m => (
              <tr key={m.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">{m.name}</td>
                <td className="px-6 py-4 text-gray-500">
                  <div>{m.email}</div>
                  <div className="text-xs">{m.phone}</div>
                </td>
                <td className="px-6 py-4 text-gray-600">{m.family} people</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[m.status]}`}>
                    {m.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-500">{m.joined}</td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:text-blue-800 text-xs font-medium">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400">No members found</div>
        )}
      </div>
    </div>
  )
}
