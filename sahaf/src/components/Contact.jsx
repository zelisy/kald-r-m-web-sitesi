import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form gönderme işlevi buraya eklenecek
    console.log('Form gönderiliyor:', formData);
    // Form gönderildikten sonra formu temizle
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    alert('Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.');
  };

  const contactInfo = {
    address: {
      street: "Moda Caddesi No: 45",
      district: "Kadıköy",
      city: "İstanbul",
      postalCode: "34710"
    },
    phone: {
      main: "+90 (216) 555 44 33",
      mobile: "+90 (532) 123 45 67"
    },
    email: {
      info: "info@kaldirimsahaf.com",
      orders: "siparis@kaldirimsahaf.com"
    },
    workingHours: {
      weekdays: "09:00 - 20:00",
      weekend: "10:00 - 18:00",
      holiday: "Kapalı"
    }
  };

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">İletişim</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Kitap dünyasına dair her türlü soru, öneri ve talepleriniz için bizimle iletişime geçebilirsiniz. 
          Nadide kitaplar, özel siparişler veya etkinlikler hakkında bilgi almak için aşağıdaki iletişim kanallarını kullanabilirsiniz.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* İletişim Bilgileri */}
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-blue-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">İletişim Bilgileri</h2>
            <div className="space-y-6">
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
                  <p className="mt-2 text-sm text-gray-500">
                    Moda Caddesi üzerinde, Moda Park'ın karşısında
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

          {/* Harita ve Ulaşım */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-blue-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Ulaşım</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Toplu Taşıma ile Ulaşım</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-600">•</span>
                    <span>Kadıköy İskele'den Moda minibüsleri ile 5 dakika</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-600">•</span>
                    <span>Kadıköy Metro'dan 10 dakika yürüme mesafesi</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-600">•</span>
                    <span>Moda Caddesi üzerinden geçen otobüsler: 8A, 8E, 10B</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Park Yerleri</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-600">•</span>
                    <span>Moda Park Otoparkı (100m mesafede)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-600">•</span>
                    <span>Cadde üzerinde ücretli park alanları</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Sosyal Medya */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-blue-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Sosyal Medya</h2>
            <p className="text-gray-600 mb-4">
              Güncel etkinlikler, yeni gelen kitaplar ve özel kampanyalardan haberdar olmak için bizi sosyal medyada takip edin.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com/kaldirimsahaf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-blue-50 p-3 rounded-lg text-blue-600 hover:bg-blue-100 transition-colors duration-200"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                </svg>
              </a>
              <a 
                href="https://twitter.com/kaldirimsahaf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-blue-50 p-3 rounded-lg text-blue-600 hover:bg-blue-100 transition-colors duration-200"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a 
                href="https://facebook.com/kaldirimsahaf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-blue-50 p-3 rounded-lg text-blue-600 hover:bg-blue-100 transition-colors duration-200"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* İletişim Formu */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-blue-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Bize Ulaşın</h2>
          <p className="text-gray-600 mb-6">
            Aşağıdaki formu doldurarak bize ulaşabilirsiniz. En kısa sürede size dönüş yapacağız.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Adınız Soyadınız
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent transition-all duration-200"
                placeholder="Adınız Soyadınız"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                E-posta Adresiniz
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent transition-all duration-200"
                placeholder="ornek@email.com"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Konu
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent transition-all duration-200"
              >
                <option value="">Konu Seçiniz</option>
                <option value="genel">Genel Bilgi</option>
                <option value="siparis">Sipariş Hakkında</option>
                <option value="kitap">Kitap Talebi</option>
                <option value="etkinlik">Etkinlik Bilgisi</option>
                <option value="diger">Diğer</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Mesajınız
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent transition-all duration-200"
                placeholder="Mesajınızı buraya yazın..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            >
              Gönder
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact; 