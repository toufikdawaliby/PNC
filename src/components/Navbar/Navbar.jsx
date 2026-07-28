import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiMenu } from 'react-icons/fi'
import { NAV_ITEMS } from '../../constants'
import { useScrollSpy } from '../../hooks/useScrollSpy'
import { useTheme } from '../../hooks/useTheme'
import { RiRobotLine } from 'react-icons/ri'

const sectionIds = ['home', 'menu', 'paddle-prices', 'network-prices', 'reservations', 'contact']

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const activeSection = useScrollSpy(sectionIds, 100)
  const { theme, toggleTheme, isDark } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (href) => {
    setMobileOpen(false)
    if (href === '#pnc-ai') {
      document.getElementById('pnc-ai')?.click()
      return
    }
    const id = href.replace('#', '')
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const isActive = (href) => {
    const id = href.replace('#', '')
    return activeSection === id
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          transition: 'all 0.3s ease',
          background: scrolled
            ? 'rgba(26,15,5,0.95)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
          boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.3)' : 'none',
        }}
      >
        <div style={{
          maxWidth: '1280px', margin: '0 auto',
          padding: '0 24px',
          height: '70px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
            aria-label="PNC Home"
          >
            <div style={{
              width: 38, height: 38, borderRadius: '10px',
              background: 'linear-gradient(135deg, #f97316, #fbbf24)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 900, fontSize: '1rem', color: '#0d0703',
            }}>
              PNC
            </div>
            <span style={{
              fontWeight: 800, fontSize: '1.1rem', color: '#fdf6ee',
              letterSpacing: '-0.02em',
            }}>
              Paddle Network <span style={{ color: '#f97316' }}>Caffe</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }} className="desktop-nav">
            {NAV_ITEMS.map(item => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                aria-label={`Navigate to ${item.label}`}
                style={{
                  background: item.isAI
                    ? 'linear-gradient(135deg, rgba(249,115,22,0.15), rgba(251,191,36,0.1))'
                    : isActive(item.href) ? 'rgba(249,115,22,0.12)' : 'transparent',
                  border: item.isAI ? '1px solid rgba(249,115,22,0.35)' : 'none',
                  borderRadius: '8px',
                  padding: '7px 14px',
                  color: item.isAI
                    ? '#fb923c'
                    : isActive(item.href) ? '#f97316' : 'rgba(253,246,238,0.8)',
                  fontWeight: isActive(item.href) || item.isAI ? 600 : 500,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex', alignItems: 'center', gap: '5px',
                  letterSpacing: item.isAI ? '0.02em' : 0,
                }}
                onMouseEnter={e => {
                  if (!item.isAI) e.currentTarget.style.color = '#fdf6ee'
                }}
                onMouseLeave={e => {
                  if (!item.isAI) e.currentTarget.style.color = isActive(item.href) ? '#f97316' : 'rgba(253,246,238,0.8)'
                }}
              >
                {item.isAI && <RiRobotLine size={14} />}
                {item.label}
              </button>
            ))}

            
          </div>

          {/* Mobile Hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }} className="mobile-nav">
            
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle mobile menu"
              style={{
                background: 'rgba(249,115,22,0.12)', border: '1px solid rgba(249,115,22,0.25)',
                borderRadius: '8px', width: 40, height: 40,
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#f97316',
              }}
            >
              {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              style={{
                position: 'fixed', inset: 0, zIndex: 90,
                background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)',
              }}
            />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 340, damping: 30 }}
              style={{
                position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 95,
                width: '280px', background: '#1a0f05',
                borderLeft: '1px solid rgba(255,255,255,0.08)',
                padding: '80px 24px 32px',
                display: 'flex', flexDirection: 'column', gap: '8px',
              }}
            >
              <button
                onClick={() => setMobileOpen(false)}
                style={{
                  position: 'absolute', top: 20, right: 20,
                  background: 'rgba(249,115,22,0.12)', border: '1px solid rgba(249,115,22,0.25)',
                  borderRadius: '8px', width: 36, height: 36,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#f97316',
                }}
              >
                <FiX size={18} />
              </button>
              {NAV_ITEMS.map(item => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  style={{
                    background: item.isAI
                      ? 'linear-gradient(135deg, rgba(249,115,22,0.15), rgba(251,191,36,0.1))'
                      : isActive(item.href) ? 'rgba(249,115,22,0.1)' : 'transparent',
                    border: item.isAI ? '1px solid rgba(249,115,22,0.3)' : 'none',
                    borderRadius: '10px', padding: '12px 16px',
                    color: item.isAI ? '#fb923c' : isActive(item.href) ? '#f97316' : '#fdf6ee',
                    fontWeight: 500, fontSize: '1rem',
                    cursor: 'pointer', textAlign: 'left',
                    display: 'flex', alignItems: 'center', gap: '8px',
                    transition: 'all 0.2s',
                  }}
                >
                  {item.isAI && <RiRobotLine size={16} />}
                  {item.label}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 900px) {
          .desktop-nav { display: flex !important; }
          .mobile-nav { display: none !important; }
        }
        @media (max-width: 899px) {
          .desktop-nav { display: none !important; }
          .mobile-nav { display: flex !important; }
        }
      `}</style>
    </>
  )
}
