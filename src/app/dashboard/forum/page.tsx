import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

const categoryColors: Record<string, string> = {
  General: 'bg-gray-100 text-gray-600',
  Matobu: 'bg-blue-100 text-blue-700',
  'Bnei Rachel': 'bg-purple-100 text-purple-700',
  Aliyah: 'bg-green-100 text-green-700',
  Schools: 'bg-yellow-100 text-yellow-700',
  Events: 'bg-orange-100 text-orange-700',
}

export default async function ForumPage() {
  const supabase = await createClient()
  const { data: threads } = await supabase
    .from('forum_threads')
    .select(`*, author:profiles(full_name, first_name, last_name), replies:forum_replies(count)`)
    .order('pinned', { ascending: false })
    .order('created_at', { ascending: false })

  const all = threads ?? []

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

      <div className="flex flex-col gap-3">
        {all.map((t: any) => {
          const name = t.author?.full_name || `${t.author?.first_name ?? ''} ${t.author?.last_name ?? ''}`.trim() || 'Member'
          const initials = name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()
          const replyCount = t.replies?.[0]?.count ?? 0
          return (
            <Link key={t.id} href={`/dashboard/forum/${t.id}`}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-5 hover:border-blue-200 hover:shadow-md transition-all">
              <div className="hidden sm:flex w-10 h-10 rounded-full bg-blue-100 items-center justify-center text-blue-700 font-bold text-sm shrink-0">
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${categoryColors[t.category] ?? 'bg-gray-100 text-gray-600'}`}>
                    {t.category}
                  </span>
                  {t.pinned && <span className="text-xs text-gray-400">📌 Pinned</span>}
                </div>
                <h3 className="font-semibold text-gray-900 truncate">{t.title}</h3>
                <p className="text-xs text-gray-400 mt-1">Posted by {name} · {new Date(t.created_at).toLocaleDateString()}</p>
              </div>
              <div className="hidden md:flex items-center gap-4 shrink-0 text-sm text-gray-500">
                <span>💬 {replyCount}</span>
              </div>
            </Link>
          )
        })}
        {all.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
            <p className="text-gray-400 mb-4">No threads yet. Start the conversation!</p>
            <Link href="/dashboard/forum/new"
              className="rounded-full bg-blue-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 transition-colors">
              Create First Thread
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
