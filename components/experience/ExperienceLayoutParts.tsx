import type { ReactNode } from "react";
import type { ExperienceRichContent } from "@/lib/experience-model";
import { WhatsAppButtonLabel } from "@/components/icons/WhatsAppIcon";
import { categoryEditorialButtonClass } from "@/components/category/CategoryEditorialButton";

const HEADING = "text-2xl font-semibold tracking-tight text-[#1a1a1a] md:text-3xl";
const SECTION_BORDER = "border-t border-[#1a1a1a]/8";
const CARD =
  "rounded-2xl border border-[#1a1a1a]/8 bg-white shadow-[0_4px_24px_rgba(26,26,26,0.06)]";
const LABEL = "text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1a1a1a]/50";
const BODY = "text-sm leading-relaxed text-[#1a1a1a]/65 md:text-base";
const BODY_LG =
  "text-base leading-[1.75] text-[#1a1a1a]/65 md:text-lg";

export function SectionShell({
  id,
  title,
  children,
  className = "",
  centered = false,
}: {
  id?: string;
  title: string;
  children: ReactNode;
  className?: string;
  centered?: boolean;
}) {
  const heading = (
    <h2 id={id ? `${id}-heading` : undefined} className={HEADING}>
      {title}
    </h2>
  );

  return (
    <section
      id={id}
      className={`scroll-mt-28 py-14 md:py-16 lg:py-20 ${SECTION_BORDER} ${className}`}
      aria-labelledby={id ? `${id}-heading` : undefined}
    >
      {centered ? (
        <div className="mx-auto max-w-4xl px-2 text-center sm:px-0">
          {heading}
          <div className="mt-8">{children}</div>
        </div>
      ) : (
        <>
          {heading}
          <div className="mt-8">{children}</div>
        </>
      )}
    </section>
  );
}

