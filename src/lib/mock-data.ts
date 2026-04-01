import type { Locale } from "@/lib/i18n";

export type Category = "Chat" | "Coding" | "Image" | "Video" | "Audio" | "Writing" | "Search" | "Productivity" | "DevTools";

export const CATEGORIES: Category[] = [
  "Chat", "Coding", "Image", "Video", "Audio", "Writing", "Search", "Productivity", "DevTools",
];

export type Product = {
  slug: string;
  name: string;
  tagline: Record<Locale, string>;
  category: Category;
  website: string;
  icon: string; // emoji fallback
  color: string; // brand accent hex
  pricing: string;
};

export type Referral = {
  id: string;
  productSlug: string;
  code: string;
  link?: string;
  benefit: Record<Locale, string>;
  region?: string;
  expiresAt?: string;
  createdAt: string;
  author: { handle: string };
  verified: boolean;
  votes: number;
  reports: number;
};

export const PRODUCTS: Product[] = [
  {
    slug: "chatgpt",
    name: "ChatGPT",
    tagline: { en: "General-purpose AI assistant by OpenAI", zh: "OpenAI 通用 AI 助手" },
    category: "Chat",
    website: "https://chat.openai.com/",
    icon: "🤖",
    color: "#10a37f",
    pricing: "Free / Plus $20/mo",
  },
  {
    slug: "claude",
    name: "Claude",
    tagline: { en: "AI assistant for writing and analysis", zh: "擅长写作与分析的 AI 助手" },
    category: "Chat",
    website: "https://claude.ai/",
    icon: "🧠",
    color: "#d97706",
    pricing: "Free / Pro $20/mo",
  },
  {
    slug: "gemini",
    name: "Gemini",
    tagline: { en: "Google's multimodal AI model", zh: "Google 多模态 AI 模型" },
    category: "Chat",
    website: "https://gemini.google.com/",
    icon: "💎",
    color: "#4285f4",
    pricing: "Free / Advanced $20/mo",
  },
  {
    slug: "deepseek",
    name: "DeepSeek",
    tagline: { en: "Open-source reasoning AI from China", zh: "国产开源推理大模型" },
    category: "Chat",
    website: "https://chat.deepseek.com/",
    icon: "🐋",
    color: "#2563eb",
    pricing: "Free / API pay-per-use",
  },
  {
    slug: "grok",
    name: "Grok",
    tagline: { en: "xAI's real-time AI with X integration", zh: "xAI 实时 AI，集成 X(Twitter)" },
    category: "Chat",
    website: "https://grok.x.ai/",
    icon: "⚡",
    color: "#1d9bf0",
    pricing: "X Premium+ $16/mo",
  },
  {
    slug: "cursor",
    name: "Cursor",
    tagline: { en: "AI-first code editor", zh: "AI 优先的代码编辑器" },
    category: "Coding",
    website: "https://www.cursor.com/",
    icon: "⌨️",
    color: "#8b5cf6",
    pricing: "Free / Pro $20/mo",
  },
  {
    slug: "github-copilot",
    name: "GitHub Copilot",
    tagline: { en: "AI pair programmer by GitHub", zh: "GitHub AI 编程助手" },
    category: "Coding",
    website: "https://github.com/features/copilot",
    icon: "🐙",
    color: "#238636",
    pricing: "Individual $10/mo",
  },
  {
    slug: "windsurf",
    name: "Windsurf",
    tagline: { en: "AI-powered IDE by Codeium", zh: "Codeium 出品的 AI IDE" },
    category: "Coding",
    website: "https://codeium.com/windsurf",
    icon: "🏄",
    color: "#09b6a2",
    pricing: "Free / Pro $15/mo",
  },
  {
    slug: "v0",
    name: "v0",
    tagline: { en: "AI UI generator by Vercel", zh: "Vercel 出品的 AI UI 生成器" },
    category: "DevTools",
    website: "https://v0.dev/",
    icon: "🔺",
    color: "#000000",
    pricing: "Free / Premium $20/mo",
  },
  {
    slug: "bolt",
    name: "Bolt.new",
    tagline: { en: "Full-stack AI web app builder", zh: "全栈 AI Web 应用构建器" },
    category: "DevTools",
    website: "https://bolt.new/",
    icon: "⚡",
    color: "#f97316",
    pricing: "Free / Pro $20/mo",
  },
  {
    slug: "lovable",
    name: "Lovable",
    tagline: { en: "AI full-stack engineer for web apps", zh: "AI 全栈工程师，构建 Web 应用" },
    category: "DevTools",
    website: "https://lovable.dev/",
    icon: "💜",
    color: "#a855f7",
    pricing: "Free / Pro $20/mo",
  },
  {
    slug: "midjourney",
    name: "Midjourney",
    tagline: { en: "AI image generation via Discord", zh: "基于 Discord 的 AI 图像生成" },
    category: "Image",
    website: "https://www.midjourney.com/",
    icon: "🎨",
    color: "#2c2c32",
    pricing: "Basic $10/mo",
  },
  {
    slug: "dall-e",
    name: "DALL-E 3",
    tagline: { en: "OpenAI's text-to-image model", zh: "OpenAI 文生图模型" },
    category: "Image",
    website: "https://openai.com/dall-e-3",
    icon: "🖼️",
    color: "#10a37f",
    pricing: "Via ChatGPT Plus",
  },
  {
    slug: "stable-diffusion",
    name: "Stable Diffusion",
    tagline: { en: "Open-source image generation", zh: "开源图像生成模型" },
    category: "Image",
    website: "https://stability.ai/",
    icon: "🌀",
    color: "#7c3aed",
    pricing: "Open source / API",
  },
  {
    slug: "runway",
    name: "Runway",
    tagline: { en: "AI video generation & editing", zh: "AI 视频生成与编辑" },
    category: "Video",
    website: "https://runwayml.com/",
    icon: "🎬",
    color: "#0ea5e9",
    pricing: "Free / Standard $12/mo",
  },
  {
    slug: "suno",
    name: "Suno",
    tagline: { en: "AI music generation", zh: "AI 音乐生成" },
    category: "Audio",
    website: "https://suno.com/",
    icon: "🎵",
    color: "#ec4899",
    pricing: "Free / Pro $10/mo",
  },
  {
    slug: "perplexity",
    name: "Perplexity",
    tagline: { en: "AI-powered search engine with citations", zh: "带引用的 AI 搜索引擎" },
    category: "Search",
    website: "https://www.perplexity.ai/",
    icon: "🔍",
    color: "#20b2aa",
    pricing: "Free / Pro $20/mo",
  },
  {
    slug: "notion-ai",
    name: "Notion AI",
    tagline: { en: "AI writing & knowledge management", zh: "AI 写作与知识管理" },
    category: "Productivity",
    website: "https://www.notion.so/product/ai",
    icon: "📝",
    color: "#000000",
    pricing: "Plus add-on $10/mo",
  },
  {
    slug: "jasper",
    name: "Jasper",
    tagline: { en: "AI marketing copywriter", zh: "AI 营销文案工具" },
    category: "Writing",
    website: "https://www.jasper.ai/",
    icon: "✍️",
    color: "#e11d48",
    pricing: "Creator $39/mo",
  },
  {
    slug: "replit",
    name: "Replit",
    tagline: { en: "AI-powered online IDE & deployment", zh: "AI 在线 IDE 与部署平台" },
    category: "DevTools",
    website: "https://replit.com/",
    icon: "🔁",
    color: "#f26207",
    pricing: "Free / Hacker $7/mo",
  },
];

