'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function NewDonationPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    donor: '', email: '', amount: '', campaign: 'General Fund',
    date: new Date().toISOString().split('T')[0], anonymous: false, notes: '',
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const target = e.target as HTMLInputElement
    setForm(f => ({ ...f, [target.name]: target.type === 'checkbox' ? target.checked : target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // TODO: save to Supabase
    router.push('/dashboard/donations')
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/dashboard/donations" className="text-gray-400 hover:text-gray-600">←</Link>
        <h1 className="text-2xl font-bold text-blue-900">Record Donation</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Donor Name</label>
            <input name="donor" value={form.donor} onChange={handleChange} required={!form.anonymous}
              disabled={!!form.anonymous}
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Donor Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange}
              disabled={!!form.anonymous}
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-400" />
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
          <input type="checkbox" name="anonymous" checked={!!form.anonymous} onChange={handleChange}
            className="rounded border-gray-300" />
          Anonymous donation
        </label>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount ($)</label>
            <input name="amount" type="number" min="1" value={form.amount} onChange={handleChange} required
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Campaign</label>
            <select name="campaign" value={form.campaign} onChange={handleChange}
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>General Fund</option>
              <option>Schools Initiative</option>
              <option>Shul Building</option>
              <option>Safety & Security</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <input name="date" type="date" value={form.date} onChange={handleChange} required
            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
          <textarea name="notes" value={form.notes} onChange={handleChange} rows={3}
            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
        </div>

        <div className="flex gap-3 pt-2">
          <button type="submit"
            className="rounded-full bg-blue-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 transition-colors">
            Save Donation
          </button>
          <Link href="/dashboard/donations"
            className="rounded-full border border-gray-200 px-6 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
