import { t } from "@/lib/i18n";

export const metadata = { title: "服务条款 - AI Referral Hub" };

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20">
      <h1 className="text-3xl font-bold gradient-text mb-8">{t("zh", "footer.terms")}</h1>
      <div className="prose prose-invert prose-sm max-w-none space-y-6" style={{ color: "var(--text-secondary)" }}>
        <p>通过使用 AI Referral Hub，你同意遵守以下简单的服务条款。</p>
        <h2 className="text-xl font-semibold text-white">1. 社区行为规则</h2>
        <p>
          请勿提交诈骗邀请码、虚假承诺或木马。不要通过重复提交邀请码来滥用系统。
          请尊重社区的其他成员。
        </p>
        <h2 className="text-xl font-semibold text-white">2. 信息的准确性</h2>
        <p>
          我们不能保证每一个邀请码或链接都能像描述的那样生效。邀请码会过期，
          平台规则会变化，有时用户也会犯错。
        </p>
        <h2 className="text-xl font-semibold text-white">3. 平台权利</h2>
        <p>
          我们保留删除任何违反规则或干扰社区的内容或账户的权利。
        </p>
      </div>
    </div>
  );
}
