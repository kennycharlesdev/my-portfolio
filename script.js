
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
  const navbar = document.querySelector(".navbar");

  function closeMenu() {
    if (!menuToggle || !navLinks) return;

    navLinks.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    menuToggle.textContent = "☰";
    document.body.classList.remove("menu-open");
  }

  function openMenu() {
    if (!menuToggle || !navLinks) return;

    navLinks.classList.add("active");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation");
    menuToggle.textContent = "✕";
    document.body.classList.add("menu-open");
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.contains("active");

      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    document.addEventListener("click", (event) => {
      if (!navbar) return;

      if (
        navLinks.classList.contains("active") &&
        !navbar.contains(event.target)
      ) {
        closeMenu();
      }
    });

    const desktopView = window.matchMedia("(min-width: 901px)");

    desktopView.addEventListener("change", (event) => {
      if (event.matches) {
        closeMenu();
      }
    });
  }

});
