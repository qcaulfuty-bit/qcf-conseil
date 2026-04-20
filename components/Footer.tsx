export function Footer() {
  return (
    <footer className="border-t border-paper/10 bg-ink text-paper/60">
      <div className="container-page py-12">
        <div className="grid grid-cols-12 gap-y-8 md:gap-x-8">
          <div className="col-span-12 md:col-span-4">
            <span className="font-display text-[22px] text-paper">
              QCF <span className="italic text-paper/50">Conseil</span>
            </span>
            <p className="mt-4 max-w-xs text-[13px] leading-relaxed">
              Cabinet indépendant de gestion de patrimoine.
              Paris · Genève — sur rendez-vous.
            </p>
          </div>

          <div className="col-span-6 md:col-span-3">
            <p className="eyebrow text-paper/40">Navigation</p>
            <ul className="mt-4 space-y-2 text-[13px]">
              <li><a href="#manifeste" className="hover:text-paper">Manifeste</a></li>
              <li><a href="#expertise" className="hover:text-paper">Expertise</a></li>
              <li><a href="#approche" className="hover:text-paper">Approche</a></li>
              <li><a href="#contact" className="hover:text-paper">Contact</a></li>
            </ul>
          </div>

          <div className="col-span-6 md:col-span-3">
            <p className="eyebrow text-paper/40">Contact</p>
            <ul className="mt-4 space-y-2 text-[13px]">
              <li>contact@qcf-conseil.fr</li>
              <li>+33 1 00 00 00 00</li>
              <li>Paris · 8ᵉ</li>
            </ul>
          </div>

          <div className="col-span-12 md:col-span-2">
            <p className="eyebrow text-paper/40">Légal</p>
            <ul className="mt-4 space-y-2 text-[13px]">
              <li><a href="#" className="hover:text-paper">Mentions</a></li>
              <li><a href="#" className="hover:text-paper">Confidentialité</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-paper/10 pt-6 text-[12px] text-paper/40 md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} QCF Conseil. Tous droits réservés.</span>
          <span className="eyebrow">MMXXVI · Édition digitale</span>
        </div>
      </div>
    </footer>
  );
}
