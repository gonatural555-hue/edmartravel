const whatsappDigits =
  typeof process !== "undefined" && process.env.NEXT_PUBLIC_WHATSAPP_PHONE
    ? process.env.NEXT_PUBLIC_WHATSAPP_PHONE.replace(/\D/g, "")
    : "";

export const SITE_CONFIG: {
  name: string;
  tagline: string;
  logo: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  contact: {
    email: string;
    /** Dígitos E.164 sin + (p. ej. 5492614123456). Vacío si no hay NEXT_PUBLIC_WHATSAPP_PHONE. */
    whatsappPhone: string;
  };
} = {
  name: "Edmar Travel",
  tagline: "Experiencias únicas en Mendoza",
  logo: "/assets/logo-edmar.png",
  colors: {
    primary: "#1F4D3A",
    secondary: "#E8DDC7",
    accent: "#7A1E2C",
  },
  contact: {
    email: "edmartravelsas@gmail.com",
    whatsappPhone: whatsappDigits,
  },
};

