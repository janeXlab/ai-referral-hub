import type { Locale } from "@/lib/i18n";

type ProductData = {
  slug: string;
  name: string;
  tagline_en: string;
  tagline_zh: string;
  category: string;
  icon: string | null;
  color: string | null;
  pricing: string | null;
  referral_count?: number;
  verified_count?: number;
};

export function ProductCard({
  product,
  locale,
  href,
}: {
  product: ProductData;
  locale: Locale;
  href: string;
}) {
  const tagline = locale === "en" ? product.tagline_en : product.tagline_zh;

  return (
    <a
      href={href}
      className="group block rounded-xl p-4 transition-all card-glow"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-color)",
      }}
    >
      <div className="flex items-start gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-lg text-lg shrink-0"
          style={{ background: `${product.color || "#666"}22` }}
        >
          {product.icon || "📦"}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold tracking-tight group-hover:text-white transition-colors">
              {product.name}
            </h3>
            <span
              className="rounded-full px-2 py-0.5 text-xs"
              style={{ background: "var(--accent-glow)", color: "var(--accent-hover)" }}
            >
              {product.category}
            </span>
          </div>
          <p className="mt-1 text-sm truncate" style={{ color: "var(--text-secondary)" }}>
            {tagline}
          </p>
          <div className="mt-3 flex items-center gap-3 text-xs" style={{ color: "var(--text-muted)" }}>
            <span className="ml-auto">{product.pricing}</span>
          </div>
        </div>
      </div>
    </a>
  );
}
