import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { FiChevronLeft, FiChevronRight, FiStar } from 'react-icons/fi'
import { todaySpecials } from '../../data/menuData'

const SectionLabel = ({ text }) => (
  <div style={{
    display: 'inline-block',
    background: 'rgba(249,115,22,0.1)',
    border: '1px solid rgba(249,115,22,0.25)',
    borderRadius: '999px', padding: '4px 16px',
    fontSize: '0.78rem', fontWeight: 600, color: '#fb923c',
    letterSpacing: '0.1em', textTransform: 'uppercase',
    marginBottom: '12px',
  }}>{text}</div>
)

export const TodaySpecials = () => {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent(c => (c - 1 + todaySpecials.length) % todaySpecials.length)
  const next = () => setCurrent(c => (c + 1) % todaySpecials.length)

  const item = todaySpecials[current]

  return (
    <section style={{ padding: '80px 0', background: 'rgba(29,14,6,0.9)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '48px' }}
        >
          <SectionLabel text="⭐ Today's Specials" />
          <h2 className="section-title" style={{ color: '#fdf6ee' }}>Featured Picks</h2>
          <p className="section-subtitle" style={{ margin: '12px auto 0' }}>
            Hand-picked by our baristas — don't miss these daily favourites.
          </p>
        </motion.div>

        <motion.div
          key={current}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.5 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '32px',
            alignItems: 'center',
            background: 'rgba(45,26,14,0.4)',
            borderRadius: '24px',
            border: '1px solid rgba(255,255,255,0.06)',
            overflow: 'hidden',
          }}
        >
          {/* Image */}
          <div style={{ position: 'relative', minHeight: '300px' }}>
            <img
              src={item.image}
              alt={item.name}
              loading="lazy"
              style={{ width: '100%', height: '100%', minHeight: '300px', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to right, transparent, rgba(45,26,14,0.8))',
            }} />
          </div>

          {/* Text */}
          <div style={{ padding: '40px 40px 40px 16px' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '4px',
              background: 'rgba(251,191,36,0.15)',
              border: '1px solid rgba(251,191,36,0.3)',
              borderRadius: '999px', padding: '4px 12px',
              fontSize: '0.75rem', fontWeight: 700, color: '#fbbf24',
              marginBottom: '16px',
            }}>
              {[...Array(5)].map((_, i) => <FiStar key={i} size={10} fill="#fbbf24" stroke="none" />)}
              <span style={{ marginLeft: '4px' }}>Chef's Pick</span>
            </div>

            <h3 style={{
              fontSize: '2rem', fontWeight: 900,
              color: '#fdf6ee', marginBottom: '12px',
            }}>
              {item.name}
            </h3>
            <p style={{
              fontSize: '1rem', color: 'rgba(232,213,181,0.7)',
              lineHeight: 1.6, marginBottom: '24px',
            }}>
              {item.description}
            </p>
            <div style={{
              fontSize: '2rem', fontWeight: 900,
              background: 'linear-gradient(135deg, #f97316, #fbbf24)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              ${item.price.toFixed(2)}
            </div>
          </div>
        </motion.div>

        {/* Controls */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '32px' }}>
          <button onClick={prev} aria-label="Previous special"
            style={{
              width: 44, height: 44, borderRadius: '50%',
              background: 'rgba(45,26,14,0.6)', border: '1px solid rgba(255,255,255,0.1)',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#f97316', transition: 'all 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(249,115,22,0.2)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(45,26,14,0.6)'}
          >
            <FiChevronLeft size={20} />
          </button>
          {todaySpecials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Special ${i + 1}`}
              style={{
                width: 8, height: 8, borderRadius: '50%',
                background: i === current ? '#f97316' : 'rgba(255,255,255,0.2)',
                border: 'none', cursor: 'pointer', padding: 0,
                transition: 'all 0.2s', margin: 'auto 0',
              }}
            />
          ))}
          <button onClick={next} aria-label="Next special"
            style={{
              width: 44, height: 44, borderRadius: '50%',
              background: 'rgba(45,26,14,0.6)', border: '1px solid rgba(255,255,255,0.1)',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#f97316', transition: 'all 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(249,115,22,0.2)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(45,26,14,0.6)'}
          >
            <FiChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  )
}
