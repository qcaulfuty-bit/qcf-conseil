/* =========================================================
   QCF Conseil — main.js
   - Navigation mobile
   - Bannière cookies RGPD (consentement explicite)
   - Chargement conditionnel de Google Analytics (GA4)
   - Année dynamique dans le footer
   - Marqueur de page active dans le menu
   ========================================================= */

(function () {
  "use strict";

  /* ---------- 1. Année dynamique dans le footer ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ---------- 2. Navigation mobile ---------- */
  const toggle = document.querySelector(".nav__toggle");
  const navList = document.getElementById("primary-nav");

  if (toggle && navList) {
    toggle.addEventListener("click", function () {
      const open = navList.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
    });

    navList.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (navList.classList.contains("is-open")) {
          navList.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
          toggle.setAttribute("aria-label", "Ouvrir le menu");
        }
      });
    });
  }

  /* ---------- 3. Marqueur de page active ---------- */
  // Si la classe is-active n'a pas été posée à la main, on la déduit de l'URL.
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav__link").forEach(function (link) {
    const href = link.getAttribute("href");
    if (href && href === path) {
      link.classList.add("is-active");
    }
  });

  /* ---------- 4. Cookies + Google Analytics ---------- */
  const STORAGE_KEY = "qcf_cookie_consent"; // "granted" | "denied"
  const banner = document.getElementById("cookie-banner");
  const gaId = window.QCF_GA_ID;
  const gaIsConfigured = gaId && gaId.indexOf("[") === -1;

  function showBanner() {
    if (banner) banner.classList.add("is-visible");
  }
  function hideBanner() {
    if (banner) banner.classList.remove("is-visible");
  }

  function loadGoogleAnalytics() {
    if (!gaIsConfigured) return;
    if (window.__qcfGaLoaded) return;
    window.__qcfGaLoaded = true;

    const s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(gaId);
    document.head.appendChild(s);

    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", gaId, { anonymize_ip: true });
  }

  function setConsent(value) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch (e) {
      // localStorage indisponible (mode privé strict) — on continue sans persistance.
    }
    hideBanner();
    if (value === "granted") {
      loadGoogleAnalytics();
    }
  }

  let stored = null;
  try { stored = localStorage.getItem(STORAGE_KEY); } catch (e) { /* ignore */ }

  if (stored === "granted") {
    loadGoogleAnalytics();
  } else if (stored === "denied") {
    // Choix déjà exprimé : on ne montre plus la bannière, on ne charge pas GA.
  } else {
    showBanner();
  }

  if (banner) {
    banner.addEventListener("click", function (e) {
      const action = e.target && e.target.getAttribute("data-cookie-action");
      if (action === "accept") setConsent("granted");
      if (action === "refuse") setConsent("denied");
    });
  }

  /* ---------- 5. Liens Calendly (popup si possible) ---------- */
  // Si le widget Calendly est chargé sur la page, on intercepte les liens.
  // Sinon le lien fonctionne en simple ouverture d'onglet.
  document.querySelectorAll("[data-calendly]").forEach(function (link) {
    link.addEventListener("click", function (e) {
      const url = link.getAttribute("href");
      if (!url || url.indexOf("[") === 0) {
        e.preventDefault();
        alert("La prise de rendez-vous sera bientôt disponible.");
        return;
      }
      if (window.Calendly && typeof window.Calendly.initPopupWidget === "function") {
        e.preventDefault();
        window.Calendly.initPopupWidget({ url: url });
      } else {
        // Pas de widget Calendly chargé : on laisse le lien s'ouvrir dans un nouvel onglet.
        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "noopener");
      }
    });
  });

  /* ---------- 6. Validation formulaire (page contact) ---------- */
  // Pré-câblage générique : si un formulaire .contact-form existe, on bloque
  // l'envoi tant que les champs requis ne sont pas valides, et on affiche un
  // message de confirmation après envoi réussi (Formspree).
  const form = document.querySelector(".contact-form");
  if (form) {
    const status = form.querySelector(".contact-form__status");

    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      if (status) {
        status.textContent = "Envoi en cours…";
        status.dataset.state = "pending";
      }

      try {
        const res = await fetch(form.action, {
          method: "POST",
          headers: { "Accept": "application/json" },
          body: new FormData(form)
        });
        if (res.ok) {
          form.reset();
          if (status) {
            status.textContent = "Merci, votre message a bien été envoyé. Nous revenons vers vous très vite.";
            status.dataset.state = "success";
          }
        } else {
          throw new Error("Réponse serveur " + res.status);
        }
      } catch (err) {
        if (status) {
          status.textContent = "Une erreur est survenue. Merci de réessayer ou de nous écrire directement.";
          status.dataset.state = "error";
        }
      }
    });
  }
})();
