"use client";

import { motion } from "framer-motion";
import { WireframeMark } from "./WireframeMark";

export function Hero() {
  return (
    <section className="relative pt-28 md:pt-40">
      <div className="container-page">
        <div className="grid grid-cols-12 items-start gap-y-16 md:gap-x-8">
          {/* Eyebrow / meta */}
          <div className="col-span-12 flex items-center justify-between md:col-span-12">
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="eyebrow"
            >
              Cabinet indépendant · Paris
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="eyebrow hidden md:inline"
            >
              Édition MMXXVI
            </motion.span>
          </div>

          {/* Headline */}
          <div className="col-span-12 md:col-span-8">
            <h1 className="font-display text-display-xl text-ink">
              <HeroWord delay={0.05}>La&nbsp;gestion</HeroWord>
              <br />
              <HeroWord delay={0.18}>
                <span className="italic text-ink-muted">de patrimoine,</span>
              </HeroWord>
              <br />
              <HeroWord delay={0.32}>réinventée.</HeroWord>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.1,
                delay: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-10 max-w-md text-[15px] leading-relaxed text-ink-muted md:mt-14"
            >
              Structurer. Optimiser. Transmettre.
              <br />
              Un accompagnement sobre, pensé pour le temps long.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-12 flex items-center gap-8"
            >
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 rounded-full border border-ink px-6 py-3 text-[13px] tracking-wide text-ink transition-colors duration-500 hover:bg-ink hover:text-paper"
              >
                <span>Prendre rendez-vous</span>
                <span
                  aria-hidden
                  className="inline-block transition-transform duration-500 ease-silk group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
              <a
                href="#manifeste"
                className="hidden text-[13px] text-ink-muted transition-colors duration-500 hover:text-ink md:inline"
              >
                <span className="link-underline">Découvrir le manifeste</span>
              </a>
            </motion.div>
          </div>

          {/* Wireframe visual */}
          <div className="col-span-12 md:col-span-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.6, delay: 0.4 }}
              className="md:-mt-6"
            >
              <WireframeMark />
            </motion.div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="mt-24 flex items-center justify-between md:mt-40">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.6, delay: 1.1 }}
            className="flex items-center gap-3"
          >
            <div className="h-px w-10 bg-ink" />
            <span className="eyebrow">Faites défiler</span>
          </motion.div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.6, delay: 1.2 }}
            className="eyebrow"
          >
            01 — Manifeste
          </motion.span>
        </div>
      </div>
    </section>
  );
}

function HeroWord({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <span className="inline-block overflow-hidden align-bottom">
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{
          duration: 1.2,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="inline-block"
      >
        {children}
      </motion.span>
    </span>
  );
}
