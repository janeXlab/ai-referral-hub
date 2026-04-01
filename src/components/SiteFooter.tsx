import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";

export function SiteFooter({ locale }: { locale: Locale }) {
  return (
    <footer className="border-t py-12" style={{ borderColor: "var(--border-color)" }}>
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">🔗</span>
            <span className="font-bold gradient-text">{t(locale, "site.name")}</span>
          </div>

          <nav className="flex gap-6 text-sm" style={{ color: "var(--text-muted)" }}>
            <Link className="hover:text-white transition-colors" href={`/${locale}/about`}>
              {t(locale, "footer.about")}
            </Link>
            <Link className="hover:text-white transition-colors" href={`/${locale}/contact`}>
              {t(locale, "footer.contact")}
            </Link>
            <Link className="hover:text-white transition-colors" href={`/${locale}/privacy`}>
              {t(locale, "footer.privacy")}
            </Link>
            <Link className="hover:text-white transition-colors" href={`/${locale}/terms`}>
              {t(locale, "footer.terms")}
            </Link>
          </nav>

          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            &copy; {new Date().getFullYear()} AI Referral Hub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
