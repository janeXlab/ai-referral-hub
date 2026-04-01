import { t } from "@/lib/i18n";
import { signInWithGitHub, signInWithEmail } from "@/lib/actions";

export const metadata = { title: "Sign In" };

type Props = {
  searchParams: Promise<{ sent?: string; error?: string }>;
};

export default async function Page({ searchParams }: Props) {
  const sp = await searchParams;
  const sent = sp.sent === "1";
  const error = typeof sp.error === "string" ? sp.error : undefined;

  const inputStyle = {
    background: "var(--bg-secondary)",
    border: "1px solid var(--border-color)",
    color: "var(--text-primary)",
  };

  return (
    <div className="mx-auto w-full max-w-md px-4 py-10">
      <h1 className="text-2xl font-bold tracking-tight">{t("en", "signin.title")}</h1>
      <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>
        {t("en", "signin.note")}
      </p>

      {sent ? (
        <div
          className="mt-6 rounded-xl border px-4 py-3 text-sm"
          style={{
            background: "color-mix(in srgb, var(--accent) 12%, transparent)",
            borderColor: "var(--accent)",
            color: "var(--text-primary)",
          }}
          role="status"
        >
          {t("en", "signin.sent")}
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

      <div
        className="mt-8 space-y-5 rounded-xl p-6"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}
      >
        {/* OAuth buttons */}
        <form action={async () => { "use server"; await signInWithGitHub("en"); }}>
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-all cursor-pointer"
            style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-color)" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            {t("en", "signin.github")}
          </button>
        </form>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px" style={{ background: "var(--border-color)" }} />
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>or</span>
          <div className="flex-1 h-px" style={{ background: "var(--border-color)" }} />
        </div>

        <form action={signInWithEmail}>
          <input type="hidden" name="locale" value="en" />
          <div className="grid gap-2">
            <label className="text-sm font-medium">{t("en", "signin.email")}</label>
            <input
              name="email"
              type="email"
              required
              className="rounded-xl px-3 py-2.5 text-sm"
              style={inputStyle}
              placeholder={t("en", "signin.email.ph")}
            />
          </div>

          <button
            type="submit"
            className="mt-5 w-full rounded-xl px-4 py-3 text-sm font-semibold text-white transition-all hover:opacity-90 cursor-pointer"
            style={{ background: "var(--accent)" }}
          >
            {t("en", "signin.btn")}
          </button>
        </form>
      </div>
    </div>
  );
}
