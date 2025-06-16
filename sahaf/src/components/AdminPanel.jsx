import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const [books, setBooks] = useState([]);
  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [activeTab, setActiveTab] = useState('books');
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    price: '',
    description: '',
    imageUrl: '',
    category: '',
    publishYear: '',
    publisher: ''
  });
  const [editingBook, setEditingBook] = useState(null);
  const navigate = useNavigate();

  // Varsayılan kategoriler
  const defaultCategories = [
    'Roman',
    'Şiir',
    'Tarih',
    'Felsefe',
    'Bilim',
    'Sanat',
    'Çocuk Kitapları',
    'Polisiye',
    'Fantastik',
    'Kişisel Gelişim',
    'Din ve Tasavvuf',
    'Antika Kitaplar',
    'Biyografi',
    'Gezi',
    'Mizah',
    'Edebiyat',
    'Psikoloji',
    'Ekonomi',
    'Sağlık',
    'Spor',
    'Yemek',
    'Teknoloji',
    'Hobi',
    'Diğer'
  ];

  // Kategori simgeleri
  const defaultCategoryIcons = {
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

  // Mevcut kategorileri al
  const [existingCategories, setExistingCategories] = useState([]);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  useEffect(() => {
    // Kitapları ve kategorileri yükle
    const loadBooks = () => {
      const savedBooks = JSON.parse(localStorage.getItem('books') || '[]');
      
      // Mevcut kitaplardan gelen kategorileri al
      const bookCategories = [...new Set(savedBooks.map(book => book.category))].filter(Boolean);
      
      // Varsayılan kategorileri ve mevcut kategorileri birleştir
      const allCategories = [...new Set([...defaultCategories, ...bookCategories])]
        .map(category => ({
          name: category,
          icon: defaultCategoryIcons[category] || '📚',
          count: savedBooks.filter(book => book.category === category).length
        }))
        .sort((a, b) => a.name.localeCompare(b.name, 'tr')); // Türkçe alfabetik sıralama
      
      setExistingCategories(allCategories);
    };

    loadBooks();
    window.addEventListener('storage', loadBooks);
    return () => window.removeEventListener('storage', loadBooks);
  }, []);

  useEffect(() => {
    fetchBooks();
    // Mesajları localStorage'dan al
    const savedMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    setMessages(savedMessages);
  }, []);

  const fetchBooks = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'books'));
      const booksList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBooks(booksList);
    } catch (error) {
      console.error('Kitaplar yüklenirken hata oluştu:', error);
    }
  };

  const handleMessageClick = (message) => {
    setSelectedMessage(message);
    setShowMessageModal(true);
    
    // Mesajı okundu olarak işaretle
    const updatedMessages = messages.map(msg => 
      msg.id === message.id ? { ...msg, status: 'read' } : msg
    );
    setMessages(updatedMessages);
    localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));
  };

  const handleDeleteMessage = (messageId) => {
    const updatedMessages = messages.filter(msg => msg.id !== messageId);
    setMessages(updatedMessages);
    localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));
    setShowMessageModal(false);
    setSelectedMessage(null);
  };

  const closeMessageModal = () => {
        setShowMessageModal(false);
        setSelectedMessage(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingBook) {
        // Kitap güncelleme
        await updateDoc(doc(db, 'books', editingBook.id), formData);
        setEditingBook(null);
      } else {
        // Yeni kitap ekleme
        await addDoc(collection(db, 'books'), formData);
      }
      setFormData({
        title: '',
        author: '',
        price: '',
        description: '',
        imageUrl: '',
        category: '',
        publishYear: '',
        publisher: ''
      });
      fetchBooks();
    } catch (error) {
      console.error('İşlem sırasında hata oluştu:', error);
    }
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setFormData({
      title: book.title,
      author: book.author,
      price: book.price,
      description: book.description,
      imageUrl: book.imageUrl,
      category: book.category,
      publishYear: book.publishYear || '',
      publisher: book.publisher || ''
    });
  };

  const handleDelete = async (bookId) => {
    if (window.confirm('Bu kitabı silmek istediğinizden emin misiniz?')) {
      try {
        await deleteDoc(doc(db, 'books', bookId));
        fetchBooks();
      } catch (error) {
        console.error('Kitap silinirken hata oluştu:', error);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  // Kitap formu içindeki kategori seçimi kısmını güncelle
  const renderBookForm = () => (
    <div className="relative">
      <button
        type="button"
        onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
        className="w-full flex items-center justify-between px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <div className="flex items-center">
          {formData.category ? (
            <>
              <span className="text-xl mr-2">{defaultCategoryIcons[formData.category] || '📚'}</span>
              <h3 className="font-medium text-gray-900">
                {formData.category}
                {existingCategories.find(c => c.name === formData.category)?.count > 0 && <span className="text-gray-500 ml-1">({existingCategories.find(c => c.name === formData.category)?.count})</span>}
              </h3>
            </>
          ) : (
            <span className="text-gray-500">Kategori Seçin</span>
          )}
        </div>
        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {showCategoryDropdown && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
          {existingCategories.length > 0 ? (
            existingCategories.map((category) => (
              <button
                key={category.name}
                type="button"
                onClick={() => {
                  handleInputChange({ target: { name: 'category', value: category.name } });
                  setShowCategoryDropdown(false);
                }}
                className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                <span className="text-xl mr-2">{category.icon}</span>
                <span className="flex-1">{category.name}</span>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {category.count} kitap
                </span>
              </button>
            ))
          ) : (
            <div className="px-4 py-2 text-sm text-gray-500">
              Henüz kategori bulunmuyor
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Yönetici Paneli</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Çıkış Yap
          </button>
        </div>

        {/* Tab Menüsü */}
        <div className="flex space-x-4 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('books')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'books'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Kitaplar
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`px-4 py-2 font-medium relative ${
              activeTab === 'messages'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Mesajlar
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
        </div>

        {/* Kitaplar Tab */}
        {activeTab === 'books' && (
          <div className="space-y-8">
            {/* Kitap Formu */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h2 className="text-xl font-semibold mb-4">
                {editingBook ? 'Kitap Düzenle' : 'Yeni Kitap Ekle'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Kitap Adı"
                    className="border p-2 rounded"
                    required
                  />
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    placeholder="Yazar"
                    className="border p-2 rounded"
                    required
                  />
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="Fiyat"
                    className="border p-2 rounded"
                    required
                  />
                  {renderBookForm()}
                  <input
                    type="number"
                    name="publishYear"
                    value={formData.publishYear}
                    onChange={handleInputChange}
                    placeholder="Yayın Yılı"
                    className="border p-2 rounded"
                    min="1000"
                    max={new Date().getFullYear()}
                  />
                  <input
                    type="text"
                    name="publisher"
                    value={formData.publisher}
                    onChange={handleInputChange}
                    placeholder="Yayınevi"
                    className="border p-2 rounded"
                  />
                  <input
                    type="text"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                    placeholder="Resim URL"
                    className="border p-2 rounded md:col-span-2"
                    required
                  />
                </div>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Kitap Açıklaması"
                  className="border p-2 rounded w-full"
                  rows="4"
                  required
                />
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    {editingBook ? 'Güncelle' : 'Ekle'}
                  </button>
                  {editingBook && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingBook(null);
                        setFormData({
                          title: '',
                          author: '',
                          price: '',
                          description: '',
                          imageUrl: '',
                          category: '',
                          publishYear: '',
                          publisher: ''
                        });
                      }}
                      className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                      İptal
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Kitaplar Listesi */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">Kitaplar Listesi</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kitap</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Yazar</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fiyat</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {books.map((book) => (
                      <tr key={book.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {book.imageUrl && (
                              <img
                                src={book.imageUrl}
                                alt={book.title}
                                className="h-10 w-10 rounded object-cover mr-3"
                              />
                            )}
                            <div className="text-sm font-medium text-gray-900">{book.title}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.author}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.category}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.price} TL</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleEdit(book)}
                            className="text-blue-600 hover:text-blue-900 mr-4"
                          >
                            Düzenle
                          </button>
                          <button
                            onClick={() => handleDelete(book.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Sil
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Mesajlar Tab */}
        {activeTab === 'messages' && (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">İletişim Mesajları</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {messages.length > 0 ? (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`p-6 cursor-pointer hover:bg-gray-50 transition-colors ${
                        message.status === 'unread' ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => handleMessageClick(message)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{message.name}</h3>
                          <p className="text-sm text-gray-500 mt-1">{message.email}</p>
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(message.date).toLocaleDateString('tr-TR')}
                        </span>
                      </div>
                      <p className="mt-2 text-gray-600 line-clamp-2">{message.message}</p>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-gray-500">
                    Henüz mesaj bulunmuyor.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Mesaj Detay Modalı */}
        {showMessageModal && selectedMessage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">{selectedMessage.name}</h2>
                    <p className="text-gray-600">{selectedMessage.email}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleDeleteMessage(selectedMessage.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Sil
                    </button>
                    <button
                      onClick={closeMessageModal}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-gray-600 whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>
                <div className="mt-4 text-sm text-gray-500">
                  {new Date(selectedMessage.date).toLocaleString('tr-TR')}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel; 