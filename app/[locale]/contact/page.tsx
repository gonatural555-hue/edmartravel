"use client";

import Image from "next/image";
import { useState, FormEvent } from "react";
import { useTranslations } from "@/components/i18n/LocaleProvider";
import { SITE_CONFIG } from "@/lib/config";

export default function ContactPage() {
  const t = useTranslations();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [pending, setPending] = useState(false);
  const [notice, setNotice] = useState<"success" | "error" | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNotice(null);
    setPending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });
      if (!res.ok) throw new Error("contact_failed");
      setNotice("success");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setNotice("error");
    } finally {
      setPending(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNotice((prev) => (prev === "error" ? null : prev));
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="relative min-h-[100dvh] bg-black">
      <div className="absolute inset-0">
        <Image
          src="/assets/images/hero/contact.webp"
          alt={t("contactPage.backgroundAlt")}
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>
      <main className="relative mx-auto max-w-7xl px-6 sm:px-10 lg:px-16 pt-28 pb-12 md:pt-32 md:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-20">
        {/* Columna izquierda - Información de contacto */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {t("contactPage.title")}
          </h1>
          <div className="space-y-6 text-white leading-relaxed">
            <p>{t("contactPage.intro")}</p>

            <div className="pt-4">
              <h2 className="text-lg font-semibold text-white mb-2">
                {t("contactPage.emailTitle")}
              </h2>
              <a
                href={`mailto:${SITE_CONFIG.contact.email}`}
                className="text-white underline transition-colors duration-200 hover:text-white/80"
              >
                {SITE_CONFIG.contact.email}
              </a>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white mb-2">
                {t("contactPage.hoursTitle")}
              </h2>
              <p className="text-white">
                {t("contactPage.hoursLine1")}
                <br />
                {t("contactPage.hoursLine2")}
                <br />
                {t("contactPage.hoursLine3")}
              </p>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-white">
                <strong className="text-white">
                  {t("contactPage.quickTitle")}
                </strong>{" "}
                {t("contactPage.quickText")}
              </p>
            </div>
          </div>
        </div>

        {/* Columna derecha - Formulario */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {notice === "success" && (
              <p
                role="status"
                className="rounded-lg border border-emerald-400/35 bg-emerald-500/15 px-4 py-3 text-sm text-emerald-50"
              >
                {t("contactPage.form.success")}
              </p>
            )}
            {notice === "error" && (
              <p
                role="alert"
                className="rounded-lg border border-red-400/35 bg-red-500/15 px-4 py-3 text-sm text-red-50"
              >
                {t("contactPage.form.error")}
              </p>
            )}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-white mb-2"
              >
                {t("contactPage.form.nameLabel")}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={pending}
                autoComplete="name"
                className="w-full px-4 py-3 border border-gray-300 rounded-md bg-dark-surface text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 disabled:opacity-60"
                placeholder={t("contactPage.form.namePlaceholder")}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white mb-2"
              >
                {t("contactPage.form.emailLabel")}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={pending}
                autoComplete="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-md bg-dark-surface text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 disabled:opacity-60"
                placeholder={t("contactPage.form.emailPlaceholder")}
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-white mb-2"
              >
                {t("contactPage.form.messageLabel")}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                disabled={pending}
                rows={6}
                className="w-full resize-none px-4 py-3 border border-gray-300 rounded-md bg-dark-surface text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 disabled:opacity-60"
                placeholder={t("contactPage.form.messagePlaceholder")}
              />
            </div>

            <button
              type="submit"
              disabled={pending}
              className="w-full rounded-md bg-white px-8 py-3 font-medium text-black transition-colors duration-200 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {pending ? t("contactPage.form.sending") : t("contactPage.form.submit")}
            </button>
          </form>
        </div>
        </div>
      </main>
    </div>
  );
}

