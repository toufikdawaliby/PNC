export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' })
  }

  const { name, phone, type, date, time, duration, notes, honeypot } = req.body

  if (honeypot) {
    return res.status(200).json({ success: true })
  }

  try {
    const gasUrl = process.env.GAS_URL
    if (!gasUrl) {
      return res.status(500).json({ success: false, error: 'Reservation service not configured.' })
    }

    await fetch(gasUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        phone,
        type,
        date,
        time,
        duration,
        notes,
        submittedAt: new Date().toISOString(),
      }),
      mode: 'no-cors',
    })

    return res.status(200).json({
      success: true,
      reservationId: `PNC-${Date.now()}`,
      message: "Reservation submitted! We'll confirm via WhatsApp within 30 minutes.",
    })
  } catch (error) {
    console.error('[Reservation API] Error:', error)
    return res.status(500).json({ success: false, error: 'Unable to submit reservation. Please try again or call us directly.' })
  }
}