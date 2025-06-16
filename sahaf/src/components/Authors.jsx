import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const Authors = () => {
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'books'));
        const books = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // Yazar bilgilerini kitaplardan çıkar ve grupla
        const authorMap = books.reduce((acc, book) => {
          if (!book.author) return acc;
          
          if (!acc[book.author]) {
            acc[book.author] = {
              id: book.author.toLowerCase().replace(/\s+/g, '-'),
              name: book.author,
              books: [],
              description: `${book.author}, Kaldırım Sahaf'ta eserleri bulunan değerli bir yazardır.`,
              genre: book.category || 'Genel',
              birthYear: null,
              deathYear: null
            };
          }
          
          acc[book.author].books.push(book.title);
          return acc;
        }, {});

        // Yazar listesini oluştur ve kitapları benzersiz yap
        const authorsList = Object.values(authorMap).map(author => ({
          ...author,
          books: [...new Set(author.books)] // Tekrar eden kitapları kaldır
        }));

        setAuthors(authorsList);
        setLoading(false);
      } catch (error) {
        console.error('Yazarlar yüklenirken hata oluştu:', error);
        setLoading(false);
      }
    };

    fetchAuthors();
  }, []);

  const handleAuthorClick = (author) => {
    setSelectedAuthor(author);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedAuthor(null);
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"></div>
        <p className="mt-4 text-gray-600">Yazarlar yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Yazarlarımız</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Kaldırım Sahaf'ta bulabileceğiniz Türk ve dünya edebiyatının önde gelen yazarlarını keşfedin.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {authors.length > 0 ? (
          authors.map((author) => (
            <div
              key={author.id}
              className="bg-white rounded-lg shadow-sm p-6 border border-blue-100 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleAuthorClick(author)}
            >
              <div className="flex flex-col">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{author.name}</h2>
                <p className="text-gray-600 mb-4">{author.description}</p>
                <div className="w-full">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Eserleri:</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {author.books.slice(0, 3).map((book, index) => (
                      <li key={index} className="text-sm">{book}</li>
                    ))}
                    {author.books.length > 3 && (
                      <li className="text-sm text-blue-600">ve {author.books.length - 3} eser daha...</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg">Henüz yazar bulunmuyor.</p>
          </div>
        )}
      </div>

      {/* Yazar Detay Modalı */}
      {showModal && selectedAuthor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{selectedAuthor.name}</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Hakkında</h3>
                  <p className="text-gray-600">{selectedAuthor.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Eserleri</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedAuthor.books.map((book, index) => (
                      <li key={index} className="text-gray-600 bg-gray-50 p-2 rounded">
                        {book}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Kategori</h3>
                  <p className="text-gray-600">{selectedAuthor.genre}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Authors; 