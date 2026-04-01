"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { t } from "@/lib/i18n";

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
  const locale = (formData.get("locale") as string) || "en";

  const loc = locale === "zh" ? "zh" : "en";
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    redirect(`/${locale}/sign-in?error=${encodeURIComponent(t(loc, "signin.error.invalid"))}`);
  }

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${siteUrl}/auth/callback?next=/${locale}`,
    },
  });

  if (error) {
    const msg = `${t(loc, "signin.error.prefix")}${error.message}`;
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
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect("/en/sign-in");
  }

  const productId = formData.get("product_id") as string;
  const code = formData.get("code") as string;
  const link = (formData.get("link") as string) || null;
  const benefitEn = formData.get("benefit_en") as string;
  const benefitZh = formData.get("benefit_zh") as string;
  const region = (formData.get("region") as string) || "Global";
  const expiresAt = (formData.get("expires_at") as string) || null;

  if (!productId || !code || !benefitEn || !benefitZh) {
    redirect("/en/submit?error=missing");
  }

  const { error } = await supabase.from("referrals").insert({
    product_id: productId,
    user_id: user.id,
    code,
    link,
    benefit_en: benefitEn,
    benefit_zh: benefitZh,
    region,
    expires_at: expiresAt,
  });

  if (error) {
    if (error.code === "23505") {
      redirect("/en/submit?error=duplicate");
    }
    redirect(`/en/submit?error=${encodeURIComponent(error.message)}`);
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
  redirect("/en?submitted=1");
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
