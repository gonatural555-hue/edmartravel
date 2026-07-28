-- Reservas de invitado: user_id opcional (null = sin cuenta).
-- Ejecutar después de 002_bookings_and_contacts.sql.

alter table public.bookings alter column user_id drop not null;

comment on column public.bookings.user_id is 'Usuario registrado; null = reserva de invitado';
