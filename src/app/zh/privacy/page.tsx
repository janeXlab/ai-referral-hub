import { t } from "@/lib/i18n";

export const metadata = { title: "隐私政策 - AI Referral Hub" };

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20">
      <h1 className="text-3xl font-bold gradient-text mb-8">{t("zh", "footer.privacy")}</h1>
      <div className="prose prose-invert prose-sm max-w-none space-y-6" style={{ color: "var(--text-secondary)" }}>
        <p>你的隐私对我们非常重要。本隐私政策解释了我们收集哪些信息以及如何使用这些信息。</p>
        <h2 className="text-xl font-semibold text-white">我们收集的信息</h2>
        <p>
          我们收集最少的信息来提供我们的服务。这包括：
        </p>
        <ul className="list-disc pl-5">
          <li>你登录时的基本账户信息（电子邮件或社交账号）。</li>
          <li>你向社区提交的邀请码或邀请链接。</li>
          <li>帮助我们改进平台的基本使用数据。</li>
        </ul>
        <h2 className="text-xl font-semibold text-white">我们如何使用你的信息</h2>
        <p>
          我们将收集的信息用于管理你的账户、显示你提交的邀请码以及防止对我们平台的滥用。
          我们不会将你的个人信息出售给第三方。
        </p>
      </div>
    </div>
  );
}
