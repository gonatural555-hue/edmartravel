/**
 * Tipos mínimos para tablas públicas de Supabase (Paso 9: reservas y contacto).
 * No sustituye un `Database` generado por CLI; sirve para tipar consultas manuales.
 */

export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed";

export type BookingPaymentMethod = "manual" | "whatsapp" | "paypal";

export type BookingRow = {
  id: string;
  user_id: string;
  status: BookingStatus;
  currency: string;
  total_amount: string | null;
  notes: string | null;
  country: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  accommodation: string | null;
  checkout_notes: string | null;
  experience_notes: string | null;
  preferred_date: string | null;
  preferred_time: string | null;
  party_size: number | null;
  payment_method: BookingPaymentMethod | null;
  created_at: string;
  updated_at: string;
};

export type BookingInsert = {
  user_id: string;
  status?: BookingStatus;
  currency?: string;
  total_amount?: string | number | null;
  notes?: string | null;
  country?: string | null;
  contact_email?: string | null;
  contact_phone?: string | null;
  accommodation?: string | null;
  checkout_notes?: string | null;
  experience_notes?: string | null;
  preferred_date?: string | null;
  preferred_time?: string | null;
  party_size?: number | null;
  payment_method?: BookingPaymentMethod | null;
};

export type BookingPassengerRow = {
  id: string;
  booking_id: string;
  first_name: string;
  last_name: string;
  document_id: string | null;
  birth_date: string | null;
  created_at: string;
  updated_at: string;
};

export type BookingPassengerInsert = {
  booking_id: string;
  first_name: string;
  last_name: string;
  document_id?: string | null;
  birth_date?: string | null;
};

export type ContactRequestRow = {
  id: string;
  profile_id: string | null;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  created_at: string;
};

export type ContactRequestInsert = {
  profile_id?: string | null;
  name: string;
  email: string;
  phone?: string | null;
  message: string;
};
