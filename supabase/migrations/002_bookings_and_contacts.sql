-- Edmar Travel: reservas, pasajeros y consultas de contacto.
-- Ejecutar en Supabase → SQL Editor después de 001_profiles_and_auth.sql.
-- FK bookings.user_id → profiles(id): si se elimina el perfil (cascade desde auth.users),
-- aquí usamos ON DELETE CASCADE para no dejar reservas huérfanas.

create extension if not exists "pgcrypto";

-- Trigger genérico updated_at (no modifica funciones de 001_profiles_and_auth.sql)
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- bookings: una fila por reserva; pertenece a un perfil (mismo id que auth.users).
-- ---------------------------------------------------------------------------
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  status text not null default 'pending'
    check (status in ('pending', 'confirmed', 'cancelled', 'completed')),
  currency text not null default 'USD',
  total_amount numeric(12, 2),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists bookings_user_id_idx on public.bookings (user_id);
create index if not exists bookings_status_idx on public.bookings (status);
create index if not exists bookings_created_at_idx on public.bookings (created_at desc);

drop trigger if exists bookings_updated_at on public.bookings;
create trigger bookings_updated_at
  before update on public.bookings
  for each row
  execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- booking_passengers: varios pasajeros por reserva; se borran con la reserva.
-- ---------------------------------------------------------------------------
create table if not exists public.booking_passengers (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings (id) on delete cascade,
  first_name text not null,
  last_name text not null,
  document_id text,
  birth_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists booking_passengers_booking_id_idx
  on public.booking_passengers (booking_id);

drop trigger if exists booking_passengers_updated_at on public.booking_passengers;
create trigger booking_passengers_updated_at
  before update on public.booking_passengers
  for each row
  execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- contact_requests: consultas web; profile_id opcional si el usuario está logueado.
-- ---------------------------------------------------------------------------
create table if not exists public.contact_requests (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles (id) on delete set null,
  name text not null,
  email text not null,
  phone text,
  message text not null,
  created_at timestamptz not null default now()
);

create index if not exists contact_requests_created_at_idx
  on public.contact_requests (created_at desc);
create index if not exists contact_requests_profile_id_idx
  on public.contact_requests (profile_id)
  where profile_id is not null;

-- ---------------------------------------------------------------------------
-- RLS: bookings
-- ---------------------------------------------------------------------------
alter table public.bookings enable row level security;

drop policy if exists "bookings_select_own" on public.bookings;
create policy "bookings_select_own"
  on public.bookings for select
  to authenticated
  using (user_id = auth.uid());

drop policy if exists "bookings_insert_own" on public.bookings;
create policy "bookings_insert_own"
  on public.bookings for insert
  to authenticated
  with check (user_id = auth.uid());

drop policy if exists "bookings_update_own" on public.bookings;
create policy "bookings_update_own"
  on public.bookings for update
  to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

drop policy if exists "bookings_delete_own" on public.bookings;
create policy "bookings_delete_own"
  on public.bookings for delete
  to authenticated
  using (user_id = auth.uid());

-- ---------------------------------------------------------------------------
-- RLS: booking_passengers (solo si el booking pertenece al usuario)
-- ---------------------------------------------------------------------------
alter table public.booking_passengers enable row level security;

drop policy if exists "booking_passengers_select_via_booking" on public.booking_passengers;
create policy "booking_passengers_select_via_booking"
  on public.booking_passengers for select
  to authenticated
  using (
    exists (
      select 1 from public.bookings b
      where b.id = booking_passengers.booking_id
        and b.user_id = auth.uid()
    )
  );

drop policy if exists "booking_passengers_insert_via_booking" on public.booking_passengers;
create policy "booking_passengers_insert_via_booking"
  on public.booking_passengers for insert
  to authenticated
  with check (
    exists (
      select 1 from public.bookings b
      where b.id = booking_passengers.booking_id
        and b.user_id = auth.uid()
    )
  );

drop policy if exists "booking_passengers_update_via_booking" on public.booking_passengers;
create policy "booking_passengers_update_via_booking"
  on public.booking_passengers for update
  to authenticated
  using (
    exists (
      select 1 from public.bookings b
      where b.id = booking_passengers.booking_id
        and b.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.bookings b
      where b.id = booking_passengers.booking_id
        and b.user_id = auth.uid()
    )
  );

drop policy if exists "booking_passengers_delete_via_booking" on public.booking_passengers;
create policy "booking_passengers_delete_via_booking"
  on public.booking_passengers for delete
  to authenticated
  using (
    exists (
      select 1 from public.bookings b
      where b.id = booking_passengers.booking_id
        and b.user_id = auth.uid()
    )
  );

-- ---------------------------------------------------------------------------
-- RLS: contact_requests — insert público; sin lectura desde cliente (solo service_role / dashboard)
-- ---------------------------------------------------------------------------
alter table public.contact_requests enable row level security;

-- Anónimos: solo insertar; profile_id debe ser null
drop policy if exists "contact_requests_insert_anon" on public.contact_requests;
create policy "contact_requests_insert_anon"
  on public.contact_requests for insert
  to anon
  with check (profile_id is null);

-- Autenticados: insertar; si llevan profile_id debe ser el propio
drop policy if exists "contact_requests_insert_authenticated" on public.contact_requests;
create policy "contact_requests_insert_authenticated"
  on public.contact_requests for insert
  to authenticated
  with check (
    profile_id is null or profile_id = auth.uid()
  );

-- Sin políticas SELECT para anon/authenticated: el cliente no puede listar consultas.
-- Lectura vía Supabase Dashboard (bypass con rol de servicio) o API server con SERVICE_ROLE.

-- Permisos mínimos (Supabase: anon/authenticated deben poder ejecutar operaciones permitidas por RLS)
grant usage on schema public to anon, authenticated;

grant select, insert, update, delete on table public.bookings to authenticated;
grant select, insert, update, delete on table public.booking_passengers to authenticated;
grant insert on table public.contact_requests to anon, authenticated;
