"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ExperienceNavigatorCard from "./ExperienceNavigatorCard";
import {
  USE_PLACEHOLDERS,
  type ExperienceCategory,
} from "./cinematicData";

type ExperienceNavigatorProps = {
  open: boolean;
  category: ExperienceCategory;
  locale: string;
  onClose: () => void;
};

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.4 } },
};

const panelVariants = {
  hidden: { x: "100%" },
  visible: { x: 0, transition: { duration: 0.7, ease: EASE_OUT } },
  exit: { x: "100%", transition: { duration: 0.5, ease: EASE_OUT } },
};

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.22 } },
  exit: {},
};

/**
 * Experience Navigator — panel lateral derecho con glassmorphism.
 * Componente global reutilizable por todos los capítulos (Fase 2: solo wine).
 * El oscurecido + blur del hero los gestiona HomeCinematicLanding.
 */
export default function ExperienceNavigator({
  open,
  category,
  locale,
  onClose,
}: ExperienceNavigatorProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Mover el foco al panel al abrir.
    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 60);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="overlay"
          className="fixed inset-0 z-[60] bg-black/50"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
          aria-hidden
        />
      ) : null}
      {open ? (
        <motion.div
            key="panel"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="experience-navigator-title"
            className="fixed right-0 top-0 z-[70] flex h-[100dvh] w-full flex-col sm:w-[480px]"
            style={{
              background: "rgba(255, 255, 255, 0.08)",
              backdropFilter: "blur(40px)",
              WebkitBackdropFilter: "blur(40px)",
              borderLeft: "1px solid rgba(255, 255, 255, 0.16)",
              boxShadow: "-30px 0 80px rgba(0, 0, 0, 0.35)",
            }}
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <header className="flex items-start justify-between gap-4 px-7 pt-8 sm:px-9 sm:pt-10">
              <div>
                <h2
                  id="experience-navigator-title"
                  className="text-2xl font-semibold tracking-tight text-white"
                >
                  {category.title}
                </h2>
                <p className="mt-1.5 text-sm text-white/60">{category.subtitle}</p>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Cerrar"
                className="-mr-1 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 text-white/80 transition-colors duration-200 hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-gold"
              >
                <span aria-hidden className="text-xl leading-none">
                  &times;
                </span>
              </button>
            </header>

            <motion.ul
              className="mt-8 flex flex-col gap-4 overflow-y-auto px-7 pb-10 sm:px-9"
              variants={listVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {category.experiences.map((card) => (
                <ExperienceNavigatorCard
                  key={card.id}
                  card={card}
                  href={`/${locale}/products/${card.productId}`}
                  usePlaceholders={USE_PLACEHOLDERS}
                  onNavigate={onClose}
                />
              ))}
            </motion.ul>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
