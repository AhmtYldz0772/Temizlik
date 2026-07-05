import { Menu } from 'lucide-react'
import { useState, useEffect } from 'react'
import { getUnreadCount } from '../../firebase/contactService'

const AdminHeader = ({ onMenuClick }) => {
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    const fetchUnread = async () => {
      const count = await getUnreadCount()
      setUnreadCount(count)
    }
    fetchUnread()
  }, [])

  return (
    <header className="h-16 bg-white border-b border-neutral-200 flex items-center justify-between px-6">
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 text-neutral-600 hover:text-neutral-900 rounded-lg hover:bg-neutral-100 transition-colors"
      >
        <Menu size={24} />
      </button>

      <div className="flex-1 hidden lg:block" />

      <div className="flex items-center gap-4">
        <span className="text-sm text-neutral-600">
          {unreadCount > 0 && (
            <span className="bg-error-500 text-white text-xs px-2 py-1 rounded-full">
              {unreadCount} yeni mesaj
            </span>
          )}
        </span>
      </div>
    </header>
  )
}

export default AdminHeader
