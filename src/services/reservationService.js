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
 * Create a new reservation via Vercel serverless function.
 *
 * @param {Object} reservationData
 * @param {string} reservationData.name
 * @param {string} reservationData.phone
 * @param {string} reservationData.type        - 'paddle' | 'gaming' | 'private'
 * @param {string} reservationData.date        - ISO date string
 * @param {string} reservationData.time        - e.g. '14:00'
 * @param {string} reservationData.duration    - e.g. '2h'
 * @param {string} reservationData.notes       - optional special notes
 * @param {string} reservationData.honeypot    - hidden anti-spam field
 * @returns {Promise<{success: boolean, reservationId: string, message: string}>}
 */
export const createReservation = async (reservationData) => {
  try {
    const response = await fetch('/api/reservation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...reservationData,
        submittedAt: new Date().toISOString(),
      }),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Something went wrong' }))
      throw new Error(error.error || 'Unable to submit reservation. Please try again.')
    }

    return response.json()
  } catch (error) {
    console.error('[ReservationService] Error creating reservation:', error)
    throw new Error(error.message || 'Unable to submit reservation. Please call us directly.')
  }
}
