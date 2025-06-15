import React from 'react';
import { useParams, Link } from 'react-router-dom';

const CategoryDetail = () => {
  const { categoryName } = useParams();
  
  // Kategori detayları ve örnek kitaplar
  const categoryDetails = {
    'roman': {
      title: 'Roman',
      description: 'Türk ve dünya edebiyatının en seçkin romanları bu kategoride sizleri bekliyor. Klasiklerden modern eserlere, her türlü romanı bulabileceğiniz geniş bir koleksiyon.',
      featuredBooks: [
        { title: 'Saatleri Ayarlama Enstitüsü', author: 'Ahmet Hamdi Tanpınar', year: '1961' },
        { title: 'Kürk Mantolu Madonna', author: 'Sabahattin Ali', year: '1943' },
        { title: 'Tutunamayanlar', author: 'Oğuz Atay', year: '1972' },
        { title: 'Suç ve Ceza', author: 'Fyodor Dostoyevski', year: '1866' }
      ],
      subcategories: ['Türk Romanı', 'Dünya Romanı', 'Modern Roman', 'Klasik Roman']
    },
    'siir': {
      title: 'Şiir',
      description: 'Klasik ve modern şiirin en güzel örnekleri. Türk şiirinin ustalarından dünya şiirinin seçkin eserlerine kadar geniş bir koleksiyon.',
      featuredBooks: [
        { title: 'Safahat', author: 'Mehmet Akif Ersoy', year: '1911' },
        { title: 'Memleketimden İnsan Manzaraları', author: 'Nâzım Hikmet', year: '1966' },
        { title: 'Çile', author: 'Necip Fazıl Kısakürek', year: '1962' },
        { title: 'Divan-ı Kebir', author: 'Mevlana', year: '13. Yüzyıl' }
      ],
      subcategories: ['Türk Şiiri', 'Dünya Şiiri', 'Modern Şiir', 'Klasik Şiir']
    },
    'tarih': {
      title: 'Tarih',
      description: 'Türk ve dünya tarihini anlatan kapsamlı eserler. Antik çağlardan modern döneme kadar tarihin her dönemini kapsayan kitaplar.',
      featuredBooks: [
        { title: 'Osmanlı Tarihi', author: 'Halil İnalcık', year: '2003' },
        { title: 'Türklerin Tarihi', author: 'İlber Ortaylı', year: '2015' },
        { title: 'Sapiens', author: 'Yuval Noah Harari', year: '2011' },
        { title: 'İmparatorluklar Tarihi', author: 'Paul Kennedy', year: '1987' }
      ],
      subcategories: ['Türk Tarihi', 'Dünya Tarihi', 'Askeri Tarih', 'Kültür Tarihi']
    },
    'felsefe': {
      title: 'Felsefe',
      description: 'Felsefi düşünce ve akımları inceleyen eserler. Antik Yunan\'dan modern felsefeye kadar geniş bir yelpaze.',
      featuredBooks: [
        { title: 'Sofinin Dünyası', author: 'Jostein Gaarder', year: '1991' },
        { title: 'Felsefenin Temel İlkeleri', author: 'Georges Politzer', year: '1946' },
        { title: 'Devlet', author: 'Platon', year: 'MÖ 380' },
        { title: 'Böyle Buyurdu Zerdüşt', author: 'Friedrich Nietzsche', year: '1883' }
      ],
      subcategories: ['Antik Felsefe', 'Modern Felsefe', 'Din Felsefesi', 'Siyaset Felsefesi']
    },
    'bilim': {
      title: 'Bilim',
      description: 'Popüler bilim ve akademik eserler. Fizikten biyolojiye, astronomiden matematiğe kadar bilimin her alanı.',
      featuredBooks: [
        { title: 'Kozmos', author: 'Carl Sagan', year: '1980' },
        { title: 'Kısa Bilim Tarihi', author: 'Stephen Hawking', year: '2001' },
        { title: 'İnsan Vücuduna Seyahat', author: 'Bill Bryson', year: '2019' },
        { title: 'Matematik ve Doğa', author: 'Ian Stewart', year: '1995' }
      ],
      subcategories: ['Popüler Bilim', 'Akademik', 'Doğa Bilimleri', 'Sosyal Bilimler']
    },
    'sanat': {
      title: 'Sanat',
      description: 'Görsel sanatlar, müzik ve sinema kitapları. Sanatın her dalını kapsayan geniş bir koleksiyon.',
      featuredBooks: [
        { title: 'Sanatın Öyküsü', author: 'Ernst Gombrich', year: '1950' },
        { title: 'Müziğin ABC\'si', author: 'İlhan Mimaroğlu', year: '1990' },
        { title: 'Sinema Sanatı', author: 'David Bordwell', year: '2010' },
        { title: 'Modern Sanatın Öyküsü', author: 'Norbert Lynton', year: '1980' }
      ],
      subcategories: ['Görsel Sanatlar', 'Müzik', 'Sinema', 'Mimari']
    },
    'cocuk-kitaplari': {
      title: 'Çocuk Kitapları',
      description: 'Her yaş grubu için çocuk kitapları. Eğitici ve eğlenceli içeriklerle çocukların gelişimine katkı sağlayan eserler.',
      featuredBooks: [
        { title: 'Küçük Prens', author: 'Antoine de Saint-Exupéry', year: '1943' },
        { title: 'Şeker Portakalı', author: 'José Mauro de Vasconcelos', year: '1968' },
        { title: 'Charlie\'nin Çikolata Fabrikası', author: 'Roald Dahl', year: '1964' },
        { title: 'Pinokyo', author: 'Carlo Collodi', year: '1883' }
      ],
      subcategories: ['Okul Öncesi', 'İlk Okuma', 'Orta Okul', 'Gençlik']
    },
    'polisiye': {
      title: 'Polisiye',
      description: 'Gizem ve suç romanları. Gerilim dolu hikayeler ve çözülmesi gereken vakalar.',
      featuredBooks: [
        { title: 'Sherlock Holmes Serisi', author: 'Arthur Conan Doyle', year: '1887' },
        { title: 'Suç ve Ceza', author: 'Fyodor Dostoyevski', year: '1866' },
        { title: 'Da Vinci Şifresi', author: 'Dan Brown', year: '2003' },
        { title: 'Agatha Christie Serisi', author: 'Agatha Christie', year: '1920' }
      ],
      subcategories: ['Dedektif', 'Gerilim', 'Psikolojik', 'Suç']
    },
    'fantastik': {
      title: 'Fantastik',
      description: 'Bilim kurgu ve fantastik edebiyat. Hayal gücünün sınırlarını zorlayan eserler.',
      featuredBooks: [
        { title: 'Yüzüklerin Efendisi', author: 'J.R.R. Tolkien', year: '1954' },
        { title: 'Dune', author: 'Frank Herbert', year: '1965' },
        { title: 'Harry Potter Serisi', author: 'J.K. Rowling', year: '1997' },
        { title: '1984', author: 'George Orwell', year: '1949' }
      ],
      subcategories: ['Bilim Kurgu', 'Fantastik', 'Distopik', 'Macera']
    },
    'kisisel-gelisim': {
      title: 'Kişisel Gelişim',
      description: 'Kişisel gelişim ve psikoloji kitapları. Kendini geliştirmek isteyenler için rehber niteliğinde eserler.',
      featuredBooks: [
        { title: 'İkigai', author: 'Héctor García', year: '2016' },
        { title: 'Atomik Alışkanlıklar', author: 'James Clear', year: '2018' },
        { title: 'Düşün ve Zengin Ol', author: 'Napoleon Hill', year: '1937' },
        { title: 'Etkili İnsanların 7 Alışkanlığı', author: 'Stephen Covey', year: '1989' }
      ],
      subcategories: ['Psikoloji', 'Liderlik', 'Motivasyon', 'Başarı']
    },
    'din-ve-tasavvuf': {
      title: 'Din ve Tasavvuf',
      description: 'Dini eserler ve tasavvuf kitapları. İnanç ve maneviyat üzerine yazılmış önemli eserler.',
      featuredBooks: [
        { title: 'Mesnevi', author: 'Mevlana', year: '13. Yüzyıl' },
        { title: 'Füsusü\'l-Hikem', author: 'İbn Arabi', year: '13. Yüzyıl' },
        { title: 'İhya-u Ulumiddin', author: 'İmam Gazali', year: '11. Yüzyıl' },
        { title: 'Risale-i Nur', author: 'Bediüzzaman Said Nursi', year: '20. Yüzyıl' }
      ],
      subcategories: ['İslam', 'Tasavvuf', 'Dinler Tarihi', 'Felsefe']
    },
    'antika-kitaplar': {
      title: 'Antika Kitaplar',
      description: 'Nadide ve antika kitap koleksiyonu. Tarihi değeri olan, koleksiyonerler için özel eserler.',
      featuredBooks: [
        { title: 'Divan-ı Hikmet', author: 'Ahmet Yesevi', year: '12. Yüzyıl' },
        { title: 'Kutadgu Bilig', author: 'Yusuf Has Hacib', year: '11. Yüzyıl' },
        { title: 'Dede Korkut Hikayeleri', author: 'Anonim', year: '15. Yüzyıl' },
        { title: 'Seyahatname', author: 'Evliya Çelebi', year: '17. Yüzyıl' }
      ],
      subcategories: ['Nadide Eserler', 'El Yazmaları', 'İlk Baskılar', 'Koleksiyon']
    }
  };

  const category = categoryDetails[categoryName];

  if (!category) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Kategori Bulunamadı</h1>
        <Link to="/kategoriler" className="text-blue-600 hover:text-blue-800">
          Kategorilere Dön
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{category.title}</h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          {category.description}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Öne Çıkan Kitaplar */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-blue-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Öne Çıkan Kitaplar</h2>
          <div className="space-y-4">
            {category.featuredBooks.map((book, index) => (
              <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                <h3 className="font-medium text-gray-900">{book.title}</h3>
                <p className="text-sm text-gray-600">
                  {book.author} • {book.year}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Alt Kategoriler */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-blue-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Alt Kategoriler</h2>
          <div className="grid grid-cols-2 gap-4">
            {category.subcategories.map((subcat, index) => (
              <div key={index} className="bg-blue-50 rounded-lg p-4 text-center">
                <span className="text-blue-700 font-medium">{subcat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center mt-8">
        <Link
          to="/kategoriler"
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Tüm Kategorilere Dön
        </Link>
      </div>
    </div>
  );
};

export default CategoryDetail; 