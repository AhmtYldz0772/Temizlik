import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Shield, Award, Clock, CircleCheck as CheckCircle } from 'lucide-react'
import { getSiteSettings } from '../../firebase/settingsService'

const values = [
  {
    icon: Shield,
    title: 'Güvenilirlik',
    description: 'Randevularınıza her zaman zamanında gelip, işinizi titizlikle tamamlıyoruz.',
  },
  {
    icon: Award,
    title: 'Kalite',
    description: 'Profesyonel ekibimiz ve kaliteli malzemelerimizle en iyi sonucu sunuyoruz.',
  },
  {
    icon: Clock,
    title: 'Hızlı Hizmet',
    description: 'Acil temizlik ihtiyaçlarınıza hızlıca yanıt veriyoruz.',
  },
  {
    icon: CheckCircle,
    title: 'Müşteri Memnuniyeti',
    description: 'Müşteri memnuniyeti bizim için her şeyden önemlidir.',
  },
]

const AboutPage = () => {
  const [settings, setSettings] = useState({})

  useEffect(() => {
    const fetchSettings = async () => {
      const data = await getSiteSettings()
      setSettings(data || {})
    }
    fetchSettings()
  }, [])

  useEffect(() => {
    document.title = 'Hakkımızda | Temizlik Şirketi'
  }, [])

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
              Hakkımızda
            </h1>
            <p className="text-white/80 max-w-2xl mx-auto">
              Biz kimiz ve neler yapyoruz?
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative order-2 lg:order-1"
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
              className="order-1 lg:order-2"
            >
              <h2 className="section-title mb-6">Biz Kimiz?</h2>
              <p className="text-neutral-600 leading-relaxed whitespace-pre-line">
                {settings.aboutUs || 'Hakkımızda bilgisi yakında eklenecektir.'}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="section-title">Neden Biz?</h2>
            <p className="section-subtitle">
              Bizi tercih etmeniz için birçok neden var.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-card text-center hover:shadow-soft transition-shadow"
              >
                <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-primary-600" />
                </div>
                <h3 className="font-semibold text-neutral-800 mb-2">{value.title}</h3>
                <p className="text-sm text-neutral-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
