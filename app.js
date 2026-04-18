'use strict';

/* ── Navbar ─────────────────────────────────────────────────── */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('nav-links');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY >= 60);
    highlightNav();
});

hamburger.addEventListener('click', () => {
    navLinksEl.classList.toggle('active');
    hamburger.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinksEl.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

document.addEventListener('click', e => {
    if (!navbar.contains(e.target)) {
        navLinksEl.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

/* ── Active nav link tracking ───────────────────────────────── */
function highlightNav() {
    const scrollY = window.scrollY + 100;
    document.querySelectorAll('section[id]').forEach(sec => {
        const link = document.querySelector(`.nav-link[href="#${sec.id}"]`);
        if (!link) return;
        if (scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight) {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        }
    });
}

/* ── Typed.js ───────────────────────────────────────────────── */
if (document.getElementById('hero-typed')) {
    new Typed('#hero-typed', {
        strings: ['Learn Japanese', 'Open New Doors', 'Reach for Japan', 'Start Today...'],
        typeSpeed: 52,
        backSpeed: 28,
        backDelay: 2400,
        loop: true,
    });
}

/* ── AOS ────────────────────────────────────────────────────── */
AOS.init({ duration: 650, easing: 'ease-out', once: true, offset: 50 });

/* ── Reviews Swiper ─────────────────────────────────────────── */
new Swiper('.swiper-reviews', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 24,
    centeredSlides: true,
    autoplay: { delay: 4800, disableOnInteraction: false },
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    breakpoints: {
        720: { slidesPerView: 1.15 },
        960: { slidesPerView: 1.35 },
    },
});

/* ── Gallery Lightbox ───────────────────────────────────────── */
const galItems = document.querySelectorAll('.gal-item');
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lightbox-img');
const lbClose = document.getElementById('lightbox-close');

galItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (!img) return;
        lbImg.src = img.src;
        lbImg.alt = img.alt;
        lb.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

function closeLb() {
    lb.classList.remove('active');
    document.body.style.overflow = '';
}

lbClose.addEventListener('click', closeLb);
lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLb(); });

/* ═══════════════════════════════════════════════════════════════
   HERO SAKURA PETAL ANIMATION  (subtle - ~20 petals)
   ═══════════════════════════════════════════════════════════════ */
(function heroSakura() {
    const canvas = document.getElementById('hero-petal-canvas');
    const hero = document.getElementById('hero');
    if (!canvas || !hero) return;

    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
    }
    resize();
    window.addEventListener('resize', () => { resize(); resetPetals(); });

    /* Soft petal colours - translucent so they complement the photo */
    const COLORS = [
        'rgba(255, 210, 220, 0.72)',
        'rgba(244, 180, 198, 0.65)',
        'rgba(255, 235, 240, 0.60)',
        'rgba(232, 150, 170, 0.60)',
        'rgba(255, 200, 215, 0.55)',
    ];

    class Petal {
        constructor() { this.reset(true); }

        reset(initial = false) {
            this.x = Math.random() * canvas.width;
            this.y = initial
                ? Math.random() * canvas.height * 0.6       // spread on load
                : -(8 + Math.random() * 24);                 // start above top
            this.size = Math.random() * 6 + 3.5;           // 3.5–9.5px
            this.vy = Math.random() * 0.7 + 0.35;        // very slow fall
            this.vx = Math.random() * 0.4 - 0.2;
            this.angle = Math.random() * Math.PI * 2;
            this.spin = (Math.random() - 0.5) * 0.025;
            this.wob = Math.random() * Math.PI * 2;
            this.wobS = Math.random() * 0.014 + 0.005;
            this.sway = Math.random() * 0.5 + 0.2;
            this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
            /* alternate shape: 0 = oval petal, 1 = teardrop */
            this.shape = Math.random() < 0.5 ? 0 : 1;
        }

        update() {
            this.wob += this.wobS;
            this.y += this.vy;
            this.x += this.vx + Math.sin(this.wob) * this.sway;
            this.angle += this.spin;
            if (this.y > canvas.height + 16 || this.x < -20 || this.x > canvas.width + 20)
                this.reset(false);
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            ctx.fillStyle = this.color;
            ctx.beginPath();

            if (this.shape === 0) {
                /* Simple oval */
                ctx.ellipse(0, 0, this.size, this.size * 0.5, 0, 0, Math.PI * 2);
            } else {
                /* Teardrop / petal */
                const s = this.size;
                ctx.moveTo(0, -s);
                ctx.bezierCurveTo(s * 0.6, -s * 0.25, s * 0.5, s * 0.5, 0, s);
                ctx.bezierCurveTo(-s * 0.5, s * 0.5, -s * 0.6, -s * 0.25, 0, -s);
            }
            ctx.fill();

            /* tiny shine */
            ctx.beginPath();
            ctx.ellipse(-this.size * 0.15, -this.size * 0.1,
                this.size * 0.2, this.size * 0.09, -0.4, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255,255,255,0.28)';
            ctx.fill();
            ctx.restore();
        }
    }

    const COUNT = 22;   // kept intentionally low - subtle, not overwhelming
    let petals = [];
    let rafId = null;

    function resetPetals() { petals = []; for (let i = 0; i < COUNT; i++) petals.push(new Petal()); }
    resetPetals();

    function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        petals.forEach(p => { p.update(); p.draw(); });
        rafId = requestAnimationFrame(loop);
    }

    /* Stop animating when hero scrolls out of view (battery-friendly) */
    const obs = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            loop();
        } else {
            cancelAnimationFrame(rafId);
        }
    }, { threshold: 0.1 });
    obs.observe(hero);
})();

