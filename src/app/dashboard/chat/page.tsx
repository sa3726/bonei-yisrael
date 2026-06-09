import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function ChatPage() {
  const supabase = await createClient()
  const { data: channels } = await supabase
    .from('chat_channels')
    .select('*')
    .order('name')

  const all = channels ?? []

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-blue-900">Community Chat</h1>
        <p className="text-gray-500 text-sm">Real-time messaging with fellow members</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {all.map((ch: any) => (
          <Link key={ch.id} href={`/dashboard/chat/${ch.id}`}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-blue-200 hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">#</span>
              <h3 className="font-semibold text-gray-900">{ch.name}</h3>
            </div>
            <p className="text-sm text-gray-500">{ch.description}</p>
          </Link>
        ))}
        {all.length === 0 && (
          <p className="text-gray-400 col-span-3 text-center py-12">No channels found. Run the SQL schema to create them.</p>
        )}
      </div>
    </div>
  )
}
