import { t } from "@/lib/i18n";

export const metadata = { title: "关于 - AI Referral Hub" };

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20">
      <h1 className="text-3xl font-bold gradient-text mb-8">{t("zh", "footer.about")}</h1>
      <div className="prose prose-invert prose-sm max-w-none space-y-6" style={{ color: "var(--text-secondary)" }}>
        <p>
          AI Referral Hub 是一个由社区驱动的平台，旨在发现和分享热门 AI 产品的邀请码和优惠信息。
          我们的使命是帮助人们以更低的门槛使用 AI 技术，同时也奖励那些分享邀请链接的贡献者。
        </p>
        <h2 className="text-xl font-semibold text-white">运作机制</h2>
        <p>
          用户可以提交自己的邀请码或链接。社区会点赞真实有效的邀请码，并举报那些失效或虚假的。
          被验证有效的邀请码能为你赚取积分，并提升你在排行榜上的位置。
        </p>
        <p>
          无论你是在寻找 Claude 的额外额度、Cursor 的折扣，还是 ChatGPT Plus 的奖励，
          你都可以在这里找到社区验证后的优惠。
        </p>
      </div>
    </div>
  );
}
