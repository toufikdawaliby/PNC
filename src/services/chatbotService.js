import axios from 'axios'

// ─── n8n Webhook Configuration ────────────────────────────────────────────────
// Replace this URL with your actual n8n webhook URL when ready
const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL || 'https://your-n8n-instance.com/webhook/pnc-chat'

// ─── Create axios instance ───────────────────────────────────────────────────
const chatClient = axios.create({
  baseURL: N8N_WEBHOOK_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * Send a message to the PNC AI chatbot via n8n webhook.
 *
 * @param {string} message - The user's message text
 * @param {Array}  history - Previous conversation history [{role, content}]
 * @returns {Promise<{reply: string, sessionId: string}>}
 *
 * n8n Integration Notes:
 * - POST to N8N_WEBHOOK_URL
 * - Body: { message, history, timestamp, source: 'pnc-website' }
 * - Expected response: { reply: string, sessionId: string }
 * - Your n8n workflow should connect to an AI agent (OpenAI, Gemini, etc.)
 *   and return the reply in the above format.
 */
export const sendMessage = async (message, history = []) => {
  // ── MOCK RESPONSE — remove this block when connecting to n8n ──────────────
  if (!import.meta.env.VITE_N8N_WEBHOOK_URL) {
    await new Promise(resolve => setTimeout(resolve, 1200 + Math.random() * 800))
    return {
      reply: getMockReply(message),
      sessionId: 'mock-session-001',
    }
  }
  // ── END MOCK ──────────────────────────────────────────────────────────────

  try {
    const response = await chatClient.post('', {
      message,
      history,
      timestamp: new Date().toISOString(),
      source: 'pnc-website',
    })
    return response.data
  } catch (error) {
    console.error('[ChatbotService] Error sending message:', error)
    throw new Error('Unable to reach PNC AI. Please try again later.')
  }
}

// ─── Mock reply generator (frontend-only demo mode) ──────────────────────────
const getMockReply = (message) => {
  const msg = message.toLowerCase()

  if (msg.includes('menu') || msg.includes('food') || msg.includes('drink'))
    return 'Our menu features premium coffees, cold drinks, teas, desserts, and snacks. Check out the Menu section for the full list with prices! ☕🍰'

  if (msg.includes('paddle') || msg.includes('court') || msg.includes('sport'))
    return 'We have 2 professional glass-walled paddle courts. Pricing starts at $20/hour with all equipment included. You can reserve in the Reservations section! 🏓'

  if (msg.includes('gaming') || msg.includes('pc') || msg.includes('network') || msg.includes('internet'))
    return 'Our gaming zone has 20 high-end PCs with RTX 4080 graphics and 500 Mbps fiber internet. Packages start at just $3/hour. Check our Network Prices section! 🎮'

  if (msg.includes('price') || msg.includes('cost') || msg.includes('how much'))
    return 'Coffee starts at $3, Paddle courts from $20/hr, Gaming PCs from $3/hr. Check our Paddle Prices and Network Prices sections for full details! 💰'

  if (msg.includes('reserve') || msg.includes('book') || msg.includes('reservation'))
    return 'You can make a reservation directly through our Reservations section! Just fill in your details and we\'ll confirm your booking. 📅'

  if (msg.includes('hour') || msg.includes('open') || msg.includes('time') || msg.includes('when'))
    return 'We\'re open Monday–Thursday 8 AM–12 AM, Friday–Saturday 8 AM–2 AM, and Sunday 9 AM–12 AM. Come see us! 🕐'

  if (msg.includes('wifi') || msg.includes('wi-fi') || msg.includes('internet'))
    return 'Free high-speed Wi-Fi is available for all café customers! Ask the staff for the password when you arrive. 📶'

  if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey') || msg.includes('greet'))
    return 'Hey there! 👋 I\'m PNC AI. I can help you with our menu, paddle & gaming prices, and reservations. What would you like to know?'

  if (msg.includes('thank'))
    return 'You\'re welcome! 😊 Is there anything else I can help you with?'

  return 'Great question! For detailed assistance, feel free to call us at +961 71 111 111 or check the relevant section on our website. How else can I help you? 😊'
}
