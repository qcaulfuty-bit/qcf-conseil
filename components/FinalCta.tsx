"use client";

import { Reveal } from "./ui/Reveal";

export function FinalCta() {
  return (
    <section id="contact" className="relative bg-ink text-paper">
      <div className="container-page py-32 md:py-56">
        <div className="mx-auto max-w-5xl text-center">
          <Reveal>
            <span className="eyebrow text-paper/50">05 — Collaboration</span>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="mt-10 font-display text-display-xl text-paper">
              Initier une
              <br />
              <span className="italic text-paper/60">collaboration.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.25}>
            <p className="mx-auto mt-10 max-w-lg text-[15px] leading-relaxed text-paper/60">
              Un premier échange, confidentiel, pour évaluer la pertinence
              d’un accompagnement. Sans engagement.
            </p>
          </Reveal>

          <Reveal delay={0.35}>
            <div className="mt-14 flex flex-col items-center justify-center gap-6 md:flex-row md:gap-10">
              <a
                href="mailto:contact@qcf-conseil.fr"
                className="group inline-flex items-center gap-3 rounded-full bg-paper px-7 py-4 text-[13px] tracking-wide text-ink transition-colors duration-500 hover:bg-accent hover:text-paper"
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
                href="mailto:contact@qcf-conseil.fr"
                className="text-[13px] text-paper/70 transition-colors duration-500 hover:text-paper"
              >
                <span className="link-underline">
                  contact@qcf-conseil.fr
                </span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
