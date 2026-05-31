-- ============================================================
-- KLOPT HET — Familie systeem
-- Voer dit uit in de Supabase SQL Editor
-- ============================================================

-- --------------------------------------------------------
-- FAMILIES
-- --------------------------------------------------------
create table if not exists public.families (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references public.profiles on delete cascade not null,
  name text not null default 'Mijn Familie',
  created_at timestamptz not null default now(),
  constraint families_owner_unique unique (owner_id)
);

-- --------------------------------------------------------
-- FAMILY MEMBERS
-- --------------------------------------------------------
create table if not exists public.family_members (
  id uuid primary key default gen_random_uuid(),
  family_id uuid references public.families on delete cascade not null,
  user_id uuid references public.profiles on delete set null,
  invited_email text not null,
  invite_token text unique not null default gen_random_uuid()::text,
  status text not null default 'pending',
  owner_can_see_scans boolean not null default true,
  member_can_see_owner boolean not null default false,
  invited_at timestamptz not null default now(),
  joined_at timestamptz,
  constraint family_members_status_check check (status in ('pending', 'active', 'removed'))
);

-- --------------------------------------------------------
-- ROW LEVEL SECURITY
-- --------------------------------------------------------
alter table public.families enable row level security;
alter table public.family_members enable row level security;

-- Families: eigenaar mag lezen/schrijven
create policy "Familie lezen als eigenaar"
  on public.families for select using (auth.uid() = owner_id);

create policy "Familie aanmaken"
  on public.families for insert with check (auth.uid() = owner_id);

create policy "Familie updaten"
  on public.families for update using (auth.uid() = owner_id);

-- Family members: eigenaar en het lid zelf mogen lezen
create policy "Leden lezen door eigenaar of lid"
  on public.family_members for select
  using (
    auth.uid() = user_id
    or auth.uid() = (select owner_id from public.families where id = family_id)
  );

-- Invite token opzoeken voor accept-flow (public)
create policy "Invite token opzoeken"
  on public.family_members for select
  using (invite_token is not null);

-- Eigenaar mag leden aanmaken, updaten en verwijderen
create policy "Leden aanmaken door eigenaar"
  on public.family_members for insert
  with check (
    auth.uid() = (select owner_id from public.families where id = family_id)
  );

create policy "Leden updaten door eigenaar of lid"
  on public.family_members for update
  using (
    auth.uid() = user_id
    or auth.uid() = (select owner_id from public.families where id = family_id)
  );

create policy "Leden verwijderen door eigenaar"
  on public.family_members for delete
  using (
    auth.uid() = (select owner_id from public.families where id = family_id)
  );

-- Scans van familieleden zien als mantelzorger (owner_can_see_scans = true)
create policy "Familie scans lezen als mantelzorger"
  on public.scans for select
  using (
    auth.uid() != user_id
    and exists (
      select 1
      from public.family_members fm
      join public.families f on f.id = fm.family_id
      where f.owner_id = auth.uid()
        and fm.user_id = scans.user_id
        and fm.owner_can_see_scans = true
        and fm.status = 'active'
    )
  );

-- --------------------------------------------------------
-- INDEXES
-- --------------------------------------------------------
create index if not exists families_owner_idx on public.families (owner_id);
create index if not exists family_members_family_idx on public.family_members (family_id);
create index if not exists family_members_token_idx on public.family_members (invite_token);
create index if not exists family_members_user_idx on public.family_members (user_id);
