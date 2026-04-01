import { t } from "@/lib/i18n";

export const metadata = { title: "Terms of Service - AI Referral Hub" };

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20">
      <h1 className="text-3xl font-bold gradient-text mb-8">{t("en", "footer.terms")}</h1>
      <div className="prose prose-invert prose-sm max-w-none space-y-6" style={{ color: "var(--text-secondary)" }}>
        <p>By using AI Referral Hub, you agree to follow these simple terms of service.</p>
        <h2 className="text-xl font-semibold text-white">1. Community Behavior</h2>
        <p>
          Don&apos;t submit scam codes, false promises, or malware. Don&apos;t spam the system with duplicate codes. 
          Be respectful to the community.
        </p>
        <h2 className="text-xl font-semibold text-white">2. Accuracy of Information</h2>
        <p>
          We don&apos;t guarantee that every referral code or link will work as described. Codes expire, 
          terms change, and sometimes users make mistakes.
        </p>
        <h2 className="text-xl font-semibold text-white">3. Platform Changes</h2>
        <p>
          We reserve the right to remove any content or account that violates our rules or 
          disrupts the community.
        </p>
      </div>
    </div>
  );
}
