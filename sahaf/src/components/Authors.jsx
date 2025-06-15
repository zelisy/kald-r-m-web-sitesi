import React from 'react';

const Authors = () => {
  const authors = [
    {
      id: 1,
      name: "Ahmet Hamdi Tanpınar",
      description: "Modern Türk edebiyatının öncü isimlerinden, 'Saatleri Ayarlama Enstitüsü' ve 'Huzur' gibi eserleriyle tanınan yazar.",
      books: ["Saatleri Ayarlama Enstitüsü", "Huzur", "Beş Şehir"]
    },
    {
      id: 2,
      name: "Sabahattin Ali",
      description: "Türk edebiyatının unutulmaz isimlerinden, 'Kürk Mantolu Madonna' ve 'Kuyucaklı Yusuf' gibi eserleriyle tanınan yazar.",
      books: ["Kürk Mantolu Madonna", "Kuyucaklı Yusuf", "İçimizdeki Şeytan"]
    },
    {
      id: 3,
      name: "Orhan Pamuk",
      description: "Nobel Edebiyat Ödülü sahibi, çağdaş Türk edebiyatının önde gelen isimlerinden.",
      books: ["Kar", "Masumiyet Müzesi", "Kara Kitap"]
    }
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Yazarlarımız</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {authors.map((author) => (
          <div key={author.id} className="bg-white rounded-lg shadow-sm p-6 border border-blue-100 hover:shadow-md transition-shadow">
            <div className="flex flex-col">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{author.name}</h2>
              <p className="text-gray-600 mb-4">{author.description}</p>
              <div className="w-full">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Öne Çıkan Eserleri:</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {author.books.map((book, index) => (
                    <li key={index} className="text-sm">{book}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Authors; 