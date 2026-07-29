import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMessageSquare, FiX, FiSend, FiMinus } from 'react-icons/fi'
import { RiRobotLine } from 'react-icons/ri'
import { sendMessage } from '../../services/chatbotService'
import { CHATBOT_GREETING } from '../../constants'

const TypingIndicator = () => (
  <div style={{ display: 'flex', gap: '5px', padding: '12px 16px', alignItems: 'center' }}>
    {[0, 1, 2].map(i => (
      <motion.span
        key={i}
        style={{
          width: 8, height: 8, borderRadius: '50%',
          background: 'linear-gradient(135deg, #f97316, #fbbf24)',
          display: 'block',
        }}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
      />
    ))}
  </div>
)

const ChatBubble = ({ msg }) => {
  const isUser = msg.role === 'user'
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
      style={{
        display: 'flex',
        flexDirection: isUser ? 'row-reverse' : 'row',
        gap: '8px',
        alignItems: 'flex-end',
        marginBottom: '12px',
      }}
    >
      {!isUser && (
        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          background: 'linear-gradient(135deg, #f97316, #fbbf24)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <RiRobotLine size={18} color="#0d0703" />
        </div>
      )}
      <div style={{
        maxWidth: '75%',
        padding: '10px 14px',
        borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
        background: isUser
          ? 'linear-gradient(135deg, #f97316, #fbbf24)'
          : 'rgba(61,36,17,0.8)',
        color: isUser ? '#0d0703' : '#fdf6ee',
        fontSize: '0.875rem',
        lineHeight: 1.5,
        fontWeight: isUser ? 600 : 400,
        border: isUser ? 'none' : '1px solid rgba(255,255,255,0.08)',
        whiteSpace: 'pre-line',
      }}>
        {msg.content}
      </div>
    </motion.div>
  )
}

export const Chatbot = () => {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [initialized, setInitialized] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => { scrollToBottom() }, [messages, typing])

  useEffect(() => {
    if (open && !initialized) {
      setInitialized(true)
      setTyping(true)
      setTimeout(() => {
        setTyping(false)
        setMessages([{ role: 'ai', content: CHATBOT_GREETING.join('\n\n') }])
      }, 1200)
    }
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [open, initialized])

  const handleSend = async () => {
    const text = input.trim()
    if (!text || typing) return
    setInput('')
    const userMsg = { role: 'user', content: text }
    setMessages(prev => [...prev, userMsg])
    setTyping(true)
    try {
      const history = messages.map(m => ({ role: m.role, content: m.content }))
      const { reply } = await sendMessage(text, history)
      setMessages(prev => [...prev, { role: 'ai', content: reply }])
    } catch {
      setMessages(prev => [...prev, { role: 'ai', content: "I'm having trouble connecting right now. Please try again or call us at +961 71 111 111." }])
    } finally {
      setTyping(false)
    }
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const quickReplies = ['Menu', 'Paddle prices', 'Gaming prices', 'Make a reservation']

  return (
    <>
      {/* Floating FAB */}
      <motion.button
        id="pnc-ai"
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: 'spring', stiffness: 260, damping: 20 }}
        aria-label="Open PNC AI Chat"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 150,
           width: '60px',
           height: '60px',
           borderRadius: '50%',
          background: 'linear-gradient(135deg, #1a0f05, #3d2411)',
          border: '2px solid rgba(249,115,22,0.5)',
          cursor: 'pointer',
          display: open ? 'none' : 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 24px rgba(249,115,22,0.3)',
          flexDirection: 'column',
          gap: '2px',
        }}
      >
        <RiRobotLine size={22} color="#f97316" />
        <span style={{ fontSize: '8px', color: '#fbbf24', fontWeight: 700, letterSpacing: '0.05em' }}>PNC AI</span>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 40, originX: 1, originY: 1 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 40 }}
            transition={{ type: 'spring', stiffness: 340, damping: 30 }}
            style={{
              position: 'fixed',
              bottom: '96px',
              right: '24px',
              zIndex: 200,
              width: 'min(380px, calc(100vw - 32px))',
              height: '540px',
              borderRadius: '20px',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
              border: '1px solid rgba(249,115,22,0.2)',
              background: '#1a0f05',
            }}
          >
            {/* Header */}
            <div style={{
              padding: '14px 16px',
              background: 'linear-gradient(135deg, #2d1a0e, #1a0f05)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}>
              <div style={{
                width: 38, height: 38, borderRadius: '50%',
                background: 'linear-gradient(135deg, #f97316, #fbbf24)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <RiRobotLine size={20} color="#0d0703" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#fdf6ee' }}>PNC AI</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />
                  <span style={{ fontSize: '0.75rem', color: '#a06828' }}>Online</span>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#a06828', padding: '4px' }}
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Messages */}
            <div style={{
              flex: 1, overflowY: 'auto', padding: '16px',
              scrollbarWidth: 'thin', scrollbarColor: '#3d2411 transparent',
            }}>
              {messages.map((msg, i) => <ChatBubble key={i} msg={msg} />)}
              {typing && (
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', marginBottom: 12 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #f97316, #fbbf24)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <RiRobotLine size={18} color="#0d0703" />
                  </div>
                  <div style={{
                    background: 'rgba(61,36,17,0.8)', borderRadius: '18px 18px 18px 4px',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}>
                    <TypingIndicator />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length <= 1 && !typing && (
              <div style={{
                padding: '8px 16px',
                display: 'flex', gap: '8px', flexWrap: 'wrap',
                borderTop: '1px solid rgba(255,255,255,0.05)',
              }}>
                {quickReplies.map(q => (
                  <button
                    key={q}
                    onClick={() => { setInput(q); setTimeout(handleSend, 50)}}
                    style={{
                      padding: '5px 12px', borderRadius: '999px', fontSize: '0.78rem',
                      background: 'rgba(249,115,22,0.12)', border: '1px solid rgba(249,115,22,0.3)',
                      color: '#fb923c', cursor: 'pointer', fontWeight: 500,
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => e.target.style.background = 'rgba(249,115,22,0.25)'}
                    onMouseLeave={e => e.target.style.background = 'rgba(249,115,22,0.12)'}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div style={{
              padding: '12px 16px',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              display: 'flex', gap: '10px', alignItems: 'center',
              background: 'rgba(13,7,3,0.6)',
            }}>
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask me anything…"
                aria-label="Chat message input"
                style={{
                  flex: 1, padding: '10px 14px', borderRadius: '12px',
                  background: 'rgba(61,36,17,0.5)', border: '1px solid rgba(255,255,255,0.08)',
                  color: '#fdf6ee', fontSize: '0.875rem', outline: 'none',
                }}
              />
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSend}
                disabled={!input.trim() || typing}
                aria-label="Send message"
                style={{
                  width: 40, height: 40, borderRadius: '10px', flexShrink: 0,
                  background: input.trim() && !typing
                    ? 'linear-gradient(135deg, #f97316, #fbbf24)'
                    : 'rgba(61,36,17,0.5)',
                  border: 'none', cursor: input.trim() && !typing ? 'pointer' : 'not-allowed',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background 0.3s',
                }}
              >
                <FiSend size={18} color={input.trim() && !typing ? '#0d0703' : '#7a4a1e'} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
