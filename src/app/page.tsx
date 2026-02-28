import Link from "next/link";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import productsRaw from "@/data/products.json";
import { Product } from "@/types";
import { FILTER_GROUPS, getProductImage, getProductGroup } from "@/data/categories";

const products = productsRaw as Product[];

export default function Home() {
  const featured = products.filter((p) => p.inStock).slice(0, 8);

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-amber-800 via-amber-700 to-yellow-600 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
        }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-4xl">🇹🇭</span>
              <span className="text-amber-200 font-medium uppercase tracking-widest text-sm">
                Прямо из Таиланда
              </span>
            </div>
            <h1 className="text-5xl font-bold leading-tight mb-6">
              Вкус и уход<br />
              <span className="text-yellow-300">из Таиланда</span>
            </h1>
            <p className="text-amber-100 text-lg mb-8 leading-relaxed">
              Более {products.length} наименований тайской косметики, продуктов и товаров для дома.
              Прямые поставки, сертифицированная продукция.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link href="/products" className="bg-white text-amber-800 font-semibold px-8 py-3 rounded-full hover:bg-amber-50 transition-colors">
                Перейти в каталог
              </Link>
              <Link href="/about" className="border border-white/40 text-white font-semibold px-8 py-3 rounded-full hover:bg-white/10 transition-colors">
                О нас
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-amber-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-yellow-300">{products.length}+</div>
              <div className="text-amber-200 text-sm mt-1">товаров из Таиланда</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-300">35</div>
              <div className="text-amber-200 text-sm mt-1">категорий</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-300">2–5</div>
              <div className="text-amber-200 text-sm mt-1">дней доставки</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Категории товаров</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {FILTER_GROUPS.slice(1).map((group) => (
            <Link
              key={group.id}
              href={`/products?group=${encodeURIComponent(group.id)}`}
              className="bg-white border border-amber-100 rounded-2xl p-4 text-center hover:border-amber-300 hover:shadow-sm transition-all group"
            >
              <div className="text-3xl mb-2">{group.emoji}</div>
              <div className="text-sm font-medium text-gray-700 group-hover:text-amber-700 transition-colors leading-tight">
                {group.name}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Популярные товары</h2>
          <Link href="/products" className="text-amber-700 hover:text-amber-900 font-medium text-sm transition-colors">
            Смотреть все →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              product={{ ...product, image: product.image ?? getProductImage(product.category, product.id) }}
            />
          ))}
        </div>
      </section>

      {/* Banner */}
      <section className="bg-gradient-to-r from-green-800 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="text-5xl mb-4">🛺</div>
          <h2 className="text-3xl font-bold mb-4">Бесплатная доставка от 2000 ₽</h2>
          <p className="text-green-100 mb-8 max-w-md mx-auto">
            Доставляем по всей России. Все товары сертифицированы и прошли таможенный контроль.
          </p>
          <Link href="/products" className="bg-white text-green-800 font-semibold px-8 py-3 rounded-full hover:bg-green-50 transition-colors inline-block">
            Начать покупки
          </Link>
        </div>
      </section>
    </div>
  );
}
