import WaxSealCta from "@/components/lab/wine-cta/cta/WaxSealCta";
import LuxuryGlassCardCta from "@/components/lab/wine-cta/cta/LuxuryGlassCardCta";
import WineLabelInvitationCta from "@/components/lab/wine-cta/cta/WineLabelInvitationCta";
import WineCtaLabStage from "@/components/lab/wine-cta/WineCtaLabStage";
import Link from "next/link";

const VARIANTS = [
  {
    id: "B",
    title: "Variant B",
    subtitle: "Wax Seal CTA",
    Cta: WaxSealCta,
  },
  {
    id: "C",
    title: "Variant C",
    subtitle: "Luxury Glass Card",
    Cta: LuxuryGlassCardCta,
  },
  {
    id: "D",
    title: "Variant D",
    subtitle: "Wine Label Invitation",
    Cta: WineLabelInvitationCta,
  },
] as const;

export default function WineCtaLabPage() {
  return (
    <main className="mx-auto max-w-[1600px] px-4 py-10 sm:px-6 lg:px-10 lg:py-14">
      <header className="mb-10 border-b border-[#E0DAD2] pb-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-accent-gold">
          Edmar Travel · Lab
        </p>
        <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-[#2C2420] sm:text-4xl">
          Wine Tours — Comparación de CTA
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#5C534C]">
          Misma composición (botella, copa, uvas, quesos, fondo blanco). Solo
          cambia el diseño del CTA. Uso interno — no afecta la home en
          producción.
        </p>
        <Link
          href="/es"
          className="mt-4 inline-block text-sm font-medium text-accent-gold underline-offset-4 hover:underline"
        >
          ← Volver al sitio
        </Link>
      </header>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-6 xl:gap-8">
        {VARIANTS.map(({ id, title, subtitle, Cta }) => (
          <article key={id} className="flex flex-col">
            <div className="mb-4 text-center lg:text-left">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8A7F72]">
                {title}
              </p>
              <h2 className="mt-1 font-serif text-lg font-semibold text-[#3D3228]">
                {subtitle}
              </h2>
            </div>
            <WineCtaLabStage cta={<Cta />} />
          </article>
        ))}
      </div>
    </main>
  );
}
