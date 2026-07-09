import { useState } from 'react'
import { Database, AlertTriangle, CheckCircle } from 'lucide-react'
import { addService } from '../../firebase/servicesService'
import { addProject } from '../../firebase/projectsService'
import { addTestimonial } from '../../firebase/testimonialsService'
import { addBlogPost } from '../../firebase/blogService'

const servicesData = [
  {
    title: 'Detaylı Ev Temizliği',
    slug: 'detayli-ev-temizligi',
    shortDescription: 'Batman ev temizliği şirketleri arasında lider olan İnci Temizlik, evinizi en ince ayrıntısına kadar hijyenik bir şekilde temizler.',
    description: 'Ev temizliği, ailenizin sağlığı ve konforu için en önemli unsurlardan biridir. İnci Temizlik Şirketi olarak, profesyonel ekibimiz ve çevre dostu temizlik ürünlerimizle evinizin her köşesini detaylı bir şekilde temizliyoruz. Mutfak dolaplarının içinden banyo derz aralarına, pencerelerden zemin temizliğine kadar her alanda kusursuz hijyen sağlıyoruz. Batman ev temizliği arayışınızda güvenilir tercihiniz.',
    icon: 'Home',
    imageUrl: '/hero_cleaning.png',
    order: 1,
    isActive: true,
    seoTitle: 'Batman Ev Temizliği Şirketleri | İnci Temizlik',
    seoDescription: 'Batman profesyonel ev temizliği hizmeti. Eğitimli personelimizle evinizi pırıl pırıl yapıyoruz. Hemen fiyat teklifi alın.'
  },
  {
    title: 'Profesyonel Ofis Temizliği',
    slug: 'profesyonel-ofis-temizligi',
    shortDescription: 'Çalışma alanlarınızda maksimum verimlilik ve sağlık için düzenli, profesyonel ofis temizliği hizmetleri sunuyoruz.',
    description: 'Temiz bir ofis, hem çalışanların motivasyonunu artırır hem de şirketinize gelen misafirler üzerinde olumlu bir ilk izlenim bırakır. Masaların tozu, zemin temizliği, çöplerin boşaltılması, mutfak ve lavaboların dezenfeksiyonu gibi günlük ve haftalık temizlik ihtiyaçlarınızı karşılıyoruz. Batman ofis temizliği firmaları arasında kurumsal çözümlerimizle öne çıkıyoruz.',
    icon: 'Building2',
    imageUrl: '/services_banner.png',
    order: 2,
    isActive: true,
    seoTitle: 'Batman Ofis ve Büro Temizliği | Kurumsal Temizlik',
    seoDescription: 'İş yeriniz için düzenli veya tek seferlik ofis temizliği hizmeti. Kurumsal temizlik ihtiyaçlarınız için İnci Temizlik.'
  },
  {
    title: 'İnşaat Sonrası Temizlik',
    slug: 'insaat-sonrasi-temizlik',
    shortDescription: 'Yeni taşınacağınız evinizin veya iş yerinizin inşaat ve tadilat kalıntılarından tamamen arındırılması.',
    description: 'İnşaat veya tadilat sonrası ortaya çıkan yoğun toz, boya lekeleri, harç kalıntıları ve silikon izleri sıradan temizlik yöntemleriyle çıkmaz. Özel kimyasallarımız ve sanayi tipi vakum makinelerimiz ile mekanınızı taşınmaya hazır, tertemiz bir hale getiriyoruz. Batman inşaat sonrası temizlikte garantili hizmet sunuyoruz.',
    icon: 'Sparkles',
    imageUrl: '/hero_cleaning.png',
    order: 3,
    isActive: true,
    seoTitle: 'Batman İnşaat Sonrası Temizlik | Tadilat Sonrası',
    seoDescription: 'İnşaat ve tadilat sonrası zorlu lekeler ve tozlarla başa çıkıyoruz. Batman inşaat temizliğinde profesyonel çözüm.'
  },
  {
    title: 'Koltuk ve Yatak Yıkama',
    slug: 'koltuk-ve-yatak-yikama',
    shortDescription: 'Yerinde koltuk ve yatak yıkama hizmeti ile inatçı lekeleri ve bakterileri derinlemesine temizliyoruz.',
    description: 'Evdeki en çok mikrop barındıran eşyalar olan koltuk ve yataklarınızı, yüksek emiş gücüne sahip profesyonel makinelerle yerinde yıkıyoruz. Anti-bakteriyel şampuanlar kullanarak alerjenleri ve maytları yok ediyoruz. Batman koltuk yıkama hizmetimizle eşyalarınız ilk günkü gibi temiz ve ferah.',
    icon: 'Shirt',
    imageUrl: '/services_banner.png',
    order: 4,
    isActive: true,
    seoTitle: 'Batman Koltuk Yıkama ve Yatak Temizliği',
    seoDescription: 'Yerinde profesyonel koltuk, kanepe ve yatak yıkama hizmeti. Derinlemesine anti-bakteriyel temizlik.'
  }
];

