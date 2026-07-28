import { motion } from 'framer-motion'
import { FiPhone, FiMail, FiMapPin, FiClock } from 'react-icons/fi'
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import { businessInfo, operatingHours } from '../../data/businessData'
import { STAGGER_CONTAINER, CARD_VARIANT } from '../../constants'

const today = new Date().toLocaleDateString('en-US', { weekday: 'long' })

export const Contact = () => (
  <section id="contact" style={{ padding: '96px 0', background: 'rgba(13,7,3,0.98)' }}>
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
          📍 Contact
        </div>
        <h2 className="section-title" style={{ color: '#fdf6ee' }}>Get in Touch</h2>
        <p className="section-subtitle" style={{ margin: '12px auto 0' }}>
          Have a question? We're just a call or message away.
        </p>
      </motion.div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '24px',
        marginBottom: '40px',
      }}>
        {/* Phone Cards */}
        {businessInfo.phones.map(phone => (
          <motion.div
            key={phone.type}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4, boxShadow: '0 16px 48px rgba(249,115,22,0.12)' }}
            style={{
              borderRadius: '20px',
              background: 'rgba(45,26,14,0.4)',
              border: '1px solid rgba(255,255,255,0.07)',
              padding: '28px',
              transition: 'transform 0.3s, box-shadow 0.3s',
            }}
          >
            <div style={{
              width: 52, height: 52, borderRadius: '14px',
              background: 'rgba(249,115,22,0.1)',
              border: '1px solid rgba(249,115,22,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '16px',
              color: '#f97316',
            }}>
              <FiPhone size={22} />
            </div>
            <p style={{ color: '#7a4a1e', fontSize: '0.8rem', fontWeight: 600, margin: '0 0 6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {phone.label}
            </p>
            <a href={`tel:${phone.number}`} style={{
              fontSize: '1.4rem', fontWeight: 800, color: '#fdf6ee',
              textDecoration: 'none', letterSpacing: '-0.02em',
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.target.style.color = '#f97316'}
              onMouseLeave={e => e.target.style.color = '#fdf6ee'}
            >
              {phone.number}
            </a>
          </motion.div>
        ))}

        {/* Email */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ y: -4 }}
          style={{
            borderRadius: '20px',
            background: 'rgba(45,26,14,0.4)',
            border: '1px solid rgba(255,255,255,0.07)',
            padding: '28px',
            transition: 'transform 0.3s',
          }}
        >
          <div style={{
            width: 52, height: 52, borderRadius: '14px',
            background: 'rgba(249,115,22,0.1)',
            border: '1px solid rgba(249,115,22,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: '16px', color: '#f97316',
          }}>
            <FiMail size={22} />
          </div>
          <p style={{ color: '#7a4a1e', fontSize: '0.8rem', fontWeight: 600, margin: '0 0 6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Email Us
          </p>
          <a href={`mailto:${businessInfo.email}`} style={{
            fontSize: '1.2rem', fontWeight: 700, color: '#fdf6ee', textDecoration: 'none',
            transition: 'color 0.2s',
          }}
            onMouseEnter={e => e.target.style.color = '#f97316'}
            onMouseLeave={e => e.target.style.color = '#fdf6ee'}
          >
            {businessInfo.email}
          </a>
        </motion.div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '24px',
        marginBottom: '40px',
      }}>
        {/* Hours */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            borderRadius: '20px',
            background: 'rgba(45,26,14,0.4)',
            border: '1px solid rgba(255,255,255,0.07)',
            padding: '28px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <FiClock size={20} style={{ color: '#f97316' }} />
            <h3 style={{ margin: 0, fontWeight: 700, color: '#fdf6ee', fontSize: '1rem' }}>Business Hours</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {operatingHours.map(h => (
              <div key={h.day} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '6px 10px', borderRadius: '8px',
                background: h.day === today ? 'rgba(249,115,22,0.1)' : 'transparent',
                border: h.day === today ? '1px solid rgba(249,115,22,0.2)' : '1px solid transparent',
              }}>
                <span style={{
                  fontSize: '0.875rem', fontWeight: h.day === today ? 700 : 400,
                  color: h.day === today ? '#f97316' : 'rgba(232,213,181,0.7)',
                }}>
                  {h.day} {h.day === today && '(Today)'}
                </span>
                <span style={{ fontSize: '0.875rem', color: 'rgba(232,213,181,0.8)', fontWeight: 500 }}>
                  {h.open} – {h.close}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Map Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            borderRadius: '20px', overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.07)',
            minHeight: '300px', position: 'relative',
            background: '#1a0f05',
            display: 'flex', flexDirection: 'column',
          }}
        >
          <div style={{
            flex: 1,
            background: 'url(https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=600&q=70) center/cover',
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute', inset: 0,
              background: 'rgba(13,7,3,0.55)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: '8px',
            }}>
              <FiMapPin size={36} style={{ color: '#f97316' }} />
              <span style={{ fontWeight: 700, color: '#fdf6ee', fontSize: '1rem' }}>{businessInfo.address}</span>
              <span style={{ fontSize: '0.8rem', color: 'rgba(232,213,181,0.6)' }}>Google Maps integration coming soon</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Social Links */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        style={{ textAlign: 'center' }}
      >
        <p style={{ color: '#7a4a1e', marginBottom: '20px', fontWeight: 500 }}>Follow us on social media</p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          {[
            { href: businessInfo.social.facebook, icon: <FaFacebook size={22}/>, label: 'Facebook', color: '#1877f2' },
            { href: businessInfo.social.instagram, icon: <FaInstagram size={22}/>, label: 'Instagram', color: '#e1306c' },
            { href: businessInfo.social.whatsapp, icon: <FaWhatsapp size={22}/>, label: 'WhatsApp', color: '#25d366' },
          ].map(s => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank" rel="noopener noreferrer"
              aria-label={s.label}
              whileHover={{ scale: 1.12, y: -3 }}
              whileTap={{ scale: 0.95 }}
              style={{
                width: 52, height: 52, borderRadius: '14px',
                background: 'rgba(45,26,14,0.6)',
                border: '1px solid rgba(255,255,255,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: s.color, textDecoration: 'none',
                transition: 'box-shadow 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = `0 8px 24px ${s.color}33`}
              onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
            >
              {s.icon}
            </motion.a>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
)
