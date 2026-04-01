import { t } from "@/lib/i18n";

export const metadata = { title: "Contact - AI Referral Hub" };

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20">
      <h1 className="text-3xl font-bold gradient-text mb-8">{t("en", "footer.contact")}</h1>
      <div className="prose prose-invert prose-sm max-w-none space-y-6" style={{ color: "var(--text-secondary)" }}>
        <p>
          We&apos;d love to hear from you! If you have any questions, feedback, or need help with a referral code, 
          you can reach us through our GitHub repository.
        </p>
        <ul className="list-disc pl-5">
          <li>
            GitHub: <a href="https://github.com/janeXlab/ai-referral-hub" target="_blank" rel="noreferrer noopener" className="underline">janeXlab/ai-referral-hub</a>
          </li>
        </ul>
        <p>
          If you encounter any bugs or want to suggest a feature, please feel free to open an issue on our GitHub repository.
        </p>
      </div>
    </div>
  );
}
