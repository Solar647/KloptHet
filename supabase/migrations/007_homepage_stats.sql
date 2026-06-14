-- Publieke statistieken voor de homepage (fraude-radar)
-- Security definer = gaat langs RLS, zodat we over alle gebruikers heen kunnen tellen.
-- Veilig: geeft alleen geaggregeerde aantallen terug, nooit individuele data.
create or replace function public.homepage_stats()
returns json
language sql
security definer
set search_path = public
stable
as $$
  select json_build_object(
    'total_scans', (select count(*) from public.scans),
    'scams_detected', (
      select count(*) from public.scans
      where verdict_category in ('phishing', 'doubt')
    ),
    'known_patterns', (select count(*) from public.scam_patterns)
  );
$$;

-- Iedereen (ook niet-ingelogde bezoekers) mag deze aggregaten opvragen
grant execute on function public.homepage_stats() to anon, authenticated;
