-- ============================================================
-- KLOPT HET — Database Schema
-- ============================================================

-- --------------------------------------------------------
-- PROFILES (uitbreiding van auth.users)
-- --------------------------------------------------------
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  full_name text,
  locale text not null default 'nl',
  notification_prefs jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Automatisch profiel aanmaken bij nieuwe gebruiker
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- --------------------------------------------------------
-- SUBSCRIPTIONS (Mollie koppeling)
-- --------------------------------------------------------
create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles on delete cascade not null,
  mollie_customer_id text,
  mollie_subscription_id text,
  status text not null default 'free',
  tier text not null default 'free',
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint subscriptions_status_check check (
    status in ('free', 'trial', 'active', 'cancelled', 'past_due')
  ),
  constraint subscriptions_tier_check check (
    tier in ('free', 'standard', 'family', 'premium')
  )
);

-- Automatisch gratis abonnement aanmaken bij nieuw profiel
create or replace function public.handle_new_profile()
returns trigger as $$
begin
  insert into public.subscriptions (user_id, status, tier)
  values (new.id, 'free', 'free');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_profile_created
  after insert on public.profiles
  for each row execute procedure public.handle_new_profile();

-- --------------------------------------------------------
-- SCANS (scangeschiedenis)
-- --------------------------------------------------------
create table public.scans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles on delete set null,
  ip_hash text,
  input_kind text not null,
  verdict_category text not null,
  verdict_score int not null,
  verdict_summary text,
  verdict_flags jsonb,
  fraud_type text,
  locale text not null default 'nl',
  ai_provider text not null default 'mistral',
  ai_model text not null,
  scan_duration_ms int,
  created_at timestamptz not null default now(),
  constraint scans_input_kind_check check (input_kind in ('image', 'text')),
  constraint scans_verdict_check check (verdict_category in ('safe', 'doubt', 'phishing')),
  constraint scans_score_check check (verdict_score between 0 and 10)
);

-- --------------------------------------------------------
-- RATE LIMITS (anonieme gebruikers)
-- --------------------------------------------------------
create table public.rate_limits (
  ip_hash text primary key,
  scans_this_month int not null default 0,
  reset_at timestamptz not null default date_trunc('month', now()) + interval '1 month'
);

-- --------------------------------------------------------
-- NEWSLETTER
-- --------------------------------------------------------
create table public.newsletter (
  email text primary key,
  user_id uuid references public.profiles on delete set null,
  locale text not null default 'nl',
  subscribed_at timestamptz not null default now(),
  unsubscribed_at timestamptz
);

-- --------------------------------------------------------
-- ROW LEVEL SECURITY
-- --------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.subscriptions enable row level security;
alter table public.scans enable row level security;
alter table public.rate_limits enable row level security;
alter table public.newsletter enable row level security;

-- Profiles: alleen eigen profiel lezen/updaten
create policy "Eigen profiel lezen"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Eigen profiel updaten"
  on public.profiles for update
  using (auth.uid() = id);

-- Subscriptions: alleen eigen abonnement lezen
create policy "Eigen abonnement lezen"
  on public.subscriptions for select
  using (auth.uid() = user_id);

-- Scans: alleen eigen scans lezen
create policy "Eigen scans lezen"
  on public.scans for select
  using (auth.uid() = user_id);

-- Scans: iedereen mag een scan aanmaken (ook anoniem via service role)
create policy "Scan aanmaken"
  on public.scans for insert
  with check (true);

-- Scans: eigen scan verwijderen
create policy "Eigen scan verwijderen"
  on public.scans for delete
  using (auth.uid() = user_id);

-- Rate limits: service role beheert dit
create policy "Rate limit lezen"
  on public.rate_limits for select
  using (true);

-- Newsletter: iedereen mag zich aanmelden
create policy "Newsletter aanmelden"
  on public.newsletter for insert
  with check (true);

create policy "Eigen newsletter lezen"
  on public.newsletter for select
  using (auth.uid() = user_id);

-- --------------------------------------------------------
-- INDEXES voor snelheid
-- --------------------------------------------------------
create index scans_user_id_idx on public.scans (user_id);
create index scans_created_at_idx on public.scans (created_at desc);
create index scans_ip_hash_idx on public.rate_limits (ip_hash);
