-- Perfiles faltantes para usuarios de auth.users (p. ej. creados antes del trigger).
-- Ejecutar en Supabase → SQL Editor si el checkout falla por FK bookings.user_id → profiles.id.

insert into public.profiles (id, email, first_name, last_name, phone)
select
  u.id,
  u.email,
  nullif(trim(coalesce(u.raw_user_meta_data->>'first_name', '')), ''),
  nullif(trim(coalesce(u.raw_user_meta_data->>'last_name', '')), ''),
  nullif(trim(coalesce(u.raw_user_meta_data->>'phone', '')), '')
from auth.users u
left join public.profiles p on p.id = u.id
where p.id is null
on conflict (id) do nothing;
