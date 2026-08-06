import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";
import { getProducts } from "@/lib/products";
import { SITE_CONFIG } from "@/lib/config";
import { buildMetadata, getSiteUrl } from "@/lib/seo";
import { buildContactPathByLocale } from "@/lib/page-slugs";
import { getContactHref } from "@/lib/page-slugs";
import ContactPageContent, {
  type ContactCopy,
  type ContactProductOption,
} from "@/components/contacto/ContactPageContent";

function productLabel(
  locale: Locale,
  title: string,
  translations?: Record<string, { title?: string }>
): string {
  const t = translations?.[locale]?.title;
  return t && t.length > 0 ? t : title;
}

export async function generateContactoMetadata(
  locale: Locale
): Promise<Metadata> {
  const messages = await getMessages(locale);
  const c = messages.contactPage as {
    metaTitle: string;
    metaDescription: string;
  };

  return buildMetadata({
    locale,
    title: c.metaTitle,
    description: c.metaDescription,
    pathByLocale: buildContactPathByLocale(),
    ogImage: "/assets/images/home/header-home.webp",
  });
}

export default async function ContactoPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const messages = await getMessages(locale);
  const copy = messages.contactPage as ContactCopy;

  const products: ContactProductOption[] = getProducts().map((p) => ({
    id: p.id,
    label: productLabel(locale, p.title, p.translations),
  }));

  const waDigits = SITE_CONFIG.contact.whatsappPhone;
  const whatsappHref =
    waDigits.length > 0 ? `https://wa.me/${waDigits}` : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Edmar Travel",
    url: `${getSiteUrl()}${getContactHref(locale)}`,
    email: SITE_CONFIG.contact.email,
    identifier: [
      {
        "@type": "PropertyValue",
        name: "CUIT",
        value: SITE_CONFIG.company.cuit,
      },
      {
        "@type": "PropertyValue",
        name: "Legajo",
        value: SITE_CONFIG.company.legajo,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactPageContent
        copy={copy}
        products={products}
        whatsappHref={whatsappHref}
      />
    </>
  );
}
