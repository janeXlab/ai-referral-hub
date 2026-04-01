"use client";

import { useState } from "react";
import type { Locale } from "@/lib/i18n";

type ReferralData = {
  id: string;
  code: string;
  link: string | null;
  benefit_en: string;
  benefit_zh: string;
  region: string | null;
  expires_at: string | null;
  is_verified: boolean;
  created_at: string;
  vote_count: number;
  author_handle: string;
  product?: {
    slug: string;
    name: string;
    icon: string | null;
    color: string | null;
  };
};

export function ReferralCard({
  referral,
  locale,
  showProduct = false,
}: {
  referral: ReferralData;
  locale: Locale;
  showProduct?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const [votes, setVotes] = useState(referral.vote_count);
  const [myVote, setMyVote] = useState(0);

  const copy = async () => {
    const text = referral.link || referral.code;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVote = async (value: 1 | -1) => {
    try {
      const res = await fetch("/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ referralId: referral.id, value }),
      });
      const data = await res.json();
      if (data.error) {
        alert(data.error);
        return;
      }
      if (myVote === value) {
        setMyVote(0);
        setVotes(votes - value);
      } else {
        setVotes(votes - myVote + value);
        setMyVote(value);
      }
    } catch {
      alert("Please sign in to vote");
    }
  };

  const benefit = locale === "en" ? referral.benefit_en : referral.benefit_zh;
  const isExpired = referral.expires_at && new Date(referral.expires_at) < new Date();
  const timeAgo = getTimeAgo(referral.created_at, locale);

  return (
    <div
      className="rounded-xl p-4 transition-all card-glow"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-color)",
        opacity: isExpired ? 0.6 : 1,
      }}
    >
      <div className="flex gap-3">
        {/* Vote buttons */}
        <div className="flex flex-col items-center gap-1 shrink-0">
          <button
            onClick={() => handleVote(1)}
            className="flex h-7 w-7 items-center justify-center rounded-lg transition-colors cursor-pointer"
            style={{
              background: myVote === 1 ? "var(--accent-glow)" : "var(--bg-secondary)",
              color: myVote === 1 ? "var(--accent)" : "var(--text-muted)",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <path d="M6 2L10 8H2L6 2Z" />
            </svg>
          </button>
          <span className="text-xs font-semibold" style={{ color: votes > 0 ? "var(--success)" : votes < 0 ? "var(--error)" : "var(--text-muted)" }}>
            {votes}
          </span>
          <button
            onClick={() => handleVote(-1)}
            className="flex h-7 w-7 items-center justify-center rounded-lg transition-colors cursor-pointer"
            style={{
              background: myVote === -1 ? "var(--error-glow, rgba(239,68,68,0.1))" : "var(--bg-secondary)",
              color: myVote === -1 ? "var(--error, #ef4444)" : "var(--text-muted)",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <path d="M6 10L2 4H10L6 10Z" />
            </svg>
          </button>
        </div>

        <div className="flex-1 min-w-0">
          {showProduct && referral.product && (
            <a
              href={`/${locale}/products/${referral.product.slug}`}
              className="mb-2 flex items-center gap-1.5 text-xs transition-colors hover:opacity-80"
              style={{ color: "var(--text-muted)" }}
            >
              <span>{referral.product.icon}</span>
              <span className="font-medium">{referral.product.name}</span>
            </a>
          )}

          <div className="flex items-center gap-2 flex-wrap">
            <code
              className="rounded-lg px-2.5 py-1 text-sm font-mono cursor-pointer transition-all hover:opacity-80"
              style={{ background: "var(--bg-secondary)", color: "var(--accent-hover)" }}
              onClick={copy}
              title={locale === "en" ? "Click to copy" : "点击复制"}
            >
              {referral.code}
            </code>
            <button
              onClick={copy}
              className="rounded-lg px-2 py-1 text-xs transition-all cursor-pointer"
              style={{
                background: copied ? "var(--success)" : "var(--accent)",
                color: "#fff",
              }}
            >
              {copied
                ? locale === "en" ? "Copied!" : "已复制!"
                : locale === "en" ? "Copy" : "复制"}
            </button>
            {referral.is_verified && (
              <span
                className="flex items-center gap-1 text-xs"
                style={{ color: "var(--success)" }}
              >
                <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 0a8 8 0 110 16A8 8 0 018 0zm3.41 5.29a.75.75 0 00-1.06-1.06L7 7.59 5.65 6.24a.75.75 0 10-1.06 1.06l2 2a.75.75 0 001.06 0l4-4z" />
                </svg>
                {locale === "en" ? "Verified" : "已验证"}
              </span>
            )}
            {isExpired && (
              <span className="text-xs" style={{ color: "var(--error, #ef4444)" }}>
                {locale === "en" ? "Expired" : "已过期"}
              </span>
            )}
          </div>

          <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>
            {benefit}
          </p>

          <div className="mt-2 flex items-center gap-3 text-xs" style={{ color: "var(--text-muted)" }}>
            <span>@{referral.author_handle}</span>
            {referral.region && <span>{referral.region}</span>}
            <span>{timeAgo}</span>
            {referral.link && (
              <a
                href={referral.link}
                target="_blank"
                rel="noreferrer noopener"
                className="ml-auto transition-colors hover:opacity-80"
                style={{ color: "var(--accent-hover)" }}
              >
                {locale === "en" ? "Use link" : "使用链接"} &rarr;
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function getTimeAgo(dateStr: string, locale: Locale): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (locale === "en") {
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return `${minutes}m ago`;
  }
  if (days > 0) return `${days}天前`;
  if (hours > 0) return `${hours}小时前`;
  return `${minutes}分钟前`;
}
