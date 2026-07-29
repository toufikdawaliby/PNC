import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiUser, FiPhone, FiCalendar, FiClock, FiMessageSquare, FiSend } from 'react-icons/fi'
import { createReservation, RESERVATION_TYPES, DURATION_OPTIONS } from '../../services/reservationService'

const TIMES = ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00']

const Field = ({ label, icon, error, children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
    <label style={{
      fontSize: '0.82rem', fontWeight: 600, color: 'rgba(232,213,181,0.8)',
      display: 'flex', alignItems: 'center', gap: '6px',
    }}>
      {icon} {label}
    </label>
    {children}
    {error && <span style={{ fontSize: '0.75rem', color: '#f87171' }}>{error}</span>}
  </div>
)

const inputStyle = {
  padding: '11px 14px', borderRadius: '10px',
  background: 'rgba(45,26,14,0.5)', border: '1px solid rgba(255,255,255,0.08)',
  color: '#fdf6ee', fontSize: '0.9rem', outline: 'none',
  transition: 'border-color 0.2s', width: '100%', boxSizing: 'border-box',
}

export const ReservationForm = ({ toast }) => {
  const [form, setForm] = useState({
    name: '', phone: '', type: '', date: '', time: '', duration: '', notes: '', honeypot: '',
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const set = (key, val) => {
    setForm(f => ({ ...f, [key]: val }))
    setErrors(e => ({ ...e, [key]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim())  e.name  = 'Name is required'
    if (!form.phone.trim()) e.phone = 'Phone number is required'
    else if (!/^\+?[\d\s\-()]{7,}$/.test(form.phone.trim())) e.phone = 'Enter a valid phone number'
    if (!form.type)         e.type  = 'Please select a reservation type'
    if (!form.date)         e.date  = 'Please select a date'
    else if (new Date(form.date) < new Date(new Date().toDateString())) e.date = 'Date cannot be in the past'
    if (!form.time)         e.time  = 'Please select a time'
    if (!form.duration)     e.duration = 'Please select a duration'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSubmitting(true)
    try {
      const result = await createReservation(form)
      if (result.success) {
        setSubmitted(true)
        toast?.success(`Reservation confirmed! ID: ${result.reservationId}`)
      }
    } catch (err) {
      toast?.error(err.message || 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const today = new Date().toISOString().split('T')[0]

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ textAlign: 'center', padding: '60px 20px' }}
      >
        <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🎉</div>
        <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fdf6ee', marginBottom: '10px' }}>
          Reservation Submitted!
        </h3>
        <p style={{ color: 'rgba(232,213,181,0.7)', marginBottom: '24px' }}>
          We'll confirm your booking via WhatsApp within 30 minutes.
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '20px',
      }}>
        <Field label="Full Name" icon={<FiUser size={13}/>} error={errors.name}>
          <input value={form.name} onChange={e => set('name', e.target.value)}
            placeholder="Your full name" style={inputStyle}
            onFocus={e => e.target.style.borderColor = 'rgba(249,115,22,0.5)'}
            onBlur={e => e.target.style.borderColor = errors.name ? '#f87171' : 'rgba(255,255,255,0.08)'}
          />
        </Field>

        <Field label="Phone Number" icon={<FiPhone size={13}/>} error={errors.phone}>
          <input value={form.phone} onChange={e => set('phone', e.target.value)}
            placeholder="+961 XX XXX XXX" type="tel" style={inputStyle}
            onFocus={e => e.target.style.borderColor = 'rgba(249,115,22,0.5)'}
            onBlur={e => e.target.style.borderColor = errors.phone ? '#f87171' : 'rgba(255,255,255,0.08)'}
          />
        </Field>

        <Field label="Reservation Type" icon={<FiCalendar size={13}/>} error={errors.type}>
          <select value={form.type} onChange={e => { set('type', e.target.value); set('duration', '') }}
            style={{ ...inputStyle, appearance: 'auto', cursor: 'pointer' }}
            onFocus={e => e.target.style.borderColor = 'rgba(249,115,22,0.5)'}
            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
          >
            <option value="">Select type…</option>
            {RESERVATION_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
        </Field>

        <Field label="Date" icon={<FiCalendar size={13}/>} error={errors.date}>
          <input type="date" value={form.date} min={today} onChange={e => set('date', e.target.value)}
            style={{ ...inputStyle, colorScheme: 'dark' }}
            onFocus={e => e.target.style.borderColor = 'rgba(249,115,22,0.5)'}
            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
          />
        </Field>

        <Field label="Time" icon={<FiClock size={13}/>} error={errors.time}>
          <select value={form.time} onChange={e => set('time', e.target.value)}
            style={{ ...inputStyle, appearance: 'auto', cursor: 'pointer' }}
            onFocus={e => e.target.style.borderColor = 'rgba(249,115,22,0.5)'}
            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
          >
            <option value="">Select time…</option>
            {TIMES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </Field>

        <Field label="Duration" icon={<FiClock size={13}/>} error={errors.duration}>
          <select value={form.duration} onChange={e => set('duration', e.target.value)}
            disabled={!form.type}
            style={{ ...inputStyle, appearance: 'auto', cursor: form.type ? 'pointer' : 'not-allowed', opacity: form.type ? 1 : 0.5 }}
            onFocus={e => e.target.style.borderColor = 'rgba(249,115,22,0.5)'}
            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
          >
            <option value="">Select duration…</option>
            {(DURATION_OPTIONS[form.type] || []).map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
          </select>
        </Field>

        <div style={{ gridColumn: '1 / -1' }}>
        <div style={{ position: 'absolute', opacity: 0, height: 0, width: 0, overflow: 'hidden' }} aria-hidden="true">
          <label htmlFor="honeypot">Company</label>
          <input
            id="honeypot"
            name="website"
            type="text"
            value={form.honeypot}
            onChange={e => set('honeypot', e.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>
        <Field label="Special Notes (optional)" icon={<FiMessageSquare size={13}/>}>
            <textarea value={form.notes} onChange={e => set('notes', e.target.value)}
              placeholder="Any special requests or notes…"
              rows={3}
              style={{ ...inputStyle, resize: 'vertical', minHeight: '80px' }}
              onFocus={e => e.target.style.borderColor = 'rgba(249,115,22,0.5)'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
            />
          </Field>
        </div>
      </div>

      <div style={{ marginTop: '28px', display: 'flex', justifyContent: 'center' }}>
        <motion.button
          type="submit"
          className="btn-primary"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          disabled={submitting}
          style={{
            padding: '13px 40px', fontSize: '1rem',
            opacity: submitting ? 0.7 : 1, cursor: submitting ? 'wait' : 'pointer',
          }}
        >
          {submitting ? (
            <>⏳ Submitting…</>
          ) : (
            <><FiSend size={16} /> Submit Reservation</>
          )}
        </motion.button>
      </div>
    </form>
  )
}
