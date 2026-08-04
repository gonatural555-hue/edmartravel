"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  LEGAL_BODY,
  LEGAL_CLOSING,
  LEGAL_CONTAINER,
  LEGAL_CONTENT_PANEL,
  LEGAL_H1,
  LEGAL_INTRO,
  LEGAL_KICKER,
  LEGAL_PAGE_WRAP,
  LEGAL_SECTION_TITLE,
  LEGAL_UPDATED,
  legalMotion,
} from "@/lib/legal-ui";

export type LegalSection = {
  title: string;
  paragraphs: string[];
};

export type LegalAction = {
  href: string;
  label: string;
  external?: boolean;
  variant?: "primary" | "outline";
};

export type LegalInfoRow = {
  label: string;
  value: string;
  pending?: boolean;
};

type LegalPageProps = {
  kicker?: string;
  title: string;
  intro: string;
  updatedAt?: string;
  sections: LegalSection[];
  closing?: string;
  actions?: LegalAction[];
  infoRows?: LegalInfoRow[];
};

export default function LegalPage({
  kicker,
  title,
  intro,
  updatedAt,
  sections,
  closing,
  actions,
  infoRows,
}: LegalPageProps) {
  const reduceMotion = useReducedMotion();

  return (
    <main className={LEGAL_PAGE_WRAP} data-route="legal">
      <div
        className={`${LEGAL_CONTAINER} pb-16 pt-[calc(var(--experience-header-height,5.5rem)+1.25rem)] md:pt-[calc(var(--experience-header-height,5.5rem)+1.75rem)]`}
      >
        <motion.div
          variants={reduceMotion ? undefined : legalMotion.container}
          initial={reduceMotion ? false : "hidden"}
          animate={reduceMotion ? undefined : "show"}
          className="space-y-8 md:space-y-10"
        >
          <motion.header
            variants={reduceMotion ? undefined : legalMotion.item}
            className="max-w-3xl"
          >
            {kicker ? <p className={LEGAL_KICKER}>{kicker}</p> : null}
            <h1 className={LEGAL_H1}>{title}</h1>
            <p className={LEGAL_INTRO}>{intro}</p>
            {updatedAt ? <p className={LEGAL_UPDATED}>{updatedAt}</p> : null}
          </motion.header>

          {infoRows && infoRows.length > 0 ? (
            <motion.div
              variants={reduceMotion ? undefined : legalMotion.item}
              className={LEGAL_CONTENT_PANEL}
            >
              <dl className="grid gap-4 sm:grid-cols-2">
                {infoRows.map((row) => (
                  <div
                    key={row.label}
                    className="rounded-xl border border-[#1a1a1a]/8 bg-[#F8F5EE]/50 px-4 py-3.5"
                  >
                    <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-[#1a1a1a]/52">
                      {row.label}
                    </dt>
                    <dd
                      className={`mt-1.5 text-sm font-medium sm:text-base ${
                        row.pending
                          ? "text-[#1a1a1a]/45 italic"
                          : "text-[#1a1a1a]"
                      }`}
                    >
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          ) : null}

          <motion.article
            variants={reduceMotion ? undefined : legalMotion.item}
            className={`${LEGAL_CONTENT_PANEL} space-y-10`}
          >
            {sections.map((section, index) => (
              <section
                key={`${section.title}-${index}`}
                className="space-y-4"
                aria-labelledby={`legal-section-${index}`}
              >
                <h2
                  id={`legal-section-${index}`}
                  className={LEGAL_SECTION_TITLE}
                >
                  {section.title}
                </h2>
                <div className="space-y-3">
                  {section.paragraphs.map((paragraph, paragraphIndex) => (
                    <p
                      key={`${section.title}-${paragraphIndex}`}
                      className={LEGAL_BODY}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}

            {closing ? <p className={`${LEGAL_CLOSING} border-t border-[#1a1a1a]/8 pt-8`}>{closing}</p> : null}

            {actions && actions.length > 0 ? (
              <div className="flex flex-wrap gap-3 border-t border-[#1a1a1a]/8 pt-8">
                {actions.map((action) =>
                  action.external ? (
                    <a
                      key={action.href}
                      href={action.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={
                        action.variant === "outline"
                          ? "inline-flex min-h-[52px] items-center justify-center rounded-xl border border-[#1a1a1a]/15 bg-white px-6 text-[0.9375rem] font-semibold text-[#1a1a1a] transition hover:border-[#1a1a1a]/25 hover:bg-[#F8F5EE] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7A6248]/35"
                          : "inline-flex min-h-[52px] items-center justify-center rounded-xl bg-[#1a1a1a] px-6 text-[0.9375rem] font-semibold text-white transition hover:bg-[#2a2a2a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7A6248]/35"
                      }
                    >
                      {action.label}
                    </a>
                  ) : (
                    <Link
                      key={action.href}
                      href={action.href}
                      className={
                        action.variant === "outline"
                          ? "inline-flex min-h-[52px] items-center justify-center rounded-xl border border-[#1a1a1a]/15 bg-white px-6 text-[0.9375rem] font-semibold text-[#1a1a1a] transition hover:border-[#1a1a1a]/25 hover:bg-[#F8F5EE] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7A6248]/35"
                          : "inline-flex min-h-[52px] items-center justify-center rounded-xl bg-[#1a1a1a] px-6 text-[0.9375rem] font-semibold text-white transition hover:bg-[#2a2a2a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7A6248]/35"
                      }
                    >
                      {action.label}
                    </Link>
                  )
                )}
              </div>
            ) : null}
          </motion.article>
        </motion.div>
      </div>
    </main>
  );
}
