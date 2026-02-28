export default function Footer() {
  return (
    <footer className="bg-amber-900 text-amber-100 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🇹🇭</span>
              <span className="font-bold text-xl text-white">ThaiShop</span>
            </div>
            <p className="text-amber-200 text-sm leading-relaxed">
              Настоящие продукты из Таиланда с доставкой по всей России. Качество и подлинность гарантированы.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Навигация</h4>
            <ul className="space-y-2 text-sm text-amber-200">
              <li><a href="/" className="hover:text-white transition-colors">Главная</a></li>
              <li><a href="/products" className="hover:text-white transition-colors">Каталог товаров</a></li>
              <li><a href="/cart" className="hover:text-white transition-colors">Корзина</a></li>
              <li><a href="/about" className="hover:text-white transition-colors">О нас</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Контакты</h4>
            <ul className="space-y-2 text-sm text-amber-200">
              <li>📧 info@thaishop.ru</li>
              <li>📱 +7 (999) 123-45-67</li>
              <li>📦 Доставка по всей России</li>
              <li>⏰ Пн–Пт: 10:00–19:00</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-amber-800 mt-8 pt-8 text-center text-sm text-amber-300">
          © 2026 ThaiShop. Все права защищены.
        </div>
      </div>
    </footer>
  );
}
