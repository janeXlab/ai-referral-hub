import { getAllProducts } from "@/lib/queries";
import { submitReferral } from "@/lib/actions";
import { t } from "@/lib/i18n";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const metadata = {
  title: "提交邀请码",
  description: "分享你的 AI 产品邀请码或邀请链接，帮助社区成员获得优惠。",
};

const CATEGORY_OPTIONS = [
  "Chat",
  "Coding",
  "Image",
  "Video",
  "Audio",
  "Writing",
  "Search",
  "Productivity",
  "DevTools",
];

type Props = {
  searchParams: Promise<{ submitted?: string; error?: string }>;
};

export default async function Page({ searchParams }: Props) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/zh/sign-in");
  }

  const sp = await searchParams;
  const submitted = sp.submitted;
  const error = typeof sp.error === "string" ? sp.error : undefined;
  const products = await getAllProducts();

  const inputStyle = {
    background: "var(--bg-secondary)",
    border: "1px solid var(--border-color)",
    color: "var(--text-primary)",
  };

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-bold tracking-tight">{t("zh", "submit.title")}</h1>
      <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>
        {t("zh", "submit.note")}
      </p>

      {submitted === "1" ? (
        <div
          className="mt-6 rounded-xl border px-4 py-3 text-sm"
          style={{
            background: "color-mix(in srgb, var(--accent) 12%, transparent)",
            borderColor: "var(--accent)",
            color: "var(--text-primary)",
          }}
          role="status"
        >
          {t("zh", "submit.submitted")}
        </div>
      ) : null}

      {submitted === "pending" ? (
        <div
          className="mt-6 rounded-xl border px-4 py-3 text-sm"
          style={{
            background: "color-mix(in srgb, #f59e0b 12%, transparent)",
            borderColor: "rgba(245, 158, 11, 0.45)",
            color: "var(--text-primary)",
          }}
          role="status"
        >
          {t("zh", "submit.submitted.pending")}
        </div>
      ) : null}

      {error ? (
        <div
          className="mt-6 rounded-xl border px-4 py-3 text-sm"
          style={{
            background: "color-mix(in srgb, #ef4444 12%, transparent)",
            borderColor: "rgba(239, 68, 68, 0.45)",
            color: "var(--text-primary)",
          }}
          role="alert"
        >
          {error}
        </div>
      ) : null}

      <form
        action={submitReferral}
        className="mt-8 space-y-5 rounded-xl p-6"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}
      >
        <input type="hidden" name="locale" value="zh" />

        <div className="grid gap-2">
          <label htmlFor="product_id" className="text-sm font-medium">{t("zh", "submit.product")}</label>
          <select
            id="product_id"
            name="product_id"
            className="rounded-xl px-3 py-2.5 text-sm appearance-none cursor-pointer"
            style={inputStyle}
          >
            <option value="">{t("zh", "submit.product.ph")}</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.icon} {p.name}
              </option>
            ))}
          </select>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            {t("zh", "submit.product.new")}
          </p>
        </div>

        <div className="grid gap-2">
          <label htmlFor="code" className="text-sm font-medium">{t("zh", "submit.code")}</label>
          <input
            id="code"
            name="code"
            required
            className="rounded-xl px-3 py-2.5 text-sm"
            style={inputStyle}
            placeholder={t("zh", "submit.code.ph")}
          />
        </div>

        <div className="grid gap-2">
          <label htmlFor="link" className="text-sm font-medium">{t("zh", "submit.link")}</label>
          <input
            id="link"
            name="link"
            type="url"
            className="rounded-xl px-3 py-2.5 text-sm"
            style={inputStyle}
            placeholder="https://..."
          />
        </div>

        <div className="grid gap-2">
          <label htmlFor="benefit_en" className="text-sm font-medium">{t("zh", "submit.benefit")}（英文）</label>
          <textarea
            id="benefit_en"
            name="benefit_en"
            required
            className="min-h-[70px] rounded-xl px-3 py-2.5 text-sm"
            style={inputStyle}
            placeholder="Describe the benefit in English..."
          />
        </div>

        <div className="grid gap-2">
          <label htmlFor="benefit_zh" className="text-sm font-medium">{t("zh", "submit.benefit")}（中文）</label>
          <textarea
            id="benefit_zh"
            name="benefit_zh"
            required
            className="min-h-[70px] rounded-xl px-3 py-2.5 text-sm"
            style={inputStyle}
            placeholder={t("zh", "submit.benefit.ph")}
          />
        </div>

        <details
          className="rounded-xl border p-4"
          style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)" }}
        >
          <summary className="cursor-pointer text-sm font-semibold">
            {t("zh", "submit.new.title")}
          </summary>

          <div className="mt-4 grid gap-4">
            <div className="grid gap-2">
              <label htmlFor="new_product_name" className="text-sm font-medium">{t("zh", "submit.new.name")}</label>
              <input
                id="new_product_name"
                name="new_product_name"
                className="rounded-xl px-3 py-2.5 text-sm"
                style={inputStyle}
                placeholder={t("zh", "submit.new.name.ph")}
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="new_product_website" className="text-sm font-medium">{t("zh", "submit.new.website")}</label>
              <input
                id="new_product_website"
                name="new_product_website"
                type="url"
                className="rounded-xl px-3 py-2.5 text-sm"
                style={inputStyle}
                placeholder={t("zh", "submit.new.website.ph")}
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="new_product_category" className="text-sm font-medium">{t("zh", "submit.new.category")}</label>
              <select
                id="new_product_category"
                name="new_product_category"
                className="rounded-xl px-3 py-2.5 text-sm appearance-none cursor-pointer"
                style={inputStyle}
              >
                <option value="">{t("zh", "submit.new.category.ph")}</option>
                {CATEGORY_OPTIONS.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-2">
              <label htmlFor="new_product_tagline_en" className="text-sm font-medium">{t("zh", "submit.new.tagline_en")}</label>
              <textarea
                id="new_product_tagline_en"
                name="new_product_tagline_en"
                className="min-h-[70px] rounded-xl px-3 py-2.5 text-sm"
                style={inputStyle}
                placeholder={t("zh", "submit.new.tagline_en.ph")}
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="new_product_tagline_zh" className="text-sm font-medium">{t("zh", "submit.new.tagline_zh")}</label>
              <textarea
                id="new_product_tagline_zh"
                name="new_product_tagline_zh"
                className="min-h-[70px] rounded-xl px-3 py-2.5 text-sm"
                style={inputStyle}
                placeholder={t("zh", "submit.new.tagline_zh.ph")}
              />
            </div>
          </div>
        </details>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <label htmlFor="region" className="text-sm font-medium">{t("zh", "submit.region")}</label>
            <input
              id="region"
              name="region"
              className="rounded-xl px-3 py-2.5 text-sm"
              style={inputStyle}
              placeholder={t("zh", "submit.region.ph")}
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="expires_at" className="text-sm font-medium">{t("zh", "submit.expiry")}</label>
            <input
              id="expires_at"
              name="expires_at"
              type="date"
              className="rounded-xl px-3 py-2.5 text-sm"
              style={inputStyle}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-xl px-4 py-3 text-sm font-semibold text-white transition-all hover:opacity-90 cursor-pointer"
          style={{ background: "var(--accent)" }}
        >
          {t("zh", "submit.btn")}
        </button>
      </form>
    </div>
  );
}
