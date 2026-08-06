import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n/config";
import { getProducts } from "@/lib/products";
import { getCategorySlugs } from "@/lib/categories";
import { getMessages } from "@/lib/i18n/messages";
import { blogSections } from "@/lib/blog-sections";
import { LEGAL_SLUGS, getSiteUrl, type LegalPageKey } from "@/lib/seo";
import { ABOUT_SLUGS, CONTACT_SLUGS } from "@/lib/page-slugs";

const LEGAL_PAGE_KEYS: LegalPageKey[] = [
  "legal",
  "privacy",
  "cookies",
  "terms",
  "cancellations",
];

const BASE_PAGES = ["", "products", "categories", "blog"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteUrl();
  const now = new Date();
  const urls: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    BASE_PAGES.forEach((path) => {
      const url = `${baseUrl}/${locale}${path ? `/${path}` : ""}`;
      urls.push({ url, lastModified: now });
    });
    urls.push({
      url: `${baseUrl}/${locale}/${ABOUT_SLUGS[locale]}`,
      lastModified: now,
    });
    urls.push({
      url: `${baseUrl}/${locale}/${CONTACT_SLUGS[locale]}`,
      lastModified: now,
    });
  });

  const categorySlugs = getCategorySlugs();
  locales.forEach((locale) => {
    categorySlugs.forEach((slug) => {
      urls.push({
        url: `${baseUrl}/${locale}/category/${slug}`,
        lastModified: now,
      });
    });
  });

  const products = getProducts();
  locales.forEach((locale) => {
    products.forEach((product) => {
      urls.push({
        url: `${baseUrl}/${locale}/products/${product.id}`,
        lastModified: now,
      });
    });
  });

  const messages = await getMessages("en");
  const postSlugs = Object.keys(messages.blog.posts);
  locales.forEach((locale) => {
    postSlugs.forEach((slug) => {
      urls.push({
        url: `${baseUrl}/${locale}/blog/${slug}`,
        lastModified: now,
      });
    });
  });

  locales.forEach((locale) => {
    blogSections.forEach((section) => {
      urls.push({
        url: `${baseUrl}/${locale}/blog/${section.slug}`,
        lastModified: now,
      });
    });
  });

  locales.forEach((locale) => {
    LEGAL_PAGE_KEYS.forEach((key) => {
      urls.push({
        url: `${baseUrl}/${locale}/${LEGAL_SLUGS[key][locale]}`,
        lastModified: now,
      });
    });
  });

  return urls;
}

