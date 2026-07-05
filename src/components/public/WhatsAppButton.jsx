import { useState, useEffect } from 'react'
import { MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { getSiteSettings } from '../../firebase/settingsService'

const WhatsAppButton = () => {
  const [whatsappNumber, setWhatsappNumber] = useState('')

  useEffect(() => {
    const fetchSettings = async () => {
      const settings = await getSiteSettings()
      if (settings?.whatsappNumber) {
        setWhatsappNumber(settings.whatsappNumber)
      }
    }
    fetchSettings()
  }, [])

  const handleClick = () => {
    if (whatsappNumber) {
      const url = `https://wa.me/${whatsappNumber}`
      window.open(url, '_blank')
    }
  }

  if (!whatsappNumber) return null

  return (
    <motion.button
      onClick={handleClick}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
      aria-label="WhatsApp ile iletişime geç"
    >
      <MessageCircle className="w-7 h-7 text-white" />
    </motion.button>
  )
}

export default WhatsAppButton
