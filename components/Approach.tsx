"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "./ui/Reveal";

const steps = [
  {
    n: "01",
    title: "Diagnostic",
    body: "Comprendre la structure existante, les objectifs, les contraintes.",
  },
  {
    n: "02",
    title: "Stratégie",
    body: "Élaborer un plan patrimonial cohérent, réaliste, défendable.",
  },
  {
    n: "03",
    title: "Exécution",
    body: "Orchestrer chaque décision avec les meilleurs partenaires.",
  },
  {
    n: "04",
    title: "Suivi",
    body: "Revues régulières. Ajuster sans jamais s’agiter.",
  },
];

export function Approach() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.1"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="approche" className="relative bg-ink py-32 text-paper md:py-56">
      <div ref={ref} className="container-page">
        <div className="grid grid-cols-12 gap-y-16 md:gap-x-8">
          <div className="col-span-12 md:col-span-3">
            <Reveal>
              <div className="flex items-center gap-3">
                <div className="h-px w-6 bg-paper/60" />
                <span className="eyebrow text-paper/60">03 — Approche</span>
              </div>
            </Reveal>
          </div>

          <div className="col-span-12 md:col-span-9">
            <Reveal>
              <h2 className="font-display text-display-lg text-paper">
                Une méthode,
                <br />
                <span className="italic text-paper/50">
                  tenue dans la durée.
                </span>
              </h2>
            </Reveal>

            <div className="relative mt-24 md:mt-32">
              {/* Animated spine */}
              <div className="absolute left-0 top-0 h-full w-px bg-paper/10 md:left-[64px]">
                <motion.div
                  style={{ height: lineHeight }}
                  className="w-px origin-top bg-paper"
                />
              </div>

              <ol className="space-y-16 pl-8 md:space-y-24 md:pl-28">
                {steps.map((s, i) => (
                  <Reveal key={s.n} delay={0.05 * i}>
                    <li className="grid grid-cols-12 items-baseline gap-4">
                      <span className="col-span-12 font-display text-[16px] italic text-paper/40 md:col-span-1">
                        {s.n}
                      </span>
                      <h3 className="col-span-12 font-display text-display-md text-paper md:col-span-4">
                        {s.title}
                      </h3>
                      <p className="col-span-12 max-w-md text-[15px] leading-relaxed text-paper/60 md:col-span-7">
                        {s.body}
                      </p>
                    </li>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
