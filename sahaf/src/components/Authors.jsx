import React, { useState } from 'react';

const Authors = () => {
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const authors = [
    {
      id: 1,
      name: "Ahmet Hamdi Tanpınar",
      description: "Modern Türk edebiyatının öncü isimlerinden, 'Saatleri Ayarlama Enstitüsü' ve 'Huzur' gibi eserleriyle tanınan yazar.",
      books: ["Saatleri Ayarlama Enstitüsü", "Huzur", "Beş Şehir", "Mahur Beste"],
      birthYear: 1901,
      deathYear: 1962,
      genre: "Roman, Şiir, Deneme",
      notableWorks: "Saatleri Ayarlama Enstitüsü, Huzur, Beş Şehir"
    },
    {
      id: 2,
      name: "Sabahattin Ali",
      description: "Türk edebiyatının unutulmaz isimlerinden, 'Kürk Mantolu Madonna' ve 'Kuyucaklı Yusuf' gibi eserleriyle tanınan yazar.",
      books: ["Kürk Mantolu Madonna", "Kuyucaklı Yusuf", "İçimizdeki Şeytan", "Değirmen"],
      birthYear: 1907,
      deathYear: 1948,
      genre: "Roman, Öykü, Şiir",
      notableWorks: "Kürk Mantolu Madonna, Kuyucaklı Yusuf"
    },
    {
      id: 3,
      name: "Orhan Pamuk",
      description: "Nobel Edebiyat Ödülü sahibi, çağdaş Türk edebiyatının önde gelen isimlerinden.",
      books: ["Kar", "Masumiyet Müzesi", "Kara Kitap", "Tutunamayanlar"],
      birthYear: 1952,
      genre: "Roman",
      notableWorks: "Kar, Masumiyet Müzesi, Kara Kitap"
    },
    {
      id: 4,
      name: "Halide Edib Adıvar",
      description: "Türk edebiyatının öncü kadın yazarlarından, Kurtuluş Savaşı dönemini anlatan eserleriyle tanınır.",
      books: ["Sinekli Bakkal", "Ateşten Gömlek", "Vurun Kahpeye", "Handan"],
      birthYear: 1884,
      deathYear: 1964,
      genre: "Roman, Anı",
      notableWorks: "Sinekli Bakkal, Ateşten Gömlek"
    },
    {
      id: 5,
      name: "Yaşar Kemal",
      description: "Çukurova'nın destansı hikayelerini anlatan, Türk edebiyatının büyük ustalarından.",
      books: ["İnce Memed", "Yer Demir Gök Bakır", "Teneke", "Ölmez Otu"],
      birthYear: 1923,
      deathYear: 2015,
      genre: "Roman, Öykü",
      notableWorks: "İnce Memed Serisi, Yer Demir Gök Bakır"
    },
    {
      id: 6,
      name: "Oğuz Atay",
      description: "Modern Türk edebiyatının en özgün yazarlarından, 'Tutunamayanlar' ile edebiyatımıza yeni bir soluk getiren yazar.",
      books: ["Tutunamayanlar", "Tehlikeli Oyunlar", "Korkuyu Beklerken", "Bir Bilim Adamının Romanı"],
      birthYear: 1934,
      deathYear: 1977,
      genre: "Roman, Öykü",
      notableWorks: "Tutunamayanlar, Tehlikeli Oyunlar"
    },
    {
      id: 7,
      name: "Nâzım Hikmet",
      description: "Türk şiirinin en önemli isimlerinden, dünya çapında tanınan şair ve yazar.",
      books: ["Memleketimden İnsan Manzaraları", "Kuvâyi Milliye", "Şeyh Bedrettin Destanı", "Taranta Babu'ya Mektuplar"],
      birthYear: 1902,
      deathYear: 1963,
      genre: "Şiir, Roman, Oyun",
      notableWorks: "Memleketimden İnsan Manzaraları, Kuvâyi Milliye"
    },
    {
      id: 8,
      name: "Sait Faik Abasıyanık",
      description: "Modern Türk öykücülüğünün öncü isimlerinden, İstanbul'un sıradan insanlarını anlatan öyküleriyle tanınır.",
      books: ["Semaver", "Şahmerdan", "Lüzumsuz Adam", "Mahalle Kahvesi"],
      birthYear: 1906,
      deathYear: 1954,
      genre: "Öykü, Roman",
      notableWorks: "Semaver, Şahmerdan, Lüzumsuz Adam"
    },
    {
      id: 9,
      name: "Reşat Nuri Güntekin",
      description: "Türk edebiyatının klasik yazarlarından, toplumsal gerçekçi romanlarıyla tanınır.",
      books: ["Çalıkuşu", "Acımak", "Yeşil Gece", "Dudaktan Kalbe"],
      birthYear: 1889,
      deathYear: 1956,
      genre: "Roman, Tiyatro",
      notableWorks: "Çalıkuşu, Acımak, Yeşil Gece"
    },
    {
      id: 10,
      name: "Peyami Safa",
      description: "Türk edebiyatının önemli romancılarından, psikolojik romanlarıyla tanınır.",
      books: ["Dokuzuncu Hariciye Koğuşu", "Fatih-Harbiye", "Matmazel Noraliya'nın Koltuğu", "Yalnızız"],
      birthYear: 1899,
      deathYear: 1961,
      genre: "Roman, Öykü",
      notableWorks: "Dokuzuncu Hariciye Koğuşu, Fatih-Harbiye"
    },
    {
      id: 11,
      name: "Halil İnalcık",
      description: "Türk tarihçiliğinin öncü isimlerinden, Osmanlı tarihi üzerine yaptığı çalışmalarla tanınır.",
      books: ["Osmanlı İmparatorluğu Klasik Çağ", "Devlet-i Aliyye", "Tanzimat ve Bulgar Meselesi", "Şair ve Patron"],
      birthYear: 1916,
      deathYear: 2016,
      genre: "Tarih",
      notableWorks: "Osmanlı İmparatorluğu Klasik Çağ, Devlet-i Aliyye"
    },
    {
      id: 12,
      name: "İlber Ortaylı",
      description: "Çağdaş Türk tarihçiliğinin önde gelen isimlerinden, popüler tarih yazılarıyla tanınır.",
      books: ["Türklerin Tarihi", "İmparatorluğun En Uzun Yüzyılı", "Osmanlı'yı Yeniden Keşfetmek", "Gazi Mustafa Kemal Atatürk"],
      birthYear: 1947,
      genre: "Tarih",
      notableWorks: "Türklerin Tarihi, İmparatorluğun En Uzun Yüzyılı"
    }
  ];

  const handleAuthorClick = (author) => {
    setSelectedAuthor(author);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedAuthor(null);
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Yazarlarımız</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Kaldırım Sahaf'ta bulabileceğiniz Türk ve dünya edebiyatının önde gelen yazarlarını keşfedin.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {authors.map((author) => (
          <div
            key={author.id}
            className="bg-white rounded-lg shadow-sm p-6 border border-blue-100 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleAuthorClick(author)}
          >
            <div className="flex flex-col">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{author.name}</h2>
              <p className="text-gray-600 mb-4">{author.description}</p>
              <div className="w-full">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Öne Çıkan Eserleri:</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {author.books.slice(0, 3).map((book, index) => (
                    <li key={index} className="text-sm">{book}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
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

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Yaşam</h3>
                    <div className="space-y-2">
                      <p className="text-gray-600">
                        <span className="font-medium">Doğum Yılı:</span> {selectedAuthor.birthYear}
                      </p>
                      {selectedAuthor.deathYear && (
                        <p className="text-gray-600">
                          <span className="font-medium">Ölüm Yılı:</span> {selectedAuthor.deathYear}
                        </p>
                      )}
                      <p className="text-gray-600">
                        <span className="font-medium">Tür:</span> {selectedAuthor.genre}
                      </p>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Önemli Eserleri</h3>
                    <p className="text-gray-600">{selectedAuthor.notableWorks}</p>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Eserleri</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedAuthor.books.map((book, index) => (
                      <div key={index} className="bg-white rounded p-3">
                        <span className="text-blue-700 font-medium">{book}</span>
                      </div>
                    ))}
                  </div>
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