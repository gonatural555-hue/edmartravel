# Checkout: configuración manual en Supabase

Guía paso a paso para resolver el error **"No pudimos guardar tu reserva"** al confirmar en checkout.

## Resumen

El checkout guarda la reserva llamando a `POST /api/bookings`, que escribe en Supabase las tablas `bookings` y `booking_passengers`. Si la base de datos no tiene las migraciones aplicadas, o el usuario no tiene fila en `profiles`, la reserva falla.

---

## Paso 1 — Entrar a Supabase

1. Abrí [https://supabase.com/dashboard](https://supabase.com/dashboard).
2. Elegí el proyecto que usa el sitio en producción (el mismo `NEXT_PUBLIC_SUPABASE_URL` que tenés en Vercel o `.env.local`).

---

## Paso 2 — Verificar que existen las tablas

1. En el menú lateral: **Table Editor**.
2. Confirmá que existen estas tablas:
   - `profiles`
   - `bookings`
   - `booking_passengers`

**Si falta `bookings` o `booking_passengers`:** pasá al **Paso 3** y ejecutá la migración `002`.

**Si `bookings` existe pero no tiene columnas como `country`, `contact_email`, `payment_method`:** pasá al **Paso 4** y ejecutá la migración `003`.

---

## Paso 3 — Migración 002 (tablas base)

1. Menú lateral → **SQL Editor** → **New query**.
2. Abrí en tu repo el archivo `supabase/migrations/002_bookings_and_contacts.sql`.
3. Copiá **todo** el contenido y pegalo en el editor SQL.
4. Clic en **Run**.
5. Deberías ver un mensaje de éxito (sin errores en rojo).

> **Importante:** antes de la 002 debe estar aplicada `001_profiles_and_auth.sql` (tabla `profiles` y trigger de registro).

---

## Paso 4 — Migración 003 (columnas del checkout)

Esta es la causa más frecuente del error genérico: el código intenta guardar columnas que solo existen después de esta migración.

1. **SQL Editor** → **New query**.
2. Copiá el contenido de `supabase/migrations/003_bookings_detail_columns.sql`.
3. **Run**.

### Comprobar que funcionó

En **Table Editor → bookings**, deberías ver columnas como:

- `country`
- `contact_email`
- `contact_phone`
- `accommodation`
- `checkout_notes`
- `experience_notes`
- `preferred_date`
- `preferred_time`
- `party_size`
- `payment_method`

---

## Paso 5 — Migración 001 (si nunca se aplicó)

Si no existe la tabla `profiles` o los usuarios nuevos no generan perfil automáticamente:

1. **SQL Editor** → pegá y ejecutá `supabase/migrations/001_profiles_and_auth.sql`.
2. Verificá en **Database → Triggers** que exista `on_auth_user_created` sobre `auth.users`.

---

## Paso 6 — Perfiles faltantes (usuarios viejos)

Si un usuario puede iniciar sesión pero **no tiene fila en `profiles`**, el insert en `bookings` falla por clave foránea.

### Comprobar un usuario concreto

1. **Authentication → Users** → copiá el **UUID** del usuario de prueba.
2. **Table Editor → profiles** → buscá una fila con ese mismo `id`.

### Reparar todos los usuarios sin perfil

1. **SQL Editor** → **New query**.
2. Copiá y ejecutá `supabase/migrations/004_backfill_missing_profiles.sql`.
3. Volvé a **Table Editor → profiles** y confirmá que apareció la fila del usuario.

---

## Paso 7 — Variables de entorno en producción

En **Vercel** (o tu hosting):

1. Proyecto → **Settings → Environment Variables**.
2. Verificá que existan y coincidan con Supabase → **Project Settings → API**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Tras cambiar variables, **redeploy** el sitio.

Opcional pero recomendado:

- `NEXT_PUBLIC_SITE_URL` = URL pública del sitio (ej. `https://tudominio.com`).

---

## Paso 8 — Probar el checkout de nuevo

1. Desplegá los cambios de código (mensajes de error más claros).
2. Abrí el sitio en una ventana de incógnito.
3. Iniciá sesión con un usuario que tenga fila en `profiles`.
4. Agregá una experiencia al carrito → checkout → completá el formulario → **Confirmar reserva**.

### Si sigue fallando: leer el error exacto

1. **F12** → pestaña **Network** (Red).
2. Confirmá la reserva y buscá la petición **`bookings`** (método POST).
3. Abrí **Response** y anotá:
   - `status` (401, 400, 500…)
   - `error` (ej. `BOOKING_INSERT_FAILED`, `UNAUTHORIZED`)
   - `message` (detalle técnico de Postgres/Supabase)

| Código `error` | Qué significa | Qué hacer |
|----------------|---------------|-----------|
| `UNAUTHORIZED` | Sesión no válida en el servidor | Cerrar sesión, volver a entrar; revisar cookies/dominio |
| `BOOKING_INSERT_FAILED` | Falló insert en `bookings` | Pasos 3–6 (migraciones y perfiles) |
| `PASSENGER_INSERT_FAILED` | Falló insert en `booking_passengers` | Re-ejecutar migración 002 (RLS y permisos) |
| `SUBTOTAL_MISMATCH` | Total del carrito inconsistente | Refrescar página, vaciar carrito y volver a agregar |

También podés ver logs en **Vercel → Deployments → Functions / Logs** buscando `[bookings API]`.

---

## Orden recomendado de migraciones

Ejecutá en Supabase SQL Editor **en este orden** (solo las que falten):

1. `001_profiles_and_auth.sql`
2. `002_bookings_and_contacts.sql`
3. `003_bookings_detail_columns.sql`
4. `004_backfill_missing_profiles.sql` (solo si hay usuarios sin perfil)

---

## Checklist rápido

- [ ] Tabla `bookings` existe con columnas de la migración 003
- [ ] Tabla `booking_passengers` existe
- [ ] Tabla `profiles` existe y el trigger `on_auth_user_created` está activo
- [ ] El usuario de prueba tiene fila en `profiles`
- [ ] `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY` correctos en producción
- [ ] Redeploy después de cambiar variables o migraciones
