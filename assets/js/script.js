document.addEventListener("DOMContentLoaded", () => {
  const hiddenPartners = Array.from(document.querySelectorAll(".hidden-partner"));
  const viewBtn = document.getElementById("viewBtn");
  const menuToggle = document.getElementById("menuToggle");
  const navbar = document.getElementById("navbar");

  let partnersVisible = false;

  function renderPartners() {
    hiddenPartners.forEach((logo) => {
      logo.classList.toggle("show", partnersVisible);
    });

    if (viewBtn) {
      viewBtn.textContent = partnersVisible ? "Show Less" : "View All";
      viewBtn.setAttribute("aria-expanded", String(partnersVisible));
    }
  }

  if (viewBtn) {
    viewBtn.addEventListener("click", () => {
      partnersVisible = !partnersVisible;
      renderPartners();
    });
  }

  renderPartners();

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
});