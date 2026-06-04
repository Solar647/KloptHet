-- Collectieve scam-database
create table public.scam_patterns (
  id uuid primary key default gen_random_uuid(),
  content_hash text not null unique,     -- hash van de tekst/afbeelding
  input_kind text not null,              -- 'image' of 'text'
  verdict_category text not null,        -- 'safe' / 'doubt' / 'phishing'
  verdict_score int not null,
  verdict_summary text,
  verdict_flags jsonb,
  fraud_type text,
  report_count int not null default 1,
  first_seen_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now()
);

-- Index op hash voor snelle lookups
create index scam_patterns_hash_idx on public.scam_patterns (content_hash);

-- RLS: iedereen mag lezen (voor de check), alleen service role mag schrijven
alter table public.scam_patterns enable row level security;

create policy "Scam patterns lezen"
  on public.scam_patterns for select
  using (true);
