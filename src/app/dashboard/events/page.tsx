'use client'

import { useState } from 'react'
import Link from 'next/link'

const mockEvents = [
  { id: 1, title: 'Afula Community Info Night', date: '2026-06-20', time: '7:00 PM', location: 'Deal, NJ', attendees: 34, status: 'Upcoming' },
  { id: 2, title: 'Shabbaton in Afula', date: '2026-07-11', time: '6:00 PM', location: 'Afula, Israel', attendees: 12, status: 'Upcoming' },
  { id: 3, title: 'Town Hall: Schools & Education', date: '2026-06-15', time: '8:00 PM', location: 'Brooklyn, NY', attendees: 55, status: 'Upcoming' },
  { id: 4, title: 'Pesach Community Gathering', date: '2026-04-18', time: '6:30 PM', location: 'Deal, NJ', attendees: 80, status: 'Past' },
  { id: 5, title: 'Tu Bishvat Kickoff Event', date: '2026-02-01', time: '7:00 PM', location: 'Brooklyn, NY', attendees: 60, status: 'Past' },
]

export default function EventsPage() {
  const [filter, setFilter] = useState('Upcoming')

  const filtered = filter === 'All' ? mockEvents : mockEvents.filter(e => e.status === filter)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">Events</h1>
          <p className="text-gray-500 text-sm">{mockEvents.filter(e => e.status === 'Upcoming').length} upcoming events</p>
        </div>
        <Link
          href="/dashboard/events/new"
          className="rounded-full bg-blue-900 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-800 transition-colors"
        >
          + Create Event
        </Link>
      </div>

      <div className="flex gap-3 mb-6">
        {['Upcoming', 'Past', 'All'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === f ? 'bg-blue-900 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-blue-300'
            }`}>
            {f}
          </button>
        ))}
      </div>

      <div className="grid gap-4">
        {filtered.map(ev => (
          <div key={ev.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-5">
              <div className="text-center bg-blue-50 rounded-xl px-4 py-3 min-w-16">
                <div className="text-xs text-blue-600 font-medium uppercase">
                  {new Date(ev.date).toLocaleDateString('en-US', { month: 'short' })}
                </div>
                <div className="text-2xl font-bold text-blue-900">
                  {new Date(ev.date).getDate()}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{ev.title}</h3>
                <p className="text-sm text-gray-500">{ev.time} · {ev.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-6 shrink-0">
              <div className="text-center">
                <div className="font-bold text-blue-900">{ev.attendees}</div>
                <div className="text-xs text-gray-400">Registered</div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                ev.status === 'Upcoming' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
              }`}>
                {ev.status}
              </span>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
