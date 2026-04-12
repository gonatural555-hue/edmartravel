-- Campos estructurados de checkout / reserva en public.bookings (además de `notes` legible).
-- Ejecutar después de 002_bookings_and_contacts.sql (Supabase → SQL Editor).

alter table public.bookings
  add column if not exists country text,
  add column if not exists contact_email text,
  add column if not exists contact_phone text,
  add column if not exists accommodation text,
  add column if not exists checkout_notes text,
  add column if not exists experience_notes text,
  add column if not exists preferred_date date,
  add column if not exists preferred_time text,
  add column if not exists party_size integer,
  add column if not exists payment_method text
    check (
      payment_method is null
      or payment_method in ('manual', 'whatsapp', 'paypal')
    );

comment on column public.bookings.country is 'País del titular (checkout)';
comment on column public.bookings.contact_email is 'Email de contacto al confirmar';
comment on column public.bookings.contact_phone is 'Teléfono de contacto';
comment on column public.bookings.accommodation is 'Hotel / zona en Mendoza';
comment on column public.bookings.checkout_notes is 'Notas adicionales del paso checkout';
comment on column public.bookings.experience_notes is 'Notas de la experiencia (paso Reservas / carrito)';
comment on column public.bookings.preferred_date is 'Fecha preferida de la salida';
comment on column public.bookings.preferred_time is 'Hora preferida (texto, p. ej. HH:mm)';
comment on column public.bookings.party_size is 'Cantidad de personas';
comment on column public.bookings.payment_method is 'Método elegido: manual | whatsapp | paypal';
