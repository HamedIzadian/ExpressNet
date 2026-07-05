/* =========================================================
   ExpressNet AI, Site interactions
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ---- Current year ---- */
  document.querySelectorAll("[data-year]").forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  /* ---- Scroll progress bar ---- */
  const progress = document.createElement("div");
  progress.className = "scroll-progress";
  document.body.appendChild(progress);

  /* ---- Sticky nav: shadow, hide-on-scroll, progress ---- */
  const nav = document.querySelector(".nav");
  const links = document.querySelector(".nav-links");
  let lastY = window.scrollY;
  const onScroll = () => {
    const y = window.scrollY;
    if (nav) {
      nav.classList.toggle("scrolled", y > 8);
      const menuOpen = links && links.classList.contains("open");
      if (!menuOpen) {
        if (y > 260 && y > lastY + 4) nav.classList.add("nav--hidden");
        else if (y < lastY - 4) nav.classList.remove("nav--hidden");
      }
    }
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    progress.style.width = max > 0 ? (h.scrollTop / max) * 100 + "%" : "0%";
    lastY = y;
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });

  /* ---- Mobile menu toggle ---- */
  const toggle = document.querySelector(".nav-toggle");
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
    if (href === path || (path === "" && href === "index.html")) a.classList.add("active");
  });

  /* ---- Count-up animation for stats ---- */
  const countUp = (el) => {
    const raw = el.textContent.trim();
    const m = raw.match(/^(\d[\d,]*)(.*)$/);
    if (!m || reduce) return;
    const target = parseInt(m[1].replace(/,/g, ""), 10);
    const suffix = m[2] || "";
    const dur = 1400, start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toLocaleString() + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  /* ---- Scroll-reveal (+ trigger counters) ---- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    if (revealEls.length) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
      revealEls.forEach(el => io.observe(el));
    }
    const stats = document.querySelectorAll(".stat b");
    if (stats.length) {
      const so = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) { countUp(entry.target); so.unobserve(entry.target); }
        });
      }, { threshold: 0.6 });
      stats.forEach(el => so.observe(el));
    }
  } else {
    revealEls.forEach(el => el.classList.add("in"));
  }

  /* ---- 3D tilt + spotlight on cards ---- */
  if (fine && !reduce) {
    document.querySelectorAll(".card").forEach(card => {
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        card.style.setProperty("--ry", ((px - 0.5) * 7).toFixed(2) + "deg");
        card.style.setProperty("--rx", (-(py - 0.5) * 7).toFixed(2) + "deg");
        card.style.setProperty("--gx", (px * 100).toFixed(1) + "%");
        card.style.setProperty("--gy", (py * 100).toFixed(1) + "%");
      });
      card.addEventListener("pointerleave", () => {
        card.style.setProperty("--rx", "0deg");
        card.style.setProperty("--ry", "0deg");
      });
    });

    /* ---- Magnetic buttons ---- */
    document.querySelectorAll(".btn").forEach(btn => {
      btn.addEventListener("pointermove", (e) => {
        const r = btn.getBoundingClientRect();
        const mx = (e.clientX - r.left - r.width / 2) / (r.width / 2);
        const my = (e.clientY - r.top - r.height / 2) / (r.height / 2);
        btn.style.setProperty("--mx", (mx * 6).toFixed(1) + "px");
        btn.style.setProperty("--my", (my * 4).toFixed(1) + "px");
      });
      btn.addEventListener("pointerleave", () => {
        btn.style.setProperty("--mx", "0px");
        btn.style.setProperty("--my", "0px");
      });
    });
  }

  /* ---- Industry flip cards: tap / keyboard toggle ---- */
  document.querySelectorAll(".flip-card").forEach(fc => {
    fc.addEventListener("click", () => fc.classList.toggle("flipped"));
    fc.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        fc.classList.toggle("flipped");
      }
    });
  });

  /* ---- Contact form (demo handler) ---- */
  const form = document.querySelector("#contactForm");
  if (form) {
    const status = form.querySelector(".form-status");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = (form.querySelector("#name")?.value || "there").trim();
      if (status) {
        status.textContent =
          `Thank you, ${name}. Your request has been received, the ExpressNet team will be in touch shortly.`;
        status.classList.add("ok");
      }
      form.reset();
    });
  }
});
