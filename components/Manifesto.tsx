"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "./ui/Reveal";
import { LineReveal } from "./ui/LineReveal";

const MANIFESTO =
  "Nous conseillons un cercle restreint de familles, d’entrepreneurs et de dirigeants. Notre rôle : clarifier la complexité, aligner les décisions financières avec une trajectoire de vie, et préserver ce qui se construit sur plusieurs décennies.";

export function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.2"],
  });

  const words = MANIFESTO.split(" ");

  return (
    <section id="manifeste" ref={ref} className="relative py-32 md:py-56">
      <div className="container-page">
        <div className="grid grid-cols-12 gap-y-12 md:gap-x-8">
          <div className="col-span-12 md:col-span-3">
            <Reveal>
              <div className="flex items-center gap-3">
                <div className="h-px w-6 bg-ink" />
                <span className="eyebrow">01 — Manifeste</span>
              </div>
            </Reveal>
          </div>

          <div className="col-span-12 md:col-span-9">
            <p className="font-display text-display-md">
              {words.map((w, i) => (
                <Word
                  key={i}
                  progress={scrollYProgress}
                  range={[i / words.length, (i + 4) / words.length]}
                >
                  {w}
                </Word>
              ))}
            </p>

            <div className="mt-24">
              <LineReveal />
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <Reveal>
                  <span className="eyebrow">Indépendance totale</span>
                </Reveal>
                <Reveal delay={0.1}>
                  <span className="eyebrow">Conseil sur mesure</span>
                </Reveal>
                <Reveal delay={0.2}>
                  <span className="eyebrow">Vision à trente ans</span>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <motion.span style={{ opacity }} className="inline text-ink">
      {children}{" "}
    </motion.span>
  );
}
