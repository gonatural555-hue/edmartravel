export type ProfileRow = {
  id: string;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
};

export type AppUserProfile = {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  /** Nombre para saludo (Header, etc.) */
  name: string;
};

export function profileRowToAppUser(row: ProfileRow): AppUserProfile {
  const fn = row.first_name?.trim() ?? "";
  const ln = row.last_name?.trim() ?? "";
  const combined = [fn, ln].filter(Boolean).join(" ").trim();
  const email = row.email ?? "";
  return {
    id: row.id,
    email,
    first_name: row.first_name,
    last_name: row.last_name,
    phone: row.phone,
    name: combined || email.split("@")[0] || "Usuario",
  };
}
