import React from 'react';

const BlogPosts = () => {
  const posts = [
    {
      id: 1,
      title: "Sahaf Kültürü ve Modern Zamanlar",
      author: "Mehmet Yılmaz",
      date: "15 Mart 2024",
      excerpt: "Geleneksel sahaf kültürünün modern dünyada nasıl yaşatılabileceğini ve dijital çağda kitap okuma alışkanlıklarının değişimini ele alan bir yazı...",
      category: "Kültür & Sanat",
      readTime: "5 dk"
    },
    {
      id: 2,
      title: "Nadide Kitapların Peşinde",
      author: "Ayşe Demir",
      date: "10 Mart 2024",
      excerpt: "İkinci el ve nadide kitapların değerini, koleksiyonculuğun inceliklerini ve unutulmaz kitap avlarını anlatan bir deneme...",
      category: "Kitap Dünyası",
      readTime: "7 dk"
    },
    {
      id: 3,
      title: "Sahaf Dükkanında Bir Gün",
      author: "Ali Kaya",
      date: "5 Mart 2024",
      excerpt: "Bir sahaf dükkanının günlük rutinini, müşterilerle olan etkileşimleri ve kitap sohbetlerinin büyüsünü anlatan samimi bir yazı...",
      category: "Günlük Hayat",
      readTime: "4 dk"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Köşe Yazıları</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Kitap dünyasından haberler, sahaf kültürü, edebiyat ve daha fazlası...
        </p>
      </div>

      <div className="grid gap-8">
        {posts.map((post) => (
          <article key={post.id} className="bg-white rounded-lg shadow-sm p-6 border border-blue-100 hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime} okuma</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    {post.author}
                  </span>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Devamını Oku →
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default BlogPosts; 