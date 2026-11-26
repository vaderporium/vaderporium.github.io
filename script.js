// ===== Vaderporium slideshow + nav =====
(function () {
  const slides = Array.from(document.querySelectorAll('[data-slide]'));
  const dotsWrap = document.getElementById('slideDots');
  const prevBtn = document.getElementById('slidePrev');
  const nextBtn = document.getElementById('slideNext');
  let current = 0;
  let timer = null;
  const INTERVAL = 6000;

  // Build dots
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
    dot.addEventListener('click', () => goTo(i, true));
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.children);

  function render() {
    slides.forEach((s, i) => s.classList.toggle('active', i === current));
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function goTo(i, user) {
    current = (i + slides.length) % slides.length;
    render();
    if (user) restart();
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function restart() {
    clearInterval(timer);
    timer = setInterval(next, INTERVAL);
  }

  nextBtn.addEventListener('click', () => goTo(current + 1, true));
  prevBtn.addEventListener('click', () => goTo(current - 1, true));

  // Pause on hover
  const hero = document.querySelector('.hero');
  hero.addEventListener('mouseenter', () => clearInterval(timer));
  hero.addEventListener('mouseleave', restart);

  // Keyboard
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') goTo(current + 1, true);
    if (e.key === 'ArrowLeft') goTo(current - 1, true);
  });

  // Touch swipe
  let touchX = null;
  hero.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  hero.addEventListener('touchend', (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 40) goTo(current + (dx < 0 ? 1 : -1), true);
    touchX = null;
  }, { passive: true });

  // Mobile nav
  const burger = document.getElementById('navBurger');
  const links = document.querySelector('.nav-links');
  burger.addEventListener('click', () => links.classList.toggle('open'));
  links.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') links.classList.remove('open');
  });

  render();
  restart();
})();
