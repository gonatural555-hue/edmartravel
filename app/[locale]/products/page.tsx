import ToursPageView from "@/components/tours/ToursPageView";
import type { ToursWorldPanelData } from "@/components/tours/ToursWorldPanel";
import { getProductsByCategorySlug } from "@/lib/categories";
import { EXPERIENCE_CATEGORY_ORDER } from "@/lib/experience-categories";
import { getMessages } from "@/lib/i18n/messages";
import { createTranslator } from "@/lib/i18n/translate";
import type { Locale } from "@/lib/i18n/config";
import { buildMetadata, formatTemplate } from "@/lib/seo";
import {
  TOURS_WORLD_IMAGES,
  TOURS_WORLD_IMAGE_POSITION,
  type ToursWorldId,
} from "@/lib/tours-page-config";

export const dynamic = "force-dynamic";

type ToursWorldCopy = {
  titleLines: string[];
  description: string;
  imageAlt: string;
};

function getToursWorldCopy(
  messages: Record<string, unknown>,
  id: ToursWorldId
): ToursWorldCopy {
  const page = (messages.toursPage ?? {}) as Record<string, unknown>;
  const worlds = (page.worlds ?? {}) as Record<string, ToursWorldCopy>;
  const block = worlds[id];
  if (!block) {
    return {
      titleLines: [id],
      description: "",
      imageAlt: id,
    };
  }
  return {
    titleLines: block.titleLines ?? [id],
    description: String(block.description ?? ""),
    imageAlt: String(block.imageAlt ?? id),
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const messages = await getMessages(locale);
  const seo = messages.seo?.products;

  return buildMetadata({
    locale,
    title: seo?.title,
    description: seo?.description,
    pathByLocale: {
      en: "/en/products",
      es: "/es/products",
      fr: "/fr/products",
      it: "/it/products",
    },
  });
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  let messages = await getMessages(locale);
  if (!messages.toursPage && locale !== "en") {
    const enMessages = await getMessages("en");
    messages = { ...messages, toursPage: enMessages.toursPage };
  }
  const t = createTranslator(messages);

  const ctaLabel = t("toursPage.ctaLabel");
  const countTemplate = t("toursPage.experienceCount");

  const worlds: ToursWorldPanelData[] = EXPERIENCE_CATEGORY_ORDER.map((id) => {
    const copy = getToursWorldCopy(messages, id);
    const count = getProductsByCategorySlug(id).length;

    return {
      id,
      href: `/${locale}/category/${id}`,
      imageSrc: TOURS_WORLD_IMAGES[id],
      imageAlt: copy.imageAlt,
      imagePosition: TOURS_WORLD_IMAGE_POSITION[id],
      titleLines: copy.titleLines,
      description: copy.description,
      experienceCountLabel: formatTemplate(countTemplate, {
        count: String(count),
      }),
      ctaLabel,
    };
  });

  return <ToursPageView worlds={worlds} />;
}
