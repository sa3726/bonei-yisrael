import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import ChatRoom from './ChatRoom'

export default async function ChatChannelPage({ params }: { params: Promise<{ channelId: string }> }) {
  const { channelId } = await params
  const supabase = await createClient()

  const { data: channel } = await supabase
    .from('chat_channels')
    .select('*')
    .eq('id', channelId)
    .single()

  if (!channel) notFound()

  const { data: messages } = await supabase
    .from('chat_messages')
    .select('*, author:profiles(full_name, first_name, last_name)')
    .eq('channel_id', channelId)
    .order('created_at', { ascending: true })
    .limit(100)

  const { data: { user } } = await supabase.auth.getUser()

  return <ChatRoom channel={channel} initialMessages={messages ?? []} userId={user?.id ?? ''} />
}
