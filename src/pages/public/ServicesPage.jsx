import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Building2, Home, Sparkles, Shirt } from 'lucide-react'
import { getServices } from '../../firebase/servicesService'
import { truncateText } from '../../utils/helpers'

const iconMap = { Building2, Home, Sparkles, Shirt }

const ServicesPage = () => {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchServices = async () => {
      const data = await getServices(true)
      setServices(data)
      setLoading(false)
    }
    fetchServices()
  }, [])

  useEffect(() => {
    document.title = 'Hizmetlerimiz | Temizlik Şirketi'
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
              Hizmetlerimiz
            </h1>
            <p className="text-white/80 max-w-2xl mx-auto">
              Profesyonel temizlik hizmetleri ile mekanlarınızı tertemiz tutuyoruz.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = iconMap[service.icon] || Sparkles
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={`/hizmetler/${service.slug}`}
                    className="card group h-full block"
                  >
                    <div className="h-48 bg-neutral-100 relative overflow-hidden">
                      {service.imageUrl ? (
                        <img
                          src={service.imageUrl}
                          alt={service.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50">
                          <IconComponent className="w-16 h-16 text-primary-300" />
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-neutral-800 mb-2 group-hover:text-primary-600 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-neutral-600">{truncateText(service.shortDescription, 120)}</p>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

export default ServicesPage
