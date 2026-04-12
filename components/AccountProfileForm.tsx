"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { useTranslations } from "@/components/i18n/LocaleProvider";

export default function AccountProfileForm() {
  const { user, updateProfile } = useUser();
  const t = useTranslations();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    setFirstName(user.first_name ?? "");
    setLastName(user.last_name ?? "");
    setPhone(user.phone ?? "");
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaved(false);
    setSaving(true);
    try {
      const { error: err } = await updateProfile({
        first_name: firstName,
        last_name: lastName,
        phone,
      });
      if (err) {
        setError(err);
        return;
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 4000);
    } finally {
      setSaving(false);
    }
  };

  if (!user) return null;

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-white/10 bg-dark-surface/30 p-6 space-y-5"
    >
      <h2 className="text-lg font-semibold text-text-primary">
        {t("accountPage.profileSectionTitle")}
      </h2>

      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">
          {t("accountPage.profileEmail")}
        </label>
        <input
          type="email"
          value={user.email}
          readOnly
          className="w-full rounded-xl border border-white/10 bg-dark-base/50 px-4 py-3 text-sm text-text-muted cursor-not-allowed"
        />
        <p className="text-xs text-text-muted">{t("accountPage.profileEmailHint")}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">
            {t("accountPage.profileFirstName")}
          </label>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
            autoComplete="given-name"
            required
            className="w-full rounded-xl border border-white/10 bg-dark-surface/70 px-4 py-3 text-sm text-text-primary focus:border-accent-gold/60 focus:outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">
            {t("accountPage.profileLastName")}
          </label>
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            autoComplete="family-name"
            required
            className="w-full rounded-xl border border-white/10 bg-dark-surface/70 px-4 py-3 text-sm text-text-primary focus:border-accent-gold/60 focus:outline-none"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">
          {t("accountPage.profilePhone")}
        </label>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          type="tel"
          autoComplete="tel"
          required
          className="w-full rounded-xl border border-white/10 bg-dark-surface/70 px-4 py-3 text-sm text-text-primary focus:border-accent-gold/60 focus:outline-none"
        />
      </div>

      {error && (
        <p className="text-sm text-red-300" role="alert">
          {error}
        </p>
      )}
      {saved && (
        <p className="text-sm text-emerald-300" role="status">
          {t("accountPage.profileSaved")}
        </p>
      )}

      <button
        type="submit"
        disabled={saving}
        className="rounded-xl bg-text-primary px-5 py-3 text-sm font-semibold text-dark-base hover:bg-white transition disabled:opacity-50"
      >
        {saving ? t("accountPage.profileSaving") : t("accountPage.profileSave")}
      </button>
    </form>
  );
}
