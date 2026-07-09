import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Shield, Award, Clock, CheckCircle, Users, Star, Phone, MessageCircle } from 'lucide-react'
import { getSiteSettings } from '../../firebase/settingsService'

const WHATSAPP_MESSAGE = encodeURIComponent('Merhaba, temizlik hizmeti hakkında bilgi almak istiyorum.')
const WHATSAPP_LINK = `https://wa.me/905050363865?text=${WHATSAPP_MESSAGE}`

const values = [
  {
    icon: Shield,
    title: 'Güvenilirlik',
    description: 'Randevularınıza her zaman zamanında gelir, işinizi titizlikle tamamlarız.',
    color: 'from-blue-50 to-cyan-50',
    iconColor: 'text-blue-500',
    bgIcon: 'bg-blue-100'
  },
  {
    icon: Award,
    title: 'Kalite Garantisi',
    description: 'Profesyonel ekibimiz ve kaliteli malzemelerimizle en iyi sonucu sunuyoruz.',
    color: 'from-amber-50 to-yellow-50',
    iconColor: 'text-amber-500',
    bgIcon: 'bg-amber-100'
  },
  {
    icon: Clock,
    title: 'Hızlı Hizmet',
    description: 'Acil temizlik ihtiyaçlarınıza en kısa sürede yanıt veriyoruz.',
    color: 'from-primary-50 to-secondary-50',
    iconColor: 'text-primary-500',
    bgIcon: 'bg-primary-100'
  },
  {
    icon: Users,
    title: 'Uzman Ekip',
    description: 'Deneyimli ve eğitimli temizlik uzmanlarımızla kaliteli hizmet.',
    color: 'from-purple-50 to-pink-50',
    iconColor: 'text-purple-500',
    bgIcon: 'bg-purple-100'
  },
]

const stats = [
  { number: '500+', label: 'Mutlu Müşteri', icon: Users },
  { number: '5+', label: 'Yıl Deneyim', icon: Award },
  { number: '15+', label: 'Uzman Personel', icon: Shield },
  { number: '4.9', label: 'Ortalama Puan', icon: Star },
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
    document.title = 'Hakkımızda | İnci Temizlik Şirketi Batman'
  }, [])

  return (
    <div>
      {/* Hero */}
      <section className="relative py-32 pt-40 bg-turquoise-gradient overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/10 -translate-y-1/3 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-primary-300/20 translate-y-1/2 -translate-x-1/3" />

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full px-5 py-2 mb-6">
              <Sparkles size={14} className="text-primary-200" />
              <span className="text-white/90 text-sm font-semibold">Batman'da Güvenilir Temizlik</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-white mb-5">
              Hakkımızda
            </h1>
            <p className="text-white/80 max-w-2xl mx-auto text-lg leading-relaxed">
              Batman'da yıllardır profesyonel temizlik hizmetleri sunan İnci Temizlik Şirketi olarak
              müşteri memnuniyetini her şeyin önünde tutuyoruz.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-b border-neutral-100">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-extrabold text-primary-600 font-heading mb-1">{stat.number}</div>
                <div className="text-neutral-500 font-medium text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative order-2 lg:order-1"
            >
              {settings.aboutUsImage ? (
                <img
                  src={settings.aboutUsImage}
                  alt="İnci Temizlik Şirketi"
                  className="rounded-3xl shadow-soft w-full h-[440px] object-cover"
                />
              ) : (
                <div className="bg-turquoise-gradient rounded-3xl h-[440px] flex flex-col items-center justify-center shadow-turquoise gap-6">
                  <Sparkles className="w-24 h-24 text-white/50" />
                  <p className="text-white/60 font-medium">İnci Temizlik Şirketi</p>
                </div>
              )}
              {/* Floating badge */}
              <div className="absolute -bottom-6 -right-4 bg-white rounded-2xl shadow-soft px-6 py-4 border border-primary-100">
                <div className="text-2xl font-extrabold text-primary-600 font-heading">5★</div>
                <div className="text-neutral-500 text-xs font-medium">Müşteri Puanı</div>
              </div>
              <div className="absolute -top-4 -left-4 bg-primary-600 rounded-2xl shadow-turquoise px-5 py-3">
                <div className="text-white font-extrabold text-lg font-heading">Batman #1</div>
                <div className="text-primary-200 text-xs">Temizlik Şirketi</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <span className="section-tag">Biz Kimiz?</span>
              <h2 className="section-title">
                Batman'ın Güvenilen<br />
                <span className="text-gradient">Temizlik Firması</span>
              </h2>
              <div className="divider-turquoise" />
              <p className="text-neutral-500 leading-relaxed mb-6 text-base">
                {settings.aboutUs ||
                  'İnci Temizlik Şirketi olarak Batman\'da yıllar içinde kazandığımız tecrübe ve müşteri memnuniyetiyle alanımızın öncü firması haline geldik. Profesyonel ekibimiz, modern ekipmanlarımız ve kaliteli temizlik ürünlerimizle ev, ofis ve ticari mekânlarda hijyenik ve tertemiz ortamlar yaratıyoruz. Güvenlik geçmişi kontrol edilmiş personelimiz ve sigortalı hizmet anlayışımızla sizlere güvence veriyoruz.'}
              </p>

              <div className="space-y-3 mb-8">
                {[
                  'Deneyimli ve sigortalı temizlik ekibi',
                  'Ekolojik ve hijyenik temizlik ürünleri',
                  'Zamanında teslimat garantisi',
                  'Memnuniyet garantisi — beğenmezseniz ücretsiz yenileriz',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle size={18} className="text-primary-500 flex-shrink-0" />
                    <span className="text-neutral-600">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                  <MessageCircle size={18} />
                  WhatsApp
                </a>
                <a href="tel:05050363865" className="btn-outline">
                  <Phone size={18} />
                  Hemen Ara
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="section-tag">Değerlerimiz</span>
            <h2 className="section-title">Bizi Farklı Kılan Özellikler</h2>
            <div className="divider-turquoise mx-auto" />
            <p className="section-subtitle">
              Batman'da binlerce müşterimizin güvenini kazanmamızın ardındaki sebepler.
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
                className={`bg-gradient-to-br ${value.color} rounded-2xl p-6 text-center border border-transparent hover:border-primary-200 transition-all duration-300 hover:-translate-y-1`}
              >
                <div className={`w-14 h-14 ${value.bgIcon} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <value.icon className={`w-7 h-7 ${value.iconColor}`} />
                </div>
                <h3 className="font-bold text-neutral-800 mb-2">{value.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-turquoise-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-white mb-4">
              Hizmet Almak İster misiniz?
            </h2>
            <p className="text-primary-100 mb-8 max-w-xl mx-auto">
              Batman'da profesyonel temizlik hizmeti için hemen iletişime geçin.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                <MessageCircle size={18} />
                WhatsApp ile Yaz
              </a>
              <a href="tel:05050363865" className="btn-white">
                <Phone size={18} />
                0505 036 38 65
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
