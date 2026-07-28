// ─── Navigation Items ─────────────────────────────────────────────────────────
export const NAV_ITEMS = [
  { label: 'Home',           href: '#home' },
  { label: 'Menu',           href: '#menu' },
  { label: 'Paddle Prices',  href: '#paddle-prices' },
  { label: 'Network Prices', href: '#network-prices' },
  { label: 'Reservations',   href: '#reservations' },
  { label: 'PNC AI',         href: '#pnc-ai',        isAI: true },
  { label: 'Contact',        href: '#contact' },
]

// ─── Social Links ─────────────────────────────────────────────────────────────
export const SOCIAL_LINKS = [
  { name: 'Facebook',  url: 'https://facebook.com/pnc',     icon: 'FaFacebook' },
  { name: 'Instagram', url: 'https://instagram.com/pnc',    icon: 'FaInstagram' },
  { name: 'WhatsApp',  url: 'https://wa.me/96171111111',    icon: 'FaWhatsapp' },
]

// ─── Animation Variants ──────────────────────────────────────────────────────
export const FADE_UP = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

export const FADE_IN = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
}

export const STAGGER_CONTAINER = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

export const CARD_VARIANT = {
  hidden:  { opacity: 0, y: 30, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
}

// ─── Promo Banner ────────────────────────────────────────────────────────────
export const PROMO_MESSAGE = ''

// ─── Chatbot Initial Messages ─────────────────────────────────────────────────
export const CHATBOT_GREETING = [
  "Hello! 👋 I'm **PNC AI**.",
  "I can help you:\n• Answer questions about the menu\n• Explain paddle pricing\n• Explain gaming pricing\n• Help you make reservations",
  "What would you like to know? 😊",
]
