import { Link } from 'react-router-dom';

const Categories = () => {
  const categories = [
    {
      id: 1,
      name: 'Roman',
      description: 'Türk ve dünya edebiyatından seçkin romanlar',
      icon: '📚'
    },
    {
      id: 2,
      name: 'Şiir',
      description: 'Klasik ve modern şiir koleksiyonu',
      icon: '✒️'
    },
    {
      id: 3,
      name: 'Tarih',
      description: 'Türk ve dünya tarihi üzerine eserler',
      icon: '📜'
    },
    {
      id: 4,
      name: 'Felsefe',
      description: 'Felsefi düşünce ve akımlar',
      icon: '🤔'
    },
    {
      id: 5,
      name: 'Bilim',
      description: 'Popüler bilim ve akademik eserler',
      icon: '🔬'
    },
    {
      id: 6,
      name: 'Sanat',
      description: 'Görsel sanatlar, müzik ve sinema kitapları',
      icon: '🎨'
    },
    {
      id: 7,
      name: 'Çocuk Kitapları',
      description: 'Her yaş grubu için çocuk kitapları',
      icon: '🧸'
    },
    {
      id: 8,
      name: 'Polisiye',
      description: 'Gizem ve suç romanları',
      icon: '🔍'
    },
    {
      id: 9,
      name: 'Fantastik',
      description: 'Bilim kurgu ve fantastik edebiyat',
      icon: '✨'
    },
    {
      id: 10,
      name: 'Kişisel Gelişim',
      description: 'Kişisel gelişim ve psikoloji kitapları',
      icon: '🌱'
    },
    {
      id: 11,
      name: 'Din ve Tasavvuf',
      description: 'Dini eserler ve tasavvuf kitapları',
      icon: '🕌'
    },
    {
      id: 12,
      name: 'Antika Kitaplar',
      description: 'Nadide ve antika kitap koleksiyonu',
      icon: '📖'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Kitap Kategorileri</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Kaldırım Sahaf'ta bulabileceğiniz geniş kitap kategorilerimizi keşfedin. Her kategori için özenle seçilmiş eserler sizleri bekliyor.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/kategoriler/${category.name.toLowerCase()}`}
            className="block p-6 bg-white rounded-lg border border-blue-100 hover:border-blue-300 transition-all duration-200 hover:shadow-md"
          >
            <div className="flex items-start space-x-4">
              <span className="text-4xl">{category.icon}</span>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{category.name}</h2>
                <p className="text-gray-600">{category.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories; 