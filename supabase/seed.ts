/**
 * Seed script: populate Supabase with initial products and demo referrals.
 *
 * Usage:
 *   1. Set env vars: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 *   2. Run: npx tsx supabase/seed.ts
 */

import { loadEnvConfig } from "@next/env";
import { createClient } from "@supabase/supabase-js";

type InsertedProduct = {
  id: string;
  slug: string;
};

type SeedReferralRow = {
  product_id: string;
  user_id: string;
  code: string;
  link: string | null;
  benefit_en: string;
  benefit_zh: string;
  region: string;
  is_verified: boolean;
  created_at: string;
};

loadEnvConfig(process.cwd());

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !serviceRoleKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

const PRODUCTS = [
  { slug: "chatgpt", name: "ChatGPT", tagline_en: "General-purpose AI assistant by OpenAI", tagline_zh: "OpenAI 通用 AI 助手", category: "Chat", website: "https://chat.openai.com/", icon: "🤖", color: "#10a37f", pricing: "Free / Plus $20/mo" },
  { slug: "claude", name: "Claude", tagline_en: "AI assistant for writing and analysis", tagline_zh: "擅长写作与分析的 AI 助手", category: "Chat", website: "https://claude.ai/", icon: "🧠", color: "#d97706", pricing: "Free / Pro $20/mo" },
  { slug: "gemini", name: "Gemini", tagline_en: "Google's multimodal AI model", tagline_zh: "Google 多模态 AI 模型", category: "Chat", website: "https://gemini.google.com/", icon: "💎", color: "#4285f4", pricing: "Free / Advanced $20/mo" },
  { slug: "deepseek", name: "DeepSeek", tagline_en: "Open-source reasoning AI from China", tagline_zh: "国产开源推理大模型", category: "Chat", website: "https://chat.deepseek.com/", icon: "🐋", color: "#2563eb", pricing: "Free / API pay-per-use" },
  { slug: "grok", name: "Grok", tagline_en: "xAI's real-time AI with X integration", tagline_zh: "xAI 实时 AI，集成 X(Twitter)", category: "Chat", website: "https://grok.x.ai/", icon: "⚡", color: "#1d9bf0", pricing: "X Premium+ $16/mo" },
  { slug: "cursor", name: "Cursor", tagline_en: "AI-first code editor", tagline_zh: "AI 优先的代码编辑器", category: "Coding", website: "https://www.cursor.com/", icon: "⌨️", color: "#8b5cf6", pricing: "Free / Pro $20/mo" },
  { slug: "github-copilot", name: "GitHub Copilot", tagline_en: "AI pair programmer by GitHub", tagline_zh: "GitHub AI 编程助手", category: "Coding", website: "https://github.com/features/copilot", icon: "🐙", color: "#238636", pricing: "Individual $10/mo" },
  { slug: "windsurf", name: "Windsurf", tagline_en: "AI-powered IDE by Codeium", tagline_zh: "Codeium 出品的 AI IDE", category: "Coding", website: "https://codeium.com/windsurf", icon: "🏄", color: "#09b6a2", pricing: "Free / Pro $15/mo" },
  { slug: "v0", name: "v0", tagline_en: "AI UI generator by Vercel", tagline_zh: "Vercel 出品的 AI UI 生成器", category: "DevTools", website: "https://v0.dev/", icon: "🔺", color: "#000000", pricing: "Free / Premium $20/mo" },
  { slug: "bolt", name: "Bolt.new", tagline_en: "Full-stack AI web app builder", tagline_zh: "全栈 AI Web 应用构建器", category: "DevTools", website: "https://bolt.new/", icon: "⚡", color: "#f97316", pricing: "Free / Pro $20/mo" },
  { slug: "lovable", name: "Lovable", tagline_en: "AI full-stack engineer for web apps", tagline_zh: "AI 全栈工程师，构建 Web 应用", category: "DevTools", website: "https://lovable.dev/", icon: "💜", color: "#a855f7", pricing: "Free / Pro $20/mo" },
  { slug: "midjourney", name: "Midjourney", tagline_en: "AI image generation via Discord", tagline_zh: "基于 Discord 的 AI 图像生成", category: "Image", website: "https://www.midjourney.com/", icon: "🎨", color: "#2c2c32", pricing: "Basic $10/mo" },
  { slug: "dall-e", name: "DALL-E 3", tagline_en: "OpenAI's text-to-image model", tagline_zh: "OpenAI 文生图模型", category: "Image", website: "https://openai.com/dall-e-3", icon: "🖼️", color: "#10a37f", pricing: "Via ChatGPT Plus" },
  { slug: "stable-diffusion", name: "Stable Diffusion", tagline_en: "Open-source image generation", tagline_zh: "开源图像生成模型", category: "Image", website: "https://stability.ai/", icon: "🌀", color: "#7c3aed", pricing: "Open source / API" },
  { slug: "runway", name: "Runway", tagline_en: "AI video generation & editing", tagline_zh: "AI 视频生成与编辑", category: "Video", website: "https://runwayml.com/", icon: "🎬", color: "#0ea5e9", pricing: "Free / Standard $12/mo" },
  { slug: "suno", name: "Suno", tagline_en: "AI music generation", tagline_zh: "AI 音乐生成", category: "Audio", website: "https://suno.com/", icon: "🎵", color: "#ec4899", pricing: "Free / Pro $10/mo" },
  { slug: "perplexity", name: "Perplexity", tagline_en: "AI-powered search engine with citations", tagline_zh: "带引用的 AI 搜索引擎", category: "Search", website: "https://www.perplexity.ai/", icon: "🔍", color: "#20b2aa", pricing: "Free / Pro $20/mo" },
  { slug: "notion-ai", name: "Notion AI", tagline_en: "AI writing & knowledge management", tagline_zh: "AI 写作与知识管理", category: "Productivity", website: "https://www.notion.so/product/ai", icon: "📝", color: "#000000", pricing: "Plus add-on $10/mo" },
  { slug: "jasper", name: "Jasper", tagline_en: "AI marketing copywriter", tagline_zh: "AI 营销文案工具", category: "Writing", website: "https://www.jasper.ai/", icon: "✍️", color: "#e11d48", pricing: "Creator $39/mo" },
  { slug: "replit", name: "Replit", tagline_en: "AI-powered online IDE & deployment", tagline_zh: "AI 在线 IDE 与部署平台", category: "DevTools", website: "https://replit.com/", icon: "🔁", color: "#f26207", pricing: "Free / Hacker $7/mo" },
];

