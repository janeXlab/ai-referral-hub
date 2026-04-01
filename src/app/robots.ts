import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/en/me", "/zh/me", "/en/sign-in", "/zh/sign-in"],
    },
    sitemap: "https://aireferralhub.com/sitemap.xml",
  };
}
