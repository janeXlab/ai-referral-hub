import { notFound } from "next/navigation";
import { AdSlot } from "@/components/AdSlot";
import { ReferralCard } from "@/components/ReferralCard";
import { getAllProducts, getProductBySlug, getReferralsForProduct } from "@/lib/queries";
import { t } from "@/lib/i18n";

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} Referral Codes & Invite Links`,
    description: `Find the best referral codes and invite links for ${product.name}. ${product.tagline_en}.`,
    alternates: {
      languages: {
        en: `/en/products/${slug}`,
        "zh-CN": `/zh/products/${slug}`,
      },
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return notFound();

  const list = await getReferralsForProduct(product.id);
  const verifiedCount = list.filter((r) => r.is_verified).length;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.tagline_en,
    url: product.website,
    category: product.category,
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Product header */}
      <div className="flex items-start gap-4 mb-8">
        <div
          className="flex h-14 w-14 items-center justify-center rounded-xl text-2xl shrink-0"
          style={{ background: `${product.color}22` }}
        >
          {product.icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl font-bold tracking-tight">{product.name}</h1>
            <span
              className="rounded-full px-2.5 py-0.5 text-xs font-medium"
              style={{ background: "var(--accent-glow)", color: "var(--accent-hover)" }}
            >
              {product.category}
            </span>
          </div>
          <p className="mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>
            {product.tagline_en}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <a
              className="rounded-lg px-3 py-1.5 text-xs font-medium transition-colors"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-color)",
                color: "var(--text-secondary)",
              }}
              href={product.website}
              target="_blank"
              rel="noreferrer"
            >
              {t("en", "product.official")} &rarr;
            </a>
            <a
              className="rounded-lg px-3 py-1.5 text-xs font-medium transition-colors"
              style={{ background: "var(--accent)", color: "#fff" }}
              href="/en/submit"
            >
              {t("en", "product.submit")}
            </a>
            <span className="rounded-lg px-3 py-1.5 text-xs" style={{ color: "var(--text-muted)" }}>
              {product.pricing}
            </span>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div
        className="mb-6 flex gap-6 rounded-xl p-4 text-sm"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}
      >
        <div>
          <span style={{ color: "var(--text-muted)" }}>Total codes: </span>
          <span className="font-semibold">{list.length}</span>
        </div>
        <div>
          <span style={{ color: "var(--text-muted)" }}>Verified: </span>
          <span className="font-semibold" style={{ color: "var(--success)" }}>{verifiedCount}</span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <section className="space-y-3">
          {list.length ? (
            list.map((r) => <ReferralCard key={r.id} referral={r} locale="en" />)
          ) : (
            <div
              className="rounded-xl p-8 text-center text-sm"
              style={{ background: "var(--bg-card)", color: "var(--text-muted)" }}
            >
              {t("en", "product.nocodes")}
            </div>
          )}
        </section>

        <aside className="space-y-4">
          <AdSlot locale="en" />
          <div
            className="rounded-xl p-4 text-sm"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}
          >
            <div className="font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
              {t("en", "product.rules.title")}
            </div>
            <ul className="list-disc space-y-1 pl-5" style={{ color: "var(--text-secondary)" }}>
              <li>{t("en", "product.rules.1")}</li>
              <li>{t("en", "product.rules.2")}</li>
              <li>{t("en", "product.rules.3")}</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