const REFERRALS_BY_SLUG: Record<string, Array<{
  code: string;
  link?: string;
  benefit_en: string;
  benefit_zh: string;
  region: string;
  is_verified: boolean;
  author_handle: string;
  created_at: string;
}>> = {
  cursor: [
    { code: "CURSOR-PRO-2026", link: "https://cursor.com/referral/earlybird", benefit_en: "Both sides get 1 month Pro free", benefit_zh: "双方各获 1 个月 Pro 免费", region: "Global", is_verified: true, author_handle: "earlybird", created_at: "2026-03-31T10:00:00Z" },
    { code: "CURSOR-TEAM-SAVE", benefit_en: "20% off Team plan for 3 months", benefit_zh: "Team 计划 3 个月 8 折", region: "Global", is_verified: false, author_handle: "team-lead", created_at: "2026-03-20T10:00:00Z" },
  ],
  claude: [
    { code: "CLAUDE-INVITE-88", benefit_en: "Both sides get bonus usage credits", benefit_zh: "双方获得额外使用额度", region: "Global", is_verified: true, author_handle: "maker-cn", created_at: "2026-03-30T10:00:00Z" },
  ],
  chatgpt: [
    { code: "GPT-PLUS-SAVE", link: "https://chat.openai.com/invite/gpt-plus", benefit_en: "Get $5 credit on Plus subscription", benefit_zh: "Plus 订阅立减 $5", region: "US/EU", is_verified: true, author_handle: "ai-hunter", created_at: "2026-03-29T10:00:00Z" },
  ],
  midjourney: [
    { code: "MJ-FRIEND-2026", benefit_en: "Extra 50 fast-gen credits on sign-up", benefit_zh: "注册即送 50 次快速生成", region: "Global", is_verified: false, author_handle: "artisan", created_at: "2026-03-28T10:00:00Z" },
  ],
  perplexity: [
    { code: "PERP-PRO-FREE", link: "https://perplexity.ai/referral/techie", benefit_en: "1 month Pro trial (normally 7 days)", benefit_zh: "Pro 试用延至 1 个月（原 7 天）", region: "Global", is_verified: true, author_handle: "techie", created_at: "2026-03-28T10:00:00Z" },
  ],
  "github-copilot": [
    { code: "COPILOT-60DAY", benefit_en: "60-day free trial instead of 30", benefit_zh: "免费试用延至 60 天（原 30 天）", region: "Global", is_verified: true, author_handle: "devops-guru", created_at: "2026-03-27T10:00:00Z" },
  ],
  windsurf: [
    { code: "WINDSURF-BONUS", benefit_en: "500 extra AI completions on first month", benefit_zh: "首月额外 500 次 AI 补全", region: "Global", is_verified: false, author_handle: "coder99", created_at: "2026-03-27T10:00:00Z" },
  ],
  v0: [
    { code: "V0-PREMIUM-TRY", benefit_en: "2 weeks Premium access free", benefit_zh: "2 周 Premium 免费体验", region: "Global", is_verified: true, author_handle: "ui-maker", created_at: "2026-03-26T10:00:00Z" },
  ],
  bolt: [
    { code: "BOLT-LAUNCH", benefit_en: "Double token limit for first project", benefit_zh: "首个项目 Token 限额翻倍", region: "Global", is_verified: false, author_handle: "stackbuilder", created_at: "2026-03-26T10:00:00Z" },
  ],
  suno: [
    { code: "SUNO-MUSIC-50", benefit_en: "50 free song generations", benefit_zh: "免费生成 50 首歌曲", region: "Global", is_verified: true, author_handle: "beatmaker", created_at: "2026-03-25T10:00:00Z" },
  ],
  deepseek: [
    { code: "DEEPSEEK-API-10", benefit_en: "$10 free API credits on registration", benefit_zh: "注册送 $10 API 额度", region: "Global", is_verified: true, author_handle: "llm-fan", created_at: "2026-03-25T10:00:00Z" },
  ],
  "notion-ai": [
    { code: "NOTION-AI-TRIAL", benefit_en: "1 month AI add-on free", benefit_zh: "AI 插件免费用 1 个月", region: "Global", is_verified: false, author_handle: "productivity-nerd", created_at: "2026-03-24T10:00:00Z" },
  ],
  runway: [
    { code: "RUNWAY-GEN3", benefit_en: "100 free Gen-3 Alpha credits", benefit_zh: "免费获得 100 次 Gen-3 Alpha 生成", region: "Global", is_verified: true, author_handle: "videocraft", created_at: "2026-03-24T10:00:00Z" },
  ],
  lovable: [
    { code: "LOVABLE-DEV", benefit_en: "Extra 5000 tokens for free tier", benefit_zh: "免费版额外 5000 Tokens", region: "Global", is_verified: false, author_handle: "indie-dev", created_at: "2026-03-23T10:00:00Z" },
  ],
  gemini: [
    { code: "GEMINI-ADV-TRY", benefit_en: "2 months Advanced free (new users)", benefit_zh: "新用户免费用 2 个月 Advanced", region: "Global", is_verified: true, author_handle: "google-fan", created_at: "2026-03-22T10:00:00Z" },
  ],
  jasper: [
    { code: "JASPER-7DAY-PRO", benefit_en: "7-day Pro trial + 10k bonus words", benefit_zh: "7 天 Pro 试用 + 额外 1 万字", region: "US/EU", is_verified: false, author_handle: "copywriter", created_at: "2026-03-22T10:00:00Z" },
  ],
  replit: [
    { code: "REPLIT-HACK-30", benefit_en: "30-day Hacker plan free", benefit_zh: "Hacker 计划免费 30 天", region: "Global", is_verified: true, author_handle: "codenewbie", created_at: "2026-03-21T10:00:00Z" },
  ],
  grok: [
    { code: "GROK-PREMIUM", benefit_en: "1 month Premium+ access via referral", benefit_zh: "通过邀请获得 1 个月 Premium+", region: "Global", is_verified: false, author_handle: "elon-fan", created_at: "2026-03-20T10:00:00Z" },
  ],
  "stable-diffusion": [
    { code: "SD-API-CREDIT", benefit_en: "$25 free Stability AI API credits", benefit_zh: "Stability AI API 免费 $25 额度", region: "Global", is_verified: true, author_handle: "gen-artist", created_at: "2026-03-19T10:00:00Z" },
  ],
  "dall-e": [
    { code: "DALLE-BONUS", benefit_en: "Extra 15 image generations with Plus", benefit_zh: "Plus 用户额外 15 次图片生成", region: "Global", is_verified: true, author_handle: "ai-artist", created_at: "2026-03-18T10:00:00Z" },
  ],
};

