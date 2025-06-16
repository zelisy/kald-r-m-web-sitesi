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
  const [blogPosts, setBlogPosts] = useState([]);
  const [blogFormData, setBlogFormData] = useState({
    title: '',
    author: '',
    excerpt: '',
    content: '',
    readTime: '',
    date: new Date().toISOString().split('T')[0]
  });
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

  const handleBlogSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      id: Date.now(),
      ...blogFormData,
      date: new Date().toLocaleDateString('tr-TR')
    };
    setBlogPosts([...blogPosts, newPost]);
    setBlogFormData({
      title: '',
      author: '',
      excerpt: '',
      content: '',
      readTime: '',
      date: new Date().toISOString().split('T')[0]
    });
  };

  const handleBlogDelete = (postId) => {
    setBlogPosts(blogPosts.filter(post => post.id !== postId));
  };

  const handleBlogEdit = (post) => {
    setBlogFormData(post);
  };

  const handleBlogChange = (e) => {
    const { name, value } = e.target;
    setBlogFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Kitap formu içindeki kategori seçimi kısmını güncelle
  const renderBookForm = () => (
    <div className="space-y-6">
      {/* ... other form fields ... */}
      
      <div className="relative">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
          Kategori
        </label>
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
                  <span>{formData.category}</span>
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
        <p className="mt-2 text-sm text-gray-500">
          Mevcut kategorilerden birini seçin
        </p>
      </div>

      {/* ... other form fields ... */}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Yönetici Paneli</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          Çıkış Yap
        </button>
      </div>

      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('books')}
              className={`${
                activeTab === 'books'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Kitaplar
            </button>
            <button
              onClick={() => setActiveTab('blog')}
              className={`${
                activeTab === 'blog'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Köşe Yazıları
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`${
                activeTab === 'messages'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm relative`}
            >
              Mesajlar
              {messages.filter(msg => msg.status === 'unread').length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {messages.filter(msg => msg.status === 'unread').length}
                </span>
              )}
            </button>
          </nav>
        </div>
      </div>

      {activeTab === 'books' && (
        <div className="space-y-8">
          {/* Kitap Ekleme/Düzenleme Formu */}
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
          <div className="bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold p-6 border-b">Kitap Listesi</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kitap Adı</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Yazar</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fiyat</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Yayın Yılı</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Yayınevi</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {books.map((book) => (
                    <tr key={book.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{book.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{book.author}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{book.price} TL</td>
                      <td className="px-6 py-4 whitespace-nowrap">{book.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{book.publishYear || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{book.publisher || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
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

      {activeTab === 'blog' && (
        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {blogFormData.id ? 'Köşe Yazısını Düzenle' : 'Yeni Köşe Yazısı Ekle'}
            </h2>
            <form onSubmit={handleBlogSubmit} className="space-y-4">
              <div>
                <label htmlFor="blogTitle" className="block text-sm font-medium text-gray-700">
                  Başlık
                </label>
                <input
                  type="text"
                  id="blogTitle"
                  name="title"
                  value={blogFormData.title}
                  onChange={handleBlogChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="blogAuthor" className="block text-sm font-medium text-gray-700">
                  Yazar
                </label>
                <input
                  type="text"
                  id="blogAuthor"
                  name="author"
                  value={blogFormData.author}
                  onChange={handleBlogChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="blogExcerpt" className="block text-sm font-medium text-gray-700">
                  Özet
                </label>
                <textarea
                  id="blogExcerpt"
                  name="excerpt"
                  value={blogFormData.excerpt}
                  onChange={handleBlogChange}
                  required
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="blogContent" className="block text-sm font-medium text-gray-700">
                  İçerik
                </label>
                <textarea
                  id="blogContent"
                  name="content"
                  value={blogFormData.content}
                  onChange={handleBlogChange}
                  required
                  rows={6}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="blogReadTime" className="block text-sm font-medium text-gray-700">
                  Okuma Süresi (dakika)
                </label>
                <input
                  type="number"
                  id="blogReadTime"
                  name="readTime"
                  value={blogFormData.readTime}
                  onChange={handleBlogChange}
                  required
                  min="1"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="blogDate" className="block text-sm font-medium text-gray-700">
                  Tarih
                </label>
                <input
                  type="date"
                  id="blogDate"
                  name="date"
                  value={blogFormData.date}
                  onChange={handleBlogChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end space-x-4">
                {blogFormData.id && (
                  <button
                    type="button"
                    onClick={() => {
                      setBlogFormData({
                        title: '',
                        author: '',
                        excerpt: '',
                        content: '',
                        readTime: '',
                        date: new Date().toISOString().split('T')[0]
                      });
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    İptal
                  </button>
                )}
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {blogFormData.id ? 'Güncelle' : 'Ekle'}
                </button>
              </div>
            </form>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Köşe Yazıları Listesi</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Başlık</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Yazar</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tarih</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Okuma Süresi</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {blogPosts.map((post) => (
                    <tr key={post.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{post.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.author}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(post.date).toLocaleDateString('tr-TR')}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.readTime} dk</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleBlogEdit(post)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          Düzenle
                        </button>
                        <button
                          onClick={() => handleBlogDelete(post.id)}
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

      {activeTab === 'messages' && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Gelen Mesajlar</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tür</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gönderen</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Konu</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tarih</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {messages.map((message) => (
                  <tr 
                    key={message.id}
                    className={`cursor-pointer hover:bg-gray-50 ${
                      message.status === 'unread' ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => handleMessageClick(message)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        message.status === 'unread' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {message.status === 'unread' ? 'Yeni' : 'Okundu'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        message.type === 'complaint' 
                          ? 'bg-red-100 text-red-800'
                          : message.type === 'suggestion'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {message.type === 'complaint' ? 'Şikayet' : 
                         message.type === 'suggestion' ? 'Öneri' : 'Talep'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="font-medium text-gray-900">{message.name}</div>
                        <div className="text-sm text-gray-500">{message.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {message.subject}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {message.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteMessage(message.id);
                        }}
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
      )}

      {/* Mesaj Detay Modalı */}
      {showMessageModal && selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedMessage.subject}</h2>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{selectedMessage.name}</span>
                    <span>•</span>
                    <span>{selectedMessage.email}</span>
                    <span>•</span>
                    <span>{selectedMessage.date}</span>
                  </div>
                  <div className="mt-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      selectedMessage.type === 'complaint' 
                        ? 'bg-red-100 text-red-800'
                        : selectedMessage.type === 'suggestion'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {selectedMessage.type === 'complaint' ? 'Şikayet' : 
                       selectedMessage.type === 'suggestion' ? 'Öneri' : 'Talep'}
                    </span>
                  </div>
                </div>
                <button
                  onClick={closeMessageModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="prose max-w-none">
                <p className="text-gray-600 whitespace-pre-line">{selectedMessage.message}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel; 