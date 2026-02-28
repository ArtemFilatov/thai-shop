"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import productsRaw from "@/data/products.json";
import { Product } from "@/types";
import { FILTER_GROUPS, getProductImage, getProductGroup } from "@/data/categories";

const products = productsRaw as Product[];

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialGroup = searchParams.get("group") || "all";
  const [selectedGroup, setSelectedGroup] = useState(initialGroup);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchGroup = selectedGroup === "all" || getProductGroup(p.category) === selectedGroup;
      const matchSearch =
        !search ||
        p.nameRu.toLowerCase().includes(search.toLowerCase()) ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase());
      return matchGroup && matchSearch;
    });
  }, [selectedGroup, search]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Каталог товаров</h1>
      <p className="text-gray-500 mb-8">Найдено: {filtered.length} товаров</p>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Поиск товаров..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md border border-amber-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
        />
      </div>

      {/* Group filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {FILTER_GROUPS.map((group) => (
          <button
            key={group.id}
            onClick={() => setSelectedGroup(group.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-1.5 ${
              selectedGroup === group.id
                ? "bg-amber-600 text-white"
                : "bg-white border border-amber-200 text-gray-600 hover:border-amber-400"
            }`}
          >
            <span>{group.emoji}</span>
            {group.name}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={{ ...product, image: product.image ?? getProductImage(product.category, product.id) }}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-400">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-lg">Товары не найдены</p>
        </div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense>
      <ProductsContent />
    </Suspense>
  );
}
