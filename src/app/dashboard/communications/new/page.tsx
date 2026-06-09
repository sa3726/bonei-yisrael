'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function NewCommunicationPage() {
  const router = useRouter()
  const [form, setForm] = useState({ title: '', type: 'Announcement', body: '' })
  const [sending, setSending] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handleSaveDraft(e: React.FormEvent) {
    e.preventDefault()
    // TODO: save to Supabase as draft
    router.push('/dashboard/communications')
  }

  async function handleSend(e: React.FormEvent) {
    e.preventDefault()
    setSending(true)
    // TODO: send via email service
    setTimeout(() => router.push('/dashboard/communications'), 1000)
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/dashboard/communications" className="text-gray-400 hover:text-gray-600">←</Link>
        <h1 className="text-2xl font-bold text-blue-900">New Message</h1>
      </div>

      <form className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject / Title</label>
            <input name="title" value={form.title} onChange={handleChange} required
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Important Community Update" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select name="type" value={form.type} onChange={handleChange}
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Announcement</option>
              <option>Newsletter</option>
            </select>
          </div>
          <div className="flex items-end">
            <div className="bg-blue-50 rounded-lg px-4 py-2.5 text-sm text-blue-700 w-full text-center font-medium">
              📨 Sending to all members
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
          <textarea name="body" value={form.body} onChange={handleChange} rows={12}
            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Write your message here…" />
        </div>

        <div className="flex gap-3 pt-2">
          <button type="button" onClick={handleSend} disabled={sending}
            className="rounded-full bg-blue-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 transition-colors disabled:opacity-50">
            {sending ? 'Sending…' : '📨 Send to All Members'}
          </button>
          <button type="button" onClick={handleSaveDraft}
            className="rounded-full border border-gray-200 px-6 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
            Save Draft
          </button>
        </div>
      </form>
    </div>
  )
}
