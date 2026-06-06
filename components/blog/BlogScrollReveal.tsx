"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type BlogScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export default function BlogScrollReveal({
  children,
  className = "",
  delay = 0,
}: BlogScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-72px" }}
      transition={{
        duration: 0.75,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
