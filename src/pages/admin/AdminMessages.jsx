import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { X, Mail, CheckCheck } from 'lucide-react'
import { getContactMessages, markMessageAsRead, markAllMessagesAsRead } from '../../firebase/contactService'
import { formatDate, truncateText } from '../../utils/helpers'

const AdminMessages = () => {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState(null)

  const fetchMessages = async () => {
    const data = await getContactMessages()
    setMessages(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  const openMessage = async (message) => {
    setSelectedMessage(message)
    if (!message.isRead) {
      await markMessageAsRead(message.id)
      setMessages(messages.map((m) => m.id === message.id ? { ...m, isRead: true } : m))
    }
  }

  const handleMarkAllAsRead = async () => {
    await markAllMessagesAsRead()
    setMessages(messages.map((m) => ({ ...m, isRead: true })))
  }

  const unreadCount = messages.filter((m) => !m.isRead).length

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-heading font-bold text-neutral-800">Mesajlar</h1>
          <p className="text-neutral-500 mt-1">
            {unreadCount > 0 ? `${unreadCount} okunmamış mesaj` : 'Tüm mesajlar okundu'}
          </p>
        </div>
        {unreadCount > 0 && (
          <button onClick={handleMarkAllAsRead} className="btn-outline">
            <CheckCheck size={18} />
            Tümünü Okundu İşaretle
          </button>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-neutral-100">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-neutral-600">Tarih</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-neutral-600">Ad Soyad</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-neutral-600">Telefon</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-neutral-600">Adres</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-neutral-600">Mesaj</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-neutral-600">Durum</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {messages.map((message, index) => (
                <motion.tr
                  key={message.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.03 }}
                  onClick={() => openMessage(message)}
                  className={`cursor-pointer hover:bg-neutral-50 transition-colors ${
                    !message.isRead ? 'bg-primary-50/50' : ''
                  }`}
                >
                  <td className="px-6 py-4 text-sm text-neutral-600">{formatDate(message.createdAt)}</td>
                  <td className="px-6 py-4 font-medium text-neutral-800">{message.fullName}</td>
                  <td className="px-6 py-4 text-neutral-600">{message.phone}</td>
                  <td className="px-6 py-4 text-neutral-600">{truncateText(message.address, 20)}</td>
                  <td className="px-6 py-4 text-neutral-600">{truncateText(message.message, 30)}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      message.isRead ? 'bg-neutral-100 text-neutral-500' : 'bg-primary-100 text-primary-600'
                    }`}>
                      {message.isRead ? 'Okundu' : 'Yeni'}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {messages.length === 0 && (
          <div className="p-8 text-center text-neutral-500">Henüz mesaj bulunmamaktadır.</div>
        )}
      </div>

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setSelectedMessage(null)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl p-6 max-w-lg w-full mx-4 shadow-soft"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-neutral-800">Mesaj Detayı</h3>
              <button onClick={() => setSelectedMessage(null)} className="p-1 hover:bg-neutral-100 rounded">
                <X size={20} className="text-neutral-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-sm text-neutral-500 w-24">Ad Soyad:</span>
                <span className="text-sm text-neutral-800 font-medium">{selectedMessage.fullName}</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-sm text-neutral-500 w-24">Telefon:</span>
                <a href={`tel:${selectedMessage.phone}`} className="text-sm text-primary-600 hover:underline">
                  {selectedMessage.phone}
                </a>
              </div>
              {selectedMessage.address && (
                <div className="flex items-start gap-3">
                  <span className="text-sm text-neutral-500 w-24">Adres:</span>
                  <span className="text-sm text-neutral-800">{selectedMessage.address}</span>
                </div>
              )}
              <div className="flex items-start gap-3">
                <span className="text-sm text-neutral-500 w-24">Tarih:</span>
                <span className="text-sm text-neutral-800">{formatDate(selectedMessage.createdAt)}</span>
              </div>
              <div className="pt-4 border-t border-neutral-100">
                <span className="text-sm text-neutral-500 block mb-2">Mesaj:</span>
                <p className="text-neutral-800 leading-relaxed">{selectedMessage.message}</p>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <a
                href={`tel:${selectedMessage.phone}`}
                className="btn-primary flex-1 text-center"
              >
                Ara
              </a>
              <a
                href={`https://wa.me/90${selectedMessage.phone.replace(/\D/g, '').slice(-10)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp flex-1 text-center"
              >
                WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default AdminMessages
