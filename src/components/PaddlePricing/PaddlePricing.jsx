import { motion } from 'framer-motion'
import { FiCheck, FiClock, FiGrid, FiZap } from 'react-icons/fi'
import { paddlePlans, paddleInfo } from '../../data/pricingData'
import { STAGGER_CONTAINER, CARD_VARIANT } from '../../constants'

const SectionLabel = ({ text }) => (
  <div style={{
    display: 'inline-block',
    background: 'rgba(249,115,22,0.1)',
    border: '1px solid rgba(249,115,22,0.25)',
    borderRadius: '999px', padding: '4px 16px',
    fontSize: '0.78rem', fontWeight: 600, color: '#fb923c',
    letterSpacing: '0.1em', textTransform: 'uppercase',
    marginBottom: '12px',
  }}>{text}</div>
)

export const PaddlePricing = () => (
  <section id="paddle-prices" style={{ padding: '96px 0', background: '#0d0703' }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ textAlign: 'center', marginBottom: '64px' }}
      >
        <SectionLabel text="🏓 Paddle Courts" />
        <h2 className="section-title" style={{ color: '#fdf6ee' }}>Court Pricing</h2>
        <p className="section-subtitle" style={{ margin: '12px auto 0' }}>
          Professional glass-walled courts with all equipment included. Book your session today.
        </p>
      </motion.div>

      {/* Court Info Strip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{
          display: 'flex', flexWrap: 'wrap', gap: '24px', justifyContent: 'center',
          marginBottom: '56px',
        }}
      >
        {[
          { icon: <FiGrid size={18}/>, label: 'Total Courts', value: `${paddleInfo.totalCourts} Courts` },
          { icon: <FiZap size={18}/>, label: 'Available Now', value: `${paddleInfo.availableCourts} Available`, accent: true },
          { icon: <FiClock size={18}/>, label: 'Operating Hours', value: paddleInfo.operatingHours },
        ].map(stat => (
          <div
            key={stat.label}
            style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              background: 'rgba(45,26,14,0.5)', border: `1px solid ${stat.accent ? 'rgba(74,222,128,0.3)' : 'rgba(255,255,255,0.07)'}`,
              borderRadius: '14px', padding: '14px 22px',
            }}
          >
            <span style={{ color: stat.accent ? '#4ade80' : '#f97316' }}>{stat.icon}</span>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#7a4a1e', fontWeight: 500 }}>{stat.label}</div>
              <div style={{ fontWeight: 700, color: stat.accent ? '#4ade80' : '#fdf6ee', fontSize: '0.95rem' }}>{stat.value}</div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Pricing Cards */}
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
        {paddlePlans.map(plan => (
          <motion.div
            key={plan.id}
            variants={CARD_VARIANT}
            whileHover={{ y: -6 }}
            style={{
              borderRadius: '22px',
              border: plan.popular ? '2px solid #f97316' : '1px solid rgba(255,255,255,0.07)',
              background: plan.popular
                ? 'linear-gradient(160deg, rgba(61,36,17,0.9), rgba(45,26,14,0.8))'
                : 'rgba(29,14,6,0.6)',
              padding: '32px',
              position: 'relative',
              overflow: 'hidden',
              transition: 'transform 0.3s, box-shadow 0.3s',
              boxShadow: plan.popular ? '0 0 40px rgba(249,115,22,0.15)' : 'none',
            }}
          >
            {plan.popular && (
              <div style={{
                position: 'absolute', top: '16px', right: '-30px',
                background: 'linear-gradient(135deg, #f97316, #fbbf24)',
                color: '#0d0703', fontSize: '0.7rem', fontWeight: 800,
                padding: '4px 40px', transform: 'rotate(45deg)',
                letterSpacing: '0.08em',
              }}>POPULAR</div>
            )}

            <div style={{
              fontSize: '0.9rem', fontWeight: 600, color: '#f97316',
              marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.06em',
            }}>
              {plan.duration}
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '24px' }}>
              <span style={{
                fontSize: '3rem', fontWeight: 900,
                background: 'linear-gradient(135deg, #fdf6ee, #e8d5b5)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                ${plan.price}
              </span>
              <span style={{ color: '#7a4a1e', fontSize: '0.9rem' }}>/{plan.per}</span>
            </div>

            <ul style={{ listStyle: 'none', margin: '0 0 28px', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {plan.features.map(f => (
                <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'rgba(232,213,181,0.85)' }}>
                  <FiCheck size={15} style={{ color: '#4ade80', flexShrink: 0 }} />
                  {f}
                </li>
              ))}
            </ul>

            {plan.note && (
              <p style={{ fontSize: '0.75rem', color: '#7a4a1e', marginBottom: '20px', fontStyle: 'italic' }}>
                {plan.note}
              </p>
            )}

            <button
              className={plan.popular ? 'btn-primary' : 'btn-outline'}
              onClick={() => document.getElementById('reservations')?.scrollIntoView({ behavior: 'smooth' })}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              Book Now
            </button>
          </motion.div>
        ))}
      </motion.div>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        style={{ marginTop: '56px', textAlign: 'center' }}
      >
        <p style={{ color: '#7a4a1e', fontSize: '0.85rem', marginBottom: '16px', fontWeight: 500 }}>All courts include:</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
          {paddleInfo.features.map(f => (
            <span key={f} style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: 'rgba(45,26,14,0.5)', border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '999px', padding: '5px 14px',
              fontSize: '0.82rem', color: 'rgba(232,213,181,0.7)',
            }}>
              <FiCheck size={12} style={{ color: '#4ade80' }} /> {f}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
)
