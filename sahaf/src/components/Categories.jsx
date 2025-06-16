import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const Categories = () => {
  const [books, setBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  // Varsayılan kategoriler ve simgeleri
  const defaultCategories = {
    'Roman': '📚',
    'Şiir': '✒️',
    'Tarih': '📜',
    'Felsefe': '🤔',
    'Bilim': '🔬',
    'Sanat': '🎨',
    'Çocuk Kitapları': '🧸',
    'Polisiye': '🔍',
    'Fantastik': '✨',
    'Kişisel Gelişim': '🌱',
    'Din ve Tasavvuf': '🕌',
    'Antika Kitaplar': '📖',
    'Biyografi': '👤',
    'Gezi': '✈️',
    'Mizah': '😄',
    'Edebiyat': '📝',
    'Psikoloji': '🧠',
    'Ekonomi': '💰',
    'Sağlık': '💊',
    'Spor': '⚽',
    'Yemek': '🍳',
    'Teknoloji': '💻',
    'Hobi': '🎯',
    'Diğer': '📚'
  };

  // Kitapları Firebase'den ve localStorage'dan yükle
  useEffect(() => {
    const loadBooks = async () => {
      try {
        // Firebase'den kitapları çek
        const querySnapshot = await getDocs(collection(db, 'books'));
        const firebaseBooks = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // localStorage'dan kitapları çek
        const localBooks = JSON.parse(localStorage.getItem('books') || '[]');

        // Her iki kaynaktan gelen kitapları birleştir ve tekrar edenleri kaldır
        const allBooks = [...firebaseBooks, ...localBooks];
        const uniqueBooks = Array.from(new Map(allBooks.map(book => [book.id, book])).values());
        
        setBooks(uniqueBooks);
      } catch (error) {
        console.error('Kitaplar yüklenirken hata oluştu:', error);
      }
    };

    loadBooks();
    // localStorage değişikliklerini dinle
    window.addEventListener('storage', loadBooks);
    // Her 5 saniyede bir güncelle
    const interval = setInterval(loadBooks, 5000);
    
    return () => {
      window.removeEventListener('storage', loadBooks);
      clearInterval(interval);
    };
  }, []);

  // URL'deki kategori parametresini kontrol et
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl && defaultCategories[categoryFromUrl]) {
      const category = {
        name: categoryFromUrl,
        icon: defaultCategories[categoryFromUrl],
        count: books.filter(book => book.category === categoryFromUrl).length
      };
      setSelectedCategory(category);
    }
  }, [searchParams, books]);

  // Kategorileri ve kitap sayılarını hesapla
  const categories = Object.keys(defaultCategories)
    .map(category => ({
      name: category,
      icon: defaultCategories[category],
      count: books.filter(book => book.category === category).length
    }))
    .sort((a, b) => b.count - a.count); // Kitap sayısına göre sırala

  // Seçili kategoriye göre kitapları filtrele
  const filteredBooks = selectedCategory
    ? books.filter(book => book.category === selectedCategory.name)
    : [];

  // Kategori seçimini güncelle
  const handleCategorySelect = (category) => {
    if (category.count > 0) {
      setSelectedCategory(category);
      setShowCategoryModal(true);
    }
  };

  // Kategori kartı bileşeni
  const CategoryCard = ({ category }) => (
    <button
      onClick={() => handleCategorySelect(category)}
      className={`flex items-center justify-between p-4 rounded-lg transition-all duration-200 ${
        category.count > 0
          ? 'bg-white hover:bg-gray-50 border border-gray-200 hover:border-blue-300'
          : 'bg-gray-50 border border-gray-200 opacity-75 cursor-not-allowed'
      }`}
      disabled={category.count === 0}
    >
      <div className="flex items-center space-x-4">
        <span className="text-3xl">{category.icon}</span>
        <div className="text-left">
          <h3 className="font-medium text-gray-900">{category.name}</h3>
          <p className="text-sm text-gray-500">
            {category.count === 0 
              ? 'Henüz kitap yok' 
              : `${category.count} kitap`}
          </p>
        </div>
      </div>
      {category.count > 0 && (
        <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
          {category.count}
        </span>
      )}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-2xl font-bold text-gray-900">Kategoriler</h1>
            <p className="mt-1 text-sm text-gray-500">
              Tüm kategorileri keşfedin ve kitapları inceleyin
            </p>
          </div>
        </div>
      </div>

      {/* Ana İçerik */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Kategori Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {categories.map((category) => (
            <CategoryCard key={category.name} category={category} />
          ))}
        </div>

        {/* Kategori Modal */}
        {showCategoryModal && selectedCategory && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{selectedCategory.icon}</span>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{selectedCategory.name}</h2>
                      <p className="text-sm text-gray-500">{selectedCategory.count} kitap</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setShowCategoryModal(false);
                      setSelectedCategory(null);
                    }}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="p-6 overflow-y-auto max-h-[calc(90vh-8rem)]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredBooks.map((book) => (
                    <div
                      key={book.id}
                      onClick={() => setSelectedBook(book)}
                      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">{book.title}</h3>
                          <p className="text-sm text-gray-500 mt-1">{book.author}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          book.condition === 'Yeni' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {book.condition}
                        </span>
                      </div>
                      {book.price && (
                        <p className="text-lg font-bold text-blue-600 mt-2">{book.price} TL</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Kitap Detay Modalı */}
        {selectedBook && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedBook.title}</h2>
                  <button
                    onClick={() => setSelectedBook(null)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">Yazar</p>
                      <p className="font-medium">{selectedBook.author}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">Kategori</p>
                      <p className="font-medium flex items-center gap-1">
                        {defaultCategories[selectedBook.category]} {selectedBook.category}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">Durum</p>
                      <p className={`font-medium ${
                        selectedBook.condition === 'Yeni' ? 'text-green-600' : 'text-yellow-600'
                      }`}>
                        {selectedBook.condition}
                      </p>
                    </div>
                    {selectedBook.price && (
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-500">Fiyat</p>
                        <p className="font-medium text-blue-600">{selectedBook.price} TL</p>
                      </div>
                    )}
                  </div>

                  {selectedBook.description && (
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">Açıklama</p>
                      <p className="font-medium">{selectedBook.description}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories; 