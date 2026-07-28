import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX } from 'react-icons/fi'
import { PROMO_MESSAGE } from '../../constants'

export const PromoBanner = () => {
  const [visible, setVisible] = useState(true)

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
            background: 'linear-gradient(135deg, #f97316, #fbbf24)',
            overflow: 'hidden',
          }}
        >
          <div style={{
            padding: '8px 48px 8px 16px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            textAlign: 'center',
          }}>
            <p style={{
              margin: 0, fontSize: '0.85rem', fontWeight: 600,
              color: '#0d0703', letterSpacing: '0.01em',
            }}>
              {PROMO_MESSAGE}
            </p>
          </div>
          <button
            onClick={() => setVisible(false)}
            aria-label="Dismiss banner"
            style={{
              position: 'absolute', right: '12px', top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(0,0,0,0.15)', border: 'none', borderRadius: '6px',
              width: 28, height: 28, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#1a0f05',
            }}
          >
            <FiX size={14} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
