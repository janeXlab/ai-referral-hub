"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { t, type Locale } from "@/lib/i18n";

function normalizeLocale(value: string | null): Locale {
  return value === "zh" ? "zh" : "en";
}

function slugifyProductName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
}

function buildSubmitErrorPath(locale: Locale, message: string): never {
  redirect(`/${locale}/submit?error=${encodeURIComponent(message)}`);
}

export async function signInWithGitHub(locale: string) {
  const supabase = await createClient();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${siteUrl}/auth/callback?next=/${locale}`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  if (data.url) {
    redirect(data.url);
  }
}

export async function signInWithGoogle(locale: string) {
  const supabase = await createClient();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${siteUrl}/auth/callback?next=/${locale}`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  if (data.url) {
    redirect(data.url);
  }
}

export async function signInWithEmail(formData: FormData): Promise<void> {
  const supabase = await createClient();
  const raw = (formData.get("email") as string) || "";
  const email = raw.trim().toLowerCase();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const locale = normalizeLocale((formData.get("locale") as string) || "en");

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    redirect(`/${locale}/sign-in?error=${encodeURIComponent(t(locale, "signin.error.invalid"))}`);
  }

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${siteUrl}/auth/callback?next=/${locale}`,
    },
  });

  if (error) {
    const msg = `${t(locale, "signin.error.prefix")}${error.message}`;
    redirect(`/${locale}/sign-in?error=${encodeURIComponent(msg)}`);
  }

  redirect(`/${locale}/sign-in?sent=1`);
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/en");
}

export async function submitReferral(formData: FormData): Promise<void> {
  const supabase = await createClient();
  const locale = normalizeLocale(formData.get("locale") as string);

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect(`/${locale}/sign-in`);
  }

  const productId = ((formData.get("product_id") as string) || "").trim();
  const code = ((formData.get("code") as string) || "").trim();
  const link = ((formData.get("link") as string) || "").trim() || null;
  const benefitEn = ((formData.get("benefit_en") as string) || "").trim();
  const benefitZh = ((formData.get("benefit_zh") as string) || "").trim();
  const region = ((formData.get("region") as string) || "").trim() || "Global";
  const expiresAt = ((formData.get("expires_at") as string) || "").trim() || null;
  const newProductName = ((formData.get("new_product_name") as string) || "").trim();
  const newProductWebsite = ((formData.get("new_product_website") as string) || "").trim();
  const newProductCategory = ((formData.get("new_product_category") as string) || "").trim();
  const newProductTaglineEn = ((formData.get("new_product_tagline_en") as string) || "").trim();
  const newProductTaglineZh = ((formData.get("new_product_tagline_zh") as string) || "").trim();

  const hasNewProductInput = Boolean(
    newProductName || newProductWebsite || newProductCategory || newProductTaglineEn || newProductTaglineZh
  );

  if (!code || !benefitEn || !benefitZh) {
    buildSubmitErrorPath(locale, t(locale, "submit.error.missing"));
  }

  if (!productId && !hasNewProductInput) {
    buildSubmitErrorPath(locale, t(locale, "submit.error.product_required"));
  }

  if (
    !productId
    && (!newProductName || !newProductWebsite || !newProductCategory || !newProductTaglineEn || !newProductTaglineZh)
  ) {
    buildSubmitErrorPath(locale, t(locale, "submit.error.new_product_incomplete"));
  }

  if (link) {
    try {
      new URL(link);
    } catch {
      buildSubmitErrorPath(locale, t(locale, "submit.error.invalid_referral_link"));
    }
  }

  let resolvedProductId = productId;
  let shouldPublishReferral = true;

  if (productId) {
    const { data: existingProduct, error: productError } = await supabase
      .from("products")
      .select("id")
      .eq("id", productId)
      .eq("is_active", true)
      .eq("review_status", "approved")
      .maybeSingle();

    if (productError || !existingProduct) {
      buildSubmitErrorPath(locale, t(locale, "submit.error.invalid_product"));
    }
  } else {
    let normalizedWebsite: string;
    try {
      normalizedWebsite = new URL(newProductWebsite).toString();
    } catch {
      buildSubmitErrorPath(locale, t(locale, "submit.error.invalid_product_website"));
    }

    const { data: productByWebsite } = await supabase
      .from("products")
      .select("id, review_status")
      .eq("website", normalizedWebsite)
      .maybeSingle();

    const { data: productByName } = await supabase
      .from("products")
      .select("id, review_status")
      .eq("name", newProductName)
      .maybeSingle();

    const matchedProduct = productByWebsite ?? productByName;

    if (matchedProduct) {
      resolvedProductId = matchedProduct.id;
      shouldPublishReferral = matchedProduct.review_status === "approved";
    } else {
      const baseSlug = slugifyProductName(newProductName) || "product";
      const candidateSlug = `${baseSlug}-${Date.now().toString(36)}`;
      const { data: createdProduct, error: createProductError } = await supabase
        .from("products")
        .insert({
          slug: candidateSlug,
          name: newProductName,
          tagline_en: newProductTaglineEn,
          tagline_zh: newProductTaglineZh,
          category: newProductCategory,
          website: normalizedWebsite,
          icon: "✨",
          color: "#6b7280",
          pricing: null,
          review_status: "pending",
          submitted_by: user.id,
          is_active: true,
        })
        .select("id")
        .single();

      if (createProductError || !createdProduct) {
        buildSubmitErrorPath(locale, t(locale, "submit.error.product_create_failed"));
      }

      resolvedProductId = createdProduct.id;
      shouldPublishReferral = false;
    }
  }

  const { error } = await supabase.from("referrals").insert({
    product_id: resolvedProductId,
    user_id: user.id,
    code,
    link,
    benefit_en: benefitEn,
    benefit_zh: benefitZh,
    region,
    expires_at: expiresAt,
    is_active: shouldPublishReferral,
  });

  if (error) {
    if (error.code === "23505") {
      buildSubmitErrorPath(locale, t(locale, "submit.error.duplicate"));
    }
    buildSubmitErrorPath(locale, `${t(locale, "submit.error.prefix")}${error.message}`);
  }

  // Award points
  await supabase.from("points_ledger").insert({
    user_id: user.id,
    amount: 10,
    reason: "submit",
  });

  // Update user points
  const { data: profile } = await supabase
    .from("profiles")
    .select("points")
    .eq("id", user.id)
    .single();

  if (profile) {
    await supabase
      .from("profiles")
      .update({ points: profile.points + 10 })
      .eq("id", user.id);
  }

  revalidatePath("/", "layout");
  if (shouldPublishReferral) {
    redirect(`/${locale}/submit?submitted=1`);
  }

  redirect(`/${locale}/submit?submitted=pending`);
}

export async function vote(referralId: string, value: 1 | -1) {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: "Sign in to vote." };
  }

  // Check existing vote
  const { data: existing } = await supabase
    .from("votes")
    .select("id, value")
    .eq("referral_id", referralId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (existing) {
    if (existing.value === value) {
      // Remove vote (toggle off)
      await supabase.from("votes").delete().eq("id", existing.id);
    } else {
      // Change vote
      await supabase.from("votes").update({ value }).eq("id", existing.id);
    }
  } else {
    // New vote
    await supabase.from("votes").insert({
      referral_id: referralId,
      user_id: user.id,
      value,
    });
  }

  revalidatePath("/", "layout");
  return { success: true };
}

export async function report(referralId: string, reason: string) {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: "Sign in to report." };
  }

  await supabase.from("reports").insert({
    referral_id: referralId,
    user_id: user.id,
    reason,
  });

  return { success: true };
}

export async function trackClick(referralId: string) {
  const supabase = await createClient();
  await supabase.from("click_events").insert({
    referral_id: referralId,
  });
}
