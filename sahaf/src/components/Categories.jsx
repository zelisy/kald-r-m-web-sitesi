import React, { useState, useEffect } from 'react';

const Categories = () => {
  const [books, setBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);

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

  // Kitapları ve kategorileri yükle
  useEffect(() => {
    const loadBooks = () => {
      const savedBooks = JSON.parse(localStorage.getItem('books') || '[]');
      setBooks(savedBooks);
    };

    loadBooks();
    // localStorage değişikliklerini dinle
    window.addEventListener('storage', loadBooks);
    // Sayfa yüklendiğinde ve her 5 saniyede bir kontrol et
    const interval = setInterval(loadBooks, 5000);
    
    return () => {
      window.removeEventListener('storage', loadBooks);
      clearInterval(interval);
    };
  }, []);

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

  // Kategori kartı bileşeni
  const CategoryCard = ({ category }) => {
    const handleCategoryClick = () => {
      if (category.count > 0) {
        setSelectedCategory(selectedCategory?.name === category.name ? null : category);
      }
    };

    return (
      <button
        onClick={handleCategoryClick}
        className={`flex items-center justify-between p-4 rounded-lg transition-all duration-200 ${
          selectedCategory?.name === category.name
            ? 'bg-blue-100 border-2 border-blue-500 scale-105'
            : category.count > 0
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
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          selectedCategory?.name === category.name
            ? 'bg-blue-100 text-blue-800'
            : category.count > 0
              ? 'bg-gray-100 text-gray-800'
              : 'bg-gray-200 text-gray-500'
        }`}>
          {category.count}
        </span>
      </button>
    );
  };

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

        {/* Seçili Kategori Kitapları */}
        {selectedCategory && selectedCategory.count > 0 && (
          <div className="mt-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{selectedCategory.icon}</span>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedCategory.name}</h2>
                    <p className="text-sm text-gray-500">{selectedCategory.count} kitap</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

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
        )}
      </div>

      {/* Kitap Detay Modalı */}
      {selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    {defaultCategories[selectedBook.category]} {selectedBook.title}
                  </h2>
                  <p className="text-gray-600 mt-1">{selectedBook.author}</p>
                </div>
                <button
                  onClick={() => setSelectedBook(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Yayınevi</p>
                    <p className="font-medium">{selectedBook.publisher}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Basım Yılı</p>
                    <p className="font-medium">{selectedBook.publicationYear}</p>
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
                </div>

                {selectedBook.pageCount && (
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Sayfa Sayısı</p>
                    <p className="font-medium">{selectedBook.pageCount} sayfa</p>
                  </div>
                )}

                {selectedBook.language && (
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Dil</p>
                    <p className="font-medium">{selectedBook.language}</p>
                  </div>
                )}

                {selectedBook.isbn && (
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">ISBN</p>
                    <p className="font-medium">{selectedBook.isbn}</p>
                  </div>
                )}

                {selectedBook.price && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-500">Fiyat</p>
                    <p className="text-2xl font-bold text-blue-600">{selectedBook.price} TL</p>
                  </div>
                )}

                {selectedBook.description && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-500 mb-2">Açıklama</p>
                    <p className="text-gray-700 whitespace-pre-line">{selectedBook.description}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories; 