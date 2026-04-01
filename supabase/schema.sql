-- AI Referral Hub - Database Schema
-- Run this in Supabase SQL Editor to set up your database

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Users (extends Supabase auth.users)
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  handle text unique not null,
  display_name text,
  avatar_url text,
  points integer default 0 not null,
  trust_score integer default 50 not null, -- 0-100
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Products
create table public.products (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  name text not null,
  tagline_en text not null,
  tagline_zh text not null,
  category text not null,
  website text not null,
  icon text,
  color text,
  pricing text,
  review_status text default 'approved' not null check (review_status in ('approved', 'pending', 'rejected')),
  submitted_by uuid references public.profiles(id) on delete set null,
  is_active boolean default true,
  created_at timestamptz default now() not null
);

-- Referral codes
create table public.referrals (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid not null references public.products(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  code text not null,
  link text,
  benefit_en text not null,
  benefit_zh text not null,
  region text default 'Global',
  expires_at timestamptz,
  is_verified boolean default false,
  is_active boolean default true,
  created_at timestamptz default now() not null,
  unique(product_id, code)
);

-- Votes
create table public.votes (
  id uuid primary key default uuid_generate_v4(),
  referral_id uuid not null references public.referrals(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  value smallint not null check (value in (-1, 1)),
  created_at timestamptz default now() not null,
  unique(referral_id, user_id)
);

-- Reports
create table public.reports (
  id uuid primary key default uuid_generate_v4(),
  referral_id uuid not null references public.referrals(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  reason text not null,
  status text default 'pending' check (status in ('pending', 'resolved', 'dismissed')),
  created_at timestamptz default now() not null
);

-- Points ledger (audit trail)
create table public.points_ledger (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  amount integer not null,
  reason text not null, -- 'submit', 'verified', 'upvoted', 'report_accepted'
  referral_id uuid references public.referrals(id) on delete set null,
  created_at timestamptz default now() not null
);

-- Click tracking
create table public.click_events (
  id uuid primary key default uuid_generate_v4(),
  referral_id uuid not null references public.referrals(id) on delete cascade,
  ip_hash text, -- hashed IP for rate limiting, not raw
  user_agent text,
  created_at timestamptz default now() not null
);

-- Indexes
create index idx_referrals_product on public.referrals(product_id);
create index idx_referrals_user on public.referrals(user_id);
create index idx_referrals_created on public.referrals(created_at desc);
create index idx_products_review_status on public.products(review_status);
create index idx_votes_referral on public.votes(referral_id);
create index idx_points_user on public.points_ledger(user_id);
create index idx_click_referral on public.click_events(referral_id);

-- Row Level Security
alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.referrals enable row level security;
alter table public.votes enable row level security;
alter table public.reports enable row level security;
alter table public.points_ledger enable row level security;

-- Policies: profiles readable by all, editable by owner
create policy "Profiles are viewable by everyone" on public.profiles for select using (true);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

-- Policies: products readable when approved; auth users can submit pending products
create policy "Approved products are viewable by everyone" on public.products
for select using (review_status = 'approved' or submitted_by = auth.uid());
create policy "Auth users can submit pending products" on public.products
for insert with check (auth.uid() = submitted_by and review_status = 'pending');

-- Policies: referrals readable by all, insertable by auth users
create policy "Referrals are viewable by everyone" on public.referrals for select using (true);
create policy "Auth users can insert referrals" on public.referrals for insert with check (auth.uid() = user_id);
create policy "Users can update own referrals" on public.referrals for update using (auth.uid() = user_id);

-- Policies: votes
create policy "Votes are viewable by everyone" on public.votes for select using (true);
create policy "Auth users can vote" on public.votes for insert with check (auth.uid() = user_id);
create policy "Users can change own votes" on public.votes for update using (auth.uid() = user_id);
create policy "Users can delete own votes" on public.votes for delete using (auth.uid() = user_id);

-- Policies: reports
create policy "Auth users can report" on public.reports for insert with check (auth.uid() = user_id);

-- Policies: points ledger read-only for owner
create policy "Users can view own points" on public.points_ledger for select using (auth.uid() = user_id);

-- Vote count view
create or replace view public.referral_vote_counts as
select referral_id, coalesce(sum(value), 0) as vote_count
from public.votes
group by referral_id;
