"use client";

import { useEffect, useRef, useState } from "react";
import type { ProductCardVideo as ProductCardVideoType } from "@/lib/product-types";

/** Codifica segmentos con caracteres especiales (ej. montaña → monta%C3%B1a). */
export function encodeAssetUrl(src: string): string {
  if (!src.startsWith("/")) return src;
  return src
    .split("/")
    .map((segment, index) => (index === 0 ? segment : encodeURIComponent(segment)))
    .join("/");
}

export function usePrefersReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setPrefersReduced(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return prefersReduced;
}

type ProductCardVideoProps = {
  cardVideo: ProductCardVideoType;
  title: string;
  className?: string;
  onError?: () => void;
};

export default function ProductCardVideo({
  cardVideo,
  title,
  className = "",
  onError,
}: ProductCardVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const src = encodeAssetUrl(cardVideo.src);
  const poster = cardVideo.poster ? encodeAssetUrl(cardVideo.poster) : undefined;

  useEffect(() => {
    const el = videoRef.current;
    if (!el || prefersReducedMotion) return;

    const tryPlay = () => {
      void el.play().catch(() => {
        /* autoplay bloqueado hasta interacción — el poster cubre el frame */
      });
    };

    tryPlay();

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) {
          el.pause();
          return;
        }
        tryPlay();
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [prefersReducedMotion, src]);

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      autoPlay
      preload="metadata"
      onError={() => onError?.()}
      className={className}
      aria-label={title}
    />
  );
}
