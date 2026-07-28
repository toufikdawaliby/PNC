import { motion } from 'framer-motion'
import { FiArrowDown, FiCalendar, FiCoffee } from 'react-icons/fi'
import { RiRobotLine } from 'react-icons/ri'

const HERO_BG_FALLBACK = 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=1920&q=85'

export const Hero = ({ onOpenChat }) => {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage:  `url(${HERO_BG_FALLBACK}) `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }} />

      {/* Overlays */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(to bottom, rgba(13,7,3,0.7) 0%, rgba(26,15,5,0.75) 50%, rgba(13,7,3,0.95) 100%)',
      }} />
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        background: 'radial-gradient(ellipse at center, transparent 30%, rgba(13,7,3,0.4) 100%)',
      }} />

      {/* Animated orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', top: '20%', left: '10%', zIndex: 1,
          width: '400px', height: '400px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        style={{
          position: 'absolute', bottom: '20%', right: '10%', zIndex: 1,
          width: '350px', height: '350px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(251,191,36,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 10,
        textAlign: 'center', padding: '0 24px',
        maxWidth: '900px', margin: '0 auto',
      }}>
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(249,115,22,0.12)',
            border: '1px solid rgba(249,115,22,0.3)',
            borderRadius: '999px', padding: '6px 16px',
            marginBottom: '24px',
            fontSize: '0.8rem', fontWeight: 600, color: '#fb923c',
            letterSpacing: '0.08em', textTransform: 'uppercase',
          }}
        >
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />
          Now Open — Beirut, Lebanon
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          style={{
            fontSize: 'clamp(2.5rem, 7vw, 5rem)',
            fontWeight: 900, lineHeight: 1.05,
            letterSpacing: '-0.03em', marginBottom: '20px',
            color: '#fdf6ee',
          }}
        >
          Welcome to{' '}
          <span style={{
            background: 'linear-gradient(135deg, #f97316, #fbbf24)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Paddle Network
          </span>
          <br />Caffe
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.35rem)',
            color: 'rgba(232,213,181,0.85)',
            marginBottom: '40px',
            fontWeight: 400,
            letterSpacing: '0.02em',
          }}
        >
          Great Coffee&nbsp; <span style={{ color: '#f97316', margin: '0 6px' }}>•</span>&nbsp;
          Paddle Courts&nbsp; <span style={{ color: '#f97316', margin: '0 6px' }}>•</span>&nbsp;
          Gaming Network
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', justifyContent: 'center' }}
        >
          <button className="btn-primary" onClick={() => scrollTo('menu')}
            style={{ fontSize: '0.95rem', padding: '13px 28px' }}
          >
            <FiCoffee size={18} /> View Menu
          </button>
          <button className="btn-outline" onClick={() => scrollTo('reservations')}
            style={{ fontSize: '0.95rem', padding: '13px 28px' }}
          >
            <FiCalendar size={18} /> Reserve Now
          </button>
          <button
            onClick={() => document.getElementById('pnc-ai')?.click()}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '13px 28px', borderRadius: '999px',
              background: 'rgba(255,255,255,0.07)',
              border: '1.5px solid rgba(255,255,255,0.15)',
              color: '#fdf6ee', fontWeight: 600, fontSize: '0.95rem',
              cursor: 'pointer', transition: 'all 0.3s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(249,115,22,0.12)'
              e.currentTarget.style.borderColor = 'rgba(249,115,22,0.4)'
              e.currentTarget.style.color = '#fb923c'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.07)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
              e.currentTarget.style.color = '#fdf6ee'
            }}
          >
            <RiRobotLine size={18} /> Chat with PNC AI
          </button>
        </motion.div>

        {/* Stats Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          style={{
            display: 'flex', flexWrap: 'wrap', gap: '32px', justifyContent: 'center',
            marginTop: '56px',
          }}
        >
          {[
            { value: '20+', label: 'Gaming PCs' },
            { value: '2',   label: 'Paddle Courts' },
            { value: '500', label: 'Mbps Internet' },
            { value: '25+', label: 'Menu Items' },
          ].map(stat => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
                fontWeight: 900, color: '#f97316',
                background: 'linear-gradient(135deg, #f97316, #fbbf24)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'rgba(232,213,181,0.65)', fontWeight: 500, marginTop: '2px' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          position: 'absolute', bottom: '32px', left: '50%',
          transform: 'translateX(-50%)', zIndex: 10,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
          color: 'rgba(232,213,181,0.5)', cursor: 'pointer',
        }}
        onClick={() => scrollTo('menu')}
      >
        <span style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Scroll</span>
        <FiArrowDown size={16} />
      </motion.div>
    </section>
  )
}
