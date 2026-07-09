import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Building2, Home, Sparkles, Shirt, ArrowRight, MessageCircle,
  Star, ChevronLeft, ChevronRight, Shield, Clock, Award, Users,
  CheckCircle, Phone
} from 'lucide-react'
import { getServices } from '../../firebase/servicesService'
import { getProjects } from '../../firebase/projectsService'
import { getTestimonials } from '../../firebase/testimonialsService'
import { getSiteSettings } from '../../firebase/settingsService'
import { truncateText } from '../../utils/helpers'

const iconMap = { Building2, Home, Sparkles, Shirt }

const WHATSAPP_MESSAGE = encodeURIComponent('Merhaba, temizlik hizmeti hakkında bilgi almak istiyorum.')

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } }
}

const whyChooseUs = [
  {
    icon: Shield,
    title: 'Güvenilir & Sigortalı',
    desc: 'Tüm personelimizt sigortalı olup güven belgeli ekiplerle hizmet veriyoruz.',
    color: 'from-blue-50 to-cyan-50',
    iconColor: 'text-blue-500'
  },
  {
    icon: Clock,
    title: 'Zamanında Hizmet',
    desc: 'Belirlenen saatte ekibimiz kapınızda olur, zamanınıza saygı gösteririz.',
    color: 'from-primary-50 to-secondary-50',
    iconColor: 'text-primary-500'
  },
  {
    icon: Award,
    title: 'Kalite Garantisi',
    desc: 'Hizmet sonrası memnun kalmazsanız ücretsiz yeniden temizlik yapıyoruz.',
    color: 'from-amber-50 to-yellow-50',
    iconColor: 'text-amber-500'
  },
  {
    icon: Users,
    title: 'Uzman Ekip',
    desc: 'Deneyimli ve eğitimli temizlik uzmanlarımız en zor lekeleri bile çıkarır.',
    color: 'from-purple-50 to-pink-50',
    iconColor: 'text-purple-500'
  },
]

