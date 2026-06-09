'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import BoneiLogo from '@/components/BoneiLogo'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClient()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/dashboard')
      router.refresh()
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--by-primary)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ width: '100%', maxWidth: '380px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem', display: 'flex', justifyContent: 'center' }}>
          <BoneiLogo variant="light" size="md" href="/" />
        </div>

        <div className="by-card" style={{ padding: '2.5rem' }}>
          <h1 style={{ fontSize: 'var(--by-heading)', fontWeight: 500, marginBottom: '0.4rem' }}>Welcome back</h1>
          <p style={{ fontSize: 'var(--by-small)', color: 'rgba(44,62,80,0.45)', marginBottom: '2rem', fontWeight: 300 }}>Sign in to your member account</p>

          {error && (
            <div style={{ background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.15)', borderRadius: '0.5rem', padding: '0.75rem 1rem', marginBottom: '1.25rem' }}>
              <p style={{ fontSize: 'var(--by-small)', color: '#dc2626' }}>{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label className="by-label" style={{ display: 'block', marginBottom: '0.4rem' }}>Email</label>
              <input className="by-input" type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com" required />
            </div>
            <div>
              <label className="by-label" style={{ display: 'block', marginBottom: '0.4rem' }}>Password</label>
              <input className="by-input" type="password" value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••••" required />
            </div>
            <button type="submit" className="by-btn-primary" disabled={loading}
              style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem', opacity: loading ? 0.6 : 1 }}>
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', fontSize: 'var(--by-small)', color: 'rgba(255,255,255,0.35)', marginTop: '1.5rem', fontWeight: 300 }}>
          Not a member yet?{' '}
          <Link href="/signup" style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
            Join us
          </Link>
          {' · '}
          <Link href="/" style={{ color: 'rgba(255,255,255,0.35)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
            Home
          </Link>
        </p>
      </div>
    </div>
  )
}
