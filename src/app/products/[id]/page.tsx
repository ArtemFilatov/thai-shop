"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { ShoppingCartIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import ProductCard from "@/components/ProductCard";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = products.find((p) => p.id === Number(id));
  const { addItem } = useCart();

  if (!product) notFound();

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link
        href="/products"
        className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-900 mb-8 transition-colors"
      >
        <ArrowLeftIcon className="w-4 h-4" />
        Назад в каталог
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image */}
        <div className="relative h-96 rounded-2xl overflow-hidden bg-amber-50">
          <Image
            src={product.image}
            alt={product.nameRu}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="text-white font-semibold bg-black/60 px-4 py-2 rounded-full">
                Нет в наличии
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <span className="inline-block bg-amber-100 text-amber-800 text-xs font-medium px-3 py-1 rounded-full mb-4">
            {product.categoryRu}
          </span>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.nameRu}</h1>
          <p className="text-gray-400 text-sm mb-4">{product.name}</p>
          <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

          <div className="space-y-2 mb-8">
            {product.weight && (
              <div className="flex gap-2 text-sm">
                <span className="text-gray-400 w-24">Вес/объём:</span>
                <span className="text-gray-700 font-medium">{product.weight}</span>
              </div>
            )}
            {product.origin && (
              <div className="flex gap-2 text-sm">
                <span className="text-gray-400 w-24">Происхождение:</span>
                <span className="text-gray-700 font-medium">{product.origin}</span>
              </div>
            )}
            <div className="flex gap-2 text-sm">
              <span className="text-gray-400 w-24">Наличие:</span>
              <span className={product.inStock ? "text-green-600 font-medium" : "text-red-500 font-medium"}>
                {product.inStock ? "В наличии" : "Нет в наличии"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6 mb-8">
            <span className="text-4xl font-bold text-amber-700">{product.price} ₽</span>
            {product.weight && (
              <span className="text-gray-400">за {product.weight}</span>
            )}
          </div>

          <button
            onClick={() => product.inStock && addItem(product)}
            disabled={!product.inStock}
            className="flex items-center gap-3 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-300 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-colors w-full justify-center"
          >
            <ShoppingCartIcon className="w-6 h-6" />
            {product.inStock ? "Добавить в корзину" : "Нет в наличии"}
          </button>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Похожие товары</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
