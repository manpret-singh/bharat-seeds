// Hide extra partners on page load

document.addEventListener("DOMContentLoaded", function () {

  const hiddenPartners =
    document.querySelectorAll(".hidden-partner");

  hiddenPartners.forEach(logo => {
    logo.style.display = "none";
  });

});


// Toggle partners visibility

function togglePartners() {

  const hiddenPartners =
    document.querySelectorAll(".hidden-partner");

  const btn =
    document.getElementById("viewBtn");

  let isHidden =
    hiddenPartners[0].style.display === "none";

  hiddenPartners.forEach(logo => {

    logo.style.display =
      isHidden ? "block" : "none";

  });

  btn.textContent =
    isHidden ? "Show Less" : "View All";

}


// MOBILE MENU TOGGLE

document.getElementById("menuToggle")
  .addEventListener("click", function () {

    document.getElementById("navbar")
      .classList.toggle("active");

  });
