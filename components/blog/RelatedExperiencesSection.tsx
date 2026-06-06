"use client";

import Link from "next/link";
import Image from "next/image";
import BlogScrollReveal from "./BlogScrollReveal";

type RelatedExperience = {
  id: string;
  title: string;
  image: string;
};

type RelatedExperiencesSectionProps = {
  title: string;
  exploreCta: string;
  locale: string;
  experiences: RelatedExperience[];
};

export default function RelatedExperiencesSection({
  title,
  exploreCta,
  locale,
  experiences,
}: RelatedExperiencesSectionProps) {
  if (experiences.length === 0) return null;

  return (
    <section className="category-page-section border-t border-[#1a1a1a]/8 py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-10 xl:px-14">
        <BlogScrollReveal>
          <h2 className="font-theater text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-[#1a1a1a]">
            {title}
          </h2>
        </BlogScrollReveal>

        <div className="mt-14 grid grid-cols-1 gap-14 md:mt-16 md:grid-cols-2 md:gap-16 lg:grid-cols-3 lg:gap-12 xl:gap-16">
          {experiences.map((experience, index) => (
            <BlogScrollReveal key={experience.id} delay={index * 0.07}>
              <Link
                href={`/${locale}/products/${experience.id}`}
                className="group block"
              >
                <article>
                  <div className="relative aspect-video overflow-hidden rounded-[28px] shadow-[0_16px_48px_rgba(26,26,26,0.06)] transition-shadow duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:shadow-[0_24px_64px_rgba(26,26,26,0.1)]">
                    <Image
                      src={experience.image}
                      alt={experience.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                    />
                  </div>
                  <h3 className="mt-6 font-theater text-[clamp(1.35rem,2.2vw,1.75rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-[#1a1a1a] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 md:mt-7">
                    {experience.title}
                  </h3>
                  <span className="mt-4 inline-flex text-sm font-medium tracking-[0.02em] text-[#1a1a1a]/70 transition-colors duration-500 group-hover:text-[#1a1a1a]">
                    {exploreCta}
                  </span>
                </article>
              </Link>
            </BlogScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