/* ═══════════════════════════════════════════════════════════════
   FOOTER SAKURA PETAL ANIMATION - Only inside the footer element
   ═══════════════════════════════════════════════════════════════ */
(function footerSakura() {
    const canvas = document.getElementById('footer-petal-canvas');
    const footer = document.getElementById('footer');
    if (!canvas || !footer) return;

    const ctx = canvas.getContext('2d');
    let petals = [];
    let rafId = null;
    let visible = false;

    /* Resize canvas to match footer dimensions exactly */
    function resize() {
        canvas.width = footer.offsetWidth;
        canvas.height = footer.offsetHeight;
    }

    resize();
    window.addEventListener('resize', () => { resize(); petals = []; spawn(); });

    /* ── Petal shapes ── */
    // Two petal styles: classic rounded and narrow leaf-like
    const PETAL_STYLES = ['petal', 'leaf'];

    /* Warm sakura colours for light/dark background */
    const COLORS = [
        'rgba(244, 180, 200, 0.85)',
        'rgba(255, 210, 220, 0.75)',
        'rgba(232, 131, 154, 0.70)',
        'rgba(255, 160, 180, 0.80)',
        'rgba(255, 230, 238, 0.65)',
        'rgba(255, 200, 214, 0.72)',
    ];

    class Petal {
        constructor(randomY = false) {
            this.init(randomY);
        }
        init(randomY = false) {
            this.x = Math.random() * canvas.width;
            this.y = randomY
                ? Math.random() * canvas.height
                : -14 - Math.random() * 30;
            this.size = Math.random() * 7 + 4;          // 4–11 px
            this.vy = Math.random() * 0.9 + 0.45;     // slow drift
            this.vx = Math.random() * 0.6 - 0.3;      // very slight sideways
            this.angle = Math.random() * Math.PI * 2;
            this.spin = (Math.random() - 0.5) * 0.035;
            this.wobT = Math.random() * Math.PI * 2;
            this.wobS = Math.random() * 0.018 + 0.006;
            this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
            this.style = PETAL_STYLES[Math.floor(Math.random() * PETAL_STYLES.length)];
            this.sway = Math.random() * 0.55 + 0.2;     // wobble amplitude
        }
        update() {
            this.wobT += this.wobS;
            this.y += this.vy;
            this.x += this.vx + Math.sin(this.wobT) * this.sway;
            this.angle += this.spin;

            if (this.y > canvas.height + 18 || this.x < -30 || this.x > canvas.width + 30) {
                this.init(false);
            }
        }
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            ctx.fillStyle = this.color;
            ctx.beginPath();

            if (this.style === 'petal') {
                /* Rounded cherry-blossom petal */
                const s = this.size;
                ctx.ellipse(0, 0, s, s * 0.52, 0, 0, Math.PI * 2);
            } else {
                /* Narrow elongated leaf / petal */
                const s = this.size;
                ctx.moveTo(0, -s);
                ctx.bezierCurveTo(s * 0.55, -s * 0.3, s * 0.55, s * 0.3, 0, s);
                ctx.bezierCurveTo(-s * 0.55, s * 0.3, -s * 0.55, -s * 0.3, 0, -s);
            }

            ctx.fill();

            /* subtle shine */
            ctx.beginPath();
            ctx.ellipse(-this.size * 0.18, -this.size * 0.12,
                this.size * 0.22, this.size * 0.1, -0.4, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255,255,255,0.3)';
            ctx.fill();

            ctx.restore();
        }
    }

    const COUNT = 55;

    function spawn() {
        for (let i = 0; i < COUNT; i++) {
            petals.push(new Petal(true)); // spread y on initial load
        }
    }

    function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        petals.forEach(p => { p.update(); p.draw(); });
        rafId = requestAnimationFrame(loop);
    }

    /* Only animate when footer is visible (perf) */
    const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            if (!visible) {
                visible = true;
                if (petals.length === 0) spawn();
                loop();
            }
        } else {
            visible = false;
            cancelAnimationFrame(rafId);
        }
    }, { threshold: 0.05 });

    observer.observe(footer);
})();