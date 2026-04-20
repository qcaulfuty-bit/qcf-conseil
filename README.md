# QCF Conseil

Site du cabinet **QCF Conseil** — gestion de patrimoine indépendante.

Direction artistique inspirée des standards fintech ultra premium et des family
offices digitaux : typographie éditoriale, rythme, beaucoup de respiration, et
une palette réduite à l’essentiel.

## Stack

- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS** avec un design system sur mesure (`ink` / `paper` / `accent`)
- **Framer Motion** pour les transitions et révélations au scroll
- **Inter** (sans) + **Instrument Serif** (display) via `next/font`

## Lancer le projet

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Commandes

| Commande        | Description                                  |
| --------------- | -------------------------------------------- |
| `npm run dev`   | Serveur de dev avec HMR                      |
| `npm run build` | Build de production                          |
| `npm run start` | Démarre le build de production               |
| `npm run lint`  | Lint du projet                               |

## Structure

```
app/
  layout.tsx         # fonts, metadata, grain
  page.tsx           # compose toutes les sections
  globals.css        # tokens, hairlines, grain
components/
  Navbar.tsx
  Hero.tsx
  WireframeMark.tsx  # visuel abstrait éditorial
  Manifesto.tsx      # texte qui s'illumine au scroll
  Expertise.tsx      # les 4 piliers
  Approach.tsx       # méthode, en noir
  Differentiation.tsx
  FinalCta.tsx
  Footer.tsx
  ui/
    Reveal.tsx       # fade + translate au viewport
    LineReveal.tsx   # hairline qui se dessine
```

## Design tokens

| Token        | Valeur    | Usage                 |
| ------------ | --------- | --------------------- |
| `ink`        | `#0A0A0A` | texte, backgrounds    |
| `ink-muted`  | `#5A5A5A` | texte secondaire      |
| `ink-line`   | `#E7E5E2` | hairlines             |
| `paper`      | `#F6F5F1` | fond principal        |
| `paper-pure` | `#FAFAF8` | zones contrastées     |
| `accent`     | `#7C8A9A` | accent froid, discret |

## Copywriting

Phrases courtes. Ton posé, presque silencieux. Le site affirme — il ne vend
pas. Éditer les contenus directement dans les composants de section.
