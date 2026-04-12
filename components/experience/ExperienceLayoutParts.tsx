import type { ReactNode } from "react";
import type { ExperienceRichContent } from "@/lib/experience-model";

export function SectionShell({
  id,
  title,
  children,
  className = "",
}: {
  id?: string;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-28 border-t border-white/10 py-14 md:py-16 lg:py-20 ${className}`}
      aria-labelledby={id ? `${id}-heading` : undefined}
    >
      <h2
        id={id ? `${id}-heading` : undefined}
        className="text-2xl font-semibold tracking-tight text-text-primary md:text-3xl"
      >
        {title}
      </h2>
      <div className="mt-8">{children}</div>
    </section>
  );
}

export function QuickFactsGrid({
  items,
}: {
  items: { label: string; value: string }[];
}) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li
          key={item.label}
          className="rounded-2xl border border-white/10 bg-dark-surface/35 px-4 py-3"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted/80">
            {item.label}
          </p>
          <p className="mt-1.5 text-sm font-medium leading-snug text-text-primary">
            {item.value}
          </p>
        </li>
      ))}
    </ul>
  );
}

export function WhyLoveGrid({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {items.map((text, i) => (
        <li
          key={i}
          className="flex gap-3 rounded-2xl border border-white/10 bg-dark-surface/25 p-5"
        >
          <span
            className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-gold/15 text-xs font-semibold text-accent-gold"
            aria-hidden
          >
            {i + 1}
          </span>
          <p className="text-sm leading-relaxed text-text-muted md:text-base">
            {text}
          </p>
        </li>
      ))}
    </ul>
  );
}

export function EditorialColumns({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="space-y-6 text-base leading-[1.75] text-text-muted md:text-lg">
      {paragraphs.map((p, i) => (
        <p key={i} className="max-w-3xl">
          {p}
        </p>
      ))}
    </div>
  );
}

export function ItineraryTimeline({ lines }: { lines: string[] }) {
  return (
    <ol className="relative space-y-0 border-l border-white/15 pl-6 md:pl-8">
      {lines.map((line, idx) => (
        <li key={idx} className="pb-8 last:pb-0">
          <span
            className="absolute -left-[5px] mt-1.5 h-2.5 w-2.5 rounded-full bg-accent-gold md:-left-[6px]"
            aria-hidden
          />
          <p className="text-sm leading-relaxed text-text-muted md:text-base">
            {line}
          </p>
        </li>
      ))}
    </ol>
  );
}

export function PlacesList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3 md:grid-cols-2">
      {items.map((place) => (
        <li
          key={place}
          className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-text-muted md:text-base"
        >
          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-gold" />
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
}: {
  included: string[];
  excluded: string[];
  includedTitle: string;
  excludedTitle: string;
  hideColumnTitles?: boolean;
}) {
  return (
    <div className="grid gap-10 md:grid-cols-2 md:gap-12">
      <div>
        {!hideColumnTitles ? (
        <h3 className="text-lg font-semibold text-text-primary">
          {includedTitle}
        </h3>
        ) : null}
        <ul
          className={`space-y-2.5 text-sm text-text-muted md:text-base ${hideColumnTitles ? "" : "mt-4"}`}
        >
          {included.map((line) => (
            <li key={line} className="flex gap-2">
              <span className="text-accent-gold" aria-hidden>
                ✓
              </span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        {!hideColumnTitles ? (
        <h3 className="text-lg font-semibold text-text-primary">
          {excludedTitle}
        </h3>
        ) : null}
        <ul className={`space-y-2.5 text-sm text-text-muted md:text-base ${hideColumnTitles ? "" : "mt-4"}`}>
          {excluded.map((line) => (
            <li key={line} className="flex gap-2">
              <span className="text-text-muted/50" aria-hidden>
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
}: {
  rich: ExperienceRichContent;
  labels: {
    whatToBring: string;
    restrictions: string;
    weather: string;
    pickupDetails: string;
  };
}) {
  return (
    <div className="grid gap-10 md:grid-cols-2">
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-text-muted/80">
          {labels.whatToBring}
        </h3>
        <ul className="mt-3 space-y-2 text-sm text-text-muted md:text-base">
          {rich.practical.whatToBring.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-accent-gold/90">·</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="space-y-6 text-sm text-text-muted md:text-base">
        {rich.practical.restrictions ? (
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-text-muted/80">
              {labels.restrictions}
            </h3>
            <p className="mt-2 leading-relaxed">{rich.practical.restrictions}</p>
          </div>
        ) : null}
        {rich.practical.weather ? (
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-text-muted/80">
              {labels.weather}
            </h3>
            <p className="mt-2 leading-relaxed">{rich.practical.weather}</p>
          </div>
        ) : null}
        {rich.practical.pickupDetails ? (
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-text-muted/80">
              {labels.pickupDetails}
            </h3>
            <p className="mt-2 leading-relaxed">{rich.practical.pickupDetails}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function FaqAccordion({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  return (
    <div className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-dark-surface/20">
      {items.map((item, i) => (
        <details
          key={i}
          className="group px-4 py-1 md:px-6 [&_summary::-webkit-details-marker]:hidden"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left text-sm font-medium text-text-primary md:text-base">
            {item.question}
            <span
              className="text-text-muted transition-transform group-open:rotate-45"
              aria-hidden
            >
              +
            </span>
          </summary>
          <p className="pb-4 text-sm leading-relaxed text-text-muted md:text-base">
            {item.answer}
          </p>
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
    <section className="border-t border-white/10 py-14 md:py-16">
      <h2 className="text-2xl font-semibold tracking-tight text-text-primary md:text-3xl">
        {title}
      </h2>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {items.map((t) => (
          <figure
            key={t.name + t.text.slice(0, 12)}
            className="rounded-2xl border border-white/10 bg-dark-surface/30 p-6"
          >
            <div className="flex gap-0.5 text-accent-gold" aria-hidden>
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i} className={i < t.rating ? "opacity-100" : "opacity-25"}>
                  ★
                </span>
              ))}
            </div>
            <blockquote className="mt-3 text-sm leading-relaxed text-text-muted">
              <p>{t.text}</p>
            </blockquote>
            <figcaption className="mt-4 text-sm font-medium text-text-primary">
              {t.name}
            </figcaption>
          </figure>
        ))}
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
  /** When true, primary CTA is non-interactive (e.g. “available soon”) */
  primaryDisabled?: boolean;
}) {
  const primaryClass =
    "inline-flex min-w-[200px] items-center justify-center rounded-xl px-8 py-3.5 text-sm font-semibold transition xl:hidden";
  const primaryClassDesktop =
    "hidden min-w-[200px] items-center justify-center rounded-xl px-8 py-3.5 text-sm font-semibold transition xl:inline-flex";
  const primaryActive =
    "bg-accent-gold text-dark-base hover:bg-accent-gold/90";
  const primaryMuted =
    "cursor-not-allowed bg-accent-gold/35 text-dark-base/75";

  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-dark-surface/80 via-dark-base to-dark-base px-6 py-12 text-center md:px-12 md:py-16">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 20%, rgba(212,175,55,0.35), transparent 45%)",
        }}
      />
      <div className="relative mx-auto max-w-2xl">
        <h2 className="text-2xl font-semibold tracking-tight text-text-primary md:text-3xl">
          {title}
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-text-muted md:text-base">
          {subtitle}
        </p>
        <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:justify-center">
          {primaryDisabled ? (
            <span
              className={`${primaryClass} ${primaryMuted}`}
              aria-disabled
            >
              {primaryLabel}
            </span>
          ) : (
            <a
              href={primaryHrefMobile}
              className={`${primaryClass} ${primaryActive}`}
            >
              {primaryLabel}
            </a>
          )}
          {primaryDisabled ? (
            <span
              className={`${primaryClassDesktop} ${primaryMuted}`}
              aria-disabled
            >
              {primaryLabel}
            </span>
          ) : (
            <a
              href={primaryHrefDesktop}
              className={`${primaryClassDesktop} ${primaryActive}`}
            >
              {primaryLabel}
            </a>
          )}
          {secondaryHref ? (
            <a
              href={secondaryHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-w-[200px] items-center justify-center rounded-xl border-2 border-white/40 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              {secondaryLabel}
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
