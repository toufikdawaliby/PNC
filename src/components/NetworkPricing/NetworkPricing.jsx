import { motion } from 'framer-motion'
import { FiCheck, FiMonitor, FiWifi, FiZap } from 'react-icons/fi'
import { networkPlans, networkInfo } from '../../data/pricingData'
import { STAGGER_CONTAINER, CARD_VARIANT } from '../../constants'

const SectionLabel = ({ text }) => (
  <div style={{
    display: 'inline-block',
    background: 'rgba(99,102,241,0.1)',
    border: '1px solid rgba(99,102,241,0.25)',
    borderRadius: '999px', padding: '4px 16px',
    fontSize: '0.78rem', fontWeight: 600, color: '#818cf8',
    letterSpacing: '0.1em', textTransform: 'uppercase',
    marginBottom: '12px',
  }}>{text}</div>
)

export const NetworkPricing = () => (
  <section id="network-prices" style={{
    padding: '96px 0',
    background: 'linear-gradient(180deg, #0d0703 0%, #130a1a 50%, #0d0703 100%)',
  }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ textAlign: 'center', marginBottom: '64px' }}
      >
        <SectionLabel text="🎮 Gaming Network" />
        <h2 className="section-title" style={{ color: '#fdf6ee' }}>Network Pricing</h2>
        <p className="section-subtitle" style={{ margin: '12px auto 0' }}>
          High-end gaming rigs with blazing-fast internet. Play longer, pay less.
        </p>
      </motion.div>

      {/* Specs Strip */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        style={{
          display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center',
          marginBottom: '56px',
        }}
      >
        {[
          { icon: <FiMonitor size={16}/>, label: networkInfo.totalPCs + ' Gaming PCs' },
          { icon: <FiWifi size={16}/>, label: networkInfo.internetSpeed + ' Fiber' },
          { icon: <FiZap size={16}/>, label: networkInfo.specs },
        ].map(s => (
          <div key={s.label} style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            background: 'rgba(99,102,241,0.07)',
            border: '1px solid rgba(99,102,241,0.2)',
            borderRadius: '12px', padding: '10px 18px',
            color: '#c7d2fe', fontSize: '0.875rem', fontWeight: 500,
          }}>
            <span style={{ color: '#818cf8' }}>{s.icon}</span>
            {s.label}
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
          gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
          gap: '20px',
        }}
      >
        {networkPlans.map(plan => (
          <motion.div
            key={plan.id}
            variants={CARD_VARIANT}
            whileHover={{ y: -6, boxShadow: plan.popular ? '0 16px 50px rgba(99,102,241,0.25)' : '0 12px 40px rgba(0,0,0,0.4)' }}
            style={{
              borderRadius: '20px',
              border: plan.popular ? '2px solid rgba(99,102,241,0.6)' : '1px solid rgba(255,255,255,0.07)',
              background: plan.popular
                ? 'linear-gradient(160deg, rgba(30,20,50,0.95), rgba(19,10,26,0.9))'
                : 'rgba(29,14,6,0.5)',
              padding: '28px',
              position: 'relative',
              overflow: 'hidden',
              transition: 'transform 0.3s, box-shadow 0.3s',
            }}
          >
            {plan.popular && (
              <div style={{
                position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
                background: 'linear-gradient(135deg, #6366f1, #818cf8)',
                color: '#fff', fontSize: '0.68rem', fontWeight: 800,
                padding: '3px 20px', borderRadius: '0 0 10px 10px',
                letterSpacing: '0.08em',
              }}>BEST VALUE</div>
            )}

            <div style={{ marginTop: plan.popular ? '12px' : 0 }}>
              {plan.note && (
                <div style={{
                  fontSize: '0.72rem', color: '#818cf8', fontWeight: 600,
                  marginBottom: '4px', letterSpacing: '0.05em',
                }}>
                  {plan.note}
                </div>
              )}
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#818cf8', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {plan.duration}
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '20px' }}>
                <span style={{
                  fontSize: '2.6rem', fontWeight: 900,
                  background: plan.popular
                    ? 'linear-gradient(135deg, #a78bfa, #818cf8)'
                    : 'linear-gradient(135deg, #fdf6ee, #e8d5b5)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}>
                  ${plan.price}
                </span>
                <span style={{ color: '#7a4a1e', fontSize: '0.85rem' }}>/{plan.per}</span>
              </div>

              <ul style={{ listStyle: 'none', margin: '0 0 24px', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {plan.features.map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'rgba(232,213,181,0.8)' }}>
                    <FiCheck size={13} style={{ color: plan.popular ? '#818cf8' : '#4ade80', flexShrink: 0 }} />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => document.getElementById('reservations')?.scrollIntoView({ behavior: 'smooth' })}
                style={{
                  width: '100%', padding: '10px', borderRadius: '12px',
                  border: plan.popular ? 'none' : '1px solid rgba(99,102,241,0.3)',
                  background: plan.popular ? 'linear-gradient(135deg, #6366f1, #818cf8)' : 'rgba(99,102,241,0.08)',
                  color: plan.popular ? '#fff' : '#818cf8',
                  fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer',
                  transition: 'all 0.25s',
                }}
                onMouseEnter={e => {
                  if (!plan.popular) {
                    e.currentTarget.style.background = 'rgba(99,102,241,0.2)'
                  }
                }}
                onMouseLeave={e => {
                  if (!plan.popular) {
                    e.currentTarget.style.background = 'rgba(99,102,241,0.08)'
                  }
                }}
              >
                Get Started
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* PC Features */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        style={{ marginTop: '56px', textAlign: 'center' }}
      >
        <p style={{ color: '#7a4a1e', fontSize: '0.85rem', marginBottom: '16px', fontWeight: 500 }}>Every gaming station includes:</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
          {networkInfo.features.map(f => (
            <span key={f} style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: 'rgba(99,102,241,0.07)',
              border: '1px solid rgba(99,102,241,0.2)',
              borderRadius: '999px', padding: '5px 14px',
              fontSize: '0.82rem', color: 'rgba(199,210,254,0.7)',
            }}>
              <FiCheck size={12} style={{ color: '#818cf8' }} /> {f}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
)
