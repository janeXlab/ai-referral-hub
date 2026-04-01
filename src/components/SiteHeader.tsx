import type { Locale } from "@/lib/i18n";
import { t, otherLocale } from "@/lib/i18n";
import { createClient } from "@/lib/supabase/server";

export async function SiteHeader({ locale }: { locale: Locale }) {
  const other = otherLocale(locale);
  
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-xl"
      style={{ borderColor: "var(--border-color)", background: "var(--bg-primary-alpha, rgba(12,12,15,0.8))" }}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <a href={`/${locale}`} className="flex items-center gap-2 font-bold tracking-tight">
          <span className="text-lg">🔗</span>
          <span className="gradient-text">{t(locale, "site.name")}</span>
        </a>

        <nav className="flex items-center gap-4 text-sm">
          <a
            href={`/${locale}/products`}
            className="transition-colors hover:text-white"
            style={{ color: "var(--text-secondary)" }}
          >
            {t(locale, "nav.products")}
          </a>
          <a
            href={`/${locale}/submit`}
            className="transition-colors hover:text-white"
            style={{ color: "var(--text-secondary)" }}
          >
            {t(locale, "nav.submit")}
          </a>
          <a
            href={`/${other}`}
            className="rounded-lg px-2 py-1 text-xs transition-colors"
            style={{ color: "var(--text-muted)" }}
          >
            {other === "en" ? "EN" : "中文"}
          </a>
          {user ? (
            <a
              href={`/${locale}/me`}
              className="rounded-xl px-3 py-1.5 text-xs font-medium transition-all"
              style={{ background: "var(--accent)", color: "#fff" }}
            >
              {t(locale, "nav.me")}
            </a>
          ) : (
            <a
              href={`/${locale}/sign-in`}
              className="rounded-xl px-3 py-1.5 text-xs font-medium transition-all"
              style={{ background: "var(--accent)", color: "#fff" }}
            >
              {t(locale, "nav.signin")}
            </a>
          )}
        </nav>
      </div>
    </header>
  );
}
