import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSearch, FiX } from 'react-icons/fi'
import { menuCategories, menuItems } from '../../data/menuData'
import { STAGGER_CONTAINER, CARD_VARIANT } from '../../constants'
import { MenuCard } from './MenuCard'

const SectionHeader = ({ title, subtitle }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7 }}
    style={{ textAlign: 'center', marginBottom: '48px' }}
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
      ☕ Our Menu
    </div>
    <h2 className="section-title" style={{ color: '#fdf6ee' }}>{title}</h2>
    <p className="section-subtitle" style={{ margin: '12px auto 0' }}>{subtitle}</p>
  </motion.div>
)

export const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = menuItems.filter(item => {
    const matchCat = activeCategory === 'all' || item.category === activeCategory
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
                        item.description.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <section id="menu" style={{ padding: '96px 0', background: '#0d0703' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <SectionHeader
          title="Crafted with Passion"
          subtitle="From specialty coffees to gaming fuel — every item is made with premium ingredients and love."
        />

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            position: 'relative', maxWidth: '480px', margin: '0 auto 32px',
          }}
        >
          <FiSearch style={{
            position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)',
            color: '#7a4a1e', pointerEvents: 'none',
          }} size={18} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search menu…"
            aria-label="Search menu items"
            style={{
              width: '100%', padding: '12px 44px 12px 44px',
              borderRadius: '12px', background: 'rgba(45,26,14,0.6)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: '#fdf6ee', fontSize: '0.95rem', outline: 'none',
              boxSizing: 'border-box',
              transition: 'border-color 0.2s',
            }}
            onFocus={e => e.target.style.borderColor = 'rgba(249,115,22,0.5)'}
            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              style={{
                position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer', color: '#7a4a1e',
                display: 'flex', alignItems: 'center',
              }}
              aria-label="Clear search"
            >
              <FiX size={16} />
            </button>
          )}
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            display: 'flex', flexWrap: 'wrap', gap: '10px',
            justifyContent: 'center', marginBottom: '48px',
          }}
        >
          {menuCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              aria-pressed={activeCategory === cat.id}
              style={{
                padding: '9px 20px', borderRadius: '999px',
                fontWeight: 600, fontSize: '0.875rem',
                cursor: 'pointer', transition: 'all 0.25s',
                background: activeCategory === cat.id
                  ? 'linear-gradient(135deg, #f97316, #fbbf24)'
                  : 'rgba(45,26,14,0.6)',
                color: activeCategory === cat.id ? '#0d0703' : 'rgba(232,213,181,0.8)',
                border: activeCategory === cat.id
                  ? 'none'
                  : '1px solid rgba(255,255,255,0.08)',
                boxShadow: activeCategory === cat.id ? '0 4px 16px rgba(249,115,22,0.3)' : 'none',
              }}
            >
              {cat.emoji} {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div
              key={`${activeCategory}-${search}`}
              variants={STAGGER_CONTAINER}
              initial="hidden"
              animate="visible"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '24px',
              }}
            >
              {filtered.map(item => (
                <MenuCard key={item.id} item={item} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              style={{ textAlign: 'center', padding: '60px 20px' }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔍</div>
              <p style={{ color: '#7a4a1e', fontSize: '1.1rem' }}>
                No items found for <strong style={{ color: '#f97316' }}>"{search}"</strong>
              </p>
              <button
                onClick={() => { setSearch(''); setActiveCategory('all') }}
                className="btn-primary"
                style={{ marginTop: '16px' }}
              >
                Clear filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
