import { useState } from 'react';
import { Link } from 'react-router-dom';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Genel Bakış', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: 'books', label: 'Kitaplar', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
    { id: 'categories', label: 'Kategoriler', icon: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z' },
    { id: 'authors', label: 'Yazarlar', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { id: 'blog', label: 'Blog Yazıları', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z' },
    { id: 'messages', label: 'Mesajlar', icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-blue-100">
          {/* Admin Header */}
          <div className="border-b border-blue-100 px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-900">Yönetim Paneli</h1>
            <p className="mt-1 text-sm text-gray-600">Sitenizi yönetmek için aşağıdaki seçenekleri kullanabilirsiniz.</p>
          </div>

          {/* Admin Content */}
          <div className="flex">
            {/* Sidebar */}
            <div className="w-64 border-r border-blue-100">
              <nav className="p-4 space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={tab.icon} />
                    </svg>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-blue-50 rounded-lg p-6">
                      <h3 className="text-lg font-medium text-blue-900">Toplam Kitap</h3>
                      <p className="mt-2 text-3xl font-bold text-blue-700">0</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-6">
                      <h3 className="text-lg font-medium text-green-900">Toplam Yazar</h3>
                      <p className="mt-2 text-3xl font-bold text-green-700">0</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-6">
                      <h3 className="text-lg font-medium text-purple-900">Toplam Mesaj</h3>
                      <p className="mt-2 text-3xl font-bold text-purple-700">0</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg border border-blue-100 p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Son Aktiviteler</h3>
                    <div className="text-gray-600 text-sm">
                      Henüz aktivite bulunmuyor.
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'books' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-medium text-gray-900">Kitaplar</h2>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200">
                      Yeni Kitap Ekle
                    </button>
                  </div>
                  <div className="bg-white rounded-lg border border-blue-100 p-6">
                    <div className="text-gray-600 text-sm">
                      Henüz kitap bulunmuyor.
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'categories' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-medium text-gray-900">Kategoriler</h2>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200">
                      Yeni Kategori Ekle
                    </button>
                  </div>
                  <div className="bg-white rounded-lg border border-blue-100 p-6">
                    <div className="text-gray-600 text-sm">
                      Henüz kategori bulunmuyor.
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'authors' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-medium text-gray-900">Yazarlar</h2>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200">
                      Yeni Yazar Ekle
                    </button>
                  </div>
                  <div className="bg-white rounded-lg border border-blue-100 p-6">
                    <div className="text-gray-600 text-sm">
                      Henüz yazar bulunmuyor.
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'blog' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-medium text-gray-900">Blog Yazıları</h2>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200">
                      Yeni Yazı Ekle
                    </button>
                  </div>
                  <div className="bg-white rounded-lg border border-blue-100 p-6">
                    <div className="text-gray-600 text-sm">
                      Henüz blog yazısı bulunmuyor.
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'messages' && (
                <div className="space-y-4">
                  <h2 className="text-lg font-medium text-gray-900">Mesajlar</h2>
                  <div className="bg-white rounded-lg border border-blue-100 p-6">
                    <div className="text-gray-600 text-sm">
                      Henüz mesaj bulunmuyor.
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin; 