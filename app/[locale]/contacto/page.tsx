import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n/config";
import ContactoPage, {
  generateContactoMetadata,
} from "@/lib/pages/contacto-page";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateContactoMetadata(locale);
}

export default ContactoPage;
