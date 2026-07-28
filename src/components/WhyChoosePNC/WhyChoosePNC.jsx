import { motion } from 'framer-motion'
import { whyPNC } from '../../data/businessData'
import { STAGGER_CONTAINER, CARD_VARIANT } from '../../constants'

export const WhyChoosePNC = () => (
  <section style={{ padding: '96px 0', background: 'rgba(29,14,6,0.9)' }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ textAlign: 'center', marginBottom: '64px' }}
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
          🏆 Why PNC?
        </div>
        <h2 className="section-title" style={{ color: '#fdf6ee' }}>More Than a Café</h2>
        <p className="section-subtitle" style={{ margin: '12px auto 0' }}>
          We've designed every corner of PNC for an unmatched experience — from your first sip to your last game.
        </p>
      </motion.div>

      <motion.div
        variants={STAGGER_CONTAINER}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
        }}
      >
        {whyPNC.map((item) => (
          <motion.div
            key={item.id}
            variants={CARD_VARIANT}
            whileHover={{ y: -6, boxShadow: '0 16px 48px rgba(249,115,22,0.12)' }}
            style={{
              borderRadius: '20px',
              background: 'rgba(29,14,6,0.6)',
              border: '1px solid rgba(255,255,255,0.06)',
              padding: '32px 28px',
              transition: 'transform 0.3s, box-shadow 0.3s',
              cursor: 'default',
            }}
          >
            <div style={{
              width: 60, height: 60, borderRadius: '16px',
              background: 'rgba(249,115,22,0.1)',
              border: '1px solid rgba(249,115,22,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.75rem', marginBottom: '20px',
            }}>
              {item.icon}
            </div>
            <h3 style={{
              margin: '0 0 10px', fontSize: '1.1rem', fontWeight: 700,
              color: '#fdf6ee',
            }}>
              {item.title}
            </h3>
            <p style={{
              margin: 0, fontSize: '0.875rem', color: 'rgba(232,213,181,0.65)',
              lineHeight: 1.65,
            }}>
              {item.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
)
