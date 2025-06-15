import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

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
    category: ''
  });
  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    fetchBooks();
    // Mesajları gerçek zamanlı dinle
    const messagesQuery = query(collection(db, 'messages'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const messagesList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate()
      }));
      setMessages(messagesList);
      setUnreadCount(messagesList.filter(msg => msg.status === 'unread').length);
    });

    return () => unsubscribe();
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

  const handleMessageClick = async (message) => {
    setSelectedMessage(message);
    setShowMessageModal(true);
    
    // Mesajı okundu olarak işaretle
    if (message.status === 'unread') {
      try {
        await updateDoc(doc(db, 'messages', message.id), {
          status: 'read'
        });
      } catch (error) {
        console.error('Mesaj durumu güncellenirken hata oluştu:', error);
      }
    }
  };

  const handleDeleteMessage = async (messageId) => {
    if (window.confirm('Bu mesajı silmek istediğinizden emin misiniz?')) {
      try {
        await deleteDoc(doc(db, 'messages', messageId));
        setShowMessageModal(false);
        setSelectedMessage(null);
      } catch (error) {
        console.error('Mesaj silinirken hata oluştu:', error);
      }
    }
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
        category: ''
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
      category: book.category
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Yönetim Paneli</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab('books')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'books' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Kitaplar
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`px-4 py-2 rounded-lg relative ${
              activeTab === 'messages' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Mesajlar
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {activeTab === 'books' && (
        <>
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
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  placeholder="Kategori"
                  className="border p-2 rounded"
                  required
                />
                <input
                  type="text"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  placeholder="Resim URL"
                  className="border p-2 rounded"
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
                        category: ''
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
        </>
      )}

      {activeTab === 'messages' && (
        <div className="bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold p-6 border-b">Mesajlar</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
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
                      <div>
                        <div className="font-medium text-gray-900">{message.name}</div>
                        <div className="text-sm text-gray-500">{message.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{message.subject}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {message.timestamp?.toLocaleString('tr-TR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  {selectedMessage.subject}
                </h3>
                <button
                  onClick={() => {
                    setShowMessageModal(false);
                    setSelectedMessage(null);
                  }}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-500">Gönderen</div>
                  <div className="font-medium">{selectedMessage.name}</div>
                  <div className="text-sm text-gray-600">{selectedMessage.email}</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500">Tarih</div>
                  <div>{selectedMessage.timestamp?.toLocaleString('tr-TR')}</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500">Mesaj</div>
                  <div className="mt-1 whitespace-pre-wrap">{selectedMessage.message}</div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-4">
                <button
                  onClick={() => handleDeleteMessage(selectedMessage.id)}
                  className="px-4 py-2 text-red-600 hover:text-red-900"
                >
                  Sil
                </button>
                <a
                  href={`mailto:${selectedMessage.email}`}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  E-posta ile Yanıtla
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel; 