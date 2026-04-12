# Registro y perfil (equivalente al “Paso 11” del tutorial)

En muchos tutoriales, el **paso 11** consiste en: crear el usuario con **Supabase Auth** (`signUp`) y luego guardar datos extra en una tabla **`profiles`**.

Este proyecto hace eso **sin** un segundo formulario ni un `upsert` manual obligatorio desde el cliente.

## Qué hace este proyecto

1. **Auth**: el usuario se registra con email y contraseña mediante `supabase.auth.signUp` en `context/UserContext.tsx` (`register`).
2. **Metadata**: en el mismo `signUp` se envían `first_name`, `last_name` y `phone` en `options.data` (user metadata).
3. **Perfil en Postgres**: la fila en `public.profiles` la crea un **trigger** en la base de datos al insertarse el usuario en `auth.users` (ver `supabase/migrations/001_profiles_and_auth.sql`). El trigger lee `raw_user_meta_data` y rellena `profiles`.

Así el flujo coincide con el tutorial (Auth + `profiles`) pero evita:

- Duplicar lógica en un `RegisterForm` aparte.
- Depender de un `upsert` desde el navegador justo después del `signUp` (si no hay sesión aún —por ejemplo con “confirmar email”—, las políticas RLS del cliente podrían impedir insertar en `profiles`).

## Flujo en código

```
components/AuthForm.tsx (pestaña “Crear cuenta”)
  → context/UserContext.tsx → register()
  → createBrowserSupabaseClient().auth.signUp({ email, password, options: { data: { first_name, last_name, phone } } })
  → Supabase Auth crea el usuario
  → Trigger SQL inserta en public.profiles
  → onAuthStateChange / getSession actualiza el estado en UserContext
```

## ¿Cuándo haría falta un `upsert` manual?

Solo en casos excepcionales, por ejemplo:

- El trigger no está desplegado o falló (habría que arreglar la migración o el trigger).
- Querés rellenar `profiles` desde un **job en servidor** con `service_role` (nunca en el cliente).

Para el flujo normal de esta app, **no hace falta** el `upsert` del snippet genérico del tutorial.

## URLs útiles

| Ruta | Uso |
|------|-----|
| `/{locale}/auth?tab=register` | Registro (formulario real con login/registro en tabs) |
| `/{locale}/register` | Redirección a la URL anterior |
| `/{locale}/account` | Cuenta (requiere sesión; el middleware puede redirigir a auth) |
| `/auth/callback` | Intercambio de código OAuth / email / recuperación (`app/auth/callback/route.ts`) |

## Variables de entorno (local)

En `.env.local` (ver también `.env.example`):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SITE_URL` (ej. `http://localhost:3000`) — usada en enlaces de email y callback

## Cómo verificar en Supabase

1. **Authentication → Users**: tras registrarte, debe aparecer el usuario.
2. **Table Editor → `profiles`**: debe existir una fila con el mismo `id` (UUID) que en Auth, y campos coherentes con el registro.
3. Si no aparece la fila en `profiles`, revisá que la migración SQL esté aplicada y que el trigger `on_auth_user_created` exista.

## Cliente Supabase en el navegador

- Función principal: `createBrowserSupabaseClient()` en `lib/supabase/client.ts`.
- Alias opcional: `createClient` (misma función), útil si seguís tutoriales que importan ese nombre.

## Protección de cuenta (servidor)

1. **Middleware** (`lib/supabase/middleware.ts`): en cada request a `/{locale}/account` se refresca la sesión y, si no hay usuario, se redirige a `/{locale}/auth?tab=login&next=...`.

2. **Página cuenta** (`app/[locale]/account/page.tsx`): Server Component que llama `createServerSupabaseClient()` y `getUser()`. Sin usuario → `redirect` al mismo login con `next`. Con usuario → `select` en `public.profiles` por `id` y se pasa `initialProfile` a `components/AccountPageClient.tsx` (hidrata nombre/email en la bienvenida mientras el cliente sincroniza `useUser()`; la fuente interactiva sigue siendo el contexto).

3. **UI interactiva**: `AccountPageClient` permanece como Client Component (pedidos locales, direcciones, formulario de perfil).
