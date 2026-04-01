import { CategoryFilter } from "@/components/CategoryFilter";
import { getAllProducts } from "@/lib/queries";
import { t } from "@/lib/i18n";

export const metadata = {
  title: "全部产品 - AI 邀请码大全",
  description: "浏览 20+ 款 AI 产品，获取社区验证的邀请码、邀请链接和独家优惠。",
  alternates: {
    languages: { en: "/en/products", "zh-CN": "/zh/products" },
  },
};

export default async function Page() {
  const products = await getAllProducts();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">{t("zh", "products.title")}</h1>
        <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>
          {t("zh", "products.desc")}
        </p>
      </div>

      <CategoryFilter products={products} locale="zh" />
    </div>
  );
}
