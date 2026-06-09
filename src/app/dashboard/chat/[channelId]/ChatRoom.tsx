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
  return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export default function ChatRoom({ channel, initialMessages, userId }: {
  channel: Channel; initialMessages: Message[]; userId: string
}) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [body, setBody] = useState('')
  const [sending, setSending] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const supabase = createClient()

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    const sub = supabase
      .channel(`chat:${channel.id}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chat_messages', filter: `channel_id=eq.${channel.id}` },
        async (payload) => {
          const { data } = await supabase
            .from('chat_messages')
            .select('*, author:profiles(full_name, first_name, last_name)')
            .eq('id', payload.new.id).single()
          if (data) setMessages(prev => [...prev, data])
        })
      .subscribe()
    return () => { supabase.removeChannel(sub) }
  }, [channel.id])

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault()
    if (!body.trim() || sending) return
    setSending(true)
    await supabase.from('chat_messages').insert({ channel_id: channel.id, author_id: userId, body: body.trim() })
    setBody('')
    setSending(false)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 8rem)' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        <Link href="/dashboard/chat" style={{ fontSize: 'var(--by-small)', color: 'rgba(44,62,80,0.4)', textDecoration: 'none', fontWeight: 300 }}>
          ← Channels
        </Link>
        <span style={{ color: 'rgba(44,62,80,0.2)' }}>/</span>
        <h1 style={{ fontSize: 'var(--by-subheading)', fontWeight: 500 }}># {channel.name}</h1>
        <span style={{ fontSize: 'var(--by-small)', color: 'rgba(44,62,80,0.45)', fontWeight: 300 }}>{channel.description}</span>
      </div>

      {/* Messages */}
      <div className="by-card" style={{ flex: 1, overflowY: 'auto', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {messages.length === 0 && (
          <div style={{ margin: 'auto', textAlign: 'center', color: 'rgba(44,62,80,0.4)' }}>
            <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👋</p>
            <p style={{ fontSize: 'var(--by-small)', fontWeight: 300 }}>No messages yet. Say hello!</p>
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
            <div key={msg.id} style={{ display: 'flex', gap: '0.75rem', flexDirection: isMine ? 'row-reverse' : 'row' }}>
              {showHeader ? (
                <div style={{ width: '2rem', height: '2rem', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 500, flexShrink: 0, marginTop: '0.15rem', background: isMine ? 'var(--by-primary)' : 'var(--by-gray)', color: isMine ? 'white' : 'var(--by-primary)' }}>
                  {ini}
                </div>
              ) : <div style={{ width: '2rem', flexShrink: 0 }} />}
              <div style={{ maxWidth: '70%', display: 'flex', flexDirection: 'column', gap: '0.2rem', alignItems: isMine ? 'flex-end' : 'flex-start' }}>
                {showHeader && (
                  <span style={{ fontSize: '0.7rem', color: 'rgba(44,62,80,0.4)', fontWeight: 300 }}>
                    {isMine ? 'You' : name} · {formatTime(msg.created_at)}
                  </span>
                )}
                <div style={{ padding: '0.625rem 1rem', borderRadius: '1rem', fontSize: 'var(--by-small)', lineHeight: 1.5, background: isMine ? 'var(--by-primary)' : 'var(--by-gray)', color: isMine ? 'white' : 'var(--by-primary)', borderTopRightRadius: isMine ? '0.25rem' : '1rem', borderTopLeftRadius: isMine ? '1rem' : '0.25rem' }}>
                  {msg.body}
                </div>
              </div>
            </div>
          )
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form onSubmit={sendMessage} style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem' }}>
        <input type="text" value={body} onChange={e => setBody(e.target.value)}
          placeholder={`Message #${channel.name}…`}
          className="by-input" style={{ flex: 1, borderRadius: '9999px' }}
          autoFocus />
        <button type="submit" className="by-btn-primary" disabled={!body.trim() || sending}
          style={{ opacity: !body.trim() || sending ? 0.4 : 1, borderRadius: '9999px', padding: '0.625rem 1.5rem' }}>
          Send
        </button>
      </form>
    </div>
  )
}
