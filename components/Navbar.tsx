"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

const nav = [
  { label: "Manifeste", href: "#manifeste" },
  { label: "Expertise", href: "#expertise" },
  { label: "Approche", href: "#approche" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const bg = useTransform(
    scrollY,
    [0, 80],
    ["rgba(246,245,241,0)", "rgba(246,245,241,0.78)"]
  );
  const border = useTransform(
    scrollY,
    [0, 80],
    ["rgba(231,229,226,0)", "rgba(231,229,226,1)"]
  );

  return (
    <motion.header
      style={{ backgroundColor: bg, borderBottomColor: border }}
      className="fixed inset-x-0 top-0 z-50 border-b backdrop-blur-[8px]"
    >
      <div className="container-page flex h-16 items-center justify-between md:h-20">
        <Link href="/" aria-label="QCF Conseil" className="group">
          <span className="font-display text-[22px] tracking-tightest text-ink md:text-[24px]">
            QCF
            <span className="ml-1 italic text-ink-muted">Conseil</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[13px] text-ink-muted transition-colors duration-500 hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="group inline-flex items-center gap-2 text-[13px] text-ink"
        >
          <span className="link-underline">Prendre rendez-vous</span>
          <span
            aria-hidden
            className="inline-block translate-y-[-1px] transition-transform duration-500 ease-silk group-hover:translate-x-[3px]"
          >
            →
          </span>
        </a>
      </div>
    </motion.header>
  );
}
