import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/en/me", "/zh/me", "/en/sign-in", "/zh/sign-in"],
    },
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL || "https://ai-referral-hub.vercel.app"}/sitemap.xml`,
  };
}
