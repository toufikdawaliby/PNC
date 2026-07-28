import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiSend } from 'react-icons/fi'

export const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [state, setState] = useState('idle') // idle | loading | success | error
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email.trim()) { setError('Please enter your email.'); return }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('Please enter a valid email address.'); return }
    setError('')
    setState('loading')
    await new Promise(r => setTimeout(r, 900))
    setState('success')
  }

  return (
    <section style={{ padding: '80px 0', background: '#0d0703' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div style={{
            width: 64, height: 64, borderRadius: '18px',
            background: 'rgba(249,115,22,0.1)',
            border: '1px solid rgba(249,115,22,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 20px', fontSize: '1.75rem',
          }}>
            📧
          </div>
          <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: 800, color: '#fdf6ee', marginBottom: '10px' }}>
            Stay in the Loop
          </h2>
          <p style={{ color: 'rgba(232,213,181,0.65)', marginBottom: '32px', lineHeight: 1.6 }}>
            Subscribe for exclusive offers, new menu items, events, and gaming tournaments.
          </p>

          {state === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                background: 'rgba(20,83,45,0.4)', border: '1px solid rgba(74,222,128,0.3)',
                borderRadius: '14px', padding: '24px',
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🎉</div>
              <p style={{ color: '#4ade80', fontWeight: 600, margin: 0 }}>
                You're subscribed! Welcome to the PNC community.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '220px', position: 'relative' }}>
                  <FiMail style={{
                    position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)',
                    color: '#7a4a1e', pointerEvents: 'none',
                  }} size={17} />
                  <input
                    type="email"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setError('') }}
                    placeholder="your@email.com"
                    aria-label="Email address"
                    style={{
                      width: '100%', padding: '12px 14px 12px 44px',
                      borderRadius: '12px', boxSizing: 'border-box',
                      background: 'rgba(45,26,14,0.5)',
                      border: `1px solid ${error ? '#f87171' : 'rgba(255,255,255,0.08)'}`,
                      color: '#fdf6ee', fontSize: '0.9rem', outline: 'none',
                    }}
                    onFocus={e => e.target.style.borderColor = 'rgba(249,115,22,0.5)'}
                    onBlur={e => e.target.style.borderColor = error ? '#f87171' : 'rgba(255,255,255,0.08)'}
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  disabled={state === 'loading'}
                  className="btn-primary"
                  style={{ padding: '12px 24px', flexShrink: 0 }}
                >
                  {state === 'loading' ? '…' : <><FiSend size={15} /> Subscribe</>}
                </motion.button>
              </div>
              {error && <p style={{ color: '#f87171', fontSize: '0.8rem', marginTop: '8px', textAlign: 'left' }}>{error}</p>}
              <p style={{ color: '#7a4a1e', fontSize: '0.75rem', marginTop: '12px' }}>
                No spam, ever. Unsubscribe anytime.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
