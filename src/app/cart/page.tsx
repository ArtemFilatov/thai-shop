"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { TrashIcon, MinusIcon, PlusIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, totalPrice, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="text-7xl mb-6">🛒</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Корзина пуста</h1>
        <p className="text-gray-500 mb-8">Добавьте товары из нашего каталога</p>
        <Link
          href="/products"
          className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 py-3 rounded-full transition-colors"
        >
          Перейти в каталог
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Корзина <span className="text-gray-400 font-normal text-xl">({totalItems} товара)</span>
        </h1>
        <button
          onClick={clearCart}
          className="text-red-400 hover:text-red-600 text-sm font-medium transition-colors"
        >
          Очистить корзину
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl p-4 border border-amber-50 shadow-sm flex gap-4">
              <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-amber-50 flex-shrink-0">
                <Image src={item.image ?? "/placeholder.png"} alt={item.nameRu} fill className="object-cover" sizes="96px" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-gray-800 line-clamp-1">{item.nameRu}</h3>
                    <p className="text-gray-400 text-sm">{item.category}</p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-gray-300 hover:text-red-400 transition-colors flex-shrink-0"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2 bg-amber-50 rounded-xl p-1">
                    <button
                      onClick={() =>
                        item.quantity > 1
                          ? updateQuantity(item.id, item.quantity - 1)
                          : removeItem(item.id)
                      }
                      className="w-7 h-7 flex items-center justify-center text-amber-700 hover:bg-amber-200 rounded-lg transition-colors"
                    >
                      <MinusIcon className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-semibold text-gray-800">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-7 h-7 flex items-center justify-center text-amber-700 hover:bg-amber-200 rounded-lg transition-colors"
                    >
                      <PlusIcon className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="font-bold text-amber-700">{(item.price * item.quantity).toLocaleString()} ₽</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 border border-amber-50 shadow-sm sticky top-20">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Итого</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Товары ({totalItems} шт.)</span>
                <span>{totalPrice.toLocaleString()} ₽</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Доставка</span>
                <span className={totalPrice >= 2000 ? "text-green-600 font-medium" : ""}>
                  {totalPrice >= 2000 ? "Бесплатно" : "300 ₽"}
                </span>
              </div>
              {totalPrice < 2000 && (
                <p className="text-xs text-amber-600">
                  Ещё {(2000 - totalPrice).toLocaleString()} ₽ до бесплатной доставки
                </p>
              )}
              <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-lg">
                <span>К оплате</span>
                <span className="text-amber-700">
                  {(totalPrice + (totalPrice >= 2000 ? 0 : 300)).toLocaleString()} ₽
                </span>
              </div>
            </div>

            <button className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-4 rounded-2xl transition-colors flex items-center justify-center gap-2">
              <ShoppingBagIcon className="w-5 h-5" />
              Оформить заказ
            </button>

            <Link
              href="/products"
              className="block text-center text-amber-700 hover:text-amber-900 font-medium text-sm mt-4 transition-colors"
            >
              Продолжить покупки
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
