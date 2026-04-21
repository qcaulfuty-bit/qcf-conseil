# QCF Conseil

Site vitrine du cabinet **QCF Conseil** — gestion de patrimoine indépendante.

Site statique construit en **HTML / CSS / JavaScript vanilla**, sans build, sans
framework, sans dépendance npm. Chaque page est autonome et peut être ouverte
directement dans un navigateur ou déposée sur n'importe quel hébergement
statique (OVH, Netlify, GitHub Pages, S3…).

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
├── index.html              # Page d'accueil (hero, services, témoignages, méthode, CTA)
├── mentions-legales.html   # Mentions légales et réglementaires (ORIAS / CIF / AMF)
├── services.html           # (à venir)
├── about.html              # (à venir)
├── contact.html            # (à venir)
└── assets/
    ├── css/style.css       # Feuille de style unique
    ├── js/main.js          # Nav mobile, cookies, GA conditionnel, formulaire
    └── img/                # Images (favicon, og-cover…)
```

## Lancer le site en local

Aucun build. Deux options :

```bash
# Option 1 — ouvrir directement le fichier
open index.html

# Option 2 — petit serveur statique (recommandé)
python3 -m http.server 8000
# puis http://localhost:8000
```

## Placeholders à renseigner

Tout ce qui n'est pas encore connu apparaît entre crochets en MAJUSCULES, dans
le HTML comme dans le JS, pour être facilement retrouvable :

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

Pour remplacer en masse :

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

Ces blocs ne doivent pas être supprimés.

## SEO

Chaque page comporte :

- Une balise `<title>` propre.
- Une `<meta name="description">` spécifique.
- Les balises Open Graph (`og:title`, `og:description`, `og:image`, `og:url`).
- Une balise `<link rel="canonical">`.

La page d'accueil embarque en plus un bloc **Schema.org `FinancialService`**
pour aider les moteurs à comprendre l'activité du cabinet.

## Roadmap

- [x] Page d'accueil (`index.html`) avec section témoignages, footer enrichi,
      bannière cookies, balises SEO + Schema.org, GA4 conditionnel.
- [x] Page mentions légales (`mentions-legales.html`).
- [ ] Page **services** détaillée (un bloc par service).
- [ ] Page **cabinet** (bio, valeurs, parcours).
- [ ] Page **contact** avec formulaire Formspree + intégration Calendly inline.
