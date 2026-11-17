/* ============================================
   Portfolio Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ---- Nav scroll effect ----
    const nav = document.querySelector('.nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
    }

    // ---- Reveal on scroll ----
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 80);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));

    // ---- Category card ripple ----
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', (e) => {
            const href = card.getAttribute('href');
            if (href) {
                // Fade out transition
                document.body.style.transition = 'opacity 0.3s ease';
                document.body.style.opacity = '0';
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            }
        });

        // Subtle parallax on mouse move
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 30;
            const rotateY = (centerX - x) / 30;
            card.style.transform = `translateY(-8px) perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // ---- Lightbox ----
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox-content img');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');

    if (lightbox) {
        const triggerItems = document.querySelectorAll('[data-lightbox]');
        triggerItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const src = item.getAttribute('data-img') || item.querySelector('img')?.src;
                const title = item.getAttribute('data-title') || '';
                if (src) {
                    lightboxImg.src = src;
                    lightboxCaption.textContent = title;
                    lightbox.classList.add('active');
                }
            });
        });

        const closeLightbox = () => {
            lightbox.classList.remove('active');
        };

        if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeLightbox();
        });
    }

    // ---- Gallery item hover info ----
    const galleryItems = document.querySelectorAll('.gallery-item, .work-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // If no lightbox data, still allow visual feedback
            if (!item.hasAttribute('data-lightbox')) {
                item.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    item.style.transform = '';
                }, 150);
            }
        });
    });

    // ---- Smooth fade-in on page load ----
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    requestAnimationFrame(() => {
        document.body.style.opacity = '1';
    });

    // ---- Year in footer ----
    const yearEl = document.querySelector('.current-year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
});
