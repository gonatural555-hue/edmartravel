"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import {
  createBrowserSupabaseClient,
  isSupabaseConfigured,
} from "@/lib/supabase/client";
import {
  profileRowToAppUser,
  type AppUserProfile,
  type ProfileRow,
} from "@/lib/auth/profile";

export type UserProfile = AppUserProfile;

export type Address = {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  idDocument?: string;
  /** Alojamiento u hotel (experiencias) */
  accommodation?: string;
  /** Notas adicionales del checkout */
  checkoutNotes?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
};

/** Copia de la reserva para mostrar en confirmación (fecha/hora/personas/notas del carrito). */
export type ReservationSnapshot = {
  preferredDate: string;
  preferredTime: string;
  partySize: number;
  notes: string;
};

export type Order = {
  id: string;
  items: {
    id: string;
    title: string;
    price: number;
    quantity: number;
  }[];
  subtotal: number;
  address: Address;
  date: string;
  status: string;
  paymentMethod?: "manual" | "whatsapp" | "paypal";
  paypalOrderId?: string;
  reservation?: ReservationSnapshot;
};

type PersistedLocal = {
  addresses: Address[];
  orders: Order[];
  lastOrderId?: string | null;
};

type UserState = {
  isLoggedIn: boolean;
  user: UserProfile | null;
  addresses: Address[];
  orders: Order[];
  lastOrderId?: string | null;
  authInitialized: boolean;
};

export type RegisterPayload = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  locale: string;
};

type AuthResult = { error: string | null; needsEmailConfirmation?: boolean };

type UserContextValue = UserState & {
  login: (payload: { email: string; password: string }) => Promise<AuthResult>;
  register: (payload: RegisterPayload) => Promise<AuthResult>;
  logout: () => Promise<void>;
  updateProfile: (fields: {
    first_name: string;
    last_name: string;
    phone: string;
  }) => Promise<AuthResult>;
  refreshProfile: () => Promise<void>;
  setAddresses: (next: Address[]) => void;
  upsertAddress: (next: Address) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  addOrder: (order: Order) => void;
};

const LOCAL_STORAGE_KEY = "gn-user-local";
const LEGACY_STORAGE_KEY = "gn-user-state";

const UserContext = createContext<UserContextValue | undefined>(undefined);

const normalizeDefault = (list: Address[], selectedId?: string | null) => {
  if (!selectedId) return list;
  return list.map((addr) => ({ ...addr, isDefault: addr.id === selectedId }));
};

function loadPersistedLocal(): PersistedLocal {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as PersistedLocal;
      return {
        addresses: Array.isArray(parsed.addresses) ? parsed.addresses : [],
        orders: Array.isArray(parsed.orders) ? parsed.orders : [],
        lastOrderId: parsed.lastOrderId ?? null,
      };
    }
  } catch {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }

  try {
    const legacy = localStorage.getItem(LEGACY_STORAGE_KEY);
    if (legacy) {
      const parsed = JSON.parse(legacy) as {
        addresses?: Address[];
        orders?: Order[];
        lastOrderId?: string | null;
      };
      const next: PersistedLocal = {
        addresses: Array.isArray(parsed.addresses) ? parsed.addresses : [],
        orders: Array.isArray(parsed.orders) ? parsed.orders : [],
        lastOrderId: parsed.lastOrderId ?? null,
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(next));
      localStorage.removeItem(LEGACY_STORAGE_KEY);
      return next;
    }
  } catch {
    localStorage.removeItem(LEGACY_STORAGE_KEY);
  }

  const legacyAddresses = localStorage.getItem("user_addresses");
  const legacyOrders = localStorage.getItem("orders");
  const legacyMockOrders = localStorage.getItem("gn-orders");
  const legacyLastOrder = localStorage.getItem("last_order_id");

  try {
    const addresses = legacyAddresses
      ? (JSON.parse(legacyAddresses) as Address[])
      : [];
    const orders = legacyOrders
      ? (JSON.parse(legacyOrders) as Order[])
      : legacyMockOrders
        ? (JSON.parse(legacyMockOrders) as Order[])
        : [];
    const next: PersistedLocal = {
      addresses: Array.isArray(addresses) ? addresses : [],
      orders: Array.isArray(orders) ? orders : [],
      lastOrderId: legacyLastOrder,
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(next));
    return next;
  } catch {
    return { addresses: [], orders: [], lastOrderId: null };
  }
}

