import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Building2, Sparkles, Eye, MessageCircle, Phone } from 'lucide-react'
import { getProjects } from '../../firebase/projectsService'
import { truncateText } from '../../utils/helpers'

const WHATSAPP_MESSAGE = encodeURIComponent('Merhaba, temizlik hizmeti hakkında bilgi almak istiyorum.')
const WHATSAPP_LINK = `https://wa.me/905050363865?text=${WHATSAPP_MESSAGE}`

const ProjectsPage = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedProject, setSelectedProject] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await getProjects(true)
      setProjects(data)
      setLoading(false)
    }
    fetchProjects()
  }, [])

  useEffect(() => {
    document.title = 'Projelerimiz | İnci Temizlik Şirketi Batman'
  }, [])

  const openLightbox = (project) => {
    setSelectedProject(project)
    setCurrentImageIndex(0)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setSelectedProject(null)
    setCurrentImageIndex(0)
    document.body.style.overflow = ''
  }

  const nextImage = () => {
    if (selectedProject?.images) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedProject.images.length)
    }
  }

  const prevImage = () => {
    if (selectedProject?.images) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedProject.images.length) % selectedProject.images.length)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
          <p className="text-neutral-500 font-medium">Projeler yükleniyor...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative py-32 pt-40 bg-turquoise-gradient overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/10 -translate-y-1/3 translate-x-1/3 blur-2xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-primary-300/20 translate-y-1/2 -translate-x-1/4 blur-2xl" />

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full px-5 py-2 mb-6">
              <Sparkles size={14} className="text-primary-200" />
              <span className="text-white/90 text-sm font-semibold">Batman'da Başarılı Çalışmalar</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-white mb-5">
              Projelerimiz
            </h1>
            <p className="text-white/80 max-w-2xl mx-auto text-lg leading-relaxed">
              Batman'da gerçekleştirdiğimiz başarılı temizlik projelerini inceleyin.
              Her proje, mükemmeliyetimizin bir kanıtıdır.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          {projects.length === 0 ? (
            <div className="text-center py-20">
              <Building2 className="w-20 h-20 text-primary-200 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-neutral-700 mb-2">Henüz proje eklenmemiş</h3>
              <p className="text-neutral-500 mb-6">Projelerimiz yakında burada yer alacak.</p>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary">
                <MessageCircle size={18} />
                Referans İçin Yazın
              </a>
            </div>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-14"
              >
                <span className="section-tag">Tamamlanan İşler</span>
                <h2 className="section-title">Başarı Hikayelerimiz</h2>
                <div className="divider-turquoise mx-auto" />
                <p className="section-subtitle">
                  Tıklayarak projelerin detaylarını ve görselleri inceleyebilirsiniz.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    onClick={() => openLightbox(project)}
                    className="group cursor-pointer"
                  >
                    <div className="card overflow-hidden h-full">
                      {/* Image */}
                      <div className="h-60 bg-neutral-100 relative overflow-hidden">
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

                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-turquoise-gradient opacity-0 group-hover:opacity-80 transition-opacity duration-300 flex items-center justify-center gap-2">
                          <Eye size={20} className="text-white" />
                          <span className="text-white font-bold">Görüntüle</span>
                        </div>

                        {/* Image count badge */}
                        {project.images?.length > 1 && (
                          <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1.5 rounded-full flex items-center gap-1">
                            <Eye size={12} />
                            {project.images.length} görsel
                          </div>
                        )}
                      </div>

                      <div className="p-5">
                        <h3 className="font-bold text-neutral-800 mb-2 group-hover:text-primary-600 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-sm text-neutral-500 leading-relaxed">
                          {truncateText(project.description, 120)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white border-t border-neutral-100">
        <div className="container-custom text-center">
          <h3 className="text-2xl font-heading font-bold text-neutral-800 mb-3">
            Sizin Mekanınız da Bu Galeriye Eklensin!
          </h3>
          <p className="text-neutral-500 mb-6">Profesyonel temizlik hizmeti için hemen iletişime geçin.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
              <MessageCircle size={18} />
              WhatsApp ile Ulaşın
            </a>
            <a href="tel:05050363865" className="btn-outline">
              <Phone size={18} />
              0505 036 38 65
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
            >
              <X size={20} />
            </button>

            <div
              className="max-w-5xl w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                {selectedProject.images?.[currentImageIndex] ? (
                  <img
                    src={selectedProject.images[currentImageIndex]}
                    alt={selectedProject.title}
                    className="w-full max-h-[70vh] object-contain rounded-2xl"
                  />
                ) : (
                  <div className="w-full h-[60vh] bg-neutral-800 flex items-center justify-center rounded-2xl">
                    <Building2 className="w-24 h-24 text-neutral-600" />
                  </div>
                )}

                {selectedProject.images?.length > 1 && (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); prevImage() }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); nextImage() }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors"
                    >
                      <ChevronRight size={24} />
                    </button>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {selectedProject.images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx) }}
                          className={`rounded-full transition-all duration-300 ${idx === currentImageIndex ? 'w-6 h-2 bg-white' : 'w-2 h-2 bg-white/40 hover:bg-white/60'}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="text-center mt-5">
                <h3 className="text-xl font-bold text-white mb-2">{selectedProject.title}</h3>
                <p className="text-neutral-400 text-sm max-w-xl mx-auto">{selectedProject.description}</p>
                {selectedProject.images?.length > 1 && (
                  <p className="text-neutral-500 text-xs mt-2">
                    {currentImageIndex + 1} / {selectedProject.images.length}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ProjectsPage
