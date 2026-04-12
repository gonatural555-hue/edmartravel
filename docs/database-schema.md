# Esquema de base de datos (Supabase / Postgres)

Documentación de las tablas públicas relacionadas con **perfiles**, **reservas**, **pasajeros** y **consultas de contacto**. Las migraciones versionadas viven en `supabase/migrations/`.

## Orden de aplicación

1. `001_profiles_and_auth.sql` — perfiles enlazados a `auth.users`, RLS y trigger `set_profiles_updated_at` en `profiles`.
2. `002_bookings_and_contacts.sql` — reservas, pasajeros y formularios de contacto.
3. `003_bookings_detail_columns.sql` — columnas estructuradas en `bookings` (contacto, alojamiento, fecha/hora/personas, notas, método de pago).

Ejecución recomendada: **Supabase Dashboard → SQL Editor**, pegar el contenido de cada archivo en orden y ejecutar.

## Tabla `public.profiles`

- **Clave**: `id` (UUID, igual que `auth.users.id`).
- **RLS**: cada usuario ve y actualiza solo su fila (`id = auth.uid()`).
- Detalle del flujo de registro: `docs/auth-registration-flow.md`.

## Tabla `public.bookings`

Reservas asociadas a un usuario registrado.

| Concepto | Detalle |
|----------|---------|
| **FK** | `user_id` → `public.profiles(id)` **ON DELETE CASCADE**. Si se elimina el perfil (p. ej. al borrar el usuario en Auth), las reservas de ese usuario se eliminan para no quedar huérfanas. |
| **Campos base** | `status` (`pending`, `confirmed`, `cancelled`, `completed`), `currency`, `total_amount`, `notes`, `created_at`, `updated_at`. |
| **Campos detalle** (`003`) | `country`, `contact_email`, `contact_phone`, `accommodation`, `checkout_notes`, `experience_notes`, `preferred_date`, `preferred_time`, `party_size`, `payment_method` (`manual` \| `whatsapp` \| `paypal`, nullable). Duplican en columnas lo que el checkout envía; `notes` sigue siendo el resumen en texto. |
| **Trigger** | `updated_at` vía `public.set_updated_at()` (definida en `002`, distinta de `set_profiles_updated_at` en `001`). |

### RLS (`bookings`)

Solo rol **`authenticated`**: **SELECT / INSERT / UPDATE / DELETE** cuando `user_id = auth.uid()`. Un usuario no ve ni modifica reservas de otros.

## Tabla `public.booking_passengers`

Pasajeros vinculados a una reserva.

| Concepto | Detalle |
|----------|---------|
| **FK** | `booking_id` → `public.bookings(id)` **ON DELETE CASCADE**. Al borrar la reserva, se borran sus pasajeros. |
| **Trigger** | Mismo patrón `set_updated_at` que en `bookings`. |

### RLS (`booking_passengers`)

Solo **`authenticated`**: operaciones permitidas si existe una fila en `bookings` con el mismo `booking_id` y `user_id = auth.uid()` (políticas con subconsulta `exists`).

## Tabla `public.contact_requests`

Mensajes enviados desde formularios de contacto.

| Concepto | Detalle |
|----------|---------|
| **FK** | `profile_id` → `public.profiles(id)` **ON DELETE SET NULL** (opcional). |
| **Campos** | `name`, `email`, `phone`, `message`, `created_at`. |

### RLS (`contact_requests`)

- **INSERT**
  - **`anon`**: solo si `profile_id is null` (visitante sin sesión).
  - **`authenticated`**: `profile_id` nulo o igual a `auth.uid()` (no suplantar a otro perfil).
- **SELECT**: no hay políticas para `anon` ni `authenticated`; el cliente público **no** lista consultas. Lectura con **Dashboard** (rol de servicio) o backend con `SERVICE_ROLE`.

## Tipos TypeScript

Tipos mínimos para estas tablas: `lib/supabase/database.types.ts` (`BookingRow`, `BookingPassengerRow`, `ContactRequestRow`, inserts, etc.).

## Flujo checkout → API → base de datos

- La UI de checkout (`app/[locale]/checkout/page.tsx`) solo puede **confirmar** con usuario autenticado (RLS exige `user_id = auth.uid()`). Los invitados ven un aviso y enlace a `/{locale}/auth`.
- **`POST /api/bookings`** (`app/api/bookings/route.ts`) usa `createServerSupabaseClient()` y la sesión por cookies; **no** acepta `user_id` en el cuerpo: el `user_id` de la fila en `bookings` es siempre `auth.uid()`.
- Orden de escritura: insert en `bookings` → insert en `booking_passengers` con `booking_id`. Si falla el segundo paso, se elimina la reserva creada (evitar reserva sin pasajero).
- Un solo fila en `booking_passengers` por confirmación (datos del formulario “viajero principal”); el campo `notes` de `bookings` resume ítems del carrito, método de pago y aclara que el cupo total está en el resumen del pedido. Las columnas añadidas en `003` guardan además país, contacto, alojamiento, notas, fecha/hora/personas preferidas y método de pago para consultas en el Table Editor.
- Estados: `pending` para transferencia / WhatsApp; `confirmed` cuando el pago es **PayPal** (pago ya capturado en el cliente). Tras guardar en Supabase, el flujo PayPal sigue llamando a **`POST /api/orders/paypal`** usando el mismo `orderId` que el `id` de la reserva (`bookingId`), para no duplicar identificadores entre hoja de pedidos y base.

## Permisos GRANT

La migración `002` concede a `authenticated` **SELECT/INSERT/UPDATE/DELETE** en `bookings` y `booking_passengers`, e **INSERT** en `contact_requests` a `anon` y `authenticated`, acotados por RLS.