const SEED_USER_EMAIL = "seed-bot@ai-referral-hub.local";
const SEED_USER_PASSWORD = "SeedBot-2026-Local";

async function ensureSeedUser() {
  const { data: existingUsers, error: listUsersError } = await supabase.auth.admin.listUsers();

  if (listUsersError) {
    console.error("Failed to list auth users:", listUsersError.message);
    process.exit(1);
  }

  const existingUser = existingUsers.users.find((user) => user.email === SEED_USER_EMAIL);

  if (existingUser) {
    const { error: profileError } = await supabase.from("profiles").upsert(
      {
        id: existingUser.id,
        handle: "seed-bot",
        display_name: "Seed Bot",
        points: 0,
      },
      { onConflict: "id" }
    );

    if (profileError) {
      console.error("Failed to upsert seed profile:", profileError.message);
      process.exit(1);
    }

    return existingUser.id;
  }

  const { data: createdUser, error: createUserError } = await supabase.auth.admin.createUser({
    email: SEED_USER_EMAIL,
    password: SEED_USER_PASSWORD,
    email_confirm: true,
    user_metadata: { seeded: true, handle: "seed-bot" },
  });

  if (createUserError || !createdUser.user) {
    console.error("Failed to create seed auth user:", createUserError?.message ?? "Unknown error");
    process.exit(1);
  }

  const { error: profileError } = await supabase.from("profiles").upsert(
    {
      id: createdUser.user.id,
      handle: "seed-bot",
      display_name: "Seed Bot",
      points: 0,
    },
    { onConflict: "id" }
  );

  if (profileError) {
    console.error("Failed to create seed profile:", profileError.message);
    process.exit(1);
  }

  return createdUser.user.id;
}

