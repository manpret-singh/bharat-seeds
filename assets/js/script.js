document.addEventListener("DOMContentLoaded", () => {

  /* ── ELEMENTS ──────────────────────────────────── */
  const header          = document.getElementById("siteHeader");
  const menuToggle      = document.getElementById("menuToggle");
  const navbar          = document.getElementById("navbar");
  const languageSelect  = document.getElementById("languageSelect");
  const heroBg          = document.getElementById("heroBg");
  const translatables   = document.querySelectorAll("[data-en], [data-hi], [data-pa]");

  /* ── HERO BG LOAD ANIMATION ────────────────────── */
  if (heroBg) {
    // Trigger scale-in after a short delay
    requestAnimationFrame(() => {
      setTimeout(() => heroBg.classList.add("loaded"), 100);
    });
  }

  /* ── HEADER: SCROLL EFFECT ─────────────────────── */
  if (header) {
    const onScroll = () => {
      header.classList.toggle("scrolled", window.scrollY > 60);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ── LANGUAGE ──────────────────────────────────── */
  function applyLanguage(lang) {
    document.documentElement.lang = lang;
    localStorage.setItem("language", lang);

    translatables.forEach(el => {
      const text = el.getAttribute(`data-${lang}`);
      if (text) el.textContent = text;
    });

    if (languageSelect) languageSelect.value = lang;
  }

  if (languageSelect) {
    languageSelect.addEventListener("change", () => applyLanguage(languageSelect.value));
  }

  const savedLang = localStorage.getItem("language") || "en";
  applyLanguage(savedLang);

  /* ── MOBILE NAV ────────────────────────────────── */
  if (menuToggle && navbar) {
    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.addEventListener("click", () => {
      const isOpen = navbar.classList.toggle("active");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navbar.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navbar.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });

    // Close on outside click
    document.addEventListener("click", e => {
      if (!header.contains(e.target)) {
        navbar.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ── SCROLL REVEAL (Intersection Observer) ──────── */
  const revealEls = document.querySelectorAll(".reveal");

  if (revealEls.length && "IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    revealEls.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback: show all immediately
    revealEls.forEach(el => el.classList.add("visible"));
  }

  /* ── STAT COUNTERS ─────────────────────────────── */
  const statNumbers = document.querySelectorAll(".stat-number[data-target]");

  function animateCounter(el) {
    const target  = parseInt(el.dataset.target, 10);
    const suffix  = el.dataset.suffix || "";
    const duration = 1400;
    const start   = performance.now();

    function update(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out
      const eased    = 1 - Math.pow(1 - progress, 3);
      const current  = Math.round(eased * target);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  if (statNumbers.length && "IntersectionObserver" in window) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));
  }

  /* ── SMOOTH ANCHOR SCROLL ──────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        e.preventDefault();
        const offset = header ? header.offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.scrollY - offset - 8;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  });

  /* ── LEGACY COMPAT: togglePartners (no-op if marquee exists) ── */
  window.togglePartners = function() {};

});
