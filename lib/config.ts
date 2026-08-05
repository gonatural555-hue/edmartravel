const whatsappDigits =
  typeof process !== "undefined" && process.env.NEXT_PUBLIC_WHATSAPP_PHONE
    ? process.env.NEXT_PUBLIC_WHATSAPP_PHONE.replace(/\D/g, "")
    : "";

const siteDomain =
  typeof process !== "undefined" && process.env.NEXT_PUBLIC_SITE_DOMAIN
    ? process.env.NEXT_PUBLIC_SITE_DOMAIN.replace(/^https?:\/\//, "").replace(/\/+$/, "")
    : "edmartravel.tur.ar";

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
  company: {
    legalName: string;
    cuit: string;
    legajo: string;
    domain: string;
    /** Reservado para domicilio legal (completar cuando esté disponible). */
    address: string | null;
    /** Reservado para teléfono corporativo (completar cuando esté disponible). */
    phone: string | null;
    /** Registro Nacional de Agencias de Viajes y Turismo — consultas y denuncias. */
    travelAgencyRegistryUrl: string;
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
  company: {
    legalName: "Edgar David Nuñez Zavalla",
    cuit: "20-43925089-6",
    legajo: "2116",
    domain: siteDomain,
    address: null,
    phone: null,
    travelAgencyRegistryUrl:
      "https://www.argentina.gob.ar/interior/turismo/registro-nacional-de-agencias-de-viajes-y-turismo",
  },
};

