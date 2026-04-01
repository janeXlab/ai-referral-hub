import { t } from "@/lib/i18n";

export const metadata = { title: "联系 - AI Referral Hub" };

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20">
      <h1 className="text-3xl font-bold gradient-text mb-8">{t("zh", "footer.contact")}</h1>
      <div className="prose prose-invert prose-sm max-w-none space-y-6" style={{ color: "var(--text-secondary)" }}>
        <p>
          我们期待听到你的建议！如果你有任何疑问、反馈或需要关于邀请码的帮助，
          你可以通过我们的 GitHub 仓库联系我们：
        </p>
        <ul className="list-disc pl-5">
          <li>
            GitHub: <a href="https://github.com/janeXlab/ai-referral-hub" target="_blank" rel="noreferrer noopener" className="underline">janeXlab/ai-referral-hub</a>
          </li>
        </ul>
        <p>
          如果你遇到了任何 Bug 或想建议一个新功能，请随时在我们的 GitHub 仓库中打开一个 issue。
        </p>
      </div>
    </div>
  );
}
