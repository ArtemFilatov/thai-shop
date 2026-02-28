import { readFileSync, writeFileSync } from "fs";
import { createRequire } from "module";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const require = createRequire(import.meta.url);
const XLSX = require("xlsx");

const __dirname = dirname(fileURLToPath(import.meta.url));

// Путь к Excel файлу — укажите свой
const EXCEL_PATH = process.argv[2] || resolve(__dirname, "../../../Downloads/price-opt/price-opt-25.02.2026.xlsx");
const OUT_PATH = resolve(__dirname, "../src/data/products.json");

const wb = XLSX.readFile(EXCEL_PATH);
const ws = wb.Sheets[wb.SheetNames[0]];
const rows = XLSX.utils.sheet_to_json(ws, { header: 1, defval: null });

// Артикул: строка вида "10-01-0065"
const isArticle = (val) => typeof val === "string" && /^\d{2}-\d{2}-\d{4}$/.test(val.trim());

// Заголовок категории: строка только в col[0], всё заглавными
const isCategoryRow = (row) => {
  const val = row[0];
  if (!val || typeof val !== "string") return false;
  if (isArticle(val)) return false;
  // Нет артикула, нет цены — это заголовок
  return row[11] === null || row[11] === undefined || row[11] === 0;
};

const products = [];
let currentCategory = "Прочее";
let id = 1;

for (const row of rows) {
  if (!row || row.length === 0) continue;

  // Определяем категорию
  if (isCategoryRow(row)) {
    const catName = String(row[0]).trim();
    // Пропускаем технические строки
    if (catName.length > 3 && !catName.startsWith("Фио") && !catName.startsWith("Серия") && !catName.startsWith("Артикул")) {
      currentCategory = catName;
    }
    continue;
  }

  // Проверяем, что это строка товара
  if (!isArticle(row[0])) continue;

  const article = String(row[0]).trim();
  const nameRu = row[4] ? String(row[4]).replace(/\r\n/g, " ").replace(/\s+/g, " ").trim() : "";
  const nameEn = row[5] ? String(row[5]).replace(/\r\n/g, " ").replace(/\s+/g, " ").trim() : "";
  const note = row[8] ? String(row[8]).trim() : "";
  const weightKg = typeof row[9] === "number" ? row[9] : null;
  const price = typeof row[11] === "number" && row[11] > 0 ? row[11] : null;
  const description = row[20] ? String(row[20]).trim() : "";

  if (!nameRu || !price) continue;

  const inStock = !note.includes("НЕТ В НАЛИЧИИ");

  // Вес в читаемом виде
  let weight = null;
  if (weightKg) {
    weight = weightKg >= 1 ? `${weightKg} кг` : `${Math.round(weightKg * 1000)} г`;
  }

  const MARKUP = 1.5; // наценка 50%
  const retailPrice = Math.ceil(price * MARKUP);

  products.push({
    id: id++,
    article,
    nameRu,
    name: nameEn,
    description: description || nameRu,
    price: retailPrice,
    category: currentCategory,
    weight,
    inStock,
    image: null,
  });
}

writeFileSync(OUT_PATH, JSON.stringify(products, null, 2), "utf-8");

console.log(`✅ Конвертировано ${products.length} товаров`);
console.log(`📦 Категории:`);
const cats = [...new Set(products.map((p) => p.category))];
cats.forEach((c) => {
  const count = products.filter((p) => p.category === c).length;
  console.log(`   ${c}: ${count} шт.`);
});
console.log(`💾 Сохранено: ${OUT_PATH}`);
