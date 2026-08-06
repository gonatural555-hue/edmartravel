import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";
import { buildMetadata, getSiteUrl } from "@/lib/seo";
import { buildAboutPathByLocale } from "@/lib/page-slugs";
import { getAboutHref, getContactHref } from "@/lib/page-slugs";
import NosotrosPageContent, {
  type NosotrosCopy,
} from "@/components/nosotros/NosotrosPageContent";

export async function generateNosotrosMetadata(
  locale: Locale
): Promise<Metadata> {
  const messages = await getMessages(locale);
  const a = messages.aboutPage as {
    metaTitle: string;
    metaDescription: string;
  };

  return buildMetadata({
    locale,
    title: a.metaTitle,
    description: a.metaDescription,
    pathByLocale: buildAboutPathByLocale(),
    ogImage: "/assets/images/products/CabalgataPicada/cabalgatapicada.webp",
  });
}

export default async function NosotrosPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const messages = await getMessages(locale);
  const copy = messages.aboutPage as NosotrosCopy;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Edmar Travel",
    url: `${getSiteUrl()}${getAboutHref(locale)}`,
    email: "edmartravelsas@gmail.com",
    identifier: [
      {
        "@type": "PropertyValue",
        name: "CUIT",
        value: "20-43925089-6",
      },
      {
        "@type": "PropertyValue",
        name: "Legajo",
        value: "2116",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <NosotrosPageContent
        copy={copy}
        productsHref={`/${locale}/products`}
        contactHref={getContactHref(locale)}
      />
    </>
  );
}
