import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Building2, Home, Sparkles, Shirt, ArrowLeft, ArrowRight } from 'lucide-react'
import { getServiceBySlug, getServices } from '../../firebase/servicesService'

const iconMap = { Building2, Home, Sparkles, Shirt }

const ServiceDetailPage = () => {
  const { slug } = useParams()
  const [service, setService] = useState(null)
  const [otherServices, setOtherServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const serviceData = await getServiceBySlug(slug)
      setService(serviceData)

      if (serviceData) {
        document.title = `${serviceData.title} | Temizlik Şirketi`
      }

      const allServices = await getServices(true)
      setOtherServices(allServices.filter((s) => s.slug !== slug).slice(0, 3))
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

  if (!service) {
    return (
      <div className="section-padding text-center">
        <h1 className="text-2xl font-bold text-neutral-800 mb-4">Hizmet bulunamadı</h1>
        <Link to="/hizmetler" className="btn-primary">
          <ArrowLeft size={18} />
          Hizmetlere Dön
        </Link>
      </div>
    )
  }

  const IconComponent = iconMap[service.icon] || Sparkles

  return (
    <div>
      <section className="py-16 bg-gradient-to-br from-primary-600 to-secondary-600">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link
              to="/hizmetler"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft size={18} />
              Hizmetlere Dön
            </Link>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white">
              {service.title}
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              {service.imageUrl ? (
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  className="rounded-2xl shadow-soft w-full h-[400px] object-cover"
                />
              ) : (
                <div className="bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl h-[400px] flex items-center justify-center">
                  <IconComponent className="w-24 h-24 text-primary-400" />
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center">
                  <IconComponent className="w-7 h-7 text-primary-600" />
                </div>
                <h2 className="text-2xl font-heading font-bold text-neutral-800">
                  {service.title}
                </h2>
              </div>
              <p className="text-neutral-600 leading-relaxed whitespace-pre-line">
                {service.description}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {otherServices.length > 0 && (
        <section className="section-padding bg-neutral-50">
          <div className="container-custom">
            <h2 className="section-title text-center mb-12">Diğer Hizmetlerimiz</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherServices.map((s, index) => {
                const Icon = iconMap[s.icon] || Sparkles
                return (
                  <motion.div
                    key={s.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={`/hizmetler/${s.slug}`}
                      className="card p-6 group block hover:border-primary-500 border-2 border-transparent transition-all"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                          <Icon className="w-6 h-6 text-primary-600" />
                        </div>
                        <h3 className="font-semibold text-neutral-800 group-hover:text-primary-600 transition-colors">
                          {s.title}
                        </h3>
                      </div>
                      <p className="text-sm text-neutral-600">{s.shortDescription}</p>
                      <div className="flex items-center gap-1 text-primary-600 text-sm mt-4 font-medium">
                        Detayları Gör
                        <ArrowRight size={16} />
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default ServiceDetailPage
