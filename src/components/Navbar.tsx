"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  const { totalItems } = useCart();

  return (
    <nav className="bg-white border-b border-amber-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🇹🇭</span>
            <span className="font-bold text-xl text-amber-800">ThaiShop</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-gray-600 hover:text-amber-700 font-medium transition-colors"
            >
              Главная
            </Link>
            <Link
              href="/products"
              className="text-gray-600 hover:text-amber-700 font-medium transition-colors"
            >
              Каталог
            </Link>
            <Link
              href="/about"
              className="text-gray-600 hover:text-amber-700 font-medium transition-colors"
            >
              О нас
            </Link>
          </div>

          <Link href="/cart" className="relative p-2 text-gray-600 hover:text-amber-700 transition-colors">
            <ShoppingCartIcon className="w-6 h-6" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
