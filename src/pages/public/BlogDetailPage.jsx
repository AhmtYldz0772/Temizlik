import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, User, Tag, ArrowLeft, ArrowRight } from 'lucide-react'
import { getBlogPostBySlug, getRecentBlogPosts } from '../../firebase/blogService'
import { formatDate } from '../../utils/helpers'

const BlogDetailPage = () => {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [recentPosts, setRecentPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const postData = await getBlogPostBySlug(slug)
      setPost(postData)

      if (postData) {
        document.title = `${post.metaTitle || post.title} | Temizlik Şirketi`

        // Set meta description
        const metaDesc = document.querySelector('meta[name="description"]')
        if (metaDesc) {
          metaDesc.setAttribute('content', postData.metaDescription || postData.excerpt || '')
        }
      }

      const recent = await getRecentBlogPosts(postData?.id, 3)
      setRecentPosts(recent)
      setLoading(false)
    }
    fetchData()
  }, [slug])

  if (loading) {
    return (
      <div className="section-padding flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="section-padding text-center">
        <h1 className="text-2xl font-bold text-neutral-800 mb-4">Yazı bulunamadı</h1>
        <Link to="/blog" className="btn-primary">
          <ArrowLeft size={18} />
          Blog'a Dön
        </Link>
      </div>
    )
  }

  return (
    <div>
      {/* Cover Image */}
      <div className="h-[40vh] md:h-[50vh] relative">
        {post.coverImage ? (
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-600 to-secondary-600" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="container-custom absolute bottom-0 left-0 right-0 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft size={18} />
              Blog'a Dön
            </Link>
            {post.category && (
              <span className="inline-block bg-primary-600 text-white text-sm font-medium px-4 py-1 rounded-full mb-4">
                {post.category}
              </span>
            )}
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-white max-w-4xl">
              {post.title}
            </h1>
          </motion.div>
        </div>
      </div>

      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-neutral-500 mb-8">
              {post.publishedAt && (
                <div className="flex items-center gap-2">
                  <Calendar size={18} />
                  {formatDate(post.publishedAt)}
                </div>
              )}
              {post.author && (
                <div className="flex items-center gap-2">
                  <User size={18} />
                  {post.author}
                </div>
              )}
            </div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="prose prose-lg max-w-none"
            >
              <div className="text-neutral-700 leading-relaxed whitespace-pre-line">
                {post.content}
              </div>
            </motion.div>

            {/* Tags */}
            {post.tags?.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mt-12 pt-8 border-t border-neutral-200">
                <Tag size={18} className="text-neutral-500" />
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-neutral-100 text-neutral-600 text-sm px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <section className="section-padding bg-neutral-50">
          <div className="container-custom">
            <h2 className="section-title text-center mb-12">Diğer Yazılar</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentPosts.map((recentPost, index) => (
                <motion.div
                  key={recentPost.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={`/blog/${recentPost.slug}`} className="card group h-full flex flex-col block">
                    <div className="h-40 bg-neutral-100 relative overflow-hidden">
                      {recentPost.coverImage ? (
                        <img
                          src={recentPost.coverImage}
                          alt={recentPost.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary-50 to-secondary-50" />
                      )}
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="font-semibold text-neutral-800 mb-2 group-hover:text-primary-600 transition-colors">
                        {recentPost.title}
                      </h3>
                      <div className="flex items-center gap-1 text-primary-600 text-sm mt-auto font-medium">
                        Devamını Oku
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default BlogDetailPage
