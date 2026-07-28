import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { testimonials } from '../../data/businessData'

export const Testimonials = () => {
  const [current, setCurrent] = useState(0)
  const timerRef = useRef(null)

  const startTimer = () => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % testimonials.length)
    }, 5000)
  }

  useEffect(() => {
    startTimer()
    return () => clearInterval(timerRef.current)
  }, [])

  const go = (dir) => {
    setCurrent(c => (c + dir + testimonials.length) % testimonials.length)
    startTimer()
  }

  const t = testimonials[current]

  return (
    <section style={{ padding: '96px 0', background: '#0d0703' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: '56px' }}
        >
          <div style={{
            display: 'inline-block',
            background: 'rgba(251,191,36,0.1)',
            border: '1px solid rgba(251,191,36,0.25)',
            borderRadius: '999px', padding: '4px 16px',
            fontSize: '0.78rem', fontWeight: 600, color: '#fbbf24',
            letterSpacing: '0.1em', textTransform: 'uppercase',
            marginBottom: '12px',
          }}>
            ⭐ Reviews
          </div>
          <h2 className="section-title" style={{ color: '#fdf6ee' }}>What Our Guests Say</h2>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.97 }}
            transition={{ duration: 0.45 }}
            style={{
              background: 'rgba(45,26,14,0.4)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '24px',
              padding: '40px 48px',
              position: 'relative',
            }}
          >
            <div style={{ fontSize: '3rem', color: 'rgba(249,115,22,0.15)', lineHeight: 1, marginBottom: '8px', fontFamily: 'serif' }}>"</div>

            <p style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
              color: 'rgba(253,246,238,0.85)',
              lineHeight: 1.7, fontStyle: 'italic',
              marginBottom: '32px',
            }}>
              {t.text}
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '20px' }}>
              {[...Array(t.rating)].map((_, i) => (
                <FiStar key={i} size={16} fill="#fbbf24" stroke="none" />
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
              <img
                src={t.avatar}
                alt={t.name}
                style={{ width: 48, height: 48, borderRadius: '50%', border: '2px solid rgba(249,115,22,0.3)' }}
                onError={e => { e.target.style.display = 'none' }}
              />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 700, color: '#fdf6ee', fontSize: '0.95rem' }}>{t.name}</div>
                <div style={{ fontSize: '0.78rem', color: '#f97316' }}>{t.type}</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', marginTop: '32px' }}>
          <button onClick={() => go(-1)} aria-label="Previous review"
            style={{
              width: 40, height: 40, borderRadius: '50%',
              background: 'rgba(45,26,14,0.6)', border: '1px solid rgba(255,255,255,0.1)',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#f97316',
            }}>
            <FiChevronLeft size={18} />
          </button>
          <div style={{ display: 'flex', gap: '8px' }}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => { setCurrent(i); startTimer() }}
                aria-label={`Review ${i + 1}`}
                style={{
                  width: i === current ? 24 : 8,
                  height: 8, borderRadius: '4px',
                  background: i === current ? '#f97316' : 'rgba(255,255,255,0.2)',
                  border: 'none', cursor: 'pointer', padding: 0,
                  transition: 'all 0.3s',
                }}
              />
            ))}
          </div>
          <button onClick={() => go(1)} aria-label="Next review"
            style={{
              width: 40, height: 40, borderRadius: '50%',
              background: 'rgba(45,26,14,0.6)', border: '1px solid rgba(255,255,255,0.1)',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#f97316',
            }}>
            <FiChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}
