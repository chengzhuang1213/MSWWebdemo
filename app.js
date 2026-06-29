if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

const resetInitialScroll = () => {
  if (window.location.hash) {
    const target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
    target?.scrollIntoView();
    return;
  }

  window.scrollTo(0, 0);
};

resetInitialScroll();
window.addEventListener("pageshow", resetInitialScroll);

const header = document.querySelector(".site-header");
const hero = document.querySelector(".hero");
const marquee = document.querySelector(".marquee-track");
const revealTargets = document.querySelectorAll(
  ".section-heading, .work-item, .profile-statement, .profile-panel > div, .timeline article, .acclaim-copy, .page-hero, .project-feature, .contact-panel a"
);

if (marquee) {
  marquee.innerHTML += marquee.innerHTML;
}

const setHeaderState = () => {
  if (!header || header.classList.contains("page-header")) return;
  header.dataset.elevated = String(window.scrollY > 24);
};

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealTargets.forEach((target) => {
  target.classList.add("reveal");
  revealObserver.observe(target);
});

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

if (hero && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  window.addEventListener(
    "pointermove",
    (event) => {
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;
      hero.style.setProperty("--hero-x", x.toFixed(3));
      hero.style.setProperty("--hero-y", y.toFixed(3));
    },
    { passive: true }
  );
}
