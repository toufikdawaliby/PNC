import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { faqItems } from '../../data/businessData'

export const FAQ = () => {
  const [open, setOpen] = useState(null)

  const categories = [...new Set(faqItems.map(f => f.category))]

  return (
    <section style={{ padding: '96px 0', background: 'rgba(29,14,6,0.9)' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '56px' }}
        >
          <div style={{
            display: 'inline-block',
            background: 'rgba(249,115,22,0.1)',
            border: '1px solid rgba(249,115,22,0.25)',
            borderRadius: '999px', padding: '4px 16px',
            fontSize: '0.78rem', fontWeight: 600, color: '#fb923c',
            letterSpacing: '0.1em', textTransform: 'uppercase',
            marginBottom: '12px',
          }}>
            ❓ FAQ
          </div>
          <h2 className="section-title" style={{ color: '#fdf6ee' }}>Frequently Asked Questions</h2>
          <p className="section-subtitle" style={{ margin: '12px auto 0' }}>
            Everything you need to know about PNC.
          </p>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {faqItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              style={{
                borderRadius: '14px',
                border: open === item.id ? '1px solid rgba(249,115,22,0.3)' : '1px solid rgba(255,255,255,0.07)',
                background: open === item.id ? 'rgba(61,36,17,0.4)' : 'rgba(29,14,6,0.6)',
                overflow: 'hidden',
                transition: 'border-color 0.2s, background 0.2s',
              }}
            >
              <button
                onClick={() => setOpen(open === item.id ? null : item.id)}
                aria-expanded={open === item.id}
                style={{
                  width: '100%', padding: '18px 22px',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  background: 'none', border: 'none', cursor: 'pointer',
                  textAlign: 'left', gap: '12px',
                }}
              >
                <div>
                  <span style={{
                    fontSize: '0.7rem', fontWeight: 700, color: '#f97316',
                    textTransform: 'uppercase', letterSpacing: '0.08em',
                    marginRight: '10px',
                  }}>
                    {item.category}
                  </span>
                  <span style={{ fontWeight: 600, color: '#fdf6ee', fontSize: '0.95rem' }}>
                    {item.question}
                  </span>
                </div>
                <span style={{ color: '#f97316', flexShrink: 0 }}>
                  {open === item.id ? <FiChevronUp size={18}/> : <FiChevronDown size={18}/>}
                </span>
              </button>

              <AnimatePresence>
                {open === item.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p style={{
                      padding: '0 22px 20px',
                      color: 'rgba(232,213,181,0.75)',
                      fontSize: '0.9rem', lineHeight: 1.7,
                      margin: 0,
                    }}>
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
