import { AnimatePresence, motion } from 'framer-motion'
import { FiCheckCircle, FiAlertCircle, FiInfo, FiAlertTriangle, FiX } from 'react-icons/fi'

const icons = {
  success: <FiCheckCircle size={20} />,
  error:   <FiAlertCircle size={20} />,
  info:    <FiInfo size={20} />,
  warning: <FiAlertTriangle size={20} />,
}

const colors = {
  success: { bg: '#14532d', border: '#22c55e', icon: '#4ade80' },
  error:   { bg: '#450a0a', border: '#ef4444', icon: '#f87171' },
  info:    { bg: '#1e3a5f', border: '#3b82f6', icon: '#60a5fa' },
  warning: { bg: '#451a03', border: '#f97316', icon: '#fb923c' },
}

export const Toast = ({ toast, onRemove }) => {
  const c = colors[toast.type] || colors.info
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 80, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 80, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      style={{
        background: c.bg,
        border: `1px solid ${c.border}`,
        borderRadius: '12px',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        minWidth: '280px',
        maxWidth: '380px',
        boxShadow: `0 8px 32px rgba(0,0,0,0.4)`,
        cursor: 'pointer',
      }}
      onClick={() => onRemove(toast.id)}
    >
      <span style={{ color: c.icon, flexShrink: 0 }}>{icons[toast.type]}</span>
      <span style={{ color: '#fdf6ee', fontSize: '0.9rem', lineHeight: 1.4, flex: 1 }}>
        {toast.message}
      </span>
      <FiX size={16} style={{ color: '#a06828', flexShrink: 0 }} />
    </motion.div>
  )
}

export const ToastContainer = ({ toasts, removeToast }) => (
  <div style={{
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    zIndex: 9999,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    pointerEvents: 'none',
  }}>
    <AnimatePresence mode="popLayout">
      {toasts.map(t => (
        <div key={t.id} style={{ pointerEvents: 'auto' }}>
          <Toast toast={t} onRemove={removeToast} />
        </div>
      ))}
    </AnimatePresence>
  </div>
)
