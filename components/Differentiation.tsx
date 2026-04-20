"use client";

import { Reveal } from "./ui/Reveal";
import { LineReveal } from "./ui/LineReveal";

const values = [
  { k: "Indépendance", v: "Aucune architecture ouverte maquillée. Nos conseils ne sont rémunérés que par vous." },
  { k: "Sélectivité", v: "Peu de clients. Beaucoup d’attention." },
  { k: "Discrétion", v: "Une relation tenue, sans bruit." },
  { k: "Vision long terme", v: "Nous mesurons la réussite en décennies." },
];

export function Differentiation() {
  return (
    <section className="relative py-32 md:py-56">
      <div className="container-page">
        <div className="grid grid-cols-12 gap-y-16 md:gap-x-8">
          <div className="col-span-12 md:col-span-3">
            <Reveal>
              <div className="flex items-center gap-3">
                <div className="h-px w-6 bg-ink" />
                <span className="eyebrow">04 — Principes</span>
              </div>
            </Reveal>
          </div>

          <div className="col-span-12 md:col-span-9">
            <Reveal>
              <h2 className="font-display text-display-lg text-ink">
                Ce qui nous distingue,
                <br />
                <span className="italic text-ink-muted">
                  et ne changera pas.
                </span>
              </h2>
            </Reveal>

            <div className="mt-24 md:mt-32">
              <LineReveal />
              <dl className="divide-y divide-ink-line">
                {values.map((item, i) => (
                  <Reveal key={item.k} delay={0.05 * i}>
                    <div className="grid grid-cols-12 items-baseline gap-4 py-10 md:py-12">
                      <dt className="col-span-12 font-display text-display-md text-ink md:col-span-5">
                        {item.k}
                      </dt>
                      <dd className="col-span-12 text-[15px] leading-relaxed text-ink-muted md:col-span-7">
                        {item.v}
                      </dd>
                    </div>
                  </Reveal>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
