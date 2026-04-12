import Hero from "@/components/hero/Hero";
import FeaturedExperiencesCarousel from "@/components/sections/FeaturedExperiencesCarousel";
import FeaturedExperiencesSectionHeader from "@/components/sections/FeaturedExperiencesSectionHeader";
import HomeExperienceCategories from "@/components/sections/HomeExperienceCategories";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FinalCTASection from "@/components/sections/FinalCTASection";
import { getProducts } from "@/lib/products";
import { getMessages } from "@/lib/i18n/messages";
import { createTranslator } from "@/lib/i18n/translate";
import type { Locale } from "@/lib/i18n/config";
import { buildMetadata } from "@/lib/seo";
import { SITE_CONFIG } from "@/lib/config";

const GOOGLE_REVIEWS_URL =
  "https://maps.app.goo.gl/ZPeBijNki3VKdGQn9";

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

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = createTranslator(await getMessages(locale));
  const products = getProducts();
  /** Imagen de tarjeta solo en home (carrusel); el catálogo y la PDP siguen usando `products`. */
  const cabalgataPicadaHomeCardImage =
    "/assets/images/products/CabalgataPicada/cabalgatapicada.webp";
  const featuredExperiencesProducts = products.slice(0, 3).map((p) =>
    p.id === "cabalgata-picada-potrerillos"
      ? { ...p, images: [cabalgataPicadaHomeCardImage] }
      : p
  );
  const ctaHref = `/${locale}/products`;
  const contactHref = `/${locale}/contact`;
  const whatsappPhone = SITE_CONFIG.contact.whatsappPhone;
  const whatsappHref =
    whatsappPhone.length > 0 ? `https://wa.me/${whatsappPhone}` : undefined;
  const testimonialItems = [
    {
      name: t("testimonials.item1.name"),
      text: t("testimonials.item1.text"),
      rating: 5,
    },
    {
      name: t("testimonials.item2.name"),
      text: t("testimonials.item2.text"),
      rating: 5,
    },
    {
      name: t("testimonials.item3.name"),
      text: t("testimonials.item3.text"),
      rating: 5,
    },
  ];
  const experienceCategoryItems = [
    {
      slug: "wine" as const,
      title: t("categories.names.wine"),
      image:
        "/assets/images/products/HalfDayWine/tour-bodega-medio-dia-10.webp",
      imageAlt: t("experienceCategories.altWine"),
    },
    {
      slug: "adventure" as const,
      title: t("categories.names.adventure"),
      image: "/assets/images/products/CabalgataPicada/cabalgatapicada.webp",
      imageAlt: t("experienceCategories.altAdventure"),
    },
    {
      slug: "city" as const,
      title: t("categories.names.city"),
      image: "/assets/images/products/MonoCityTour/monocitytour2.webp",
      imageAlt: t("experienceCategories.altCity"),
    },
  ];
  return (
    <main className="flex flex-col">
      {/* HERO */}
      <Hero
        title={t("hero.mainTitle")}
        subheading={t("hero.subheading")}
        primaryCtaLabel={t("hero.ctaPrimary")}
        primaryCtaHref={ctaHref}
        secondaryCtaLabel={t("hero.ctaSecondary")}
        secondaryCtaHref={contactHref}
        imageAlt={t("hero.imageAlt")}
      />

      {/* FEATURED EXPERIENCES */}
      {featuredExperiencesProducts.length > 0 && (
        <section
          className="relative isolate overflow-hidden border-t border-white/5 bg-dark-base"
          aria-labelledby="home-featured-experiences-heading"
        >
          <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 sm:px-10 md:py-20 lg:px-16 lg:py-24">
            <FeaturedExperiencesSectionHeader
              headingId="home-featured-experiences-heading"
              badge={t("featuredExperiences.badge")}
              headline={t("featuredExperiences.headline")}
              subheadline={t("featuredExperiences.subheadline")}
            />
            <div className="mt-14 md:mt-20 lg:mt-24">
              <FeaturedExperiencesCarousel
                products={featuredExperiencesProducts}
                locale={locale}
                ariaLabel={t("featuredExperiences.carouselAria")}
                badgeLabels={{
                  wine: t("categories.names.wine"),
                  adventure: t("categories.names.adventure"),
                  city: t("categories.names.city"),
                }}
                labels={{
                  viewProduct: t("common.viewExperience"),
                  addToCart: t("common.bookExperience"),
                  noImage: t("common.noImage"),
                }}
              />
            </div>
          </div>
        </section>
      )}

      <HomeExperienceCategories
        locale={locale}
        title={t("experienceCategories.title")}
        items={experienceCategoryItems}
      />

      <TestimonialsSection
        title={t("testimonials.title")}
        items={testimonialItems}
        googleReviewsUrl={GOOGLE_REVIEWS_URL}
        googleReviewsLabel={t("testimonials.googleCta")}
        googleReviewsAriaLabel={t("testimonials.googleCtaAria")}
      />

      {/* CTA FINAL */}
      <FinalCTASection
        title={t("finalCta.title")}
        ctaLabel={t("finalCta.cta")}
        ctaHref={ctaHref}
        secondaryCta={
          whatsappHref
            ? { label: t("finalCta.whatsapp"), href: whatsappHref }
            : undefined
        }
      />
    </main>
  );
}