async function seed() {
  console.log("Seeding products...");

  // 1. Insert products
  const { data: insertedProducts, error: prodErr } = await supabase
    .from("products")
    .upsert(PRODUCTS, { onConflict: "slug" })
    .select("id, slug");

  if (prodErr) {
    console.error("Failed to insert products:", prodErr.message);
    process.exit(1);
  }

  console.log(`Inserted/updated ${insertedProducts.length} products`);

  const slugToId = new Map((insertedProducts as InsertedProduct[]).map((product) => [product.slug, product.id]));

  // 2. Create or reuse a seed auth user + profile (for referral foreign keys)
  const seedUserId = await ensureSeedUser();

  console.log("Seed user ready");

  // 3. Insert referrals
  const referralRows: SeedReferralRow[] = [];
  for (const [slug, refs] of Object.entries(REFERRALS_BY_SLUG)) {
    const productId = slugToId.get(slug);
    if (!productId) {
      console.warn(`Product not found for slug: ${slug}`);
      continue;
    }
    for (const ref of refs) {
      referralRows.push({
        product_id: productId,
        user_id: seedUserId,
        code: ref.code,
        link: ref.link ?? null,
        benefit_en: ref.benefit_en,
        benefit_zh: ref.benefit_zh,
        region: ref.region,
        is_verified: ref.is_verified,
        created_at: ref.created_at,
      });
    }
  }

  const { error: refErr } = await supabase
    .from("referrals")
    .upsert(referralRows, { onConflict: "product_id,code" });

  if (refErr) {
    console.error("Failed to insert referrals:", refErr.message);
    process.exit(1);
  }

  console.log(`Inserted/updated ${referralRows.length} referrals`);
  console.log("Seed complete!");
}

seed().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});
