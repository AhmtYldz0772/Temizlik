import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Building2, Home, Sparkles, Shirt, ArrowRight, Phone, MessageCircle } from 'lucide-react'
import { getServices } from '../../firebase/servicesService'
import { truncateText } from '../../utils/helpers'

const iconMap = { Building2, Home, Sparkles, Shirt }

const WHATSAPP_MESSAGE = encodeURIComponent('Merhaba, temizlik hizmeti hakkında bilgi almak istiyorum.')
const WHATSAPP_LINK = `https://wa.me/905050363865?text=${WHATSAPP_MESSAGE}`

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
    document.title = 'Hizmetlerimiz | İnci Temizlik Şirketi Batman'
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
          <p className="text-neutral-500 font-medium">Yükleniyor...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Hero */}
      <section
        className="relative py-32 pt-40 overflow-hidden"
        style={{
          backgroundImage: "url('/services_banner.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 hero-overlay" />
        <div className="absolute inset-0 bg-primary-900/30" />

        {/* Decorative */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/3 blur-2xl" />

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full px-5 py-2 mb-6">
              <Sparkles size={14} className="text-primary-200" />
              <span className="text-white/90 text-sm font-semibold">Batman'da Profesyonel Temizlik</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-white mb-5">
              Hizmetlerimiz
            </h1>
            <p className="text-white/80 max-w-2xl mx-auto text-lg leading-relaxed">
              Ev temizliğinden ofis temizliğine, inşaat sonrası temizlikten
              halı yıkamaya kadar tüm temizlik ihtiyaçlarınız için yanınızdayız.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          {services.length === 0 ? (
            <div className="text-center py-20">
              <Sparkles className="w-16 h-16 text-primary-200 mx-auto mb-4" />
              <p className="text-neutral-500 text-lg">Hizmetler yükleniyor...</p>
            </div>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <span className="section-tag">Tüm Hizmetler</span>
                <h2 className="section-title">Ne İstersen Temizleriz</h2>
                <div className="divider-turquoise mx-auto" />
                <p className="section-subtitle">
                  İnci Temizlik Şirketi olarak Batman'da her türlü temizlik hizmetini profesyonelce sunuyoruz.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service, index) => {
                  const IconComponent = iconMap[service.icon] || Sparkles
                  return (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.08 }}
                    >
                      <Link
                        to={`/hizmetler/${service.slug}`}
                        className="group card h-full flex flex-col"
                      >
                        {/* Image */}
                        <div className="h-52 bg-neutral-100 relative overflow-hidden">
                          {service.imageUrl ? (
                            <img
                              src={service.imageUrl}
                              alt={service.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50">
                              <IconComponent className="w-20 h-20 text-primary-200" />
                            </div>
                          )}
                          {/* Hover overlay */}
                          <div className="absolute inset-0 bg-turquoise-gradient opacity-0 group-hover:opacity-80 transition-opacity duration-300 flex items-center justify-center">
                            <div className="flex items-center gap-2 text-white font-bold">
                              Detaylar <ArrowRight size={18} />
                            </div>
                          </div>
                        </div>

                        <div className="p-6 flex flex-col flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-9 h-9 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0">
                              <IconComponent className="w-5 h-5 text-primary-600" />
                            </div>
                            <h3 className="text-lg font-bold text-neutral-800 group-hover:text-primary-600 transition-colors">
                              {service.title}
                            </h3>
                          </div>
                          <p className="text-neutral-500 text-sm leading-relaxed flex-1">
                            {truncateText(service.shortDescription, 130)}
                          </p>
                          <div className="mt-4 flex items-center gap-1 text-primary-600 text-sm font-semibold">
                            Daha Fazla <ArrowRight size={14} />
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  )
                })}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-16 bg-turquoise-gradient">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-white">
              <h3 className="text-2xl md:text-3xl font-heading font-bold mb-2">
                Fiyat Teklifi Almak İster misiniz?
              </h3>
              <p className="text-primary-100">
                Batman'da ücretsiz keşif ve fiyat teklifi için hemen ulaşın.
              </p>
            </div>
            <div className="flex gap-4 flex-shrink-0">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
              >
                <MessageCircle size={18} />
                WhatsApp
              </a>
              <a href="tel:05050363865" className="btn-white">
                <Phone size={18} />
                Ara
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ServicesPage
