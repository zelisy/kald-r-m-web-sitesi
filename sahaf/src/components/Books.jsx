import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('tümü');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'books'));
      const booksList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBooks(booksList);
      setLoading(false);
    } catch (error) {
      console.error('Kitaplar yüklenirken hata oluştu:', error);
      setError('Kitaplar yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
      setLoading(false);
    }
  };

  // Kategorileri kitaplardan çıkar
  const categories = ['tümü', ...new Set(books.map(book => book.category))];

  // Kitapları filtrele
  const filteredBooks = books.filter(book => {
    const matchesCategory = selectedCategory === 'tümü' || book.category === selectedCategory;
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedBook(null);
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"></div>
        <p className="mt-4 text-gray-600">Kitaplar yükleniyor...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Kitaplarımız</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Kaldırım Sahaf'ta bulabileceğiniz özenle seçilmiş kitaplarımızı keşfedin.
        </p>
      </div>

      {/* Filtreler */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Kitap veya yazar ara..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full md:w-48">
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Kitap Detay Modalı */}
      {showModal && selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              {selectedBook.imageUrl ? (
                <img
                  src={selectedBook.imageUrl}
                  alt={selectedBook.title}
                  className="w-full h-64 object-cover rounded-t-xl"
                />
              ) : (
                <div className="w-full h-64 bg-gray-100 flex items-center justify-center rounded-t-xl">
                  <span className="text-gray-400">Kapak görseli yok</span>
                </div>
              )}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedBook.title}</h2>
                  <p className="text-gray-600 font-medium">Yazar: {selectedBook.author}</p>
                </div>
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {selectedBook.category}
                </span>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Yayın Yılı</p>
                    <p className="font-medium">{selectedBook.publishYear || 'Belirtilmemiş'}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Yayınevi</p>
                    <p className="font-medium">{selectedBook.publisher || 'Belirtilmemiş'}</p>
                  </div>
                </div>

                <div>
                  <p className="text-gray-500 mb-2">Açıklama</p>
                  <p className="text-gray-700">{selectedBook.description}</p>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <p className="text-2xl font-bold text-blue-600">
                    {new Intl.NumberFormat('tr-TR', {
                      style: 'currency',
                      currency: 'TRY',
                      minimumFractionDigits: 2
                    }).format(selectedBook.price)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Kitaplar Listesi */}
      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBooks.map((book) => (
            <div 
              key={book.id} 
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-blue-100"
            >
              <div className="relative">
                {book.imageUrl ? (
                  <img
                    src={book.imageUrl}
                    alt={book.title}
                    className="w-full h-56 object-cover"
                  />
                ) : (
                  <div className="w-full h-56 bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-400">Kapak görseli yok</span>
                  </div>
                )}
                <div className="absolute top-4 right-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {book.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{book.title}</h2>
                <p className="text-gray-600 mb-3 font-medium">Yazar: {book.author}</p>
                <p className="text-gray-600 mb-4 line-clamp-3">{book.description}</p>
                
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <span className="text-2xl font-bold text-blue-600">
                    {new Intl.NumberFormat('tr-TR', {
                      style: 'currency',
                      currency: 'TRY',
                      minimumFractionDigits: 2
                    }).format(book.price)}
                  </span>
                  <button 
                    onClick={() => handleBookClick(book)}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium 
                             hover:bg-blue-700 transform hover:-translate-y-0.5 transition-all duration-200
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Detaylar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <svg 
            className="mx-auto h-12 w-12 text-gray-400" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
          <p className="mt-4 text-gray-600 text-lg">Aradığınız kriterlere uygun kitap bulunamadı.</p>
          <button 
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('tümü');
            }}
            className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
          >
            Tüm kitapları göster
          </button>
        </div>
      )}
    </div>
  );
};

export default Books; 