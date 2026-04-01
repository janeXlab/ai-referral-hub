import { t } from "@/lib/i18n";

export const metadata = { title: "Privacy Policy - AI Referral Hub" };

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20">
      <h1 className="text-3xl font-bold gradient-text mb-8">{t("en", "footer.privacy")}</h1>
      <div className="prose prose-invert prose-sm max-w-none space-y-6" style={{ color: "var(--text-secondary)" }}>
        <p>Your privacy is important to us. This Privacy Policy explains what information we collect and how we use it.</p>
        <h2 className="text-xl font-semibold text-white">Information We Collect</h2>
        <p>
          We collect minimal information to provide our services. This includes:
        </p>
        <ul className="list-disc pl-5">
          <li>Basic account information when you sign in (email or social account).</li>
          <li>Referral codes or links you submit to the community.</li>
          <li>Basic usage data to help us improve the platform.</li>
        </ul>
        <h2 className="text-xl font-semibold text-white">How We Use Your Information</h2>
        <p>
          We use the information we collect to manage your account, display your submitted referral codes, 
          and prevent abuse of our platform. We do not sell your personal information to third parties.
        </p>
      </div>
    </div>
  );
}
