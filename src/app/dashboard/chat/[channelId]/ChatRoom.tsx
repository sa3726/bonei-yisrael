'use client'

import { useEffect, useRef, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

type Message = {
  id: string
  body: string
  author_id: string
  created_at: string
  author: { full_name?: string; first_name?: string; last_name?: string } | null
}

type Channel = { id: string; name: string; description: string }

function authorName(author: Message['author']) {
  if (!author) return 'Member'
  return author.full_name || `${author.first_name ?? ''} ${author.last_name ?? ''}`.trim() || 'Member'
}

function initials(name: string) {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
}

function formatTime(iso: string) {
  const d = new Date(iso)
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export default function ChatRoom({
  channel,
  initialMessages,
  userId,
}: {
  channel: Channel
  initialMessages: Message[]
  userId: string
}) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [body, setBody] = useState('')
  const [sending, setSending] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const supabase = createClient()

  // scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Realtime subscription
  useEffect(() => {
    const sub = supabase
      .channel(`chat:${channel.id}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'chat_messages', filter: `channel_id=eq.${channel.id}` },
        async (payload) => {
          // fetch full message with author
          const { data } = await supabase
            .from('chat_messages')
            .select('*, author:profiles(full_name, first_name, last_name)')
            .eq('id', payload.new.id)
            .single()
          if (data) setMessages(prev => [...prev, data])
        }
      )
      .subscribe()

    return () => { supabase.removeChannel(sub) }
  }, [channel.id])

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault()
    if (!body.trim() || sending) return
    setSending(true)
    await supabase.from('chat_messages').insert({
      channel_id: channel.id,
      author_id: userId,
      body: body.trim(),
    })
    setBody('')
    setSending(false)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <Link href="/dashboard/chat" className="text-gray-400 hover:text-gray-600 text-sm">← Channels</Link>
        <span className="text-gray-300">/</span>
        <h1 className="text-xl font-bold text-blue-900"># {channel.name}</h1>
        <span className="text-sm text-gray-400">{channel.description}</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col gap-3">
        {messages.length === 0 && (
          <div className="m-auto text-center text-gray-400">
            <p className="text-2xl mb-2">👋</p>
            <p>No messages yet. Say hello!</p>
          </div>
        )}
        {messages.map((msg, i) => {
          const name = authorName(msg.author)
          const ini = initials(name)
          const isMine = msg.author_id === userId
          const prevMsg = messages[i - 1]
          const showHeader = !prevMsg || prevMsg.author_id !== msg.author_id ||
            new Date(msg.created_at).getTime() - new Date(prevMsg.created_at).getTime() > 5 * 60 * 1000

          return (
            <div key={msg.id} className={`flex gap-3 ${isMine ? 'flex-row-reverse' : ''}`}>
              {showHeader && (
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                  isMine ? 'bg-blue-900 text-white' : 'bg-blue-100 text-blue-700'
                }`}>
                  {ini}
                </div>
              )}
              {!showHeader && <div className="w-8 shrink-0" />}
              <div className={`max-w-[70%] ${isMine ? 'items-end' : 'items-start'} flex flex-col gap-0.5`}>
                {showHeader && (
                  <span className={`text-xs text-gray-400 ${isMine ? 'text-right' : ''}`}>
                    {isMine ? 'You' : name} · {formatTime(msg.created_at)}
                  </span>
                )}
                <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  isMine
                    ? 'bg-blue-900 text-white rounded-tr-sm'
                    : 'bg-gray-100 text-gray-900 rounded-tl-sm'
                }`}>
                  {msg.body}
                </div>
              </div>
            </div>
          )
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form onSubmit={sendMessage} className="mt-3 flex gap-2">
        <input
          type="text"
          value={body}
          onChange={e => setBody(e.target.value)}
          placeholder={`Message #${channel.name}…`}
          className="flex-1 rounded-full border border-gray-200 px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          autoFocus
        />
        <button
          type="submit"
          disabled={!body.trim() || sending}
          className="rounded-full bg-blue-900 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-800 disabled:opacity-40 transition-colors"
        >
          Send
        </button>
      </form>
    </div>
  )
}
