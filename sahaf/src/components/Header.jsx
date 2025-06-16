import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo ve Site Adı */}
          <div className="flex-shrink-0 flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <img 
                  src="/logo 2.jpg" 
                  alt="Kaldırım Sahaf Logo 2" 
                  className="h-12 w-12 object-cover rounded-full border-2 border-blue-100"
                />
              </div>
              <span className="text-2xl font-bold text-blue-900 hover:text-blue-700 transition-colors duration-200">
                Kaldırım Sahaf
              </span>
            </Link>
          </div>

          {/* Navigasyon */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/kitaplarimiz" className="text-blue-700 hover:text-blue-900 text-sm font-medium transition-colors duration-200">
              Kitaplarımız
            </Link>
            <Link to="/kategoriler" className="text-blue-700 hover:text-blue-900 text-sm font-medium transition-colors duration-200">
              Kategoriler
            </Link>
            <Link to="/yazarlar" className="text-blue-700 hover:text-blue-900 text-sm font-medium transition-colors duration-200">
              Yazarlar
            </Link>
            <Link to="/kose-yazilari" className="text-blue-700 hover:text-blue-900 text-sm font-medium transition-colors duration-200">
              Köşe Yazıları
            </Link>
            <Link to="/iletisim" className="text-blue-700 hover:text-blue-900 text-sm font-medium transition-colors duration-200">
              İletişim
            </Link>
            <Link to="/admin" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200">
              Yönetici Girişi
            </Link>
          </nav>

          {/* Mobil menü butonu */}
          <button 
            className="md:hidden p-2 rounded-lg text-blue-700 hover:text-blue-900 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobil menü */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-blue-100 bg-white">
            <nav className="px-2 pt-2 pb-3 space-y-1">
              <Link 
                to="/kitaplarimiz" 
                className="block px-4 py-2.5 rounded-lg text-base font-medium text-blue-700 hover:text-blue-900 hover:bg-blue-50 transition-colors duration-200"
              >
                Kitaplarımız
              </Link>
              <Link 
                to="/kategoriler" 
                className="block px-4 py-2.5 rounded-lg text-base font-medium text-blue-700 hover:text-blue-900 hover:bg-blue-50 transition-colors duration-200"
              >
                Kategoriler
              </Link>
              <Link 
                to="/yazarlar" 
                className="block px-4 py-2.5 rounded-lg text-base font-medium text-blue-700 hover:text-blue-900 hover:bg-blue-50 transition-colors duration-200"
              >
                Yazarlar
              </Link>
              <Link 
                to="/kose-yazilari" 
                className="block px-4 py-2.5 rounded-lg text-base font-medium text-blue-700 hover:text-blue-900 hover:bg-blue-50 transition-colors duration-200"
              >
                Köşe Yazıları
              </Link>
              <Link 
                to="/iletisim" 
                className="block px-4 py-2.5 rounded-lg text-base font-medium text-blue-700 hover:text-blue-900 hover:bg-blue-50 transition-colors duration-200"
              >
                İletişim
              </Link>
              <Link 
                to="/admin" 
                className="block px-4 py-2.5 rounded-lg text-base font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
              >
                Yönetim
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;