export function QuickFactsGrid({
  items,
  centered = false,
}: {
  items: { label: string; value: string }[];
  centered?: boolean;
}) {
  return (
    <ul
      className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ${centered ? "mx-auto" : ""}`}
    >
      {items.map((item) => (
        <li
          key={item.label}
          className={`${CARD} px-4 py-3 ${centered ? "text-center" : ""}`}
        >
          <p className={LABEL}>{item.label}</p>
          <p className="mt-1.5 text-sm font-medium leading-snug text-[#1a1a1a]">
            {item.value}
          </p>
        </li>
      ))}
    </ul>
  );
}

export function WhyLoveGrid({
  items,
  centered = false,
}: {
  items: string[];
  centered?: boolean;
}) {
  return (
    <ul className={`grid gap-4 md:grid-cols-2 ${centered ? "mx-auto" : ""}`}>
      {items.map((text, i) => (
        <li
          key={i}
          className={`flex gap-3 ${CARD} p-5 ${
            centered ? "flex-col items-center text-center" : ""
          }`}
        >
          <span
            className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#C89B3C]/15 text-xs font-semibold text-[#7A6248]"
            aria-hidden
          >
            {i + 1}
          </span>
          <p className={BODY}>{text}</p>
        </li>
      ))}
    </ul>
  );
}

export function EditorialColumns({
  paragraphs,
  centered = false,
}: {
  paragraphs: string[];
  centered?: boolean;
}) {
  return (
    <div
      className={`space-y-6 ${BODY_LG} ${
        centered ? "mx-auto max-w-3xl text-center" : ""
      }`}
    >
      {paragraphs.map((p, i) => (
        <p key={i} className={centered ? "" : "max-w-3xl"}>
          {p}
        </p>
      ))}
    </div>
  );
}

export function ItineraryTimeline({ lines }: { lines: string[] }) {
  return (
    <ol className="relative space-y-0 border-l border-[#1a1a1a]/15 pl-6 md:pl-8">
      {lines.map((line, idx) => (
        <li key={idx} className="pb-8 last:pb-0">
          <span
            className="absolute -left-[5px] mt-1.5 h-2.5 w-2.5 rounded-full bg-[#C89B3C] md:-left-[6px]"
            aria-hidden
          />
          <p className={BODY}>{line}</p>
        </li>
      ))}
    </ol>
  );
}

export function PlacesList({
  items,
  centered = false,
}: {
  items: string[];
  centered?: boolean;
}) {
  return (
    <ul className={`grid gap-3 md:grid-cols-2 ${centered ? "mx-auto" : ""}`}>
      {items.map((place) => (
        <li
          key={place}
          className={`flex rounded-xl border border-[#1a1a1a]/8 bg-white px-4 py-3 text-sm text-[#1a1a1a]/70 md:text-base ${
            centered
              ? "items-center justify-center gap-2 text-center"
              : "items-start gap-3"
          }`}
        >
          <span
            className={`shrink-0 rounded-full bg-[#C89B3C] ${
              centered ? "h-1.5 w-1.5" : "mt-1 h-1.5 w-1.5"
            }`}
          />
          {place}
        </li>
      ))}
    </ul>
  );
}

export function IncludedExcluded({
  included,
  excluded,
  includedTitle,
  excludedTitle,
  hideColumnTitles = false,
  centered = false,
}: {
  included: string[];
  excluded: string[];
  includedTitle: string;
  excludedTitle: string;
  hideColumnTitles?: boolean;
  centered?: boolean;
}) {
  const listItemClass = centered ? "flex justify-center gap-2" : "flex gap-2";

  return (
    <div
      className={`grid gap-10 md:grid-cols-2 md:gap-12 ${centered ? "mx-auto text-center" : ""}`}
    >
      <div>
        {!hideColumnTitles ? (
          <h3 className="text-lg font-semibold text-[#1a1a1a]">{includedTitle}</h3>
        ) : null}
        <ul
          className={`space-y-2.5 ${BODY} ${hideColumnTitles ? "" : "mt-4"}`}
        >
          {included.map((line) => (
            <li key={line} className={listItemClass}>
              <span className="text-[#7A6248]" aria-hidden>
                ✓
              </span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        {!hideColumnTitles ? (
          <h3 className="text-lg font-semibold text-[#1a1a1a]">{excludedTitle}</h3>
        ) : null}
        <ul className={`space-y-2.5 ${BODY} ${hideColumnTitles ? "" : "mt-4"}`}>
          {excluded.map((line) => (
            <li key={line} className={listItemClass}>
              <span className="text-[#1a1a1a]/35" aria-hidden>
                —
              </span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function PracticalInfoBlock({
  rich,
  labels,
  centered = false,
}: {
  rich: ExperienceRichContent;
  labels: {
    whatToBring: string;
    restrictions: string;
    weather: string;
    pickupDetails: string;
  };
  centered?: boolean;
}) {
  const listItemClass = centered ? "flex justify-center gap-2" : "flex gap-2";
  const subheading =
    "text-sm font-semibold uppercase tracking-[0.14em] text-[#1a1a1a]/50";

  return (
    <div
      className={`grid gap-10 md:grid-cols-2 ${centered ? "mx-auto text-center" : ""}`}
    >
      <div>
        <h3 className={subheading}>{labels.whatToBring}</h3>
        <ul className={`mt-3 space-y-2 ${BODY}`}>
          {rich.practical.whatToBring.map((item) => (
            <li key={item} className={listItemClass}>
              <span className="text-[#C89B3C]">·</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className={`space-y-6 ${BODY}`}>
        {rich.practical.restrictions ? (
          <div>
            <h3 className={subheading}>{labels.restrictions}</h3>
            <p className="mt-2 leading-relaxed">{rich.practical.restrictions}</p>
          </div>
        ) : null}
        {rich.practical.weather ? (
          <div>
            <h3 className={subheading}>{labels.weather}</h3>
            <p className="mt-2 leading-relaxed">{rich.practical.weather}</p>
          </div>
        ) : null}
        {rich.practical.pickupDetails ? (
          <div>
            <h3 className={subheading}>{labels.pickupDetails}</h3>
            <p className="mt-2 leading-relaxed">{rich.practical.pickupDetails}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function FaqAccordion({
  items,
  centered = false,
}: {
  items: { question: string; answer: string }[];
  centered?: boolean;
}) {
  return (
    <div
      className={`divide-y divide-[#1a1a1a]/8 rounded-2xl border border-[#1a1a1a]/8 bg-white shadow-[0_4px_24px_rgba(26,26,26,0.06)] ${
        centered ? "mx-auto max-w-2xl text-center" : ""
      }`}
    >
      {items.map((item, i) => (
        <details
          key={i}
          className="group px-4 py-1 md:px-6 [&_summary::-webkit-details-marker]:hidden"
        >
          <summary
            className={`flex cursor-pointer list-none items-center gap-4 py-4 text-sm font-medium text-[#1a1a1a] md:text-base ${
              centered ? "justify-center text-center" : "justify-between text-left"
            }`}
          >
            {item.question}
            <span
              className="shrink-0 text-[#1a1a1a]/45 transition-transform group-open:rotate-45"
              aria-hidden
            >
              +
            </span>
          </summary>
          <p className={`pb-4 ${BODY}`}>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

export function TestimonialsMini({
  items,
  title,
}: {
  items: { name: string; text: string; rating: number }[];
  title: string;
}) {
  if (!items.length) return null;
  return (
    <section className={`py-14 md:py-16 ${SECTION_BORDER}`}>
      <div className="mx-auto max-w-5xl px-2 text-center sm:px-0">
        <h2 className={HEADING}>{title}</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {items.map((t) => (
            <figure key={t.name + t.text.slice(0, 12)} className={`${CARD} p-6 text-center`}>
              <div className="flex justify-center gap-0.5 text-[#C89B3C]" aria-hidden>
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i} className={i < t.rating ? "opacity-100" : "opacity-25"}>
                    ★
                  </span>
                ))}
              </div>
              <blockquote className={`mt-3 ${BODY}`}>
                <p>{t.text}</p>
              </blockquote>
              <figcaption className="mt-4 text-sm font-medium text-[#1a1a1a]">
                {t.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCtaBand({
  title,
  subtitle,
  primaryLabel,
  secondaryLabel,
  primaryHrefMobile,
  primaryHrefDesktop,
  secondaryHref,
  primaryDisabled,
}: {
  title: string;
  subtitle: string;
  primaryLabel: string;
  secondaryLabel: string;
  primaryHrefMobile: string;
  primaryHrefDesktop: string;
  secondaryHref?: string;
  primaryDisabled?: boolean;
}) {
  const primaryBtn = categoryEditorialButtonClass("primary", "min-w-[200px] px-8 py-3.5 text-sm");
  const secondaryBtn = categoryEditorialButtonClass(
    "secondary",
    "min-w-[200px] gap-2 px-8 py-3.5 text-sm"
  );
  const primaryMuted =
    "inline-flex min-w-[200px] cursor-not-allowed items-center justify-center rounded-full border border-[#1a1a1a]/10 bg-[#1a1a1a]/8 px-8 py-3.5 text-sm font-semibold text-[#1a1a1a]/45";

  return (
    <section
      className={`relative overflow-hidden rounded-3xl border border-[#1a1a1a]/8 bg-white px-6 py-12 text-center shadow-[0_8px_40px_rgba(26,26,26,0.08)] md:px-12 md:py-16`}
    >
      <div className="relative mx-auto max-w-2xl">
        <h2 className={HEADING}>{title}</h2>
        <p className={`mt-4 ${BODY}`}>{subtitle}</p>
        <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:justify-center">
          {primaryDisabled ? (
            <>
              <span className={`${primaryMuted} xl:hidden`} aria-disabled>
                {primaryLabel}
              </span>
              <span className={`${primaryMuted} hidden xl:inline-flex`} aria-disabled>
                {primaryLabel}
              </span>
            </>
          ) : (
            <>
              <a href={primaryHrefMobile} className={`${primaryBtn} xl:hidden`}>
                {primaryLabel}
              </a>
              <a href={primaryHrefDesktop} className={`${primaryBtn} hidden xl:inline-flex`}>
                {primaryLabel}
              </a>
            </>
          )}
          {secondaryHref ? (
            <a
              href={secondaryHref}
              target="_blank"
              rel="noopener noreferrer"
              className={secondaryBtn}
            >
              <WhatsAppButtonLabel label={secondaryLabel} />
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
