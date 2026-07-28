import axios from 'axios'

// ─── API Configuration ────────────────────────────────────────────────────────
// Replace BASE_URL with your Node.js/Express or n8n REST API endpoint
const BASE_URL = import.meta.env.VITE_API_URL || 'https://your-api-url.com/api'

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
})

// ─── Reservation Types ────────────────────────────────────────────────────────
export const RESERVATION_TYPES = [
  { value: 'paddle',  label: 'Paddle Court' },
  { value: 'gaming',  label: 'Gaming Network' },
  { value: 'private', label: 'Private Event' },
]

// ─── Duration Options ─────────────────────────────────────────────────────────
export const DURATION_OPTIONS = {
  paddle: [
    { value: '1h',  label: '1 Hour' },
    { value: '2h',  label: '2 Hours' },
    { value: '3h',  label: '3 Hours' },
  ],
  gaming: [
    { value: '1h',   label: '1 Hour' },
    { value: '3h',   label: '3 Hours' },
    { value: '5h',   label: '5 Hours' },
    { value: 'night', label: 'Night Package (10 PM – 8 AM)' },
  ],
  private: [
    { value: '2h',  label: '2 Hours' },
    { value: '4h',  label: '4 Hours' },
    { value: '6h',  label: '6 Hours' },
  ],
}

/**
 * Create a new reservation.
 *
 * @param {Object} reservationData
 * @param {string} reservationData.name
 * @param {string} reservationData.phone
 * @param {string} reservationData.type        - 'paddle' | 'gaming' | 'private'
 * @param {string} reservationData.date        - ISO date string
 * @param {string} reservationData.time        - e.g. '14:00'
 * @param {string} reservationData.duration    - e.g. '2h'
 * @param {string} reservationData.notes       - optional special notes
 * @returns {Promise<{success: boolean, reservationId: string, message: string}>}
 */
export const createReservation = async (reservationData) => {
  // ── MOCK — remove when backend is ready ─────────────────────────────────
  if (!import.meta.env.VITE_API_URL) {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return {
      success: true,
      reservationId: `PNC-${Date.now()}`,
      message: 'Reservation submitted! We\'ll confirm via WhatsApp within 30 minutes.',
    }
  }
  // ── END MOCK ─────────────────────────────────────────────────────────────

  try {
    const response = await apiClient.post('/reservations', {
      ...reservationData,
      source: 'pnc-website',
      createdAt: new Date().toISOString(),
    })
    return response.data
  } catch (error) {
    console.error('[ReservationService] Error creating reservation:', error)
    throw new Error('Unable to submit reservation. Please call us directly.')
  }
}

/**
 * Get available time slots for a specific date and reservation type.
 *
 * @param {string} date - ISO date string
 * @param {string} type - 'paddle' | 'gaming'
 * @returns {Promise<string[]>} - Array of available time strings e.g. ['09:00', '10:00']
 */
export const getAvailableSlots = async (date, type) => {
  // ── MOCK ─────────────────────────────────────────────────────────────────
  if (!import.meta.env.VITE_API_URL) {
    await new Promise(resolve => setTimeout(resolve, 500))
    return ['09:00', '10:00', '11:00', '13:00', '14:00', '16:00', '17:00', '19:00', '20:00']
  }
  // ── END MOCK ─────────────────────────────────────────────────────────────

  try {
    const response = await apiClient.get('/reservations/slots', {
      params: { date, type },
    })
    return response.data.slots
  } catch (error) {
    console.error('[ReservationService] Error fetching slots:', error)
    return []
  }
}

/**
 * Get all reservations for a phone number.
 *
 * @param {string} phone
 * @returns {Promise<Array>}
 */
export const getReservationsByPhone = async (phone) => {
  // ── MOCK ─────────────────────────────────────────────────────────────────
  if (!import.meta.env.VITE_API_URL) {
    return []
  }
  // ── END MOCK ─────────────────────────────────────────────────────────────

  try {
    const response = await apiClient.get('/reservations', { params: { phone } })
    return response.data
  } catch (error) {
    console.error('[ReservationService] Error fetching reservations:', error)
    return []
  }
}
