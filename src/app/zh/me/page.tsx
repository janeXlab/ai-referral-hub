import { createClient } from "@/lib/supabase/server";
import { getUserProfile, getUserReferrals } from "@/lib/queries";
import { signOut } from "@/lib/actions";
import { t } from "@/lib/i18n";
import { redirect } from "next/navigation";

export const metadata = { title: "我的" };

export default async function Page() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/zh/sign-in");
  }

  const profile = await getUserProfile(user.id);
  const referrals = await getUserReferrals(user.id);
  const totalVotes = referrals.reduce((sum, r) => sum + r.vote_count, 0);

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">{t("zh", "me.title")}</h1>
        <form action={signOut}>
          <button
            type="submit"
            className="rounded-xl px-3 py-1.5 text-xs font-medium transition-all cursor-pointer"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", color: "var(--text-secondary)" }}
          >
            退出登录
          </button>
        </form>
      </div>
      <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>
        @{profile?.handle || "anonymous"} &middot; {t("zh", "me.note")}
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          { label: t("zh", "me.points"), value: String(profile?.points ?? 0), icon: "🏆" },
          { label: t("zh", "me.codes"), value: String(referrals.length), icon: "🔗" },
          { label: "总投票数", value: String(totalVotes), icon: "📊" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl p-5"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">{stat.icon}</span>
              <span className="text-sm" style={{ color: "var(--text-muted)" }}>{stat.label}</span>
            </div>
            <div className="mt-2 text-3xl font-bold">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 space-y-3">
        <h2 className="text-lg font-semibold">我的邀请码</h2>
        {referrals.length > 0 ? (
          referrals.map((r) => (
            <div
              key={r.id}
              className="rounded-xl p-4"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span>{r.product?.icon}</span>
                  <span className="font-medium">{r.product?.name}</span>
                  <code className="rounded px-2 py-0.5 text-xs" style={{ background: "var(--bg-secondary)", color: "var(--accent-hover)" }}>
                    {r.code}
                  </code>
                </div>
                <div className="flex items-center gap-3 text-xs" style={{ color: "var(--text-muted)" }}>
                  {r.is_verified && <span style={{ color: "var(--success)" }}>已验证</span>}
                  <span>投票: {r.vote_count}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div
            className="rounded-xl p-6 text-center"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}
          >
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              你还没有提交过邀请码。
            </p>
            <a
              href="/zh/submit"
              className="mt-4 inline-block rounded-xl px-6 py-2.5 text-sm font-semibold text-white"
              style={{ background: "var(--accent)" }}
            >
              提交你的第一个邀请码
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
