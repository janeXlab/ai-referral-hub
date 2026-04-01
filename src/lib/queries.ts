import type { Database } from "@/lib/database.types";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export type Product = {
  id: string;
  slug: string;
  name: string;
  tagline_en: string;
  tagline_zh: string;
  category: string;
  website: string;
  icon: string | null;
  color: string | null;
  pricing: string | null;
  review_status: string;
  submitted_by: string | null;
};

export type ReferralWithProduct = {
  id: string;
  code: string;
  link: string | null;
  benefit_en: string;
  benefit_zh: string;
  region: string | null;
  expires_at: string | null;
  is_verified: boolean;
  is_active: boolean;
  created_at: string;
  product_id: string;
  user_id: string;
  vote_count: number;
  author_handle: string;
  product?: Product;
};

type VoteRow = Database["public"]["Tables"]["votes"]["Row"];
type ReferralRow = Database["public"]["Tables"]["referrals"]["Row"];
type ProfileHandle = Pick<Database["public"]["Tables"]["profiles"]["Row"], "handle">;

type ReferralWithRelations = ReferralRow & {
  profiles?: ProfileHandle | null;
  votes: Pick<VoteRow, "value">[] | null;
  products?: Product | null;
};

function getVoteCount(votes: Pick<VoteRow, "value">[] | null | undefined): number {
  return votes?.reduce((sum, vote) => sum + vote.value, 0) ?? 0;
}

function mapReferral(row: ReferralWithRelations): ReferralWithProduct {
  return {
    id: row.id,
    code: row.code,
    link: row.link,
    benefit_en: row.benefit_en,
    benefit_zh: row.benefit_zh,
    region: row.region,
    expires_at: row.expires_at,
    is_verified: row.is_verified,
    is_active: row.is_active,
    created_at: row.created_at,
    product_id: row.product_id,
    user_id: row.user_id,
    vote_count: getVoteCount(row.votes),
    author_handle: row.profiles?.handle ?? "anonymous",
    ...(row.products ? { product: row.products } : {}),
  };
}

export async function getAllProducts(): Promise<Product[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .eq("review_status", "approved")
    .order("name");
  return (data ?? []) as Product[];
}

// Use admin client (no cookies) — safe to call in generateStaticParams at build time
export async function getAllProductSlugs(): Promise<{ slug: string }[]> {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("products")
    .select("slug")
    .eq("is_active", true)
    .eq("review_status", "approved");
  return (data ?? []) as { slug: string }[];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .eq("review_status", "approved")
    .single();
  return data as Product | null;
}

export async function getReferralsForProduct(productId: string): Promise<ReferralWithProduct[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("referrals")
    .select(`
      *,
      profiles!referrals_user_id_fkey(handle),
      votes(value)
    `)
    .eq("product_id", productId)
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  return ((data ?? []) as ReferralWithRelations[])
    .map(mapReferral)
    .sort((a, b) => b.vote_count - a.vote_count);
}

export async function getTrendingReferrals(limit = 5): Promise<ReferralWithProduct[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("referrals")
    .select(`
      *,
      profiles!referrals_user_id_fkey(handle),
      products(*),
      votes(value)
    `)
    .eq("is_active", true)
    .eq("is_verified", true)
    .order("created_at", { ascending: false })
    .limit(50);

  return ((data ?? []) as ReferralWithRelations[])
    .map(mapReferral)
    .sort((a, b) => b.vote_count - a.vote_count)
    .slice(0, limit);
}

export async function getLatestReferrals(limit = 5): Promise<ReferralWithProduct[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("referrals")
    .select(`
      *,
      profiles!referrals_user_id_fkey(handle),
      products(*),
      votes(value)
    `)
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(limit);

  return ((data ?? []) as ReferralWithRelations[]).map(mapReferral);
}

export async function getProductsByCategory(category: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("category", category)
    .eq("review_status", "approved")
    .eq("is_active", true);
  return (data ?? []) as Product[];
}

export async function getUserProfile(userId: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("profiles")
    .select("id, handle, display_name, avatar_url, points, trust_score, created_at, updated_at")
    .eq("id", userId)
    .single();
  return data;
}

export async function getUserReferrals(userId: string): Promise<ReferralWithProduct[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("referrals")
    .select(`
      *,
      products(*),
      votes(value)
    `)
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  return ((data ?? []) as ReferralWithRelations[]).map((row) => ({
    ...mapReferral(row),
    author_handle: "",
  }));
}

export async function getUserVote(referralId: string, userId: string): Promise<number> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("votes")
    .select("value")
    .eq("referral_id", referralId)
    .eq("user_id", userId)
    .maybeSingle();
  return (data as { value: number } | null)?.value ?? 0;
}
