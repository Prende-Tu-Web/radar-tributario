// Radar Tributario — main.js

// ── Mobile menu ──────────────────────────────────────────
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const isOpen = mobileMenu.classList.contains('open');
    menuBtn.setAttribute('aria-expanded', isOpen);
  });
}

// ── Ticker: duplicar para loop sin parpadeo ───────────────
const track = document.querySelector('.ticker-track');
if (track) {
  const clone = track.cloneNode(true);
  clone.setAttribute('aria-hidden', 'true');
  track.parentElement.appendChild(clone);
}

// ── Highlight nav link actual ─────────────────────────────
const currentPath = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPath || (currentPath === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// ── Newsletter form (placeholder) ────────────────────────
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = newsletterForm.querySelector('input[type="email"]');
    const btn = newsletterForm.querySelector('button');
    if (input && input.value) {
      btn.textContent = '¡Suscrito!';
      btn.disabled = true;
      input.disabled = true;
    }
  });
}

// ── Search toggle ─────────────────────────────────────────
const searchBtn = document.getElementById('search-btn');
const searchBox = document.getElementById('search-box');

if (searchBtn && searchBox) {
  searchBtn.addEventListener('click', () => {
    searchBox.classList.toggle('hidden');
    if (!searchBox.classList.contains('hidden')) {
      searchBox.querySelector('input')?.focus();
    }
  });
}
