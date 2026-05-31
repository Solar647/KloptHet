-- Functie om uitnodiging te accepteren (security definer = bypasses RLS)
-- Veilig: alleen pending invites kunnen worden geaccepteerd via geldige token
create or replace function public.accept_family_invite(p_token text, p_user_id uuid)
returns boolean
language plpgsql
security definer
as $$
declare
  v_member_id uuid;
  v_family_owner uuid;
begin
  -- Zoek het pending lid op via token
  select fm.id, f.owner_id
  into v_member_id, v_family_owner
  from public.family_members fm
  join public.families f on f.id = fm.family_id
  where fm.invite_token = p_token
    and fm.status = 'pending';

  -- Niet gevonden
  if v_member_id is null then
    return false;
  end if;

  -- Eigenaar mag zichzelf niet joinen
  if v_family_owner = p_user_id then
    return false;
  end if;

  -- Accepteer de uitnodiging
  update public.family_members
  set user_id = p_user_id,
      status = 'active',
      joined_at = now()
  where id = v_member_id;

  return true;
end;
$$;

-- Iedereen mag deze functie aanroepen (veilig door de check in de functie zelf)
grant execute on function public.accept_family_invite(text, uuid) to anon, authenticated;