function mapAuthError(e: unknown): string {
  const msg = e instanceof Error ? e.message : "Error desconocido";
  if (/failed to fetch|networkerror|load failed|fetch failed/i.test(msg)) {
    return "No se pudo conectar con Supabase. Revisá que NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY en .env.local sean correctos y que el proyecto exista en supabase.com.";
  }
  return msg;
}

function profileFromSupabaseUser(user: SupabaseUser): UserProfile {
  const meta = user.user_metadata as Record<string, string | undefined>;
  return profileRowToAppUser({
    id: user.id,
    email: user.email ?? "",
    first_name: meta?.first_name ?? null,
    last_name: meta?.last_name ?? null,
    phone: meta?.phone ?? null,
  });
}

async function fetchProfileForUser(
  userId: string
): Promise<UserProfile | null> {
  const supabase = createBrowserSupabaseClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("id,email,first_name,last_name,phone")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    console.warn("[UserContext] profiles select", error.message);
    return null;
  }
  if (!data) return null;
  return profileRowToAppUser(data as ProfileRow);
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<UserState>({
    isLoggedIn: false,
    user: null,
    addresses: [],
    orders: [],
    lastOrderId: null,
    authInitialized: false,
  });

  const persistRef = useRef(false);

  useEffect(() => {
    const local = loadPersistedLocal();
    setState((prev) => ({
      ...prev,
      addresses: local.addresses,
      orders: local.orders,
      lastOrderId: local.lastOrderId ?? null,
    }));
    persistRef.current = true;
  }, []);

  useEffect(() => {
    if (!persistRef.current) return;
    const payload: PersistedLocal = {
      addresses: state.addresses,
      orders: state.orders,
      lastOrderId: state.lastOrderId ?? null,
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(payload));
  }, [state.addresses, state.orders, state.lastOrderId]);

  const applySessionUser = useCallback(async (user: SupabaseUser | null) => {
    if (!user) {
      setState((prev) => ({
        ...prev,
        user: null,
        isLoggedIn: false,
        authInitialized: true,
      }));
      return;
    }
    const fromDb = await fetchProfileForUser(user.id);
    const profile = fromDb ?? profileFromSupabaseUser(user);
    setState((prev) => ({
      ...prev,
      user: profile,
      isLoggedIn: true,
      authInitialized: true,
    }));
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setState((prev) => ({ ...prev, authInitialized: true }));
      return;
    }

    const supabase = createBrowserSupabaseClient();

    supabase.auth.getSession().then(({ data: { session } }) => {
      void applySessionUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      void applySessionUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [applySessionUser]);

  const login = useCallback(
    async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }): Promise<AuthResult> => {
      if (!isSupabaseConfigured()) {
        return { error: "Supabase no está configurado (variables de entorno)." };
      }
      try {
        const supabase = createBrowserSupabaseClient();
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        if (error) return { error: error.message };
        const {
          data: { session },
        } = await supabase.auth.getSession();
        await applySessionUser(session?.user ?? null);
        return { error: null };
      } catch (e) {
        return { error: mapAuthError(e) };
      }
    },
    [applySessionUser]
  );

  const register = useCallback(
    async (payload: RegisterPayload): Promise<AuthResult> => {
      if (!isSupabaseConfigured()) {
        return { error: "Supabase no está configurado (variables de entorno)." };
      }
      try {
        const supabase = createBrowserSupabaseClient();
        const siteUrl =
          process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
          (typeof window !== "undefined" ? window.location.origin : "");
        const nextPath = `/${payload.locale}/account`;
        const { data, error } = await supabase.auth.signUp({
          email: payload.email.trim(),
          password: payload.password,
          options: {
            data: {
              first_name: payload.firstName.trim(),
              last_name: payload.lastName.trim(),
              phone: payload.phone.trim(),
            },
            emailRedirectTo: `${siteUrl}/auth/callback?next=${encodeURIComponent(nextPath)}`,
          },
        });
        if (error) return { error: error.message };

        if (data.session?.user) {
          await applySessionUser(data.session.user);
          return { error: null };
        }

        if (data.user) {
          await applySessionUser(data.user);
        }

        return {
          error: null,
          needsEmailConfirmation: !data.session,
        };
      } catch (e) {
        return { error: mapAuthError(e) };
      }
    },
    [applySessionUser]
  );

  const logout = useCallback(async () => {
    if (isSupabaseConfigured()) {
      const supabase = createBrowserSupabaseClient();
      await supabase.auth.signOut();
    }
    setState((prev) => ({
      ...prev,
      user: null,
      isLoggedIn: false,
    }));
  }, []);

  const updateProfile = useCallback(
    async (fields: {
      first_name: string;
      last_name: string;
      phone: string;
    }): Promise<AuthResult> => {
      if (!isSupabaseConfigured()) {
        return { error: "Supabase no está configurado." };
      }
      try {
        const supabase = createBrowserSupabaseClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) return { error: "Sesión no válida." };

        const { error } = await supabase
          .from("profiles")
          .update({
            first_name: fields.first_name.trim() || null,
            last_name: fields.last_name.trim() || null,
            phone: fields.phone.trim() || null,
          })
          .eq("id", user.id);

        if (error) return { error: error.message };

        await supabase.auth.updateUser({
          data: {
            first_name: fields.first_name.trim(),
            last_name: fields.last_name.trim(),
            phone: fields.phone.trim(),
          },
        });

        const {
          data: { user: fresh },
        } = await supabase.auth.getUser();
        await applySessionUser(fresh);
        return { error: null };
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Error al guardar";
        return { error: msg };
      }
    },
    [applySessionUser]
  );

  const refreshProfile = useCallback(async () => {
    if (!isSupabaseConfigured()) return;
    const supabase = createBrowserSupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    await applySessionUser(user);
  }, [applySessionUser]);

  const setAddresses = useCallback((next: Address[]) => {
    setState((prev) => ({ ...prev, addresses: next }));
  }, []);

  const upsertAddress = useCallback((next: Address) => {
    setState((prev) => {
      const updated = prev.addresses.some((addr) => addr.id === next.id)
        ? prev.addresses.map((addr) => (addr.id === next.id ? next : addr))
        : [...prev.addresses, next];
      const normalized = normalizeDefault(
        updated,
        next.isDefault ? next.id : null
      );
      return { ...prev, addresses: normalized };
    });
  }, []);

  const removeAddress = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      addresses: prev.addresses.filter((addr) => addr.id !== id),
    }));
  }, []);

  const setDefaultAddress = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      addresses: normalizeDefault(prev.addresses, id),
    }));
  }, []);

  const addOrder = useCallback((order: Order) => {
    setState((prev) => ({
      ...prev,
      orders: [order, ...prev.orders],
      lastOrderId: order.id,
    }));
  }, []);

  const value = useMemo<UserContextValue>(
    () => ({
      ...state,
      login,
      register,
      logout,
      updateProfile,
      refreshProfile,
      setAddresses,
      upsertAddress,
      removeAddress,
      setDefaultAddress,
      addOrder,
    }),
    [
      state,
      login,
      register,
      logout,
      updateProfile,
      refreshProfile,
      setAddresses,
      upsertAddress,
      removeAddress,
      setDefaultAddress,
      addOrder,
    ]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
}
