-- Bijhouden wie welke hash al heeft gescand (voor unieke teller)
create table public.scam_pattern_reporters (
  content_hash text not null,
  reporter_fingerprint text not null, -- user_id of ip_hash
  first_reported_at timestamptz not null default now(),
  primary key (content_hash, reporter_fingerprint)
);

create index scam_pattern_reporters_hash_idx on public.scam_pattern_reporters (content_hash);

alter table public.scam_pattern_reporters enable row level security;
-- Geen select policy nodig — alleen server-side gebruikt
