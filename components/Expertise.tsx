"use client";

import { Reveal } from "./ui/Reveal";
import { LineReveal } from "./ui/LineReveal";

const pillars = [
  {
    index: "I",
    title: "Structuration",
    line: "Donner au patrimoine une architecture cohérente.",
  },
  {
    index: "II",
    title: "Fiscalité",
    line: "Alléger la friction, sans jamais la recherche du risque.",
  },
  {
    index: "III",
    title: "Investissement",
    line: "Des allocations conçues pour traverser les cycles.",
  },
  {
    index: "IV",
    title: "Transmission",
    line: "Préparer la génération suivante, avec précision.",
  },
];

export function Expertise() {
  return (
    <section id="expertise" className="relative py-32 md:py-56">
      <div className="container-page">
        <div className="grid grid-cols-12 gap-y-16 md:gap-x-8">
          <div className="col-span-12 md:col-span-3">
            <Reveal>
              <div className="flex items-center gap-3">
                <div className="h-px w-6 bg-ink" />
                <span className="eyebrow">02 — Expertise</span>
              </div>
            </Reveal>
          </div>

          <div className="col-span-12 md:col-span-9">
            <Reveal>
              <h2 className="font-display text-display-lg text-ink">
                Quatre piliers.
                <br />
                <span className="italic text-ink-muted">
                  Une lecture unifiée.
                </span>
              </h2>
            </Reveal>

            <div className="mt-24 md:mt-32">
              <LineReveal />
              {pillars.map((p, i) => (
                <Reveal key={p.title} delay={0.05 * i}>
                  <article className="group grid grid-cols-12 items-baseline gap-4 py-10 transition-colors duration-700 ease-silk md:py-14">
                    <span className="col-span-2 font-display text-[18px] italic text-ink-muted md:col-span-1">
                      {p.index}
                    </span>
                    <h3 className="col-span-10 font-display text-display-md text-ink md:col-span-4">
                      {p.title}
                    </h3>
                    <p className="col-span-12 text-[15px] leading-relaxed text-ink-muted md:col-span-7">
                      {p.line}
                    </p>
                  </article>
                  <div className="hairline" />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
