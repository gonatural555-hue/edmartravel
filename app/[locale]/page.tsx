import CinematicHome from "@/components/cinematic/CinematicHome";
import { getMessages } from "@/lib/i18n/messages";
import type { Locale } from "@/lib/i18n/config";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const messages = await getMessages(locale);
  const seo = messages.seo?.home;

  return buildMetadata({
    locale,
    title: seo?.title,
    description: seo?.description,
    ogImage: "/assets/images/home/hero-home-1.jpg",
    pathByLocale: {
      en: "/en",
      es: "/es",
      fr: "/fr",
      it: "/it",
    },
  });
}

export default async function HomePage() {
  // Cinematic Storytelling Home (Escena 01 refinada + placeholders 02/03).
  // La home tradicional anterior (Hero, carrusel, categorías, testimonios,
  // CTA final) queda preservada en el historial de git y en sus componentes
  // por si se necesita revertir.
  return <CinematicHome />;
}
