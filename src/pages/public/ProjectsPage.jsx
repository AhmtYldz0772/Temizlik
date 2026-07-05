import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Building2 } from 'lucide-react'
import { getProjects } from '../../firebase/projectsService'
import { truncateText } from '../../utils/helpers'

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
    document.title = 'Projelerimiz | Temizlik Şirketi'
  }, [])

  const openLightbox = (project) => {
    setSelectedProject(project)
    setCurrentImageIndex(0)
  }

  const closeLightbox = () => {
    setSelectedProject(null)
    setCurrentImageIndex(0)
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
              Projelerimiz
            </h1>
            <p className="text-white/80 max-w-2xl mx-auto">
              Gerçekleştirdiğimiz başarılı temizlik projelerini inceleyin.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          {projects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-neutral-600">Henüz proje bulunmamaktadır.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="cursor-pointer"
                  onClick={() => openLightbox(project)}
                >
                  <div className="card group">
                    <div className="h-64 bg-neutral-100 relative overflow-hidden">
                      {project.images?.[0] ? (
                        <img
                          src={project.images[0]}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50">
                          <Building2 className="w-16 h-16 text-primary-300" />
                        </div>
                      )}
                      {project.images?.length > 1 && (
                        <div className="absolute bottom-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded">
                          {project.images.length} görsel
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-neutral-800 mb-2 group-hover:text-primary-600 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-neutral-600">{truncateText(project.description, 150)}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white hover:text-neutral-300 transition-colors"
          >
            <X size={32} />
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
                  className="w-full max-h-[70vh] object-contain rounded-lg"
                />
              ) : (
                <div className="w-full h-[70vh] bg-neutral-800 flex items-center justify-center rounded-lg">
                  <Building2 className="w-24 h-24 text-neutral-600" />
                </div>
              )}

              {selectedProject.images?.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                  >
                    <ChevronRight className="w-6 h-6 text-white" />
                  </button>

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {selectedProject.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(index); }}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentImageIndex ? 'bg-white' : 'bg-white/40'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="text-center mt-6">
              <h3 className="text-xl font-semibold text-white mb-2">{selectedProject.title}</h3>
              <p className="text-neutral-400">{selectedProject.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProjectsPage
