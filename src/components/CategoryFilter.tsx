"use client";

import { useState } from "react";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { ProductCard } from "./ProductCard";

const CATEGORIES = ["Chat", "Coding", "Image", "Video", "Audio", "Writing", "Search", "Productivity", "DevTools"] as const;
type Category = typeof CATEGORIES[number];

type ProductData = {
  slug: string;
  name: string;
  tagline_en: string;
  tagline_zh: string;
  category: string;
  icon: string | null;
  color: string | null;
  pricing: string | null;
};

export function CategoryFilter({
  products,
  locale,
}: {
  products: ProductData[];
  locale: Locale;
}) {
  const [active, setActive] = useState<Category | "All">("All");
  const [search, setSearch] = useState("");

  const filtered = products.filter((p) => {
    const matchCat = active === "All" || p.category === active;
    const tagline = locale === "en" ? p.tagline_en : p.tagline_zh;
    const matchSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      tagline.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div>
      <div className="mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t(locale, "products.search")}
          className="w-full rounded-xl px-4 py-3 text-sm transition-all focus:outline-none"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-color)",
            color: "var(--text-primary)",
          }}
        />
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setActive("All")}
          className="rounded-full px-3 py-1.5 text-xs font-medium transition-all cursor-pointer"
          style={{
            background: active === "All" ? "var(--accent)" : "var(--bg-card)",
            color: active === "All" ? "#fff" : "var(--text-secondary)",
            border: `1px solid ${active === "All" ? "var(--accent)" : "var(--border-color)"}`,
          }}
        >
          {t(locale, "filter.all")}
        </button>
        {CATEGORIES.map((cat) => {
          const count = products.filter((p) => p.category === cat).length;
          if (count === 0) return null;
          return (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className="rounded-full px-3 py-1.5 text-xs font-medium transition-all cursor-pointer"
              style={{
                background: active === cat ? "var(--accent)" : "var(--bg-card)",
                color: active === cat ? "#fff" : "var(--text-secondary)",
                border: `1px solid ${active === cat ? "var(--accent)" : "var(--border-color)"}`,
              }}
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {filtered.length > 0 ? (
          filtered.map((p) => (
            <ProductCard
              key={p.slug}
              product={p}
              locale={locale}
              href={`/${locale}/products/${p.slug}`}
            />
          ))
        ) : (
          <div
            className="col-span-2 rounded-xl p-8 text-center text-sm"
            style={{ background: "var(--bg-card)", color: "var(--text-muted)" }}
          >
            {locale === "en" ? "No products found." : "未找到匹配的产品。"}
          </div>
        )}
      </div>
    </div>
  );
}
