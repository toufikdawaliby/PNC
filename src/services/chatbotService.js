export const sendMessage = async (message, history = []) => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history }),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Something went wrong' }))
      console.error('[ChatbotService] Error:', error)
      throw new Error(error.error || 'Unable to reach PNC AI.')
    }

    return response.json()
  } catch (error) {
    console.error('[ChatbotService] Error sending message:', error)
    return {
      reply: getMockReply(message),
      sessionId: 'mock-session-001',
    }
  }
}

const getMockReply = (message) => {
  const msg = message.toLowerCase()

  if (msg.includes('menu') || msg.includes('food') || msg.includes('drink'))
    return 'Our menu features premium coffees, cold drinks, teas, desserts, and snacks. Check out the Menu section for the full list with prices! ☕🍰'

  if (msg.includes('paddle') || msg.includes('court') || msg.includes('sport'))
    return 'We have 2 professional glass-walled paddle courts. Pricing starts at $36/hour with all equipment included. You can reserve in the Reservations section! 🏓'

  if (msg.includes('gaming') || msg.includes('pc') || msg.includes('network') || msg.includes('internet'))
    return 'Our gaming zone has 20 high-end PCs with RTX 4080 graphics and 500 Mbps fiber internet. Packages start at just $2/hour. Check our Network Prices section! 🎮'

  if (msg.includes('price') || msg.includes('cost') || msg.includes('how much'))
    return 'Coffee starts at $3, Paddle courts from $36/hr, Gaming PCs from $2/hr. Check our Paddle Prices and Network Prices sections for full details! 💰'

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
