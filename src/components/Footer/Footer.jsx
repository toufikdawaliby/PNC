import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import { FiHeart } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { businessInfo } from '../../data/businessData'
import { NAV_ITEMS } from '../../constants'

export const Footer = () => {
  const scrollTo = (href) => {
    const id = href.replace('#', '')
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer style={{
      background: '#0d0703',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: '60px 0 0',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '40px',
          marginBottom: '48px',
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div style={{
                width: 38, height: 38, borderRadius: '10px',
                background: 'linear-gradient(135deg, #f97316, #fbbf24)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 900, fontSize: '1rem', color: '#0d0703',
              }}>
                PNC
              </div>
              <span style={{ fontWeight: 800, fontSize: '1rem', color: '#fdf6ee' }}>
                Paddle Network <span style={{ color: '#f97316' }}>Caffe</span>
              </span>
            </div>
            <p style={{ color: 'rgba(232,213,181,0.5)', fontSize: '0.875rem', lineHeight: 1.65, margin: '0 0 20px' }}>
              {businessInfo.description}
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              {[
                { href: businessInfo.social.facebook, icon: <FaFacebook size={18}/>, color: '#1877f2' },
                { href: businessInfo.social.instagram, icon: <FaInstagram size={18}/>, color: '#e1306c' },
                { href: businessInfo.social.whatsapp, icon: <FaWhatsapp size={18}/>, color: '#25d366' },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                  style={{
                    width: 38, height: 38, borderRadius: '10px',
                    background: 'rgba(45,26,14,0.6)', border: '1px solid rgba(255,255,255,0.07)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: s.color, textDecoration: 'none', transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(45,26,14,0.9)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(45,26,14,0.6)'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#fdf6ee', fontWeight: 700, fontSize: '0.9rem', marginBottom: '16px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {NAV_ITEMS.filter(n => !n.isAI).map(item => (
                <li key={item.label}>
                  <button
                    onClick={() => scrollTo(item.href)}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      color: 'rgba(232,213,181,0.55)', fontSize: '0.875rem',
                      padding: 0, transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => e.target.style.color = '#f97316'}
                    onMouseLeave={e => e.target.style.color = 'rgba(232,213,181,0.55)'}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 style={{ color: '#fdf6ee', fontWeight: 700, fontSize: '0.9rem', marginBottom: '16px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Hours
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {[
                { days: 'Mon – Thu', hours: '8:00 AM – 12:00 AM' },
                { days: 'Fri – Sat', hours: '8:00 AM – 2:00 AM' },
                { days: 'Sunday', hours: '9:00 AM – 12:00 AM' },
              ].map(r => (
                <div key={r.days} style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
                  <span style={{ fontSize: '0.82rem', color: 'rgba(232,213,181,0.5)' }}>{r.days}</span>
                  <span style={{ fontSize: '0.82rem', color: 'rgba(232,213,181,0.75)', whiteSpace: 'nowrap' }}>{r.hours}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: '#fdf6ee', fontWeight: 700, fontSize: '0.9rem', marginBottom: '16px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Contact
            </h4>
            {businessInfo.phones.map(p => (
              <div key={p.type} style={{ marginBottom: '12px' }}>
                <p style={{ margin: '0 0 2px', fontSize: '0.75rem', color: '#7a4a1e', fontWeight: 600 }}>{p.label}</p>
                <a href={`tel:${p.number}`} style={{ color: 'rgba(232,213,181,0.8)', fontSize: '0.9rem', textDecoration: 'none', fontWeight: 600 }}>
                  {p.number}
                </a>
              </div>
            ))}
            <a href={`mailto:${businessInfo.email}`} style={{ color: 'rgba(232,213,181,0.6)', fontSize: '0.875rem', textDecoration: 'none' }}>
              {businessInfo.email}
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.05)',
          padding: '20px 0',
          display: 'flex', flexWrap: 'wrap', gap: '12px',
          justifyContent: 'space-between', alignItems: 'center',
        }}>
          <p style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(232,213,181,0.35)' }}>
            © {new Date().getFullYear()} Paddle Network Caffe. All rights reserved.
          </p>
          <p style={{
            margin: 0, fontSize: '0.8rem', color: 'rgba(232,213,181,0.35)',
            display: 'flex', alignItems: 'center', gap: '5px',
          }}>
            Made with <FiHeart size={12} style={{ color: '#f97316' }} /> for PNC
          </p>
        </div>
      </div>
    </footer>
  )
}
