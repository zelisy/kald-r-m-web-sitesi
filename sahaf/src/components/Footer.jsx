import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white w-full mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          {/* İletişim Bilgileri */}
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            <div className="flex items-center space-x-2">
              <svg className="h-4 w-4 text-blue-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-blue-200 text-sm">Adilhan Kitapçılar Çarşısı No:6/45 Kızılay/Ankara</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="h-4 w-4 text-blue-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-blue-200 text-sm">0507 857 2935</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="h-4 w-4 text-blue-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-blue-200 text-sm">aussymann06@gmail.com</span>
            </div>
          </div>

          {/* Alt Footer */}
          <div className="flex items-center space-x-6 text-sm">
            <p className="text-blue-300">
              &copy; {new Date().getFullYear()} Kaldırım Sahaf
            </p>
            <a href="#" className="text-blue-300 hover:text-white transition-colors duration-200">
              Gizlilik Politikası
            </a>
            <a href="#" className="text-blue-300 hover:text-white transition-colors duration-200">
              Kullanım Şartları
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 