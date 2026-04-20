"use client";

import { motion } from "framer-motion";

type Props = {
  className?: string;
  delay?: number;
};

export function LineReveal({ className, delay = 0 }: Props) {
  return (
    <motion.div
      className={`h-px w-full origin-left bg-ink-line ${className ?? ""}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-5% 0px -5% 0px" }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay }}
    />
  );
}
