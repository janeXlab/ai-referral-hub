import { CategoryFilter } from "@/components/CategoryFilter";
import { getAllProducts } from "@/lib/queries";
import { t } from "@/lib/i18n";

export const metadata = {
  title: "All AI Products - Find Referral Codes",
  description: "Browse 20+ AI products and find community-verified referral codes, invite links, and exclusive deals.",
  alternates: {
    languages: { en: "/en/products", "zh-CN": "/zh/products" },
  },
};

export default async function Page() {
  const products = await getAllProducts();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">{t("en", "products.title")}</h1>
        <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>
          {t("en", "products.desc")}
        </p>
      </div>

      <CategoryFilter products={products} locale="en" />
    </div>
  );
}
