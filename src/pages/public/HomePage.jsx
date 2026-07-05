import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Building2, Home, Sparkles, Shirt, ArrowRight, MessageCircle, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { getServices } from '../../firebase/servicesService'
import { getProjects } from '../../firebase/projectsService'
import { getTestimonials } from '../../firebase/testimonialsService'
import { getSiteSettings } from '../../firebase/settingsService'
import { truncateText } from '../../utils/helpers'

const iconMap = { Building2, Home, Sparkles, Shirt }

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const HomePage = () => {
  const [services, setServices] = useState([])
  const [projects, setProjects] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [settings, setSettings] = useState({})
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      const [servicesData, projectsData, testimonialsData, settingsData] = await Promise.all([
        getServices(true),
        getProjects(true),
        getTestimonials(true),
        getSiteSettings()
      ])
      setServices(servicesData.slice(0, 4))
      setProjects(projectsData.slice(0, 3))
      setTestimonials(testimonialsData)
      setSettings(settingsData || {})
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (testimonials.length > 1) {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [testimonials.length])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-700">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container-custom relative z-10 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 leading-tight">
              Profesyonel Temizlik Hizmetleri
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
              Ev, ofis ve ticari mekanlarınız için güvenilir, kaliteli ve zamanında temizlik çözümleri sunuyoruz.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/hizmetler" className="btn-primary">
                Hizmetlerimiz
                <ArrowRight size={18} />
              </Link>
              {settings.whatsappNumber && (
                <a
                  href={`https://wa.me/${settings.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                >
                  <MessageCircle size={18} />
                  WhatsApp'tan Ulaşın
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="section-title">Hizmetlerimiz</h2>
            <p className="section-subtitle">
              Tüm temizlik ihtiyaçlarınız için profesyonel çözümler sunuyoruz.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const IconComponent = iconMap[service.icon] || Sparkles
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={`/hizmetler/${service.slug}`}
                    className="card p-8 text-center hover:border-primary-500 border-2 border-transparent transition-all h-full block"
                  >
                    <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <IconComponent className="w-8 h-8 text-primary-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-800 mb-3">{service.title}</h3>
                    <p className="text-sm text-neutral-600">{truncateText(service.shortDescription, 100)}</p>
                  </Link>
                </motion.div>
              )
            })}
          </div>

          <div className="text-center mt-10">
            <Link to="/hizmetler" className="btn-outline">
              Tüm Hizmetleri Gör
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      {settings.aboutUs && (
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                {settings.aboutUsImage ? (
                  <img
                    src={settings.aboutUsImage}
                    alt="Hakkımızda"
                    className="rounded-2xl shadow-soft w-full h-[400px] object-cover"
                  />
                ) : (
                  <div className="bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl h-[400px] flex items-center justify-center">
                    <Sparkles className="w-24 h-24 text-primary-400" />
                  </div>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="section-title">Hakkımızda</h2>
                <p className="text-neutral-600 leading-relaxed mb-6">
                  {truncateText(settings.aboutUs, 300)}
                </p>
                <Link to="/hakkimizda" className="btn-outline">
                  Devamını Oku
                  <ArrowRight size={18} />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Projects Section */}
      {projects.length > 0 && (
        <section className="section-padding bg-neutral-50">
          <div className="container-custom">
            <motion.div {...fadeInUp} className="text-center mb-12">
              <h2 className="section-title">Son Projelerimiz</h2>
              <p className="section-subtitle">
                Gerçekleştirdiğimiz başarılı temizlik projelerinden örnekler.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card overflow-hidden"
                >
                  <div className="h-48 bg-neutral-200">
                    {project.images?.[0] ? (
                      <img
                        src={project.images[0]}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-neutral-100">
                        <Building2 className="w-12 h-12 text-neutral-300" />
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-neutral-800 mb-2">{project.title}</h3>
                    <p className="text-sm text-neutral-600">{truncateText(project.description, 100)}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link to="/projeler" className="btn-outline">
                Tüm Projeleri Gör
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section className="section-padding bg-primary-600">
          <div className="container-custom">
            <motion.div {...fadeInUp} className="text-center mb-12">
              <h2 className="section-title text-white">Müşteri Yorumları</h2>
              <p className="section-subtitle text-white/80">
                Müşterilerimizin bizim hakkımızdaki düşünceleri.
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto relative">
              <div className="bg-white rounded-2xl p-8 md:p-12 shadow-soft">
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < (testimonials[currentTestimonial]?.rating || 5)
                          ? 'text-accent-500 fill-accent-500'
                          : 'text-neutral-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-lg text-neutral-700 text-center mb-6 leading-relaxed">
                  "{testimonials[currentTestimonial]?.comment}"
                </p>
                <div className="text-center">
                  <p className="font-semibold text-neutral-800">
                    {testimonials[currentTestimonial]?.name}
                  </p>
                  <p className="text-sm text-neutral-500">
                    {testimonials[currentTestimonial]?.role}
                  </p>
                </div>
              </div>

              {testimonials.length > 1 && (
                <>
                  <button
                    onClick={prevTestimonial}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-10 h-10 bg-white rounded-full shadow-card flex items-center justify-center hover:bg-neutral-50 transition-colors"
                  >
                    <ChevronLeft size={20} className="text-neutral-600" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-10 h-10 bg-white rounded-full shadow-card flex items-center justify-center hover:bg-neutral-50 transition-colors"
                  >
                    <ChevronRight size={20} className="text-neutral-600" />
                  </button>

                  <div className="flex justify-center gap-2 mt-6">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentTestimonial(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentTestimonial ? 'bg-white' : 'bg-white/40'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-neutral-800 to-neutral-900">
        <div className="container-custom text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
              Fiyat Almak İçin WhatsApp'tan İletişime Geçin
            </h2>
            <p className="text-neutral-300 mb-8 max-w-2xl mx-auto">
              Hemen bizimle iletişime geçin, size en uygun temizlik çözümünü birlikte belirleyelim.
            </p>
            {settings.whatsappNumber && (
              <a
                href={`https://wa.me/${settings.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp text-lg px-8 py-4"
              >
                <MessageCircle size={22} />
                WhatsApp'tan Ulaşın
              </a>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
