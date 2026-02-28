export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <span className="text-6xl">🇹🇭</span>
        <h1 className="text-4xl font-bold text-gray-800 mt-6 mb-4">О нашем магазине</h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
          Мы доставляем настоящий вкус Таиланда прямо к вашему столу
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-white rounded-2xl p-8 border border-amber-100">
          <div className="text-3xl mb-4">🌿</div>
          <h2 className="text-xl font-bold text-gray-800 mb-3">Натуральные продукты</h2>
          <p className="text-gray-600 leading-relaxed">
            Все товары — натуральные, без искусственных добавок и консервантов. Мы работаем напрямую
            с фермерами и производителями в Таиланде.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 border border-amber-100">
          <div className="text-3xl mb-4">✈️</div>
          <h2 className="text-xl font-bold text-gray-800 mb-3">Прямые поставки</h2>
          <p className="text-gray-600 leading-relaxed">
            Товары поступают напрямую из Таиланда без посредников. Это гарантирует свежесть,
            подлинность и доступные цены.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 border border-amber-100">
          <div className="text-3xl mb-4">🛡️</div>
          <h2 className="text-xl font-bold text-gray-800 mb-3">Сертифицировано</h2>
          <p className="text-gray-600 leading-relaxed">
            Все продукты прошли таможенный контроль, имеют сертификаты соответствия и безопасны
            для употребления в пищу на территории России.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 border border-amber-100">
          <div className="text-3xl mb-4">📦</div>
          <h2 className="text-xl font-bold text-gray-800 mb-3">Быстрая доставка</h2>
          <p className="text-gray-600 leading-relaxed">
            Доставка по всей России от 2 до 5 рабочих дней. При заказе от 2000 ₽ — доставка
            бесплатная.
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-amber-700 to-amber-600 rounded-2xl p-10 text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Есть вопросы?</h2>
        <p className="text-amber-100 mb-6">
          Мы готовы помочь с выбором товаров и ответить на любые вопросы
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="mailto:info@thaishop.ru"
            className="bg-white text-amber-800 font-semibold px-6 py-3 rounded-full hover:bg-amber-50 transition-colors"
          >
            📧 info@thaishop.ru
          </a>
          <a
            href="tel:+79991234567"
            className="border border-white/40 text-white font-semibold px-6 py-3 rounded-full hover:bg-white/10 transition-colors"
          >
            📱 +7 (999) 123-45-67
          </a>
        </div>
      </div>
    </div>
  );
}