const projectsData = [
  {
    title: 'Batman Merkez Lüks Daire Temizliği',
    slug: 'batman-merkez-luks-daire-temizligi',
    description: 'Batman Gültepe mahallesinde bulunan 4+1 lüks dairenin detaylı genel temizliği profesyonel ekibimiz tarafından bir gün içerisinde tamamlanmıştır.',
    images: ['/hero_cleaning.png', '/services_banner.png'],
    order: 1,
    isActive: true
  },
  {
    title: 'Yeni Sanayi Sitesi Ofis Temizliği',
    slug: 'yeni-sanayi-sitesi-ofis-temizligi',
    description: 'Batman Sanayi sitesinde bulunan 3 katlı yönetim binasının inşaat sonrası kaba ve ince temizliği sanayi tipi makinelerimizle gerçekleştirilmiştir.',
    images: ['/services_banner.png'],
    order: 2,
    isActive: true
  },
  {
    title: 'Kültür Mahallesi Dubleks Ev Temizliği',
    slug: 'kultur-mahallesi-dubleks-ev-temizligi',
    description: 'Kültür mahallesindeki dubleks evin taşınma öncesi boş ev temizliği, camların silinmesi ve zemin dezenfeksiyon işlemleri yapıldı.',
    images: ['/hero_cleaning.png'],
    order: 3,
    isActive: true
  }
];

const testimonialsData = [
  {
    name: 'Ayşe Yılmaz',
    role: 'Ev Hanımı',
    content: 'İnci Temizlik Şirketi ile çalışmak harikaydı. Ekip tam saatinde geldi ve evimi gerçekten pırıl pırıl yaptılar. Özellikle banyo ve mutfaktaki detaylı temizliklerinden çok memnun kaldım. Batman\'da temizlik şirketi arayanlara kesinlikle tavsiye ederim.',
    rating: 5,
    order: 1,
    isActive: true
  },
  {
    name: 'Mehmet Demir',
    role: 'Şirket Yöneticisi',
    content: 'Ofisimizin düzenli temizliği için anlaştık. Akşamları mesai bitiminden sonra gelip hiç rahatsız etmeden tüm ofisi harika bir şekilde temizliyorlar. Hem güvenilirler hem de işlerini çok iyi yapıyorlar.',
    rating: 5,
    order: 2,
    isActive: true
  },
  {
    name: 'Fatma Kaya',
    role: 'Müşteri',
    content: 'Tadilat sonrası ev o kadar pisti ki nasıl temizlenecek diye düşünüyordum. İnci temizlik ekibi özel ilaçlarla yerlerdeki bütün boya ve alçı kalıntılarını çıkardı. Çok profesyonel bir ekip.',
    rating: 5,
    order: 3,
    isActive: true
  }
];

