import { getAllProducts } from "@/lib/queries";
import { submitReferral } from "@/lib/actions";
import { t } from "@/lib/i18n";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Submit a Referral Code",
  description: "Share your AI product referral code or invite link with the community.",
};

export default async function Page() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect("/en/sign-in");
  }

  const products = await getAllProducts();

  const inputStyle = {
    background: "var(--bg-secondary)",
    border: "1px solid var(--border-color)",
    color: "var(--text-primary)",
  };

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-bold tracking-tight">{t("en", "submit.title")}</h1>
      <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>
        {t("en", "submit.note")}
      </p>

      <form
        action={submitReferral}
        className="mt-8 space-y-5 rounded-xl p-6"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}
      >
        <div className="grid gap-2">
          <label className="text-sm font-medium">{t("en", "submit.product")}</label>
          <select
            name="product_id"
            required
            className="rounded-xl px-3 py-2.5 text-sm appearance-none cursor-pointer"
            style={inputStyle}
          >
            <option value="">{t("en", "submit.product.ph")}</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.icon} {p.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium">{t("en", "submit.code")}</label>
          <input
            name="code"
            required
            className="rounded-xl px-3 py-2.5 text-sm"
            style={inputStyle}
            placeholder={t("en", "submit.code.ph")}
          />
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium">Referral Link (optional)</label>
          <input
            name="link"
            type="url"
            className="rounded-xl px-3 py-2.5 text-sm"
            style={inputStyle}
            placeholder="https://..."
          />
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium">{t("en", "submit.benefit")} (English)</label>
          <textarea
            name="benefit_en"
            required
            className="min-h-[70px] rounded-xl px-3 py-2.5 text-sm"
            style={inputStyle}
            placeholder={t("en", "submit.benefit.ph")}
          />
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium">{t("en", "submit.benefit")} (Chinese)</label>
          <textarea
            name="benefit_zh"
            required
            className="min-h-[70px] rounded-xl px-3 py-2.5 text-sm"
            style={inputStyle}
            placeholder="描述使用此邀请码的好处..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <label className="text-sm font-medium">{t("en", "submit.region")}</label>
            <input
              name="region"
              className="rounded-xl px-3 py-2.5 text-sm"
              style={inputStyle}
              placeholder={t("en", "submit.region.ph")}
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium">{t("en", "submit.expiry")}</label>
            <input
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
          {t("en", "submit.btn")}
        </button>
      </form>
    </div>
  );
}
