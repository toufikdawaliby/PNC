import { motion } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa'
import { businessInfo } from '../../data/businessData'

export const WhatsAppButton = () => {
  const message = encodeURIComponent("Hello! I'd like to know more about PNC (Paddle Network Caffe).")
  const url = `https://wa.me/${businessInfo.whatsapp}?text=${message}`

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 2, type: 'spring', stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Chat on WhatsApp"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 50,
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        background: '#25d366',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 20px rgba(37,211,102,0.4)',
        textDecoration: 'none',
      }}
    >
      <FaWhatsapp size={30} color="#fff" />
    </motion.a>
  )
}
