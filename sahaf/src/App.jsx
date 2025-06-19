import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Categories from './components/Categories';
import CategoryDetail from './components/CategoryDetail';
import Authors from './components/Authors';
import BlogPosts from './components/BlogPosts';
import Contact from './components/Contact';
import AdminPanel from './components/AdminPanel';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Books from './components/Books';
import './App.css';
import { useState } from 'react';

const sliderImages = [
  '/kaldırım-dükkan.jpg',
  '/adilhan.jpeg',
  '/oku-getir.jpg',
];

function ImageSlider() {
  const [current, setCurrent] = useState(0);
  const length = sliderImages.length;

  const nextSlide = () => setCurrent((prev) => (prev + 1) % length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + length) % length);

  return (
    <div className="relative w-full max-w-md mx-auto">
      <button onClick={prevSlide} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 shadow hover:bg-opacity-100 z-10">
        <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
      </button>
      <img
        src={sliderImages[current]}
        alt={`Slider ${current + 1}`}
        className="w-full h-80 object-cover rounded-lg shadow-lg"
        style={{ maxHeight: '400px' }}
      />
      <button onClick={nextSlide} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 shadow hover:bg-opacity-100 z-10">
        <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      </button>
      <div className="flex justify-center mt-2 space-x-2">
        {sliderImages.map((_, idx) => (
          <span key={idx} className={`inline-block w-2 h-2 rounded-full ${idx === current ? 'bg-blue-700' : 'bg-blue-200'}`}></span>
        ))}
      </div>
    </div>
  );
}

const HomePage = () => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative py-16 bg-blue-50 rounded-xl overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Kaldırım Sahaf'a Hoş Geldiniz</h1>
              <p className="text-lg text-gray-800">
                Kitap tutkunları için özenle seçilmiş eserler ve nadide kitaplar sunan sahaf dükkanımızda sizleri bekliyoruz.
              </p>
            </div>
            <div className="flex justify-center md:justify-end">
              <ImageSlider />
            </div>
          </div>
        </div>
      </section>

      {/* Hakkımızda Section */}
      <section className="bg-blue-50 py-12 rounded-xl">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Hakkımızda</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <p className="text-gray-800 leading-relaxed">
                Kaldırım Sahaf, 2024 yılında kitap tutkunları tarafından kurulmuş, geleneksel sahaf kültürünü modern bir yaklaşımla buluşturan bir kitapçıdır.
              </p>
              <p className="text-gray-800 leading-relaxed">
                Amacımız, okuyucularımıza sadece kitaplar değil, aynı zamanda bir kültür ve bilgi merkezi sunmaktır. Nadide eserlerden güncel yayınlara, her türlü kitabı bulabileceğiniz dükkanımızda, kitap sohbetleri ve imza günleri gibi etkinliklerle de okuyucularımızla buluşuyoruz.
              </p>
              <p className="text-gray-800 leading-relaxed">
                Kaldırım Sahaf olarak, her kitabın bir hikayesi olduğuna inanıyor ve bu hikayeleri sizlerle paylaşmak için sabırsızlanıyoruz.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-blue-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Neden Biz?</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <svg className="h-6 w-6 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-800">Geniş kitap koleksiyonu</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="h-6 w-6 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-800">Nadide ve ikinci el kitaplar</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="h-6 w-6 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-800">Kitap etkinlikleri ve imza günleri</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="h-6 w-6 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-800">Uzman personel desteği</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-blue-50">
        <Header />
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-blue-100">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/kitaplarimiz" element={<Books />} />
              <Route path="/kategoriler" element={<Categories />} />
              <Route path="/kategoriler/:categoryName" element={<Categories />} />
              <Route path="/yazarlar" element={<Authors />} />
              <Route path="/kose-yazilari" element={<BlogPosts />} />
              <Route path="/iletisim" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute>
                    <AdminPanel />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