export const REFERRALS: Referral[] = [
  {
    id: "r1",
    productSlug: "cursor",
    code: "CURSOR-PRO-2026",
    link: "https://cursor.com/referral/earlybird",
    benefit: { en: "Both sides get 1 month Pro free", zh: "双方各获 1 个月 Pro 免费" },
    region: "Global",
    createdAt: "2026-03-31",
    author: { handle: "earlybird" },
    verified: true,
    votes: 47,
    reports: 0,
  },
  {
    id: "r2",
    productSlug: "claude",
    code: "CLAUDE-INVITE-88",
    benefit: { en: "Both sides get bonus usage credits", zh: "双方获得额外使用额度" },
    region: "Global",
    createdAt: "2026-03-30",
    author: { handle: "maker-cn" },
    verified: true,
    votes: 31,
    reports: 0,
  },
  {
    id: "r3",
    productSlug: "chatgpt",
    code: "GPT-PLUS-SAVE",
    link: "https://chat.openai.com/invite/gpt-plus",
    benefit: { en: "Get $5 credit on Plus subscription", zh: "Plus 订阅立减 $5" },
    region: "US/EU",
    createdAt: "2026-03-29",
    author: { handle: "ai-hunter" },
    verified: true,
    votes: 65,
    reports: 0,
  },
  {
    id: "r4",
    productSlug: "midjourney",
    code: "MJ-FRIEND-2026",
    benefit: { en: "Extra 50 fast-gen credits on sign-up", zh: "注册即送 50 次快速生成" },
    region: "Global",
    createdAt: "2026-03-28",
    author: { handle: "artisan" },
    verified: false,
    votes: 22,
    reports: 1,
  },
  {
    id: "r5",
    productSlug: "perplexity",
    code: "PERP-PRO-FREE",
    link: "https://perplexity.ai/referral/techie",
    benefit: { en: "1 month Pro trial (normally 7 days)", zh: "Pro 试用延至 1 个月（原 7 天）" },
    region: "Global",
    createdAt: "2026-03-28",
    author: { handle: "techie" },
    verified: true,
    votes: 38,
    reports: 0,
  },
  {
    id: "r6",
    productSlug: "github-copilot",
    code: "COPILOT-60DAY",
    benefit: { en: "60-day free trial instead of 30", zh: "免费试用延至 60 天（原 30 天）" },
    region: "Global",
    createdAt: "2026-03-27",
    author: { handle: "devops-guru" },
    verified: true,
    votes: 53,
    reports: 0,
  },
  {
    id: "r7",
    productSlug: "windsurf",
    code: "WINDSURF-BONUS",
    benefit: { en: "500 extra AI completions on first month", zh: "首月额外 500 次 AI 补全" },
    region: "Global",
    createdAt: "2026-03-27",
    author: { handle: "coder99" },
    verified: false,
    votes: 15,
    reports: 0,
  },
  {
    id: "r8",
    productSlug: "v0",
    code: "V0-PREMIUM-TRY",
    benefit: { en: "2 weeks Premium access free", zh: "2 周 Premium 免费体验" },
    region: "Global",
    createdAt: "2026-03-26",
    author: { handle: "ui-maker" },
    verified: true,
    votes: 28,
    reports: 0,
  },
  {
    id: "r9",
    productSlug: "bolt",
    code: "BOLT-LAUNCH",
    benefit: { en: "Double token limit for first project", zh: "首个项目 Token 限额翻倍" },
    region: "Global",
    createdAt: "2026-03-26",
    author: { handle: "stackbuilder" },
    verified: false,
    votes: 19,
    reports: 0,
  },
  {
    id: "r10",
    productSlug: "suno",
    code: "SUNO-MUSIC-50",
    benefit: { en: "50 free song generations", zh: "免费生成 50 首歌曲" },
    region: "Global",
    createdAt: "2026-03-25",
    author: { handle: "beatmaker" },
    verified: true,
    votes: 34,
    reports: 0,
  },
  {
    id: "r11",
    productSlug: "deepseek",
    code: "DEEPSEEK-API-10",
    benefit: { en: "$10 free API credits on registration", zh: "注册送 $10 API 额度" },
    region: "Global",
    createdAt: "2026-03-25",
    author: { handle: "llm-fan" },
    verified: true,
    votes: 42,
    reports: 0,
  },
  {
    id: "r12",
    productSlug: "notion-ai",
    code: "NOTION-AI-TRIAL",
    benefit: { en: "1 month AI add-on free", zh: "AI 插件免费用 1 个月" },
    region: "Global",
    createdAt: "2026-03-24",
    author: { handle: "productivity-nerd" },
    verified: false,
    votes: 17,
    reports: 0,
  },
  {
    id: "r13",
    productSlug: "runway",
    code: "RUNWAY-GEN3",
    benefit: { en: "100 free Gen-3 Alpha credits", zh: "免费获得 100 次 Gen-3 Alpha 生成" },
    region: "Global",
    createdAt: "2026-03-24",
    author: { handle: "videocraft" },
    verified: true,
    votes: 29,
    reports: 0,
  },
  {
    id: "r14",
    productSlug: "lovable",
    code: "LOVABLE-DEV",
    benefit: { en: "Extra 5000 tokens for free tier", zh: "免费版额外 5000 Tokens" },
    region: "Global",
    createdAt: "2026-03-23",
    author: { handle: "indie-dev" },
    verified: false,
    votes: 11,
    reports: 0,
  },
  {
    id: "r15",
    productSlug: "gemini",
    code: "GEMINI-ADV-TRY",
    benefit: { en: "2 months Advanced free (new users)", zh: "新用户免费用 2 个月 Advanced" },
    region: "Global",
    createdAt: "2026-03-22",
    author: { handle: "google-fan" },
    verified: true,
    votes: 36,
    reports: 0,
  },
  {
    id: "r16",
    productSlug: "jasper",
    code: "JASPER-7DAY-PRO",
    benefit: { en: "7-day Pro trial + 10k bonus words", zh: "7 天 Pro 试用 + 额外 1 万字" },
    region: "US/EU",
    createdAt: "2026-03-22",
    author: { handle: "copywriter" },
    verified: false,
    votes: 8,
    reports: 0,
  },
  {
    id: "r17",
    productSlug: "replit",
    code: "REPLIT-HACK-30",
    benefit: { en: "30-day Hacker plan free", zh: "Hacker 计划免费 30 天" },
    region: "Global",
    createdAt: "2026-03-21",
    author: { handle: "codenewbie" },
    verified: true,
    votes: 21,
    reports: 0,
  },
  {
    id: "r18",
    productSlug: "cursor",
    code: "CURSOR-TEAM-SAVE",
    benefit: { en: "20% off Team plan for 3 months", zh: "Team 计划 3 个月 8 折" },
    region: "Global",
    createdAt: "2026-03-20",
    author: { handle: "team-lead" },
    verified: false,
    votes: 14,
    reports: 0,
  },
  {
    id: "r19",
    productSlug: "grok",
    code: "GROK-PREMIUM",
    benefit: { en: "1 month Premium+ access via referral", zh: "通过邀请获得 1 个月 Premium+" },
    region: "Global",
    createdAt: "2026-03-20",
    author: { handle: "elon-fan" },
    verified: false,
    votes: 13,
    reports: 2,
  },
  {
    id: "r20",
    productSlug: "stable-diffusion",
    code: "SD-API-CREDIT",
    benefit: { en: "$25 free Stability AI API credits", zh: "Stability AI API 免费 $25 额度" },
    region: "Global",
    createdAt: "2026-03-19",
    author: { handle: "gen-artist" },
    verified: true,
    votes: 25,
    reports: 0,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getReferralsForProduct(slug: string): Referral[] {
  return REFERRALS.filter((r) => r.productSlug === slug).sort((a, b) => b.votes - a.votes);
}

export function getTrendingReferrals(limit = 5): Referral[] {
  return [...REFERRALS]
    .filter((r) => r.verified)
    .sort((a, b) => b.votes - a.votes)
    .slice(0, limit);
}

export function getLatestReferrals(limit = 5): Referral[] {
  return [...REFERRALS]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, limit);
}

export function getProductsByCategory(category: Category): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}
