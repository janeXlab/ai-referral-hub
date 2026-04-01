import type { MetadataRoute } from "next";
import { LOCALES } from "@/lib/i18n";
import { getAllProducts } from "@/lib/queries";

export const revalidate = 3600;

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ai-referral-hub.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const products = await getAllProducts();

  const staticPaths = [
    "/",
    "/products",
    "/submit",
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    // Static Pages
    for (const p of staticPaths) {
      entries.push({
        url: `${BASE_URL}/${locale}${p === "/" ? "" : p}`,
        lastModified: now,
        changeFrequency: p === "/" ? "daily" : "weekly",
        priority: p === "/" ? 1.0 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map((l) => [l, `${BASE_URL}/${l}${p === "/" ? "" : p}`])
          ),
        },
      });
    }

    // Dynamic Product Pages
    for (const product of products) {
      entries.push({
        url: `${BASE_URL}/${locale}/products/${product.slug}`,
        lastModified: now,
        changeFrequency: "daily",
        priority: 0.9,
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map((l) => [l, `${BASE_URL}/${l}/products/${product.slug}`])
          ),
        },
      });
    }
  }

  return entries;
}
