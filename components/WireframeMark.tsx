"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * An abstract, editorial wireframe — not a literal dashboard.
 * It evokes allocation, balance, long-term structure.
 */
export function WireframeMark() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-0.4, 0.4]);

  return (
    <div
      ref={ref}
      className="pointer-events-none relative aspect-[5/6] w-full select-none md:aspect-[5/7]"
    >
      <motion.svg
        style={{ y, rotate }}
        viewBox="0 0 500 700"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        <defs>
          <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0A0A0A" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0A0A0A" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id="accent" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2E3A46" stopOpacity="0.0" />
            <stop offset="100%" stopColor="#2E3A46" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {/* Frame */}
        <motion.rect
          x="1"
          y="1"
          width="498"
          height="698"
          fill="none"
          stroke="#0A0A0A"
          strokeOpacity="0.12"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Horizon line */}
        <motion.line
          x1="40"
          x2="460"
          y1="420"
          y2="420"
          stroke="#0A0A0A"
          strokeOpacity="0.25"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Golden-ratio column */}
        <motion.line
          x1="309"
          x2="309"
          y1="40"
          y2="660"
          stroke="#0A0A0A"
          strokeOpacity="0.08"
          strokeDasharray="2 6"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Allocation curve */}
        <motion.path
          d="M40 560 C 130 540, 180 470, 240 430 S 380 250, 460 120"
          fill="none"
          stroke="url(#fade)"
          strokeWidth="1.2"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Secondary soft curve */}
        <motion.path
          d="M40 620 C 160 600, 220 560, 280 520 S 420 380, 460 300"
          fill="none"
          stroke="#0A0A0A"
          strokeOpacity="0.18"
          strokeWidth="0.8"
          strokeDasharray="1 3"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2.4, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Accent disc */}
        <motion.circle
          cx="309"
          cy="270"
          r="86"
          fill="url(#accent)"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.circle
          cx="309"
          cy="270"
          r="86"
          fill="none"
          stroke="#0A0A0A"
          strokeOpacity="0.25"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, delay: 0.9 }}
        />

        {/* Tick marks */}
        {[80, 160, 240, 320, 400].map((x, i) => (
          <motion.line
            key={x}
            x1={x}
            x2={x}
            y1="414"
            y2="420"
            stroke="#0A0A0A"
            strokeOpacity="0.35"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1 + i * 0.08 }}
          />
        ))}

        {/* Coordinates — typographic detail */}
        <motion.text
          x="40"
          y="665"
          fill="#0A0A0A"
          fillOpacity="0.5"
          fontSize="9"
          letterSpacing="0.22em"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          INDEX · QCF / 01
        </motion.text>
        <motion.text
          x="460"
          y="665"
          textAnchor="end"
          fill="#0A0A0A"
          fillOpacity="0.5"
          fontSize="9"
          letterSpacing="0.22em"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.3, duration: 1 }}
        >
          MMXXVI
        </motion.text>
      </motion.svg>
    </div>
  );
}
