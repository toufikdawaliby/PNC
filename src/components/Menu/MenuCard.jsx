import { useState } from 'react'
import { motion } from 'framer-motion'
import { CARD_VARIANT } from '../../constants'

const BADGE_COLORS = {
  Bestseller: { bg: 'rgba(249,115,22,0.2)',  color: '#f97316',  border: 'rgba(249,115,22,0.3)' },
  Popular:    { bg: 'rgba(251,191,36,0.15)', color: '#fbbf24',  border: 'rgba(251,191,36,0.3)' },
  New:        { bg: 'rgba(74,222,128,0.15)', color: '#4ade80',  border: 'rgba(74,222,128,0.3)' },
  'Fan Fave': { bg: 'rgba(167,139,250,0.15)', color: '#a78bfa', border: 'rgba(167,139,250,0.3)' },
  'Must Try': { bg: 'rgba(248,113,113,0.15)', color: '#f87171', border: 'rgba(248,113,113,0.3)' },
  Healthy:    { bg: 'rgba(52,211,153,0.15)', color: '#34d399',  border: 'rgba(52,211,153,0.3)' },
  'Gaming Fave': { bg: 'rgba(99,102,241,0.15)', color: '#818cf8', border: 'rgba(99,102,241,0.3)' },
}

export const MenuCard = ({ item }) => {
  const [imgError, setImgError] = useState(false)
  const badgeStyle = item.badge ? BADGE_COLORS[item.badge] || BADGE_COLORS.Popular : null

  return (
    <motion.div
      variants={CARD_VARIANT}
      whileHover={{ y: -6, boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}
      style={{
        borderRadius: '20px',
        background: 'rgba(45,26,14,0.5)',
        border: '1px solid rgba(255,255,255,0.07)',
        overflow: 'hidden',
        transition: 'box-shadow 0.3s, transform 0.3s',
        cursor: 'default',
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: '200px', overflow: 'hidden', background: '#2d1a0e' }}>
        {!imgError ? (
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            onError={() => setImgError(true)}
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              transition: 'transform 0.5s ease',
            }}
            onMouseEnter={e => e.target.style.transform = 'scale(1.06)'}
            onMouseLeave={e => e.target.style.transform = 'scale(1)'}
          />
        ) : (
          <div style={{
            width: '100%', height: '100%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '3rem',
            background: 'linear-gradient(135deg, #2d1a0e, #1a0f05)',
          }}>
            ☕
          </div>
        )}

        {/* Badge */}
        {item.badge && (
          <div style={{
            position: 'absolute', top: '12px', left: '12px',
            background: badgeStyle?.bg, border: `1px solid ${badgeStyle?.border}`,
            borderRadius: '999px', padding: '3px 10px',
            fontSize: '0.7rem', fontWeight: 700, color: badgeStyle?.color,
            letterSpacing: '0.05em', textTransform: 'uppercase',
            backdropFilter: 'blur(8px)',
          }}>
            {item.badge}
          </div>
        )}

        {/* Price overlay */}
        <div style={{
          position: 'absolute', bottom: '12px', right: '12px',
          background: 'linear-gradient(135deg, #f97316, #fbbf24)',
          borderRadius: '10px', padding: '4px 12px',
          fontSize: '1rem', fontWeight: 900, color: '#0d0703',
        }}>
          ${item.price.toFixed(2)}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '18px 20px 20px' }}>
        <h3 style={{
          margin: '0 0 6px', fontSize: '1.05rem', fontWeight: 700,
          color: '#fdf6ee', letterSpacing: '-0.01em',
        }}>
          {item.name}
        </h3>
        <p style={{
          margin: 0, fontSize: '0.85rem', color: 'rgba(232,213,181,0.65)',
          lineHeight: 1.55,
        }}>
          {item.description}
        </p>
      </div>
    </motion.div>
  )
}
