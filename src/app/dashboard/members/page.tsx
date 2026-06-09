import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

const statusColors: Record<string, string> = {
  Committed: 'bg-green-100 text-green-700',
  Interested: 'bg-yellow-100 text-yellow-700',
  Exploring: 'bg-blue-100 text-blue-700',
}

export default async function MembersPage() {
  const supabase = await createClient()
  const { data: members } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })

  const all = members ?? []
  const committed = all.filter(m => m.status === 'Committed').length
  const interested = all.filter(m => m.status === 'Interested').length
  const exploring = all.filter(m => m.status === 'Exploring').length

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">Members</h1>
          <p className="text-gray-500 text-sm">{all.length} total members</p>
        </div>
        <Link href="/dashboard/members/new"
          className="rounded-full bg-blue-900 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-800 transition-colors">
          + Add Member
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[['Committed', committed], ['Interested', interested], ['Exploring', exploring]].map(([label, count]) => (
          <div key={label} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <div className="text-xl font-bold text-blue-900">{count}</div>
            <div className="text-sm text-gray-500">{label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-6 py-3 font-medium text-gray-500">Name</th>
              <th className="text-left px-6 py-3 font-medium text-gray-500">Contact</th>
              <th className="text-left px-6 py-3 font-medium text-gray-500">Family Size</th>
              <th className="text-left px-6 py-3 font-medium text-gray-500">Status</th>
              <th className="text-left px-6 py-3 font-medium text-gray-500">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {all.map(m => (
              <tr key={m.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">
                  {m.full_name || `${m.first_name ?? ''} ${m.last_name ?? ''}`.trim() || '—'}
                </td>
                <td className="px-6 py-4 text-gray-500">
                  <div>{m.id}</div>
                  <div className="text-xs">{m.phone ?? '—'}</div>
                </td>
                <td className="px-6 py-4 text-gray-600">{m.family_size ? `${m.family_size} people` : '—'}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[m.status] ?? 'bg-gray-100 text-gray-600'}`}>
                    {m.status ?? 'Exploring'}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {m.created_at ? new Date(m.created_at).toLocaleDateString() : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {all.length === 0 && (
          <div className="text-center py-12 text-gray-400">No members yet. Add your first member above.</div>
        )}
      </div>
    </div>
  )
}
