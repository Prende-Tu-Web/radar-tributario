// Scroll-reveal ([data-reveal]) + contador animado ([data-count-to]),
// compartido entre Home (TrustStrip) y Sobre Nosotros — mismo efecto en
// ambos lados a propósito.
export function initScrollEffects(): void {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const revealTargets = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (reduceMotion) {
    revealTargets.forEach((el) => el.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealTargets.forEach((el) => revealObserver.observe(el));
  }

  const counters = document.querySelectorAll<HTMLElement>('[data-count-to]');
  const animateCount = (el: HTMLElement) => {
    const target = Number(el.dataset.countTo);
    if (reduceMotion || !target) {
      el.textContent = String(target);
      return;
    }
    const duration = 900;
    const start = performance.now();
    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = String(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  };
  const countObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target as HTMLElement);
          countObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );
  counters.forEach((el) => countObserver.observe(el));
}
