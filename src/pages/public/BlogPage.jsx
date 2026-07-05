import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, ArrowRight } from 'lucide-react'
import { getBlogPosts } from '../../firebase/blogService'
import { truncateText, formatDate } from '../../utils/helpers'

const BlogPage = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getBlogPosts(true)
      setPosts(data)
      setLoading(false)
    }
    fetchPosts()
  }, [])

  useEffect(() => {
    document.title = 'Blog | Temizlik Şirketi'
  }, [])

  if (loading) {
    return (
      <div className="section-padding flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div>
      <section className="py-16 bg-gradient-to-br from-primary-600 to-secondary-600">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
              Blog
            </h1>
            <p className="text-white/80 max-w-2xl mx-auto">
              Temizlik ipuçları, kurumsal haberler ve daha fazlası.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-neutral-600">Henüz blog yazısı bulunmamaktadır.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={`/blog/${post.slug}`} className="card group h-full flex flex-col block">
                    <div className="h-48 bg-neutral-100 relative overflow-hidden">
                      {post.coverImage ? (
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary-50 to-secondary-50" />
                      )}
                      {post.category && (
                        <span className="absolute top-4 left-4 bg-primary-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                          {post.category}
                        </span>
                      )}
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 text-neutral-500 text-sm mb-3">
                        <Calendar size={14} />
                        {formatDate(post.publishedAt)}
                      </div>
                      <h3 className="text-xl font-semibold text-neutral-800 mb-3 group-hover:text-primary-600 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-neutral-600 text-sm flex-1">
                        {truncateText(post.excerpt || post.content, 120)}
                      </p>
                      <div className="flex items-center gap-1 text-primary-600 text-sm mt-4 font-medium">
                        Devamını Oku
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default BlogPage
