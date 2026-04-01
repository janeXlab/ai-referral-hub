import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { ReferralCard } from "@/components/ReferralCard";
import { getTrendingReferrals, getLatestReferrals, getAllProducts } from "@/lib/queries";
import { t } from "@/lib/i18n";

export const metadata = {
  title: "AI Referral Hub - 发现 & 分享 AI 邀请码",
  description: "社区验证的邀请链接、额外额度和独家优惠，覆盖 50+ 款 AI 产品。",
  alternates: {
    languages: { en: "/en", "zh-CN": "/zh" },
  },
};

export default async function Page() {
  const [trending, latest, products] = await Promise.all([
    getTrendingReferrals(5),
    getLatestReferrals(5),
    getAllProducts(),
  ]);
  const featuredProducts = products.slice(0, 6);

  return (
    <div className="mx-auto w-full max-w-6xl px-4">
      {/* Hero */}
      <section className="relative py-20 text-center">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div
            className="absolute left-1/2 top-0 -translate-x-1/2 h-[500px] w-[800px] rounded-full opacity-20 blur-[120px]"
            style={{ background: "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))" }}
          />
        </div>

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          <span className="gradient-text">{t("zh", "home.hero.title")}</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg" style={{ color: "var(--text-secondary)" }}>
          {t("zh", "home.hero.subtitle")}
        </p>

        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="/zh/products"
            className="rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ background: "var(--accent)" }}
          >
            {t("zh", "home.browse")}
          </Link>
          <Link
            href="/zh/submit"
            className="rounded-xl px-6 py-3 text-sm font-semibold transition-all"
            style={{
              border: "1px solid var(--border-color)",
              color: "var(--text-secondary)",
              background: "var(--bg-card)",
            }}
          >
            {t("zh", "home.submit")}
          </Link>
        </div>

        <div className="mt-12 flex items-center justify-center gap-8 sm:gap-12">
          {[
            { num: `${products.length}+`, label: "AI 产品" },
            { num: "50+", label: "邀请码" },
            { num: "1K+", label: "社区成员" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold gradient-text">{stat.num}</div>
              <div className="mt-1 text-xs" style={{ color: "var(--text-muted)" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="grid gap-8 pb-16 lg:grid-cols-[1fr_320px]">
        <div className="space-y-10">
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                🔥 {t("zh", "home.trending")}
              </h2>
              <Link
                href="/zh/products"
                className="text-xs transition-colors"
                style={{ color: "var(--accent-hover)" }}
              >
                查看全部 &rarr;
              </Link>
            </div>
            <div className="space-y-3">
              {trending.map((r) => (
                <ReferralCard key={r.id} referral={r} locale="zh" showProduct />
              ))}
              {trending.length === 0 && (
                <div className="rounded-xl p-8 text-center text-sm" style={{ background: "var(--bg-card)", color: "var(--text-muted)" }}>
                  暂无热门邀请码，快来提交第一个吧！
                </div>
              )}
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold flex items-center gap-2">
              ✨ {t("zh", "home.latest")}
            </h2>
            <div className="space-y-3">
              {latest.map((r) => (
                <ReferralCard key={r.id} referral={r} locale="zh" showProduct />
              ))}
              {latest.length === 0 && (
                <div className="rounded-xl p-8 text-center text-sm" style={{ background: "var(--bg-card)", color: "var(--text-muted)" }}>
                  暂无邀请码，快来提交第一个吧！
                </div>
              )}
            </div>
          </section>

          <section
            className="rounded-xl p-6"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}
          >
            <h2 className="text-lg font-semibold">{t("zh", "home.how.title")}</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-3">
                  <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold"
                    style={{ background: "var(--accent-glow)", color: "var(--accent-hover)" }}
                  >
                    {i}
                  </div>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    {t("zh", `home.how.${i}`)}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-4">
          <AdSlot locale="zh" size="large" />

          <div
            className="rounded-xl p-4"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}
          >
            <h3 className="font-semibold text-sm mb-3">{t("zh", "home.categories")}</h3>
            <div className="space-y-1">
              {["Chat", "Coding", "Image", "Video", "DevTools", "Search"].map((cat) => (
                <Link
                  key={cat}
                  href="/zh/products"
                  className="flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors hover:bg-white/5"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <span>{cat}</span>
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {products.filter((p) => p.category === cat).length}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div
            className="rounded-xl p-4"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}
          >
            <h3 className="font-semibold text-sm mb-3">精选产品</h3>
            <div className="space-y-2">
              {featuredProducts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/zh/products/${p.slug}`}
                  className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-white/5"
                >
                  <span>{p.icon}</span>
                  <span style={{ color: "var(--text-secondary)" }}>{p.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
