
/* =========================================
   KINY CHARLES — PORTFOLIO V2.0
   Interactive Features
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  // 1. AUTOMATIC COPYRIGHT YEAR

  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }


  // 2. MOBILE NAVIGATION MENU

  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  function closeMenu() {
    if (!menuToggle || !navLinks) return;

    navLinks.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute(
      "aria-label",
      "Open navigation"
    );
    menuToggle.textContent = "☰";
  }

  if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("active");

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );

      menuToggle.textContent = isOpen ? "✕" : "☰";
    });


    // 3. CLOSE MENU AFTER SELECTING A LINK

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });


    // Close mobile menu when Escape is pressed

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });


    // Reset menu when switching to desktop

    const desktopView = window.matchMedia(
      "(min-width: 901px)"
    );

    desktopView.addEventListener("change", (event) => {
      if (event.matches) {
        closeMenu();
      }
    });
  }

});
