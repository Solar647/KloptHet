-- Familie leden mogen elkaars scans zien als owner_can_see_scans = true
create policy "Familie scans lezen als lid"
  on public.scans for select
  using (
    auth.uid() != user_id
    and exists (
      select 1
      from public.family_members fm_viewer
      join public.family_members fm_sharer
        on fm_sharer.family_id = fm_viewer.family_id
      where fm_viewer.user_id = auth.uid()
        and fm_sharer.user_id = scans.user_id
        and fm_sharer.owner_can_see_scans = true
        and fm_viewer.status = 'active'
        and fm_sharer.status = 'active'
    )
  );
