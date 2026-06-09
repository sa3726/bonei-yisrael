'use client'

import { useState } from 'react'
import Link from 'next/link'

const mockDonations = [
  { id: 1, donor: 'David Cohen', amount: 5000, campaign: 'General Fund', date: '2026-06-01', status: 'Completed' },
  { id: 2, donor: 'Joseph Sassoon', amount: 10000, campaign: 'Schools Initiative', date: '2026-05-28', status: 'Completed' },
  { id: 3, donor: 'Anonymous', amount: 1800, campaign: 'General Fund', date: '2026-05-20', status: 'Completed' },
  { id: 4, donor: 'Michael Sutton', amount: 2500, campaign: 'Shul Building', date: '2026-05-15', status: 'Completed' },
  { id: 5, donor: 'Rachel Mizrahi', amount: 500, campaign: 'General Fund', date: '2026-05-10', status: 'Completed' },
]

const campaigns = ['General Fund', 'Schools Initiative', 'Shul Building', 'Safety & Security']

export default function DonationsPage() {
  const [filter, setFilter] = useState('All')

  const total = mockDonations.reduce((sum, d) => sum + d.amount, 0)
  const filtered = filter === 'All' ? mockDonations : mockDonations.filter(d => d.campaign === filter)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">Donations</h1>
          <p className="text-gray-500 text-sm">${total.toLocaleString()} raised total</p>
        </div>
        <Link
          href="/dashboard/donations/new"
          className="rounded-full bg-blue-900 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-800 transition-colors"
        >
          + Record Donation
        </Link>
      </div>

      {/* Campaign totals */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {campaigns.map(c => {
          const amount = mockDonations.filter(d => d.campaign === c).reduce((s, d) => s + d.amount, 0)
          return (
            <div key={c} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="text-lg font-bold text-blue-900">${amount.toLocaleString()}</div>
              <div className="text-xs text-gray-500 mt-1">{c}</div>
            </div>
          )
        })}
      </div>

      {/* Filter */}
      <div className="flex gap-3 mb-4 flex-wrap">
        {['All', ...campaigns].map(f => (
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
              <th className="text-left px-6 py-3 font-medium text-gray-500">Donor</th>
              <th className="text-left px-6 py-3 font-medium text-gray-500">Amount</th>
              <th className="text-left px-6 py-3 font-medium text-gray-500">Campaign</th>
              <th className="text-left px-6 py-3 font-medium text-gray-500">Date</th>
              <th className="text-left px-6 py-3 font-medium text-gray-500">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map(d => (
              <tr key={d.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">{d.donor}</td>
                <td className="px-6 py-4 font-semibold text-green-700">${d.amount.toLocaleString()}</td>
                <td className="px-6 py-4 text-gray-600">{d.campaign}</td>
                <td className="px-6 py-4 text-gray-500">{d.date}</td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    {d.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-6 py-4 border-t border-gray-100 flex justify-between items-center bg-gray-50">
          <span className="text-sm text-gray-500">{filtered.length} donations</span>
          <span className="font-bold text-blue-900">
            Total: ${filtered.reduce((s, d) => s + d.amount, 0).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  )
}
