import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";
import LegalPage from "@/components/legal/LegalPage";
import {
  buildLegalPathByLocale,
  buildMetadata,
  type LegalPageKey,
} from "@/lib/seo";

type LegalCopy = {
  kicker?: string;
  metaTitle: string;
  metaDescription: string;
  title: string;
  intro: string;
  updatedAt?: string;
  sections: { title: string; paragraphs: string[] }[];
  closing?: string;
};

export function createLegalPageHandlers(pageKey: LegalPageKey) {
  async function generateMetadata({
    params,
  }: {
    params: Promise<{ locale: Locale }>;
  }): Promise<Metadata> {
    const { locale } = await params;
    const messages = await getMessages(locale);
    const page = messages.legal?.[pageKey] as LegalCopy | undefined;

    if (!page) {
      return { title: "Edmar Travel" };
    }

    return buildMetadata({
      locale,
      title: page.metaTitle,
      description: page.metaDescription,
      pathByLocale: buildLegalPathByLocale(pageKey),
      ogImage: "/assets/images/hero/home-image.webp",
    });
  }

  async function LegalRoutePage({
    params,
  }: {
    params: Promise<{ locale: Locale }>;
  }) {
    const { locale } = await params;
    const messages = await getMessages(locale);
    const page = messages.legal?.[pageKey] as LegalCopy | undefined;

    if (!page) {
      return null;
    }

    return (
      <LegalPage
        kicker={page.kicker}
        title={page.title}
        intro={page.intro}
        updatedAt={page.updatedAt}
        sections={page.sections}
        closing={page.closing}
      />
    );
  }

  return { generateMetadata, default: LegalRoutePage };
}
