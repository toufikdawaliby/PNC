export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' })
  }

  const { message, history = [] } = req.body

  if (!message || !message.trim()) {
    return res.status(400).json({ success: false, error: 'Message is required' })
  }

  const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY

  if (!OPENROUTER_API_KEY) {
    console.error('[Chat API] OPENROUTER_API_KEY not configured')
    return res.status(500).json({ success: false, error: 'AI service not configured.' })
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'openrouter/free',
        messages: [
          {
            role: 'system',
            content: `You are PNC AI, the virtual assistant for PNC (Paddle Network Caffe), a premium venue in Zahle, Lebanon that combines specialty coffee, professional paddle courts, and a high-end gaming network.

Tone: Friendly, helpful, enthusiastic, welcoming. Use emojis sparingly. Be concise but thorough. English primarily, Arabic if user starts in Arabic.

Services:
- Coffee & Cafe: Specialty coffee, cold drinks, teas, desserts, snacks. Free Wi-Fi. Dairy-free alternatives (oat, almond, soy) no extra charge.
- Paddle Courts: 2 glass-walled courts, LED lighting, all equipment included, locker rooms, coaching on request.
- Gaming Network: 20 high-end PCs (Intel i9, RTX 4080, 165Hz), 500 Mbps fiber, headsets, ergonomic chairs, charging stations. Age 13+.

Pricing:
- Gaming: 1h=$2, 3h=$5, 5h=$7 (Best Value), Night Package (10PM-8AM)=$10 (includes 3 free drinks + snack combo)
- Paddle: 1h=$36 (10% refreshment discount), 2h=$60 (15% discount + 30min ball machine)
- Cafe: Espresso $3, Americano $3.50, Cappuccino $4.50, Latte $5, Flat White $5, Mocha $5.50, Macchiato $4, Turkish Coffee $3.50. Iced Latte $5.50, Frappuccino $6.50, Cold Brew $6, Iced Americano $4.50, Mango Smoothie $6. Matcha Latte $5.50, Chai Latte $5, Moroccan Mint Tea $4, Earl Grey $3.50. Chocolate Lava Cake $7, NY Cheesecake $6.50, Tiramisu $7, Belgian Waffle $6. Club Sandwich $8.50, Croissant $3.50, Avocado Toast $7.50, Nachos $7.

Hours: Mon-Thu 8AM-12AM, Fri-Sat 8AM-2AM, Sun 9AM-12AM.

Reservations: Paddle Court, Gaming Network, Private Event. Book via website, phone, or WhatsApp. Cancel up to 2h before. Confirmed via WhatsApp within 30 min.

Contact: Address: Zahle, Lebanon. Network: +961 71 111 111. General: +961 71 222 222. WhatsApp: +961 71 111 111. Email: info@pnc.com.

Rules:
- Always be helpful. Direct to +961 71 222 222 or info@pnc.com if unsure.
- Be specific with prices and hours.
- Promote reservations for paddle/gaming.
- No medical/legal/political advice.`
          },
          ...history.map(h => ({ role: h.role, content: h.content })),
          { role: 'user', content: message },
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('[Chat API] OpenRouter error:', response.status, errorText)
      return res.status(500).json({ success: false, error: 'AI service returned an error.' })
    }

    const data = await response.json()
    const reply = data.choices?.[0]?.message?.content || 'Sorry, I could not generate a response.'

    return res.status(200).json({
      success: true,
      reply,
      sessionId: 'pnc-ai',
    })

  } catch (error) {
    console.error('[Chat API] Error:', error)
    return res.status(500).json({ success: false, error: 'Unable to reach PNC AI. Please try again later.' })
  }
}
