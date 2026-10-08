/**
 * Naufal Mirza Nugraha — Portfolio
 * script.js — Foundation interactions only (Tahap 1)
 */

document.addEventListener('DOMContentLoaded', () => {

    // ── 1. NAVBAR: Scroll shadow + Active link ──────────────────
    const navbar = document.getElementById('navbar');

    const updateNavbarScroll = () => {
        if (window.scrollY > 30) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', updateNavbarScroll, { passive: true });
    updateNavbarScroll();

    // ── 2. NAVBAR: Active link on scroll (Intersection Observer) ──
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
                });
            }
        });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(section => sectionObserver.observe(section));

    // ── 3. MOBILE MENU ─────────────────────────────────────────
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    navToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('open');
        navToggle.classList.toggle('open', isOpen);
        navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when a link is clicked
    navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            navToggle.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // ── 4. COPY EMAIL ──────────────────────────────────────────
    window.copyEmail = () => {
        const emailEl = document.getElementById('email-display');
        if (!emailEl) return;
        const email = emailEl.textContent.trim();

        navigator.clipboard.writeText(email).then(() => {
            showToast();
        }).catch(() => {
            // Fallback for older browsers
            const ta = document.createElement('textarea');
            ta.value = email;
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            showToast();
        });
    };

    function showToast() {
        const toast = document.getElementById('emailToast');
        if (!toast) return;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    }

});
