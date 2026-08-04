import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";
import LegalPage from "@/components/legal/LegalPage";
import { SITE_CONFIG } from "@/lib/config";
import { buildLegalPathByLocale, buildMetadata } from "@/lib/seo";

type LegalInfoCopy = {
  kicker?: string;
  metaTitle: string;
  metaDescription: string;
  title: string;
  intro: string;
  updatedAt?: string;
  sections: { title: string; paragraphs: string[] }[];
  closing?: string;
  fields: {
    legalName: string;
    cuit: string;
    legajo: string;
    domain: string;
    email: string;
    address: string;
    phone: string;
    addressPending: string;
    phonePending: string;
  };
  complaintCta: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages(locale);
  const page = messages.legal?.legal as LegalInfoCopy | undefined;

  return buildMetadata({
    locale,
    title: page?.metaTitle ?? "Legal | Edmar Travel",
    description: page?.metaDescription ?? "",
    pathByLocale: buildLegalPathByLocale("legal"),
    ogImage: "/assets/images/hero/home-image.webp",
  });
}

export default async function LegalInfoRoutePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const messages = await getMessages(locale);
  const page = messages.legal?.legal as LegalInfoCopy | undefined;

  if (!page) return null;

  const { company, contact } = SITE_CONFIG;

  const infoRows = [
    { label: page.fields.legalName, value: company.legalName },
    { label: page.fields.cuit, value: company.cuit },
    { label: page.fields.legajo, value: company.legajo },
    { label: page.fields.domain, value: company.domain },
    { label: page.fields.email, value: contact.email },
    {
      label: page.fields.address,
      value: company.address ?? page.fields.addressPending,
      pending: !company.address,
    },
    {
      label: page.fields.phone,
      value: company.phone ?? page.fields.phonePending,
      pending: !company.phone,
    },
  ];

  return (
    <LegalPage
      kicker={page.kicker}
      title={page.title}
      intro={page.intro}
      updatedAt={page.updatedAt}
      infoRows={infoRows}
      sections={page.sections}
      closing={page.closing}
      actions={[
        {
          href: company.travelAgencyRegistryUrl,
          label: page.complaintCta,
          external: true,
        },
      ]}
    />
  );
}
