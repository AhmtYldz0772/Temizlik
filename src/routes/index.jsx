import { Routes as RouterRoutes, Route } from 'react-router-dom'
import { Layout } from '../components/public'
import { AdminLogin, AdminLayout } from '../components/admin'

// Public Pages
import HomePage from '../pages/public/HomePage'
import ServicesPage from '../pages/public/ServicesPage'
import ServiceDetailPage from '../pages/public/ServiceDetailPage'
import ProjectsPage from '../pages/public/ProjectsPage'
import BlogPage from '../pages/public/BlogPage'
import BlogDetailPage from '../pages/public/BlogDetailPage'
import AboutPage from '../pages/public/AboutPage'
import ContactPage from '../pages/public/ContactPage'

// Admin Pages
import AdminDashboard from '../pages/admin/AdminDashboard'
import AdminServices from '../pages/admin/AdminServices'
import AdminServiceForm from '../pages/admin/AdminServiceForm'
import AdminProjects from '../pages/admin/AdminProjects'
import AdminProjectForm from '../pages/admin/AdminProjectForm'
import AdminBlog from '../pages/admin/AdminBlog'
import AdminBlogForm from '../pages/admin/AdminBlogForm'
import AdminTestimonials from '../pages/admin/AdminTestimonials'
import AdminAbout from '../pages/admin/AdminAbout'
import AdminContactInfo from '../pages/admin/AdminContactInfo'
import AdminSettings from '../pages/admin/AdminSettings'
import AdminMessages from '../pages/admin/AdminMessages'

const Routes = () => {
  return (
    <RouterRoutes>
      {/* Public Routes */}
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/hizmetler" element={<ServicesPage />} />
        <Route path="/hizmetler/:slug" element={<ServiceDetailPage />} />
        <Route path="/projeler" element={<ProjectsPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogDetailPage />} />
        <Route path="/hakkimizda" element={<AboutPage />} />
        <Route path="/iletisim" element={<ContactPage />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/hizmetler" element={<AdminServices />} />
        <Route path="/admin/hizmetler/yeni" element={<AdminServiceForm />} />
        <Route path="/admin/hizmetler/:id" element={<AdminServiceForm />} />
        <Route path="/admin/projeler" element={<AdminProjects />} />
        <Route path="/admin/projeler/yeni" element={<AdminProjectForm />} />
        <Route path="/admin/projeler/:id" element={<AdminProjectForm />} />
        <Route path="/admin/blog" element={<AdminBlog />} />
        <Route path="/admin/blog/yeni" element={<AdminBlogForm />} />
        <Route path="/admin/blog/:id" element={<AdminBlogForm />} />
        <Route path="/admin/yorumlar" element={<AdminTestimonials />} />
        <Route path="/admin/hakkimizda" element={<AdminAbout />} />
        <Route path="/admin/iletisim-bilgileri" element={<AdminContactInfo />} />
        <Route path="/admin/ayarlar" element={<AdminSettings />} />
        <Route path="/admin/mesajlar" element={<AdminMessages />} />
      </Route>
    </RouterRoutes>
  )
}

export default Routes
