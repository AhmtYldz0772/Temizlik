import { useState, useEffect } from 'react'
import { MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { getSiteSettings } from '../../firebase/settingsService'

const WHATSAPP_MESSAGE = 'Merhaba, temizlik hizmeti hakkında bilgi almak istiyorum.'

const WhatsAppButton = () => {
  const [whatsappNumber, setWhatsappNumber] = useState('')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const fetchSettings = async () => {
      const settings = await getSiteSettings()
      if (settings?.whatsappNumber) {
        setWhatsappNumber(settings.whatsappNumber)
      }
    }
    fetchSettings()

    // Show button after 1 second
    const timer = setTimeout(() => setIsVisible(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleClick = () => {
    if (whatsappNumber) {
      const encodedMessage = encodeURIComponent(WHATSAPP_MESSAGE)
      const url = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`
      window.open(url, '_blank')
    }
  }

  if (!whatsappNumber || !isVisible) return null

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white text-neutral-700 text-xs font-semibold px-3 py-2 rounded-xl shadow-soft border border-neutral-100 max-w-[160px] text-right leading-snug"
      >
        Ücretsiz bilgi alın! 🌟
      </motion.div>

      {/* WhatsApp Button */}
      <motion.button
        onClick={handleClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors cursor-pointer"
        aria-label="WhatsApp ile iletişime geç"
      >
        {/* Ping animation */}
        <span className="absolute inset-0 rounded-full bg-green-400 opacity-40 animate-ping" />
        <MessageCircle className="w-8 h-8 text-white relative z-10" fill="white" strokeWidth={1.5} />
      </motion.button>
    </motion.div>
  )
}

export default WhatsAppButton
