"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { getProductGroup, CATEGORY_GROUPS } from "@/data/categories";

interface Props {
  product: Product & { image: string };
}

export default function ProductCard({ product }: Props) {
  const { addItem } = useCart();
  const group = getProductGroup(product.category);
  const emoji = CATEGORY_GROUPS[product.category]?.emoji ?? "🛍️";

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-amber-50 overflow-hidden hover:shadow-md transition-shadow group">
      <Link href={`/products/${product.id}`}>
        <div className="relative h-52 bg-amber-50 overflow-hidden">
          <Image
            src={product.image}
            alt={product.nameRu}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="text-white font-semibold bg-black/60 px-3 py-1 rounded-full text-sm">
                Нет в наличии
              </span>
            </div>
          )}
          <span className="absolute top-3 left-3 bg-amber-100/90 text-amber-800 text-xs font-medium px-2 py-1 rounded-full backdrop-blur-sm">
            {emoji} {group}
          </span>
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-gray-800 hover:text-amber-700 transition-colors line-clamp-2 text-sm leading-snug min-h-[2.5rem]">
            {product.nameRu}
          </h3>
          <p className="text-gray-400 text-xs mt-1 font-mono">{product.article}</p>
        </Link>

        <div className="flex items-center justify-between mt-3">
          <div>
            <span className="text-lg font-bold text-amber-700">{product.price.toLocaleString()} ₽</span>
            {product.weight && (
              <span className="text-gray-400 text-xs ml-1">/ {product.weight}</span>
            )}
          </div>
          <button
            onClick={() => product.inStock && addItem(product)}
            disabled={!product.inStock}
            className="flex items-center gap-1 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-300 text-white px-3 py-2 rounded-xl text-xs font-medium transition-colors"
          >
            <ShoppingCartIcon className="w-4 h-4" />
            В корзину
          </button>
        </div>
      </div>
    </div>
  );
}