const blogPostsData = [
  {
    title: 'Ev Temizliğinde Dikkat Edilmesi Gereken 5 Önemli Püf Noktası',
    slug: 'ev-temizligi-puf-noktalari',
    excerpt: 'Evinizi temizlerken daha az yorulmak ve daha hijyenik sonuçlar almak için uygulayabileceğiniz profesyonel ipuçları.',
    content: 'Evinizi temizlerken doğru yöntemleri kullanmak hem zaman kazandırır hem de daha hijyenik bir ortam sağlar.\n\n1. Yukarıdan Aşağıya Temizlik: Toz alırken her zaman en yüksek raflardan başlayıp zemine doğru inin.\n2. Doğru Bez Seçimi: Camlar için ayrı, mobilyalar için mikrofiber bezler kullanın.\n3. Doğal Temizleyiciler: Sirke ve karbonat ikilisi zorlu lekelerde harikalar yaratır.\n4. Zemin Temizliği: Zeminleri silmeden önce mutlaka çok iyi vakumlayın.\n5. Havalandırma: Temizlik sırasında ve sonrasında evi iyice havalandırmayı unutmayın.',
    coverImage: '/hero_cleaning.png',
    category: 'İpuçları',
    publishedAt: new Date().toISOString(),
    isPublished: true,
    seoTitle: 'Ev Temizliğinde Dikkat Edilmesi Gereken 5 Püf Noktası',
    seoDescription: 'Pratik ve hijyenik ev temizliği için uzmanlardan 5 önemli ipucu. Temizlik yaparken zaman kazanın.'
  },
  {
    title: 'İnşaat Sonrası Temizlik Neden Profesyonellere Bırakılmalı?',
    slug: 'insaat-sonrasi-temizlik-neden-profesyonellere-birakilmali',
    excerpt: 'Tadilat ve inşaat sonrasında kalan inatçı kirleri temizlemek normalden çok daha zordur. İşte profesyonel destek almanız için nedenler.',
    content: 'Yeni bir eve taşınmanın heyecanı, genellikle inşaat kalıntıları ve yoğun tozla gölgelenir. Peki, bu süreci neden profesyonel bir temizlik şirketine bırakmalısınız?\n\nÖncelikle, inşaat tozu sıradan ev süpürgeleriyle çekilirse süpürgenin motorunu yakabilir. Sanayi tipi vakum makineleri şarttır. Ayrıca camlardaki ve zeminlerdeki donmuş harç, boya ve silikon kalıntıları marketlerde satılan deterjanlarla çıkmaz. Asidik ve çözücü özel kimyasallar kullanılması, bunu yaparken de yüzeyin (parke, mermer vb.) çizilmemesi gerekir.\n\nBatman İnci Temizlik olarak, inşaat sonrası temizlikte yılların verdiği tecrübeyle evinizi taşınmaya hazır hale getiriyoruz.',
    coverImage: '/services_banner.png',
    category: 'Hizmetlerimiz',
    publishedAt: new Date().toISOString(),
    isPublished: true,
    seoTitle: 'İnşaat Sonrası Temizlik Neden Profesyonellere Bırakılmalı?',
    seoDescription: 'İnşaat ve tadilat sonrası kaba ve ince temizliğin zorlukları ve profesyonel destek almanın avantajları.'
  }
];

const SeedButton = () => {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSeed = async () => {
    if (!window.confirm('Veritabanına SEO uyumlu örnek veriler (Hizmetler, Projeler, Yorumlar, Blog) eklenecektir. Onaylıyor musunuz?')) return

    setLoading(true)
    setError('')
    try {
      // Add Services
      for (const service of servicesData) {
        await addService(service)
      }

      // Add Projects
      for (const project of projectsData) {
        await addProject(project)
      }

      // Add Testimonials
      for (const testimonial of testimonialsData) {
        await addTestimonial(testimonial)
      }

      // Add Blog Posts
      for (const post of blogPostsData) {
        await addBlogPost(post)
      }

      setSuccess(true)
      setTimeout(() => setSuccess(false), 5000)
    } catch (err) {
      console.error('Veri yükleme hatası:', err)
      setError('Veriler yüklenirken bir hata oluştu: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600">
          <Database size={20} />
        </div>
        <div>
          <h3 className="font-semibold text-amber-800">Örnek Verileri Yükle</h3>
          <p className="text-sm text-amber-700">Tüm hizmet, proje ve blog verilerini SEO uyumlu şekilde otomatik doldurun.</p>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        {error && <span className="text-error-600 text-sm flex items-center gap-1"><AlertTriangle size={16}/> {error}</span>}
        {success && <span className="text-green-600 text-sm font-medium flex items-center gap-1"><CheckCircle size={16}/> Başarıyla Yüklendi!</span>}
        
        <button
          onClick={handleSeed}
          disabled={loading || success}
          className="btn-primary bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 border-none shadow-none text-sm py-2"
        >
          {loading ? 'Yükleniyor...' : 'Verileri Doldur'}
        </button>
      </div>
    </div>
  )
}

export default SeedButton
