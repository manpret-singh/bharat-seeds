document.addEventListener("DOMContentLoaded", () => {
  const hiddenPartners = Array.from(document.querySelectorAll(".hidden-partner"));
  const viewBtn = document.getElementById("viewBtn");
  const menuToggle = document.getElementById("menuToggle");
  const navbar = document.getElementById("navbar");
  const languageSelect = document.getElementById("languageSelect");
  const translatableElements = document.querySelectorAll("[data-en], [data-hi], [data-pa]");

  let partnersVisible = false;

  function applyLanguage(lang) {
    document.documentElement.lang = lang;
    localStorage.setItem("language", lang);

    translatableElements.forEach((element) => {
      const translatedText = element.getAttribute(`data-${lang}`);
      if (translatedText !== null && translatedText !== "") {
        element.textContent = translatedText;
      }
    });

    if (languageSelect) {
      languageSelect.value = lang;
    }
  }

  function renderPartners() {
    hiddenPartners.forEach((logo) => {
      logo.classList.toggle("show", partnersVisible);
    });

    if (viewBtn) {
      const currentLang = localStorage.getItem("language") || "en";

      const labels = {
        en: partnersVisible ? "Show Less" : "View All",
        hi: partnersVisible ? "कम दिखाएँ" : "सभी देखें",
        pa: partnersVisible ? "ਘੱਟ ਵੇਖੋ" : "ਸਾਰੇ ਵੇਖੋ",
      };

      viewBtn.textContent = labels[currentLang] || labels.en;
      viewBtn.setAttribute("aria-expanded", String(partnersVisible));
    }
  }

  if (viewBtn) {
    viewBtn.addEventListener("click", () => {
      partnersVisible = !partnersVisible;
      renderPartners();
    });
  }

  if (menuToggle && navbar) {
    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.addEventListener("click", () => {
      const isOpen = navbar.classList.toggle("active");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navbar.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navbar.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  if (languageSelect) {
    languageSelect.addEventListener("change", () => {
      applyLanguage(languageSelect.value);
      renderPartners();
    });
  }

  const savedLanguage = localStorage.getItem("language") || "en";
  applyLanguage(savedLanguage);
  renderPartners();
});