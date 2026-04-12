import Image from "next/image";
import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";
import { buildMetadata } from "@/lib/seo";
import { SITE_CONFIG } from "@/lib/config";
import AboutPageContent from "@/components/about/AboutPageContent";

const secondaryCtaClassName =
  "inline-flex justify-center rounded-lg border-2 border-white/25 bg-transparent px-8 py-3.5 text-sm font-semibold text-white transition hover:border-accent-gold/60 hover:text-accent-gold focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-[#0f0a0a]";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages(locale);
  const a = messages.aboutPage;

  return buildMetadata({
    locale,
    title: a.metaTitle,
    description: a.metaDescription,
    pathByLocale: {
      en: "/en/about",
      es: "/es/about",
      fr: "/fr/about",
      it: "/it/about",
    },
    ogImage: "/assets/images/hero/home-image.webp",
  });
}

type AboutCopy = {
  metaTitle: string;
  metaDescription: string;
  heroImageAlt: string;
  heroTitle: string;
  heroSubtitle: string;
  whoTitle: string;
  whoParagraphs: string[];
  experiencesTitle: string;
  experiencesIntro: string;
  experienceCategories: { title: string; text: string }[];
  whyTitle: string;
  whyParagraphs: string[];
  valuesTitle: string;
  values: { title: string; text: string }[];
  testimonialsTitle: string;
  testimonials: { name: string; text: string }[];
  ctaTitle: string;
  ctaParagraph: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const messages = await getMessages(locale);
  const a = messages.aboutPage as AboutCopy;
  const waDigits = SITE_CONFIG.contact.whatsappPhone;
  const whatsappHref =
    waDigits.length > 0 ? `https://wa.me/${waDigits}` : null;

  const copy = {
    heroTitle: a.heroTitle,
    heroSubtitle: a.heroSubtitle,
    whoTitle: a.whoTitle,
    whoParagraphs: a.whoParagraphs,
    experiencesTitle: a.experiencesTitle,
    experiencesIntro: a.experiencesIntro,
    experienceCategories: a.experienceCategories,
    whyTitle: a.whyTitle,
    whyParagraphs: a.whyParagraphs,
    valuesTitle: a.valuesTitle,
    values: a.values,
    testimonialsTitle: a.testimonialsTitle,
    testimonials: a.testimonials,
    ctaTitle: a.ctaTitle,
    ctaParagraph: a.ctaParagraph,
    ctaPrimary: a.ctaPrimary,
    ctaSecondary: a.ctaSecondary,
  };

  return (
    <div className="relative min-h-[100dvh] bg-[#0f0a0a]">
      <div className="absolute inset-0">
        <Image
          src="/assets/images/hero/home-image.webp"
          alt={a.heroImageAlt}
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/82 to-[#0f0a0a]" />
      </div>

      <AboutPageContent
        copy={copy}
        whatsappHref={whatsappHref}
        productsHref={`/${locale}/products`}
        contactHref={`/${locale}/contact`}
        secondaryCtaClassName={secondaryCtaClassName}
      />
    </div>
  );
}
