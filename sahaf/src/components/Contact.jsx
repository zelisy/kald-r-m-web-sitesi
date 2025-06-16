import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'suggestion', // suggestion, complaint, request
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState({
    type: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mevcut mesajları al
    const existingMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    
    // Yeni mesajı ekle
    const newMessage = {
      id: Date.now(),
      ...formData,
      date: new Date().toLocaleDateString('tr-TR'),
      status: 'unread'
    };
    
    // Mesajları güncelle
    localStorage.setItem('contactMessages', JSON.stringify([...existingMessages, newMessage]));
    
    // Formu sıfırla
    setFormData({
      name: '',
      email: '',
      type: 'suggestion',
      subject: '',
      message: ''
    });
    
    // Başarı mesajını göster
    setStatus({
      type: 'success',
      message: 'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.'
    });
    
    // 3 saniye sonra başarı mesajını kaldır
    setTimeout(() => {
      setStatus({ type: '', message: '' });
    }, 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const contactInfo = {
    address: {
      street: "Bayındır 1 Sokak Adilhan Kitapçılar Çarşısı No: 6",
      district: "Cumhuriyet Mahallesi",
      city: "Çankaya, Ankara",
      postalCode: "06680"
    },
    phone: {
      main: "90 507 857 29 35",
      mobile: "90 507 857 29 35"
    },
    email: {
      info: "info@kaldirimsahaf.com",
      orders: "siparis@kaldirimsahaf.com"
    },
    workingHours: {
      weekdays: "09:00 - 19:00",
      weekend: "10:00 - 18:00",
      holiday: "Kapalı"
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">İletişim</h1>
          <p className="text-gray-600">
            Görüşleriniz bizim için değerli. Lütfen aşağıdaki formu doldurarak bize ulaşın.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Adres ve İletişim Bilgileri */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Adres ve İletişim Bilgileri</h2>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Adres</h3>
                    <p className="mt-1 text-gray-600">
                      {contactInfo.address.street}<br />
                      {contactInfo.address.district}, {contactInfo.address.city}<br />
                      {contactInfo.address.postalCode}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Telefon</h3>
                    <div className="mt-1 space-y-1">
                      <p className="text-gray-600">
                        <span className="font-medium">Mağaza:</span> {contactInfo.phone.main}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Mobil:</span> {contactInfo.phone.mobile}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">E-posta</h3>
                    <div className="mt-1 space-y-1">
                      <p className="text-gray-600">
                        <span className="font-medium">Genel İletişim:</span><br />
                        <a href={`mailto:${contactInfo.email.info}`} className="text-blue-600 hover:text-blue-800">
                          {contactInfo.email.info}
                        </a>
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Siparişler İçin:</span><br />
                        <a href={`mailto:${contactInfo.email.orders}`} className="text-blue-600 hover:text-blue-800">
                          {contactInfo.email.orders}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Çalışma Saatleri</h3>
                    <div className="mt-1 space-y-1">
                      <p className="text-gray-600">
                        <span className="font-medium">Pazartesi - Cumartesi:</span><br />
                        {contactInfo.workingHours.weekdays}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Pazar:</span><br />
                        {contactInfo.workingHours.weekend}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Resmi Tatiller:</span><br />
                        {contactInfo.workingHours.holiday}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Harita */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3060.123456789012!2d32.8545!3d39.9208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d34f190d0c0c0f%3A0x0!2zQ3VtaHVyaXlldCBNaCwgQmF5xLFuZMSxciAxLiBTaywgMDY2ODAgxLBuY2F5YSBDYW5rYXlh!5e0!3m2!1str!2str!4v1234567890"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Kaldırım Sahaf Konum"
              ></iframe>
            </div>
          </div>

          {/* Form */}
          <div>
            {status.message && (
              <div className={`p-4 mb-6 rounded-lg ${
                status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {status.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Ad Soyad
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  E-posta
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                  Mesaj Türü
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="suggestion">Öneri</option>
                  <option value="complaint">Şikayet</option>
                  <option value="request">Talep</option>
                </select>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                  Konu
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Mesajınız
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Gönder
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 