const stats = [
  { number: '500+', label: 'Mutlu Müşteri' },
  { number: '5+', label: 'Yıl Deneyim' },
  { number: '15+', label: 'Uzman Personel' },
  { number: '100%', label: 'Memnuniyet' },
]

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
      setServices(servicesData.slice(0, 6))
      setProjects(projectsData.slice(0, 3))
      setTestimonials(testimonialsData)
      setSettings(settingsData || {})
    }
    fetchData()
  }, [])

  useEffect(() => {
    document.title = 'İnci Temizlik Şirketi | Batman\'ın En Profesyonel Temizlik Firması'
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

  const whatsappLink = settings.whatsappNumber
    ? `https://wa.me/${settings.whatsappNumber}?text=${WHATSAPP_MESSAGE}`
    : `https://wa.me/905050363865?text=${WHATSAPP_MESSAGE}`

  return (
    <div>
      {/* ===== HERO SECTION ===== */}
      <section
        className="relative min-h-screen flex items-center"
        style={{
          backgroundImage: "url('/hero_cleaning.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 hero-overlay" />

        {/* Decorative circles */}
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-primary-300/10 blur-3xl" />

        <div className="container-custom relative z-10 py-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full px-5 py-2 mb-8"
            >
              <Sparkles size={14} className="text-primary-200" />
              <span className="text-white/90 text-sm font-semibold tracking-wide">Batman'ın En Güvenilir Temizlik Şirketi</span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-extrabold text-white mb-6 leading-tight">
              Tertemiz Mekanlar,{' '}
              <span className="text-gradient-hero">Huzurlu Yaşam</span>
            </h1>

            <p className="text-lg md:text-xl text-white/85 mb-10 max-w-2xl leading-relaxed">
              Batman'da ev, ofis ve ticari mekanlar için profesyonel temizlik hizmetleri.
              Uzman ekibimiz ve kaliteli ürünlerimizle hijyenik ortamlar yaratıyoruz.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/hizmetler" className="btn-white text-base px-7 py-3.5">
                <Sparkles size={18} />
                Hizmetlerimiz
              </Link>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp text-base px-7 py-3.5"
              >
                <MessageCircle size={18} />
                WhatsApp'tan Ulaşın
              </a>
            </div>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 max-w-3xl"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="stat-card">
                <div className="text-3xl font-extrabold text-white font-heading">{stat.number}</div>
                <div className="text-primary-200 text-sm font-medium mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center pt-2">
            <div className="w-1 h-2 bg-white/60 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* ===== SERVICES SECTION ===== */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="section-tag">Hizmetlerimiz</span>
            <h2 className="section-title">Profesyonel Temizlik Çözümleri</h2>
            <div className="divider-turquoise mx-auto" />
            <p className="section-subtitle">
              Batman'da tüm temizlik ihtiyaçlarınız için kapsamlı ve güvenilir hizmetler sunuyoruz.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    className="group card p-8 text-center hover:border-primary-300 border-2 border-transparent h-full flex flex-col items-center"
                  >
                    <div className="service-icon group-hover:bg-turquoise-gradient">
                      <IconComponent className="w-8 h-8 text-primary-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="text-lg font-bold text-neutral-800 mb-3 group-hover:text-primary-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-neutral-500 leading-relaxed flex-1">
                      {truncateText(service.shortDescription, 100)}
                    </p>
                    <div className="mt-5 flex items-center gap-1 text-primary-600 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                      Detaylı Bilgi <ArrowRight size={14} />
                    </div>
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

      {/* ===== WHY CHOOSE US SECTION ===== */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="section-tag">Neden Biz?</span>
              <h2 className="section-title">Batman'da Temizlikte<br /><span className="text-gradient">Öncü Firma</span></h2>
              <div className="divider-turquoise" />
              <p className="text-neutral-500 leading-relaxed mb-8">
                İnci Temizlik Şirketi olarak Batman'da yıllardır güvenle hizmet veriyoruz.
                Müşteri memnuniyetini her şeyin önünde tutarak kaliteli ve hijyenik
                hizmet anlayışıyla çalışıyoruz.
              </p>
              <ul className="space-y-3">
                {['Profesyonel ekipman ve ürünler', 'Güvenlik geçmişi kontrolü yapılmış personel', 'Esnek çalışma saatleri', '7/24 müşteri desteği'].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle size={18} className="text-primary-500 flex-shrink-0" />
                    <span className="text-neutral-600 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex gap-4 mt-8">
                <Link to="/hakkimizda" className="btn-primary">
                  Hakkımızda
                  <ArrowRight size={18} />
                </Link>
                <a href="tel:05050363865" className="btn-outline">
                  <Phone size={18} />
                  Hemen Ara
                </a>
              </div>
            </motion.div>

            {/* Right: Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {whyChooseUs.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`bg-gradient-to-br ${item.color} rounded-2xl p-6 border border-transparent hover:border-primary-200 transition-all duration-300 hover:-translate-y-1`}
                >
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 shadow-card">
                    <item.icon size={22} className={item.iconColor} />
                  </div>
                  <h3 className="font-bold text-neutral-800 mb-2">{item.title}</h3>
                  <p className="text-sm text-neutral-500 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== ABOUT SECTION (from Firebase) ===== */}
      {settings.aboutUs && (
        <section className="section-padding bg-neutral-50">
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
                    alt="İnci Temizlik Şirketi Hakkında"
                    className="rounded-3xl shadow-soft w-full h-[420px] object-cover"
                  />
                ) : (
                  <div className="bg-turquoise-gradient rounded-3xl h-[420px] flex items-center justify-center shadow-turquoise">
                    <Sparkles className="w-28 h-28 text-white/60" />
                  </div>
                )}
                {/* Floating badge */}
                <div className="absolute -bottom-5 -right-5 bg-white rounded-2xl shadow-soft px-6 py-4 border border-primary-100">
                  <div className="text-2xl font-extrabold text-primary-600 font-heading">5+ Yıl</div>
                  <div className="text-neutral-500 text-sm font-medium">Tecrübe</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="section-tag">Hakkımızda</span>
                <h2 className="section-title">Batman'ın Güvenilen Temizlik Şirketi</h2>
                <div className="divider-turquoise" />
                <p className="text-neutral-500 leading-relaxed mb-8">
                  {truncateText(settings.aboutUs, 300)}
                </p>
                <Link to="/hakkimizda" className="btn-primary">
                  Devamını Oku
                  <ArrowRight size={18} />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* ===== PROJECTS SECTION ===== */}
      {projects.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <span className="section-tag">Projelerimiz</span>
              <h2 className="section-title">Başarılı Çalışmalarımız</h2>
              <div className="divider-turquoise mx-auto" />
              <p className="section-subtitle">
                Batman'da gerçekleştirdiğimiz temizlik projelerinden seçkiler.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group card overflow-hidden"
                >
                  <div className="h-56 bg-neutral-100 relative overflow-hidden">
                    {project.images?.[0] ? (
                      <img
                        src={project.images[0]}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50">
                        <Building2 className="w-16 h-16 text-primary-300" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-neutral-800 mb-2 group-hover:text-primary-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-neutral-500">{truncateText(project.description, 100)}</p>
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

      {/* ===== TESTIMONIALS SECTION ===== */}
      {testimonials.length > 0 && (
        <section className="section-padding bg-turquoise-gradient relative overflow-hidden">
          {/* Decorative */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-primary-400/20 translate-y-1/2 -translate-x-1/2" />

          <div className="container-custom relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary-200 bg-white/10 px-4 py-1.5 rounded-full mb-4 border border-white/20">
                Müşteri Yorumları
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-heading">
                Müşterilerimiz Ne Diyor?
              </h2>
              <p className="text-primary-100 max-w-xl mx-auto">
                Batman'daki müşterilerimizin İnci Temizlik hakkındaki düşünceleri.
              </p>
            </motion.div>

            <div className="max-w-2xl mx-auto relative">
              <div className="bg-white rounded-3xl p-8 md:p-12 shadow-soft">
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < (testimonials[currentTestimonial]?.rating || 5)
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-neutral-200'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-lg text-neutral-700 text-center mb-8 leading-relaxed italic">
                  "{testimonials[currentTestimonial]?.comment}"
                </p>
                <div className="text-center">
                  <div className="w-12 h-12 bg-turquoise-gradient rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold text-lg">
                      {testimonials[currentTestimonial]?.name?.charAt(0) || 'M'}
                    </span>
                  </div>
                  <p className="font-bold text-neutral-800">
                    {testimonials[currentTestimonial]?.name}
                  </p>
                  <p className="text-sm text-neutral-400">
                    {testimonials[currentTestimonial]?.role}
                  </p>
                </div>
              </div>

              {testimonials.length > 1 && (
                <>
                  <button
                    onClick={prevTestimonial}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 w-10 h-10 bg-white rounded-full shadow-card flex items-center justify-center hover:bg-primary-50 transition-colors"
                  >
                    <ChevronLeft size={20} className="text-primary-600" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 w-10 h-10 bg-white rounded-full shadow-card flex items-center justify-center hover:bg-primary-50 transition-colors"
                  >
                    <ChevronRight size={20} className="text-primary-600" />
                  </button>

                  <div className="flex justify-center gap-2 mt-6">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentTestimonial(index)}
                        className={`rounded-full transition-all duration-300 ${
                          index === currentTestimonial
                            ? 'w-6 h-2 bg-white'
                            : 'w-2 h-2 bg-white/40 hover:bg-white/60'
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

      {/* ===== CTA SECTION ===== */}
      <section className="py-24 bg-neutral-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-primary-900/40" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary-500/10 blur-3xl" />

        <div className="container-custom text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white mb-6">
              Ücretsiz Fiyat Teklifi Alın
            </h2>
            <p className="text-neutral-400 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
              Batman'da profesyonel temizlik hizmetimizden yararlanmak için hemen
              bizimle iletişime geçin. Size özel fiyat teklifi hazırlayalım!
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp text-base px-8 py-4"
              >
                <MessageCircle size={22} />
                WhatsApp'tan Yaz
              </a>
              <a
                href="tel:05050363865"
                className="btn-outline border-white/30 text-white hover:bg-white/10 text-base px-8 py-4"
              >
                <Phone size={22} />
                0505 036 38 65
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
