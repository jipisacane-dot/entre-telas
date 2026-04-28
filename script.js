/* =========================================================
   Entre Telas — script.js
   Header scroll, mobile nav, scroll reveal, WhatsApp links
   ========================================================= */

(function () {
  'use strict';

  // === CONFIGURACIÓN — actualizar antes de publicar ============
  // Formato: número internacional sin "+" ni espacios. Ej: "5491133334444"
  const WSP_NUMERO = '5491166776019';
  const WSP_DEFAULT = 'Hola Entre Telas! Quiero pedir un asesoramiento sin cargo para mis cortinas.';
  // =============================================================

  // 1) Build WhatsApp links — each button uses its own data-wsp-msg or the default
  document.querySelectorAll('[data-wsp]').forEach(function (el) {
    var msg = el.getAttribute('data-wsp-msg') || WSP_DEFAULT;
    el.setAttribute('href', 'https://wa.me/' + WSP_NUMERO + '?text=' + encodeURIComponent(msg));
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener');
  });

  // 2) Header scroll state
  const header = document.querySelector('.site-header');
  const setHeaderState = function () {
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  setHeaderState();
  window.addEventListener('scroll', setHeaderState, { passive: true });

  // 3) Mobile nav + overlay
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.querySelector('.site-nav');
  if (navToggle && siteNav) {
    // Inject overlay
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);

    // Inject overlay styles
    const ovStyle = document.createElement('style');
    ovStyle.textContent =
      '.nav-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.45);z-index:150;display:none;cursor:pointer}' +
      '.nav-overlay.is-open{display:block}' +
      '@media(min-width:721px){.nav-overlay{display:none!important}}';
    document.head.appendChild(ovStyle);

    var _scrollY = 0;
    const openNav = function () {
      _scrollY = window.scrollY;
      siteNav.classList.add('is-open');
      overlay.classList.add('is-open');
      navToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = '-' + _scrollY + 'px';
      document.body.style.width = '100%';
    };
    const closeNav = function () {
      siteNav.classList.remove('is-open');
      overlay.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, _scrollY);
    };

    navToggle.addEventListener('click', function () {
      siteNav.classList.contains('is-open') ? closeNav() : openNav();
    });
    overlay.addEventListener('click', closeNav);
    siteNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeNav);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && siteNav.classList.contains('is-open')) closeNav();
    });
  }

  // 4) Scroll reveal
  const revealEls = document.querySelectorAll(
    '.intro-text, .intro-figure, .product-card, .value-grid li, .gallery-grid figure, .ropacama-grid figure, .process-figure, .process-text, .contact-inner'
  );
  revealEls.forEach(function (el) { el.classList.add('reveal'); });

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // 5) Hide float button while hero is visible
  var wspFloat = document.querySelector('.wsp-float');
  var heroSection = document.querySelector('.hero');
  if (wspFloat && heroSection && 'IntersectionObserver' in window) {
    var heroObs = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        wspFloat.classList.add('wsp-hidden');
      } else {
        wspFloat.classList.remove('wsp-hidden');
      }
    }, { threshold: 0.2 });
    heroObs.observe(heroSection);
  }

  // 7) Year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 8) Lightbox simple para galería
  const galleryFigs = document.querySelectorAll('.gallery-grid figure');
  if (galleryFigs.length) {
    const lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-label', 'Vista ampliada de imagen');
    lb.innerHTML =
      '<button class="lb-close" aria-label="Cerrar">&times;</button>' +
      '<button class="lb-prev" aria-label="Anterior">&#10094;</button>' +
      '<img alt="">' +
      '<button class="lb-next" aria-label="Siguiente">&#10095;</button>';
    document.body.appendChild(lb);

    const lbImg = lb.querySelector('img');
    const items = Array.from(galleryFigs).map(function (f) {
      const i = f.querySelector('img');
      return { src: i.src, alt: i.alt };
    });
    let current = 0;

    const show = function (i) {
      current = (i + items.length) % items.length;
      lbImg.src = items[current].src;
      lbImg.alt = items[current].alt;
    };
    const open = function (i) {
      show(i);
      lb.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    };
    const close = function () {
      lb.classList.remove('is-open');
      document.body.style.overflow = '';
    };

    galleryFigs.forEach(function (f, i) {
      f.addEventListener('click', function () { open(i); });
    });
    lb.querySelector('.lb-close').addEventListener('click', close);
    lb.querySelector('.lb-prev').addEventListener('click', function () { show(current - 1); });
    lb.querySelector('.lb-next').addEventListener('click', function () { show(current + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(current - 1);
      if (e.key === 'ArrowRight') show(current + 1);
    });

    // Lightbox styles inyectados
    const style = document.createElement('style');
    style.textContent = `
      .lightbox{position:fixed;inset:0;background:rgba(15,12,9,0.94);display:none;align-items:center;justify-content:center;z-index:1000;padding:2rem}
      .lightbox.is-open{display:flex}
      .lightbox img{max-width:min(100%,1200px);max-height:90vh;object-fit:contain;border-radius:4px;box-shadow:0 30px 80px rgba(0,0,0,0.5)}
      .lightbox button{position:absolute;background:rgba(255,255,255,0.08);color:#fff;border:0;width:48px;height:48px;border-radius:50%;font-size:1.4rem;cursor:pointer;transition:background .3s}
      .lightbox button:hover{background:rgba(255,255,255,0.18)}
      .lb-close{top:1.2rem;right:1.2rem;font-size:1.8rem;line-height:1}
      .lb-prev{left:1.2rem;top:50%;transform:translateY(-50%)}
      .lb-next{right:1.2rem;top:50%;transform:translateY(-50%)}
      @media(max-width:720px){.lb-prev,.lb-next{top:auto;bottom:1.2rem;transform:none}.lb-prev{left:1.2rem}.lb-next{right:1.2rem}}
    `;
    document.head.appendChild(style);
  }
})();
