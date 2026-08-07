"use client";

import Image from "next/image";
import { FormEvent, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import ReservationFormField, {
  inputClassName,
} from "@/components/reservation/ReservationFormField";
import {
  BOOKING_GLASS,
  BOOKING_LABEL_CLASS,
  BOOKING_PAGE_KICKER,
  BOOKING_SECTION_HINT,
  BOOKING_SECTION_TITLE,
} from "@/lib/booking-ui";
import { LEGAL_CONTAINER } from "@/lib/legal-ui";
import { SITE_CONFIG } from "@/lib/config";

const ease = [0.22, 1, 0.36, 1] as const;

export type ContactProductOption = { id: string; label: string };

export type ContactCopy = {
  hero: {
    eyebrow: string;
    title: string;
    intro: string;
    imageAlt: string;
  };
  info: {
    emailLabel: string;
    attentionLabel: string;
    attentionText: string;
    hoursText: string;
    quickTitle: string;
    quickText: string;
    whatsappLabel: string;
    whatsappCta: string;
  };
  form: {
    title: string;
    intro: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    experienceLabel: string;
    experiencePlaceholder: string;
    experienceOther: string;
    dateLabel: string;
    datePlaceholder: string;
    partySizeLabel: string;
    partySizePlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submit: string;
    sending: string;
    successTitle: string;
    successText: string;
    errorTitle: string;
    errorText: string;
    validation: {
      nameMin: string;
      emailInvalid: string;
      messageMin: string;
      partySizeInvalid: string;
      dateInvalid: string;
    };
  };
};

type FormState = {
  name: string;
  email: string;
  phone: string;
  experience: string;
  approximateDate: string;
  partySize: string;
  message: string;
};

type FieldErrors = Partial<Record<keyof FormState, string>>;

type Props = {
  copy: ContactCopy;
  products: ContactProductOption[];
  whatsappHref: string | null;
};

function validateForm(
  data: FormState,
  validation: ContactCopy["form"]["validation"]
): FieldErrors {
  const errors: FieldErrors = {};
  if (data.name.trim().length < 2) {
    errors.name = validation.nameMin;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = validation.emailInvalid;
  }
  if (data.message.trim().length < 10) {
    errors.message = validation.messageMin;
  }
  if (data.partySize.trim()) {
    const n = Number(data.partySize);
    if (!Number.isInteger(n) || n < 1) {
      errors.partySize = validation.partySizeInvalid;
    }
  }
  if (data.approximateDate.trim()) {
    const d = new Date(data.approximateDate);
    if (Number.isNaN(d.getTime())) {
      errors.approximateDate = validation.dateInvalid;
    }
  }
  return errors;
}

export default function ContactPageContent({
  copy,
  products,
  whatsappHref,
}: Props) {
  const reduced = useReducedMotion();
  const honeypotRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    experience: "",
    approximateDate: "",
    partySize: "",
    message: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const { hero, info, form: f } = copy;

  const experienceLabel = useMemo(() => {
    if (!form.experience) return "";
    if (form.experience === "__other__") return f.experienceOther;
    const found = products.find((p) => p.id === form.experience);
    return found?.label ?? form.experience;
  }, [form.experience, products, f.experienceOther]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setStatus((s) => (s === "error" ? "idle" : s));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pending) return;

    if (honeypotRef.current?.value) {
      return;
    }

    const nextErrors = validateForm(form, copy.form.validation);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus("idle");
      return;
    }

    setPending(true);
    setStatus("idle");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim() || undefined,
          message: form.message.trim(),
          experienceInterest: form.experience || undefined,
          experienceLabel: experienceLabel || undefined,
          approximateDate: form.approximateDate || undefined,
          partySize: form.partySize ? Number(form.partySize) : undefined,
          originUrl: typeof window !== "undefined" ? window.location.href : "",
        }),
      });
      if (!res.ok) throw new Error("contact_failed");
      setStatus("success");
      setForm({
        name: "",
        email: "",
        phone: "",
        experience: "",
        approximateDate: "",
        partySize: "",
        message: "",
      });
    } catch {
      setStatus("error");
    } finally {
      setPending(false);
    }
  };

  return (
    <div className={BOOKING_GLASS.pageWrap}>
      <div
        className={`${LEGAL_CONTAINER} pb-16 pt-[calc(var(--experience-header-height,5.5rem)+1.25rem)] md:pb-20 lg:pb-24`}
      >
        {/* Hero horizontal */}
        <motion.section
          aria-labelledby="contact-hero-title"
          className="relative overflow-hidden rounded-[1.5rem] shadow-[0_16px_48px_rgba(26,26,26,0.1)]"
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <div className="relative min-h-[14rem] sm:min-h-[16rem] lg:min-h-[18rem]">
            <Image
              src="/assets/images/home/header-home.webp"
              alt={hero.imageAlt}
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 72rem"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a]/85 via-[#1a1a1a]/60 to-[#1a1a1a]/30" />
            <div className="relative flex min-h-[14rem] flex-col justify-center p-6 sm:min-h-[16rem] sm:p-10 lg:min-h-[18rem] lg:p-12">
              <p className={BOOKING_PAGE_KICKER + " !text-[#C89B3C]"}>
                {hero.eyebrow}
              </p>
              <h1
                id="contact-hero-title"
                className="font-theater max-w-xl text-[2rem] font-semibold leading-[1.08] tracking-tight text-white sm:text-[2.375rem] lg:text-[2.625rem]"
              >
                {hero.title}
              </h1>
              <p className="mt-4 max-w-2xl text-[0.9375rem] leading-relaxed text-white sm:text-base">
                {hero.intro}
              </p>
            </div>
          </div>
        </motion.section>

        {/* Dos columnas */}
        <div className="mt-10 grid gap-8 lg:mt-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.35fr)] lg:items-start lg:gap-10">
          {/* Tarjeta informativa */}
          <motion.aside
            className={BOOKING_GLASS.panel + " lg:sticky lg:top-[calc(var(--experience-header-height,5.5rem)+1rem)]"}
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease, delay: 0.08 }}
            aria-label={info.attentionLabel}
          >
            <div className="space-y-7">
              <div>
                <p className={BOOKING_LABEL_CLASS}>{info.emailLabel}</p>
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="mt-1 inline-block text-[0.9375rem] font-medium text-[#1a1a1a] underline-offset-4 transition-colors hover:text-[#7A6248] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7A6248]/30 rounded-sm"
                >
                  {SITE_CONFIG.contact.email}
                </a>
              </div>

              <div>
                <p className={BOOKING_LABEL_CLASS}>{info.attentionLabel}</p>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-[#1a1a1a]/72">
                  {info.attentionText}
                </p>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-[#1a1a1a]/58">
                  {info.hoursText}
                </p>
              </div>

              {whatsappHref ? (
                <div>
                  <p className={BOOKING_LABEL_CLASS}>{info.whatsappLabel}</p>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex min-h-[48px] items-center justify-center rounded-xl bg-[#25D366] px-5 text-sm font-semibold text-[#0a0a0a] shadow-[0_4px_16px_rgba(37,211,102,0.2)] transition hover:bg-[#20BD5A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/45"
                  >
                    {info.whatsappCta}
                  </a>
                </div>
              ) : null}

              <div className="rounded-xl border border-[#1a1a1a]/[0.08] bg-[#F8F5EE] p-4 sm:p-5">
                <p className="text-sm font-semibold text-[#1a1a1a]">
                  {info.quickTitle}
                </p>
                <p className="mt-2 text-[0.875rem] leading-relaxed text-[#1a1a1a]/68">
                  {info.quickText}
                </p>
              </div>
            </div>
          </motion.aside>

          {/* Formulario */}
          <motion.div
            className={BOOKING_GLASS.panel}
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease, delay: 0.14 }}
          >
            <h2 className={BOOKING_SECTION_TITLE}>{f.title}</h2>
            <p className={BOOKING_SECTION_HINT}>{f.intro}</p>

            {status === "success" ? (
              <div
                role="status"
                aria-live="polite"
                className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-4"
              >
                <p className="font-semibold text-emerald-900">{f.successTitle}</p>
                <p className="mt-1 text-sm text-emerald-800/90">{f.successText}</p>
              </div>
            ) : null}

            {status === "error" ? (
              <div
                role="alert"
                aria-live="assertive"
                className="mt-6 rounded-xl border border-[#B4534A]/30 bg-[#FDF5F4] px-5 py-4"
              >
                <p className="font-semibold text-[#9B3D35]">{f.errorTitle}</p>
                <p className="mt-1 text-sm text-[#9B3D35]/90">{f.errorText}</p>
              </div>
            ) : null}

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
              noValidate
            >
              {/* Honeypot antispam — oculto para usuarios */}
              <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
                <label htmlFor="contact-website">Website</label>
                <input
                  ref={honeypotRef}
                  type="text"
                  id="contact-website"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <ReservationFormField
                id="contact-name"
                label={f.nameLabel}
                error={errors.name}
              >
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  minLength={2}
                  value={form.name}
                  onChange={handleChange}
                  disabled={pending}
                  autoComplete="name"
                  className={inputClassName(!!errors.name)}
                  placeholder={f.namePlaceholder}
                />
              </ReservationFormField>

              <ReservationFormField
                id="contact-email"
                label={f.emailLabel}
                error={errors.email}
              >
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  disabled={pending}
                  autoComplete="email"
                  className={inputClassName(!!errors.email)}
                  placeholder={f.emailPlaceholder}
                />
              </ReservationFormField>

              <ReservationFormField
                id="contact-phone"
                label={f.phoneLabel}
                error={errors.phone}
              >
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  disabled={pending}
                  autoComplete="tel"
                  className={inputClassName(!!errors.phone)}
                  placeholder={f.phonePlaceholder}
                />
              </ReservationFormField>

              <ReservationFormField
                id="contact-experience"
                label={f.experienceLabel}
                error={errors.experience}
              >
                <select
                  id="contact-experience"
                  name="experience"
                  value={form.experience}
                  onChange={handleChange}
                  disabled={pending}
                  className={inputClassName(!!errors.experience)}
                >
                  <option value="">{f.experiencePlaceholder}</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.label}
                    </option>
                  ))}
                  <option value="__other__">{f.experienceOther}</option>
                </select>
              </ReservationFormField>

              <div className="grid gap-5 sm:grid-cols-2">
                <ReservationFormField
                  id="contact-date"
                  label={f.dateLabel}
                  error={errors.approximateDate}
                >
                  <input
                    id="contact-date"
                    name="approximateDate"
                    type="date"
                    value={form.approximateDate}
                    onChange={handleChange}
                    disabled={pending}
                    className={inputClassName(!!errors.approximateDate)}
                  />
                </ReservationFormField>

                <ReservationFormField
                  id="contact-party"
                  label={f.partySizeLabel}
                  error={errors.partySize}
                >
                  <input
                    id="contact-party"
                    name="partySize"
                    type="number"
                    min={1}
                    step={1}
                    value={form.partySize}
                    onChange={handleChange}
                    disabled={pending}
                    className={inputClassName(!!errors.partySize)}
                    placeholder={f.partySizePlaceholder}
                  />
                </ReservationFormField>
              </div>

              <ReservationFormField
                id="contact-message"
                label={f.messageLabel}
                error={errors.message}
              >
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  minLength={10}
                  rows={6}
                  value={form.message}
                  onChange={handleChange}
                  disabled={pending}
                  className={`${inputClassName(!!errors.message)} min-h-[9rem] resize-y`}
                  placeholder={f.messagePlaceholder}
                />
              </ReservationFormField>

              <button
                type="submit"
                disabled={pending}
                className="inline-flex min-h-[52px] w-full items-center justify-center rounded-xl bg-[#1a1a1a] px-8 text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-[#2a2a2a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7A6248]/35 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-55 sm:w-auto sm:min-w-[14rem]"
              >
                {pending ? f.sending : f.submit}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
