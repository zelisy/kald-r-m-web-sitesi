import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BlogPosts = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState('posts');
  const [blogFormData, setBlogFormData] = useState({
    title: '',
    author: '',
    excerpt: '',
    content: '',
    readTime: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [editingBlogId, setEditingBlogId] = useState(null);
  const navigate = useNavigate();

  // Köşe yazılarını localStorage'dan yükle
  useEffect(() => {
    const loadPosts = () => {
      const savedPosts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
      // Tarihe göre sırala (en yeniden en eskiye)
      const sortedPosts = savedPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
      setPosts(sortedPosts);
    };

    // Admin kontrolü
    const adminToken = localStorage.getItem('adminToken');
    setIsAdmin(!!adminToken);

    // İlk yükleme
    loadPosts();

    // localStorage değişikliklerini dinle
    window.addEventListener('storage', loadPosts);
    return () => window.removeEventListener('storage', loadPosts);
  }, []);

  const handleAddPost = () => {
    if (!isAdmin) {
      navigate('/login');
    } else {
      setActiveTab('blog');
    }
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPost(null);
  };

  const handleBlogSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      id: editingBlogId || Date.now().toString(),
      ...blogFormData,
      date: blogFormData.date || new Date().toISOString().split('T')[0]
    };

    let updatedPosts;
    if (editingBlogId) {
      updatedPosts = posts.map(post => 
        post.id === editingBlogId ? newPost : post
      );
    } else {
      updatedPosts = [...posts, newPost];
    }

    // Tarihe göre sırala (en yeniden en eskiye)
    updatedPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    setPosts(updatedPosts);
    localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
    
    // Formu sıfırla ve listeye dön
    setBlogFormData({
      title: '',
      author: '',
      excerpt: '',
      content: '',
      readTime: '',
      date: new Date().toISOString().split('T')[0]
    });
    setEditingBlogId(null);
    setActiveTab('posts');
  };

  const handleBlogChange = (e) => {
    const { name, value } = e.target;
    setBlogFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBlogEdit = (post) => {
    setEditingBlogId(post.id);
    setBlogFormData({
      title: post.title,
      author: post.author,
      excerpt: post.excerpt,
      content: post.content,
      readTime: post.readTime,
      date: post.date
    });
    setActiveTab('blog');
  };

  const handleBlogDelete = (id) => {
    const updatedPosts = posts.filter(post => post.id !== id);
    setPosts(updatedPosts);
    localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Köşe Yazıları</h1>
            <p className="text-gray-600">Sahaf dünyasından en güncel yazılar ve makaleler</p>
          </div>
          {isAdmin && (
            <button
              onClick={handleAddPost}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Yazı Ekle
            </button>
          )}
      </div>

        {activeTab === 'posts' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handlePostClick(post)}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-500">{post.readTime} dk okuma</span>
                      <span className="text-sm text-gray-500">
                        {new Date(post.date).toLocaleDateString('tr-TR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                  </span>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h2>
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <p className="text-gray-900 font-medium">{post.author}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePostClick(post);
                          }}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Devamını Oku
                        </button>
                        {isAdmin && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (window.confirm('Bu köşe yazısını silmek istediğinizden emin misiniz?')) {
                                handleBlogDelete(post.id);
                              }
                            }}
                            className="text-red-600 hover:text-red-800 font-medium"
                          >
                            Sil
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">Henüz köşe yazısı bulunmuyor.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'blog' && (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {editingBlogId ? 'Köşe Yazısını Düzenle' : 'Yeni Köşe Yazısı Ekle'}
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
                  <button
                    type="button"
                    onClick={() => {
                      setEditingBlogId(null);
                      setBlogFormData({
                        title: '',
                        author: '',
                        excerpt: '',
                        content: '',
                        readTime: '',
                        date: new Date().toISOString().split('T')[0]
                      });
                      setActiveTab('posts');
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {editingBlogId ? 'Güncelle' : 'Ekle'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showModal && selectedPost && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedPost.title}</h2>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>{selectedPost.author}</span>
                      <span>•</span>
                      <span>
                        {new Date(selectedPost.date).toLocaleDateString('tr-TR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                  </span>
                      <span>•</span>
                      <span>{selectedPost.readTime} dk okuma</span>
                    </div>
                  </div>
                  <button
                    onClick={handleCloseModal}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="prose max-w-none">
                  {selectedPost.content.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 text-gray-600">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPosts; 