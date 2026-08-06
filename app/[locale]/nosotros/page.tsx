import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n/config";
import NosotrosPage, {
  generateNosotrosMetadata,
} from "@/lib/pages/nosotros-page";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateNosotrosMetadata(locale);
}

export default NosotrosPage;
