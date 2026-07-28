import { motion } from 'framer-motion'
import { ReservationForm } from './ReservationForm'

export const Reservation = ({ toast }) => (
  <section id="reservations" style={{ padding: '96px 0', background: 'rgba(29,14,6,0.95)' }}>
    <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 24px' }}>
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
          📅 Book a Session
        </div>
        <h2 className="section-title" style={{ color: '#fdf6ee' }}>Make a Reservation</h2>
        <p className="section-subtitle" style={{ margin: '12px auto 0' }}>
          Book a paddle court or gaming session. We'll confirm via WhatsApp within 30 minutes.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        style={{
          background: 'rgba(45,26,14,0.35)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '24px',
          padding: 'clamp(24px, 5vw, 48px)',
        }}
      >
        <ReservationForm toast={toast} />
      </motion.div>
    </div>
  </section>
)
