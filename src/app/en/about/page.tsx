import { t } from "@/lib/i18n";

export const metadata = { title: "About - AI Referral Hub" };

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20">
      <h1 className="text-3xl font-bold gradient-text mb-8">{t("en", "footer.about")}</h1>
      <div className="prose prose-invert prose-sm max-w-none space-y-6" style={{ color: "var(--text-secondary)" }}>
        <p>
          AI Referral Hub is a community-driven platform for discovering and sharing referral codes for popular AI products. 
          Our mission is to help people access AI technology while rewarding contributors who share their invite links.
        </p>
        <h2 className="text-xl font-semibold text-white">How it works</h2>
        <p>
          Users can submit their own referral codes or links. The community upvotes codes that work and reports those that don&apos;t. 
          Verified codes earn you points and help you climb the leaderboard.
        </p>
        <p>
          Whether you&apos;re looking for extra credits on Claude, a discount on Cursor, or a bonus on ChatGPT Plus, 
          you can find community-verified deals here.
        </p>
      </div>
    </div>
  );
}
