"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { ExperienceCard } from "./cinematicData";

type ExperienceNavigatorCardProps = {
  card: ExperienceCard;
  href: string;
  usePlaceholders: boolean;
  onNavigate?: () => void;
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 8 },
};

/**
 * Tarjeta horizontal del Experience Navigator.
 * Solo muestra imagen cuadrada, título, descripción corta y flecha.
 * No expone precio, duración ni lenguaje de carrito.
 */
export default function ExperienceNavigatorCard({
  card,
  href,
  usePlaceholders,
  onNavigate,
}: ExperienceNavigatorCardProps) {
  return (
    <motion.li variants={itemVariants}>
      <Link
        href={href}
        onClick={onNavigate}
        className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-3 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.02] hover:border-white/20 hover:bg-white/[0.09] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-gold"
      >
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-white/10">
          {usePlaceholders ? (
            // TODO(assets): sustituir por la imagen real en /public/cinematic/cards/.
            <div
              className="h-full w-full"
              style={{
                background:
                  "linear-gradient(135deg, #5A2E2E 0%, #2a1a12 55%, #0c1411 100%)",
              }}
              aria-hidden
            />
          ) : (
            <Image
              src={card.image}
              alt={card.title}
              fill
              sizes="96px"
              className="object-cover"
            />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-[15px] font-semibold leading-tight text-white">
            {card.title}
          </h3>
          <p className="mt-1.5 line-clamp-2 text-[13px] leading-snug text-white/65">
            {card.description}
          </p>
        </div>

        <span
          aria-hidden
          className="shrink-0 text-lg leading-none text-accent-gold/80 transition-transform duration-300 ease-out group-hover:translate-x-1"
        >
          &rarr;
        </span>
      </Link>
    </motion.li>
  );
}
