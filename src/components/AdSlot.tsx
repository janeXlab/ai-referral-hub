import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";

type Props = {
  locale?: Locale;
  size?: "small" | "large";
};

export function AdSlot({ locale = "en", size = "small" }: Props) {
  return (
    <div
      className="rounded-xl p-4 text-sm"
      style={{
        background: "var(--bg-card)",
        border: "1px dashed var(--border-color)",
        color: "var(--text-muted)",
      }}
    >
      <div className="flex items-center justify-between">
        <span className="font-medium" style={{ color: "var(--text-secondary)" }}>
          {t(locale, "ad.label")}
        </span>
        <span className="text-xs opacity-60">Ad</span>
      </div>
      <div
        className="mt-3 flex items-center justify-center rounded-lg"
        style={{
          background: "var(--bg-secondary)",
          height: size === "large" ? "160px" : "100px",
          border: "1px solid var(--border-color)",
        }}
      >
        <span className="text-xs">Your ad here</span>
      </div>
      <p className="mt-2 text-xs">
        {locale === "en"
          ? "Reach thousands of AI enthusiasts. Contact us for placements."
          : "触达数千 AI 爱好者。联系我们投放广告。"}
      </p>
    </div>
  );
}
