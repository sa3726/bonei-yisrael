'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SignupPage() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', password: '', confirm: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (form.password !== form.confirm) {
      setError('Passwords do not match')
      return
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          first_name: form.firstName,
          last_name: form.lastName,
          phone: form.phone,
          full_name: `${form.firstName} ${form.lastName}`,
        }
      }
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess(true)
    }
  }

  if (success) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--by-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div className="by-card" style={{ padding: '3rem', maxWidth: '380px', width: '100%', textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '1.25rem' }}>✉️</div>
          <h2 style={{ fontSize: 'var(--by-heading)', fontWeight: 500, marginBottom: '0.75rem' }}>Check your email</h2>
          <p style={{ fontSize: 'var(--by-small)', color: 'rgba(44,62,80,0.55)', marginBottom: '2rem', fontWeight: 300 }}>
            We sent a confirmation link to <strong style={{ fontWeight: 500 }}>{form.email}</strong>. Click it to activate your account.
          </p>
          <Link href="/login" className="by-btn-primary" style={{ justifyContent: 'center', width: '100%' }}>
            Back to Login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--by-primary)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ width: '100%', maxWidth: '440px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <p style={{ fontSize: 'var(--by-subheading)', fontWeight: 300, color: 'white', letterSpacing: '-0.01em' }}>Bonei Yisrael</p>
            <p style={{ fontSize: 'var(--by-small)', color: 'rgba(255,255,255,0.3)', marginTop: '0.25rem' }}>בוני ישראל</p>
          </Link>
        </div>

        <div className="by-card" style={{ padding: '2.5rem' }}>
          <h1 style={{ fontSize: 'var(--by-heading)', fontWeight: 500, marginBottom: '0.4rem' }}>Join Bonei Yisrael</h1>
          <p style={{ fontSize: 'var(--by-small)', color: 'rgba(44,62,80,0.45)', marginBottom: '2rem', fontWeight: 300 }}>Building the future in Eretz Yisrael</p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div>
                <label className="by-label" style={{ display: 'block', marginBottom: '0.4rem' }}>First Name</label>
                <input className="by-input" name="firstName" value={form.firstName} onChange={handleChange} required placeholder="Saul" />
              </div>
              <div>
                <label className="by-label" style={{ display: 'block', marginBottom: '0.4rem' }}>Last Name</label>
                <input className="by-input" name="lastName" value={form.lastName} onChange={handleChange} required placeholder="Ancona" />
              </div>
            </div>

            <div>
              <label className="by-label" style={{ display: 'block', marginBottom: '0.4rem' }}>Email</label>
              <input className="by-input" name="email" type="email" value={form.email} onChange={handleChange} required placeholder="you@example.com" />
            </div>

            <div>
              <label className="by-label" style={{ display: 'block', marginBottom: '0.4rem' }}>
                Phone <span style={{ color: 'rgba(44,62,80,0.3)', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(optional)</span>
              </label>
              <input className="by-input" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="(718) 555-0100" />
            </div>

            <div>
              <label className="by-label" style={{ display: 'block', marginBottom: '0.4rem' }}>Password</label>
              <input className="by-input" name="password" type="password" value={form.password} onChange={handleChange} required placeholder="At least 8 characters" />
            </div>

            <div>
              <label className="by-label" style={{ display: 'block', marginBottom: '0.4rem' }}>Confirm Password</label>
              <input className="by-input" name="confirm" type="password" value={form.confirm} onChange={handleChange} required placeholder="••••••••" />
            </div>

            {error && (
              <div style={{ background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.15)', borderRadius: '0.5rem', padding: '0.75rem 1rem' }}>
                <p style={{ fontSize: 'var(--by-small)', color: '#dc2626' }}>{error}</p>
              </div>
            )}

            <button type="submit" className="by-btn-primary" disabled={loading}
              style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem', opacity: loading ? 0.6 : 1 }}>
              {loading ? 'Creating account…' : 'Create Account'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', fontSize: 'var(--by-small)', color: 'rgba(255,255,255,0.35)', marginTop: '1.5rem', fontWeight: 300 }}>
          Already have an account?{' '}
          <Link href="/login" style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>Sign in</Link>
          {' · '}
          <Link href="/" style={{ color: 'rgba(255,255,255,0.35)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>Home</Link>
        </p>
      </div>
    </div>
  )
}
