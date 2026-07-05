import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Briefcase, FolderOpen, FileText, Mail, ExternalLink } from 'lucide-react'
import { getServices } from '../../firebase/servicesService'
import { getProjects } from '../../firebase/projectsService'
import { getBlogPosts } from '../../firebase/blogService'
import { getRecentContactMessages, getUnreadCount } from '../../firebase/contactService'
import { formatDate, truncateText } from '../../utils/helpers'

const AdminDashboard = () => {
  const [stats, setStats] = useState({ services: 0, projects: 0, blogPosts: 0, unreadMessages: 0 })
  const [recentMessages, setRecentMessages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const [services, projects, blogPosts, unreadMessages, messages] = await Promise.all([
        getServices(true),
        getProjects(true),
        getBlogPosts(true),
        getUnreadCount(),
        getRecentContactMessages(5),
      ])
      setStats({
        services: services.length,
        projects: projects.length,
        blogPosts: blogPosts.length,
        unreadMessages,
      })
      setRecentMessages(messages)
      setLoading(false)
    }
    fetchData()
  }, [])

  const statCards = [
    { label: 'Aktif Hizmet', value: stats.services, icon: Briefcase, color: 'primary' },
    { label: 'Aktif Proje', value: stats.projects, icon: FolderOpen, color: 'secondary' },
    { label: 'Yayınlanan Blog', value: stats.blogPosts, icon: FileText, color: 'accent' },
    { label: 'Okunmamış Mesaj', value: stats.unreadMessages, icon: Mail, color: 'error' },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-heading font-bold text-neutral-800">Dashboard</h1>
        <p className="text-neutral-500 mt-1">Hoş geldiniz! Genel durumu buradan takip edebilirsiniz.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                stat.color === 'primary' ? 'bg-primary-100' :
                stat.color === 'secondary' ? 'bg-secondary-100' :
                stat.color === 'accent' ? 'bg-accent-100' :
                'bg-error-100'
              }`}>
                <stat.icon className={`w-6 h-6 ${
                  stat.color === 'primary' ? 'text-primary-600' :
                  stat.color === 'secondary' ? 'text-secondary-600' :
                  stat.color === 'accent' ? 'text-accent-600' :
                  'text-error-600'
                }`} />
              </div>
              <span className="text-3xl font-bold text-neutral-800">{stat.value}</span>
            </div>
            <p className="text-sm text-neutral-500">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Messages */}
      <div className="bg-white rounded-xl shadow-card overflow-hidden">
        <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-neutral-800">Son Mesajlar</h2>
          <Link to="/admin/mesajlar" className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1">
            Tümünü Gör <ExternalLink size={14} />
          </Link>
        </div>

        {recentMessages.length === 0 ? (
          <div className="p-8 text-center text-neutral-500">
            Henüz mesaj bulunmamaktadır.
          </div>
        ) : (
          <div className="divide-y divide-neutral-100">
            {recentMessages.map((message) => (
              <div key={message.id} className="p-4 hover:bg-neutral-50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium text-neutral-800">{message.fullName}</p>
                    <p className="text-sm text-neutral-500">{message.phone}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                      message.isRead ? 'bg-neutral-100 text-neutral-500' : 'bg-primary-100 text-primary-600'
                    }`}>
                      {message.isRead ? 'Okundu' : 'Yeni'}
                    </span>
                    <p className="text-xs text-neutral-400 mt-1">{formatDate(message.createdAt)}</p>
                  </div>
                </div>
                <p className="text-sm text-neutral-600">{truncateText(message.message, 100)}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard
