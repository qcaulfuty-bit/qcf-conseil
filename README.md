# CF Conseil

Site vitrine du cabinet **CF Conseil** — gestion de patrimoine indépendante.

Site statique construit en **HTML / CSS / JavaScript vanilla**, sans build, sans
framework, sans dépendance npm. Chaque page est autonome et peut être ouverte
directement dans un navigateur ou déposée sur n'importe quel hébergement
statique. Hébergement cible : **Vercel**.

## Identité visuelle

| Token        | Valeur     | Usage                |
| ------------ | ---------- | -------------------- |
| `--c-marine` | `#0d1f3c`  | bleu marine, titres  |
| `--c-or`     | `#c9a84c`  | doré, accents        |
| `--c-creme`  | `#f8f5ef`  | fond principal       |
| `--c-text`   | `#1a1a1a`  | texte courant        |
| `--c-muted`  | `#5a5a5a`  | texte secondaire     |

Polices : **Playfair Display** (titres) + **Lato** (corps), chargées via Google
Fonts.

## Structure

```
.
├── index.html              # Accueil (hero, services, témoignages, méthode)
├── services.html           # 6 services détaillés (ancres #bilan, #fiscalite…)
├── about.html              # Cabinet (histoire, valeurs, badges réglementaires)
├── contact.html            # Formulaire Formspree + Calendly inline
├── mentions-legales.html   # Mentions légales ORIAS / CIF / AMF
├── vercel.json             # Clean URLs, redirections, headers de sécurité
└── assets/
    ├── css/style.css       # Feuille de style unique
    ├── js/main.js          # Nav mobile, cookies, GA conditionnel, formulaire
    └── img/                # favicon.svg + og-cover.svg
```

## Lancer le site en local

Aucun build.

```bash
# Option 1 — ouvrir directement le fichier
open index.html

# Option 2 — petit serveur statique (recommandé)
python3 -m http.server 8000
# puis http://localhost:8000
```

## Déploiement sur Vercel

Site statique déployé via la **Git Integration Vercel** — zéro config.

1. Se connecter à [vercel.com](https://vercel.com) et cliquer **Add New → Project**.
2. Importer le repo GitHub `qcaulfuty-bit/qcf-conseil`.
3. **Framework Preset** : `Other` (site statique pur, pas de build).
4. **Root Directory** : `./` (défaut).
5. **Build Command** : laisser vide.
6. **Output Directory** : laisser vide.
7. Cliquer **Deploy**.

À partir de là :

- Chaque push sur `main` redéploie automatiquement la production.
- Chaque pull request génère une URL de preview isolée.
- Le fichier `vercel.json` est lu automatiquement (clean URLs, redirections,
  headers de sécurité).

### Configuration Vercel (`vercel.json`)

Le fichier `vercel.json` définit :

- **`cleanUrls: true`** → `/contact` sert `contact.html`, `/services`
  sert `services.html`, etc. `/xxx.html` est redirigé en 301 vers `/xxx`.
- **Redirections** : `/cabinet` → `/about`, `/rdv` → `/contact`, etc.
- **Headers de sécurité** :
  - `Content-Security-Policy` restrictive (self + Google Fonts, GA,
    Calendly, Formspree uniquement)
  - `Strict-Transport-Security` (HSTS, 2 ans, preload)
  - `X-Frame-Options: DENY` + `frame-ancestors 'none'`
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy` verrouillée (camera, micro, géolocalisation…)
- **Cache** : assets immutables (1 an), HTML revalidé à chaque requête.

### Domaine personnalisé

1. Dans **Project → Settings → Domains**, ajouter `www.qcf-conseil.fr` et
   `qcf-conseil.fr`.
2. Chez le registrar (Gandi, OVH, etc.), créer les enregistrements DNS
   indiqués par Vercel (un `A` + un `CNAME`).
3. Certificats SSL générés automatiquement par Vercel.

## Placeholders à renseigner

Tout ce qui n'est pas encore connu apparaît entre crochets en MAJUSCULES, dans
le HTML comme dans le JS, pour être facilement retrouvable via `grep`.

Principaux :

| Placeholder           | Description                                  |
| --------------------- | -------------------------------------------- |
| `[ORIAS_NUMBER]`      | Numéro ORIAS du cabinet                      |
| `[SIRET]`             | SIRET                                        |
| `[ADRESSE]`           | Adresse postale du cabinet                   |
| `[TELEPHONE]`         | Numéro de téléphone                          |
| `[EMAIL]`             | Adresse e-mail de contact                    |
| `[FORMSPREE_ID]`      | Identifiant Formspree pour le formulaire     |
| `[CALENDLY_URL]`      | URL du calendrier Calendly                   |
| `[GA_MEASUREMENT_ID]` | ID Google Analytics GA4 (`G-XXXXXXX`)        |
| `[LINKEDIN_URL]`      | URL du profil LinkedIn                       |
| `[DATE_MAJ]`          | Date de mise à jour des mentions légales     |

Injection en masse :

```bash
# Exemple : injecter l'ID Google Analytics
sed -i '' 's/\[GA_MEASUREMENT_ID\]/G-XXXXXXX/g' *.html assets/js/main.js
```

## RGPD & mesure d'audience

Le tag Google Analytics 4 n'est **jamais** chargé avant consentement explicite.

- À la première visite, une bannière s'affiche en bas de page.
- En cas d'acceptation, le script `gtag.js` est injecté dynamiquement et le
  choix est mémorisé en `localStorage` (`qcf_cookie_consent = "granted"`).
- En cas de refus, aucun script tiers n'est chargé et le choix est mémorisé
  (`qcf_cookie_consent = "denied"`). La bannière ne réapparaît plus.

## Mentions réglementaires

Conformément à l'activité réglementée de Conseil en Investissements Financiers,
les mentions ORIAS, CIF, AMF et le disclaimer (« les performances passées ne
préjugent pas des performances futures ») sont présents :

- Dans le footer de **toutes** les pages.
- Dans la section dédiée de `mentions-legales.html`.
- Sur la page `about.html` (section « Cadre réglementaire »).

Ces blocs ne doivent pas être supprimés.

## SEO

Chaque page comporte :

- `<title>` spécifique
- `<meta name="description">` propre
- Balises Open Graph (`og:site_name`, `og:title`, `og:description`,
  `og:image`, `og:url`)
- Balises Twitter Card
- `<link rel="canonical">` aligné sur les clean URLs (`/contact`, pas
  `/contact.html`)
- Favicon + theme-color

La page d'accueil embarque en plus un bloc **Schema.org `FinancialService`**
pour aider les moteurs à comprendre l'activité du cabinet.

Le visuel OG (`assets/img/og-cover.svg`) est un SVG aux couleurs du cabinet.
Pour un meilleur support des aperçus Facebook / LinkedIn, il est recommandé de
le convertir en JPG 1200×630 avant mise en ligne :

```bash
# nécessite librsvg2-bin
rsvg-convert -w 1200 -h 630 -f png assets/img/og-cover.svg > assets/img/og-cover.png
```

Puis remplacer la référence `og-cover.svg` par `og-cover.png` dans les 5
pages.

## Roadmap

- [x] Page d'accueil (`index.html`) avec section témoignages, footer enrichi,
      bannière cookies, balises SEO + Schema.org, GA4 conditionnel.
- [x] Page **services** détaillée (6 blocs avec ancres, CTAs typés).
- [x] Page **cabinet** (bio, 4 valeurs, timeline, 4 badges réglementaires).
- [x] Page **contact** avec formulaire Formspree + Calendly inline.
- [x] Page mentions légales.
- [x] Configuration Vercel (`vercel.json`, clean URLs, headers de sécurité).
- [ ] Convertir `og-cover.svg` en `og-cover.jpg` pour support OG complet.
- [ ] Remplacer tous les placeholders `[MAJUSCULES]` par les infos réelles
      avant mise en ligne.
