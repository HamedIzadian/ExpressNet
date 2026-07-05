/* =========================================================
   ExpressNet AI — Site interactions
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  /* ---- Current year ---- */
  document.querySelectorAll("[data-year]").forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  /* ---- Scroll progress bar ---- */
  const progress = document.createElement("div");
  progress.className = "scroll-progress";
  document.body.appendChild(progress);

  /* ---- Sticky nav shadow + scroll progress ---- */
  const nav = document.querySelector(".nav");
  const onScroll = () => {
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 8);
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    progress.style.width = max > 0 ? (h.scrollTop / max) * 100 + "%" : "0%";
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });

  /* ---- Mobile menu toggle ---- */
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    links.querySelectorAll("a").forEach(a =>
      a.addEventListener("click", () => {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      })
    );
  }

  /* ---- Highlight active nav link ---- */
  const path = (location.pathname.split("/").pop() || "index.html");
  document.querySelectorAll(".nav-links a").forEach(a => {
    const href = a.getAttribute("href");
    if (href === path || (path === "" && href === "index.html")) {
      a.classList.add("active");
    }
  });

  /* ---- Scroll-reveal animations ---- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add("in"));
  }

  /* ---- Contact form (demo handler) ---- */
  const form = document.querySelector("#contactForm");
  if (form) {
    const status = form.querySelector(".form-status");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = (form.querySelector("#name")?.value || "there").trim();
      if (status) {
        status.textContent =
          `Thank you, ${name}. Your request has been received — the ExpressNet team will be in touch shortly.`;
        status.classList.add("ok");
      }
      form.reset();
    });
  }
});
