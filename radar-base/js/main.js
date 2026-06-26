// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu    = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Cerrar menu al hacer click en un enlace
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

// Cerrar menú al hacer click fuera
document.addEventListener('click', (e) => {
    if (mobileMenuBtn && mobileMenu &&
        !mobileMenuBtn.contains(e.target) &&
        !mobileMenu.contains(e.target)) {
        mobileMenu.classList.add('hidden');
    }
});

// Pausar slider al hover
const slider = document.querySelector('.economic-slider-content');
const sliderWrapper = document.querySelector('.economic-slider');

if (slider && sliderWrapper) {
    sliderWrapper.addEventListener('mouseenter', () => {
        slider.style.animationPlayState = 'paused';
    });
    sliderWrapper.addEventListener('mouseleave', () => {
        slider.style.animationPlayState = 'running';
    });
}

// Suscripción newsletter (prevenir submit por defecto)
document.querySelectorAll('input[type="email"]').forEach(input => {
    const btn = input.nextElementSibling;
    if (btn && btn.tagName === 'BUTTON') {
        btn.addEventListener('click', () => {
            const email = input.value.trim();
            if (!email || !email.includes('@')) {
                input.style.borderColor = '#e53e3e';
                input.focus();
                return;
            }
            input.style.borderColor = '#22E0C4';
            btn.textContent = '¡Suscrito!';
            btn.disabled = true;
            setTimeout(() => {
                btn.textContent = 'Suscribirse';
                btn.disabled = false;
                input.value = '';
                input.style.borderColor = '';
            }, 3000);
        });
    }
});

// Filtros activos (botones de categoría)
document.querySelectorAll('.filter-button').forEach(button => {
    button.addEventListener('click', function () {
        const siblings = this.parentElement.querySelectorAll('.filter-button');
        siblings.forEach(b => {
            b.classList.remove('bg-accent', 'text-primary-dark');
            b.classList.add('bg-bg-primary', 'text-text-secondary');
        });
        this.classList.remove('bg-bg-primary', 'text-text-secondary');
        this.classList.add('bg-accent', 'text-primary-dark');
    });
});

// FAQ accordion
function toggleFAQ(questionEl) {
    const answer = questionEl.nextElementSibling;
    const icon   = questionEl.querySelector('.faq-icon');
    const isOpen = answer.classList.contains('open');

    document.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('open'));
    document.querySelectorAll('.faq-icon').forEach(i => i.classList.remove('rotated'));

    if (!isOpen) {
        answer.classList.add('open');
        icon && icon.classList.add('rotated');
    }
}

// Contador animado
function animateCounter(el) {
    const to       = parseInt(el.dataset.to, 10);
    const suffix   = el.dataset.suffix || '';
    const compact  = el.dataset.compact === 'true';
    const duration = 1500;
    let current    = 0;

    const timer = setInterval(() => {
        current += Math.max(1, Math.ceil(to / (duration / 16)));
        if (current >= to) { current = to; clearInterval(timer); }
        const display = compact && current >= 1000
            ? (current / 1000).toFixed(1).replace(/\.0$/, '') + 'k'
            : current.toLocaleString('es-CL');
        el.textContent = display + suffix;
    }, 16);
}

const counterEls = document.querySelectorAll('.counter');
if (counterEls.length > 0 && 'IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    counterEls.forEach(el => obs.observe(el));
}

// Paginación (visual only)
document.querySelectorAll('.pagination-button').forEach(button => {
    button.addEventListener('click', function () {
        if (!this.querySelector('svg')) {
            const siblings = this.parentElement.querySelectorAll('.pagination-button');
            siblings.forEach(b => {
                b.classList.remove('bg-accent', 'text-primary-dark', 'active');
            });
            this.classList.add('bg-accent', 'text-primary-dark', 'active');
        }
    });
});

/* ═══════════════════════════════
   WOW V2
═══════════════════════════════ */

// Barra de progreso de lectura
const progressBar = document.createElement('div');
progressBar.id = 'read-progress';
document.body.prepend(progressBar);

// Smart header + progress bar en scroll
(function () {
    const header = document.querySelector('header');
    let lastY = 0;

    window.addEventListener('scroll', () => {
        const y = window.scrollY;

        // Smart header: ocultar al bajar, mostrar al subir
        if (header) {
            if (y > lastY && y > 120) {
                header.classList.add('header-up');
            } else {
                header.classList.remove('header-up');
            }
        }

        // Barra de progreso
        const docH = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        if (docH > 0) progressBar.style.width = (y / docH * 100) + '%';

        lastY = y;
    }, { passive: true });
}());

// Scroll reveal con IntersectionObserver
(function () {
    const revealEls = document.querySelectorAll('.reveal');
    if (!revealEls.length) return;

    if (!('IntersectionObserver' in window)) {
        revealEls.forEach(el => el.classList.add('is-visible'));
        return;
    }

    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

    revealEls.forEach(el => io.observe(el));
}());

// Ripple en botones
document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-primary, .btn-secondary');
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const wave = document.createElement('span');
    wave.className = 'ripple-wave';
    wave.style.top  = (e.clientY - rect.top)  + 'px';
    wave.style.left = (e.clientX - rect.left) + 'px';
    btn.appendChild(wave);
    setTimeout(() => wave.remove(), 700);
});

// Ticker: LIVE label + track wrapper + flash al cargar
(function () {
    const economicSlider = document.querySelector('.economic-slider');
    if (!economicSlider) return;

    const sliderContent = economicSlider.querySelector('.economic-slider-content');
    if (!sliderContent) return;

    // Inject label LIVE
    const liveLabel = document.createElement('div');
    liveLabel.className = 'ticker-live-label';
    liveLabel.innerHTML = '<span class="ticker-live-dot"></span>LIVE';
    economicSlider.insertBefore(liveLabel, sliderContent);

    // Envolver el contenido en .ticker-track para overflow
    const track = document.createElement('div');
    track.className = 'ticker-track';
    economicSlider.insertBefore(track, sliderContent);
    track.appendChild(sliderContent);

    // Flash de "datos recibidos" al cargar
    setTimeout(() => {
        economicSlider.classList.add('ticker-flashing');
        setTimeout(() => economicSlider.classList.remove('ticker-flashing'), 950);
    }, 650);
}());
