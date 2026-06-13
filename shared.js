/**
 * ZYNOVAX — Shared Components & Utilities
 * shared.js — injected on every page
 */
"use strict";

/* ── Detect current page for active nav state ── */
const PAGE = window.location.pathname.split('/').pop().replace('.html', '') || 'index';

/* ─────────────────────────────────────────────────
   NAVBAR HTML
───────────────────────────────────────────────── */
function buildNavbar() {
  const links = [
    { href: 'about.html', label: 'About', key: 'about' },
    { href: 'services.html', label: 'Services', key: 'services' },
    { href: 'work.html', label: 'Work', key: 'work' },
    { href: 'blog.html', label: 'Blog', key: 'blog' },
    { href: 'testimonials.html', label: 'Testimonials', key: 'testimonials' },
    { href: 'process.html', label: 'Process', key: 'process' },
  ];

  const desktopLinks = links.map(l => {
    const isActive = PAGE === l.key;
    const activeClass = isActive ? 'style="color:#FF1A8C" active' : 'text-gray-600 dark:text-gray-300';
    return `<li><a href="${l.href}" class="nav-link text-sm font-medium ${activeClass} hover:text-brand-pink dark:hover:text-brand-pink transition-colors duration-200">${l.label}</a></li>`;
  }).join('');

  const mobileLinks = links.map(l => `
    <a href="${l.href}" class="mobile-nav-link text-base font-medium py-2 border-b border-gray-100 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:text-brand-pink transition-colors">${l.label}</a>
  `).join('');

  const logoHref = PAGE === 'index' ? '#hero' : 'index.html';

  return `
  <header id="navbar" class="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 lg:h-20">
      <a href="${logoHref}" class="flex items-center gap-2.5 sm:gap-3 group" aria-label="Zynovax home">
        <img src="logo.png" alt="Zynovax Logo" class="h-8 sm:h-9 w-auto flex-shrink-0" />
        <div class="h-5 sm:h-6 w-24 sm:w-28 overflow-hidden relative flex-shrink-0">
          <img src="logo-text.png" alt="Zynovax" class="absolute w-full h-auto" style="top: 50%; transform: translateY(-50%);" />
        </div>
      </a>

      <ul class="hidden lg:flex items-center gap-8" role="list">${desktopLinks}</ul>

      <div class="flex items-center gap-3">
        <button id="theme-toggle" aria-label="Toggle dark mode" class="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-pink">
          <svg id="icon-sun" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-500 hidden dark:block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" /></svg>
          <svg id="icon-moon" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600 block dark:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
        </button>
        <a href="audit.html" class="hidden lg:inline-flex btn-primary text-sm px-5 py-2.5">Get Free Brand Audit</a>
        <button id="mobile-menu-btn" class="lg:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-brand-pink focus:outline-none" aria-label="Toggle navigation" aria-expanded="false">
          <svg id="ham-open" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
          <svg id="ham-close" class="h-6 w-6 hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
    </nav>
    <div id="mobile-menu" class="lg:hidden hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-100 dark:border-gray-800 shadow-xl">
      <div class="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-4">
        ${mobileLinks}
        <a href="audit.html" class="btn-primary text-center mt-2">Get Free Brand Audit</a>
      </div>
    </div>
  </header>`;
}

/* ─────────────────────────────────────────────────
   FOOTER HTML
───────────────────────────────────────────────── */
function buildFooter() {
  return `
  <footer class="bg-gray-950 dark:bg-black text-white py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        <div class="md:col-span-2 lg:col-span-2">
          <div class="flex items-center gap-2.5 sm:gap-3 mb-4">
            <img src="logo.png" alt="Zynovax" class="h-9 sm:h-10 w-auto brightness-110 flex-shrink-0" />
            <div class="h-6 sm:h-7 w-28 sm:w-32 overflow-hidden relative flex-shrink-0 brightness-110">
              <img src="logo-text.png" alt="Zynovax" class="absolute w-full h-auto" style="top: 50%; transform: translateY(-50%);" />
            </div>
          </div>
          <p class="text-gray-400 text-sm leading-relaxed max-w-xs mb-4">Strategy-first brand building for startups, D2C brands, and local businesses. Based in Perungalathur, Chennai. Built for India.</p>
          <div class="flex flex-col gap-2 mb-5">
            <a href="tel:6383712480" class="flex items-center gap-2 text-gray-400 hover:text-brand-pink text-sm transition-colors">
              <svg class="h-4 w-4 text-brand-pink flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              <span>+91 63837 12480</span>
            </a>
            <a href="mailto:info@zynovax.in" class="flex items-center gap-2 text-gray-400 hover:text-brand-pink text-sm transition-colors">
              <svg class="h-4 w-4 text-brand-pink flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              <span>info@zynovax.in</span>
            </a>
          </div>
          <div class="flex items-center gap-3">
            <a href="https://instagram.com/zynovax" target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="w-9 h-9 rounded-full bg-white/10 hover:bg-gradient-to-br hover:from-brand-orange hover:to-brand-pink flex items-center justify-center transition-all duration-200 hover:scale-110">
              <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href="https://facebook.com/zynovax" target="_blank" rel="noopener noreferrer" aria-label="Facebook" class="w-9 h-9 rounded-full bg-white/10 hover:bg-blue-700 flex items-center justify-center transition-all duration-200 hover:scale-110">
              <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.313 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>
            </a>
            <a href="https://linkedin.com/company/zynovax" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" class="w-9 h-9 rounded-full bg-white/10 hover:bg-blue-600 flex items-center justify-center transition-all duration-200 hover:scale-110">
              <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="mailto:info@zynovax.in" aria-label="Email" class="w-9 h-9 rounded-full bg-white/10 hover:bg-gradient-to-br hover:from-brand-pink hover:to-brand-purple flex items-center justify-center transition-all duration-200 hover:scale-110">
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </a>
          </div>
        </div>
        <div>
          <h3 class="font-syne font-bold text-sm uppercase tracking-widest text-gray-300 mb-5">Services</h3>
          <ul class="space-y-3">
            <li><a href="services.html" class="text-gray-400 hover:text-brand-pink text-sm transition-colors">Brand Strategy</a></li>
            <li><a href="services.html" class="text-gray-400 hover:text-brand-pink text-sm transition-colors">Visual Identity</a></li>
            <li><a href="services.html" class="text-gray-400 hover:text-brand-pink text-sm transition-colors">Social Media</a></li>
            <li><a href="services.html" class="text-gray-400 hover:text-brand-pink text-sm transition-colors">Performance Marketing</a></li>
            <li><a href="services.html" class="text-gray-400 hover:text-brand-pink text-sm transition-colors">Content & Copywriting</a></li>
            <li><a href="services.html" class="text-gray-400 hover:text-brand-pink text-sm transition-colors">AI Brand Tools</a></li>
          </ul>
        </div>
        <div>
          <h3 class="font-syne font-bold text-sm uppercase tracking-widest text-gray-300 mb-5">Company</h3>
          <ul class="space-y-3">
            <li><a href="about.html" class="text-gray-400 hover:text-brand-pink text-sm transition-colors">About</a></li>
            <li><a href="services.html" class="text-gray-400 hover:text-brand-pink text-sm transition-colors">Services</a></li>
            <li><a href="work.html" class="text-gray-400 hover:text-brand-pink text-sm transition-colors">Work</a></li>
            <li><a href="blog.html" class="text-gray-400 hover:text-brand-pink text-sm transition-colors">Blog</a></li>
            <li><a href="testimonials.html" class="text-gray-400 hover:text-brand-pink text-sm transition-colors">Testimonials</a></li>
            <li><a href="process.html" class="text-gray-400 hover:text-brand-pink text-sm transition-colors">Process</a></li>
            <li><a href="audit.html" class="text-gray-400 hover:text-brand-pink text-sm transition-colors">Free Brand Audit</a></li>
          </ul>
        </div>
      </div>
      <div class="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-gray-500 text-sm">© 2025 Zynovax. All rights reserved. Built in Perungalathur, Chennai 🇮🇳</p>
        <div class="flex items-center gap-4 flex-wrap justify-center sm:justify-end">
          <a href="privacy.html" class="text-gray-500 hover:text-brand-pink text-xs transition-colors">Privacy Policy</a>
          <a href="terms.html" class="text-gray-500 hover:text-brand-pink text-xs transition-colors">Terms &amp; Conditions</a>
          <a href="refunds.html" class="text-gray-500 hover:text-brand-pink text-xs transition-colors">Refund Policy</a>
          <a href="sitemap.xml" class="text-gray-500 hover:text-brand-pink text-xs transition-colors">Sitemap</a>
        </div>
      </div>
    </div>
  </footer>`;
}

/* ─────────────────────────────────────────────────
   INJECT on DOMContentLoaded
 ───────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Inject navbar before body first child
  const navEl = document.getElementById('navbar-placeholder');
  if (navEl) navEl.outerHTML = buildNavbar();

  const footerEl = document.getElementById('footer-placeholder');
  if (footerEl) footerEl.outerHTML = buildFooter();

  // ── Dark mode (Async & Fail-safe Engine) ──
  const html = document.documentElement;
  const saved = localStorage.getItem('zynovax-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = saved === 'dark' || (!saved && prefersDark);

  if (isDark) {
    html.classList.add('dark');
  } else {
    html.classList.remove('dark');
  }

  function bindToggleListener(btn) {
    if (btn.dataset.themeBound) return;
    btn.dataset.themeBound = "true";
    btn.addEventListener('click', () => {
      const wasDark = html.classList.toggle('dark');
      localStorage.setItem('zynovax-theme', wasDark ? 'dark' : 'light');
    });
  }

  const existingBtn = document.getElementById('theme-toggle');
  if (existingBtn) {
    bindToggleListener(existingBtn);
  } else {
    const observer = new MutationObserver((mutations, obs) => {
      const targetBtn = document.getElementById('theme-toggle');
      if (targetBtn) {
        bindToggleListener(targetBtn);
        obs.disconnect();
      }
    });
    observer.observe(document.body || document.documentElement, {
      childList: true,
      subtree: true
    });
  }

  // ── Navbar scroll ──
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) navbar?.classList.add('scrolled'); else navbar?.classList.remove('scrolled');
  }, { passive: true });

  // ── Mobile menu ──
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  const hamOpen = document.getElementById('ham-open');
  const hamClose = document.getElementById('ham-close');
  if (btn && menu) {
    btn.addEventListener('click', () => {
      const open = menu.classList.toggle('hidden') === false;
      hamOpen?.classList.toggle('hidden', open);
      hamClose?.classList.toggle('hidden', !open);
      btn.setAttribute('aria-expanded', open.toString());
    });
    document.querySelectorAll('.mobile-nav-link').forEach(l => l.addEventListener('click', () => {
      menu.classList.add('hidden');
      hamOpen?.classList.remove('hidden');
      hamClose?.classList.add('hidden');
    }));
    document.addEventListener('click', e => { if (!btn.contains(e.target) && !menu.contains(e.target)) { menu.classList.add('hidden'); hamOpen?.classList.remove('hidden'); hamClose?.classList.add('hidden'); } });
  }

  // ── Reveal animations ──
  const reveals = document.querySelectorAll('.reveal');
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); revealObs.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(el => revealObs.observe(el));

  // ── Smooth scroll ──
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const t = document.querySelector(href);
      if (t) {
        e.preventDefault();
        if (window.lenis) {
          window.lenis.scrollTo(t);
        } else {
          t.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // ── Scroll progress bar ──
  const bar = document.createElement('div');
  bar.style.cssText = 'position:fixed;top:0;left:0;height:3px;width:0%;background:linear-gradient(90deg,#FF6B35,#FF1A8C,#8B2FC9);z-index:9999;transition:width 0.1s ease;pointer-events:none;';
  document.body.appendChild(bar);
  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (window.scrollY / total * 100) + '%';
  }, { passive: true });

  // ── Counter animation ──
  document.querySelectorAll('.stat-number').forEach(el => {
    const target = parseInt(el.dataset.target || '0');
    const suffix = el.dataset.suffix || '';
    const obs = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return;
      const start = performance.now();
      const dur = 1600;
      const ease = t => t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
      const update = now => { const p = Math.min((now - start) / dur, 1); el.textContent = Math.round(ease(p) * target) + suffix; if (p < 1) requestAnimationFrame(update); };
      requestAnimationFrame(update);
      obs.unobserve(el);
    }, { threshold: 0.5 });
    obs.observe(el);
  });

  // ── Cursor glow (desktop only) ──
  if (!window.matchMedia('(pointer:coarse)').matches) {
    const glow = Object.assign(document.createElement('div'), { style: 'position:fixed;width:400px;height:400px;border-radius:50%;pointer-events:none;z-index:0;background:radial-gradient(circle,rgba(255,26,140,.04) 0%,transparent 70%);transform:translate(-50%,-50%);opacity:0;transition:opacity .3s;' });
    document.body.appendChild(glow);
    document.addEventListener('mousemove', e => { glow.style.left = e.clientX + 'px'; glow.style.top = e.clientY + 'px'; glow.style.opacity = '1'; }, { passive: true });
    document.addEventListener('mouseleave', () => glow.style.opacity = '0');
  }

  // -- WhatsApp Floating Button (injected from shared.js) --
  (function () {
    var waStyle = document.createElement('style');
    waStyle.textContent = '@keyframes waPulse{0%,100%{box-shadow:0 4px 20px rgba(37,211,102,.5)}50%{box-shadow:0 4px 30px rgba(37,211,102,.8),0 0 0 10px rgba(37,211,102,.08)}}' +
      '#wa-fab{position:fixed;bottom:28px;right:28px;z-index:9000;width:56px;height:56px;border-radius:50%;background:#25D366;display:flex;align-items:center;justify-content:center;animation:waPulse 2.5s ease-in-out infinite;transition:transform .3s ease;text-decoration:none;}' +
      '#wa-fab:hover{transform:scale(1.12) translateY(-2px);}' +
      '#wa-tip{position:fixed;bottom:96px;right:22px;z-index:9001;background:#111827;color:#fff;font-size:12px;font-weight:600;font-family:\'CoFo Sans\',\'Plus Jakarta Sans\',Outfit,sans-serif;padding:6px 12px;border-radius:8px;white-space:nowrap;opacity:0;transform:translateY(4px);pointer-events:none;transition:opacity .2s,transform .2s;}' +
      '#wa-tip::after{content:"";position:absolute;top:100%;right:18px;border:5px solid transparent;border-top-color:#111827;}' +
      '#wa-fab:hover~#wa-tip,#wa-fab:focus~#wa-tip{opacity:1;transform:translateY(0);}';
    document.head.appendChild(waStyle);
    var waBtn = document.createElement('a');
    waBtn.id = 'wa-fab';
    waBtn.href = 'https://wa.me/916383712480?text=Hi%20Zynovax%2C%20I%27d%20love%20to%20learn%20about%20your%20brand%20building%20services!';
    waBtn.target = '_blank';
    waBtn.rel = 'noopener noreferrer';
    waBtn.setAttribute('aria-label', 'Chat with us on WhatsApp');
    waBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';
    document.body.appendChild(waBtn);
    var waTip = document.createElement('div');
    waTip.id = 'wa-tip';
    waTip.textContent = 'Chat on WhatsApp';
    document.body.appendChild(waTip);
  })();


  // -- Page transition loader --
  (function () {
    var loader = document.createElement('div');
    loader.id = 'page-loader';
    document.body.prepend(loader);

    // Flash active on every navigation click
    document.querySelectorAll('a[href]').forEach(function (a) {
      var href = a.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('http')) return;
      a.addEventListener('click', function () {
        loader.classList.add('active');
        setTimeout(function () { loader.classList.add('done'); }, 300);
      });
    });

    window.addEventListener('pageshow', function () {
      loader.classList.remove('active', 'done');
    });
  })();

  // -- Marquee ticker (shown on all pages) --
  (function () {
    var items = [
      '50+ Brands Built',
      'Strategy-First Agency',
      'Based in Perungalathur, Chennai, India',
      'Free Brand Audit Worth ₹5,000',
      'Social · Performance · Identity · AI',
      'Delivering since 2022',
      'Rated 5★ by Clients',
      'No Templates. Ever.',
    ];

    // Build doubled list for seamless loop
    var html = items.concat(items).map(function (t) {
      return '<span class="logo-strip-item"><span style="width:6px;height:6px;border-radius:50%;background:linear-gradient(135deg,#FF6B35,#FF1A8C);display:inline-block;flex-shrink:0;"></span>' + t + '</span>';
    }).join('');

    var ticker = document.createElement('div');
    ticker.setAttribute('aria-hidden', 'true');
    ticker.style.cssText = 'width:100%;background:linear-gradient(90deg,rgba(255,107,53,0.06),rgba(255,26,140,0.06),rgba(139,47,201,0.06));border-top:1px solid rgba(255,26,140,0.08);border-bottom:1px solid rgba(255,26,140,0.08);padding:10px 0;position:relative;z-index:40;';
    ticker.innerHTML = '<div class="marquee-wrapper"><div class="marquee-track text-gray-600 dark:text-gray-400 text-xs font-semibold uppercase tracking-widest">' + html + '</div></div>';

    // Insert after navbar
    var nav = document.getElementById('navbar');
    if (nav && nav.nextSibling) {
      nav.parentNode.insertBefore(ticker, nav.nextSibling);
    }
  })();

  // ── Lenis Smooth Scroll Integration ──
  (function initLenis() {
    if (window.matchMedia('(pointer: coarse)').matches) {
      // Disable smooth scroll on mobile touch devices for native feel
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@studio-freight/lenis@1.0.42/dist/lenis.min.js';
    script.onload = () => {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        smoothTouch: false,
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      window.lenis = lenis;
    };
    document.head.appendChild(script);
  })();

  // ── Global Scroll to Top Button Injection & Handling ──
  (function initScrollToTop() {
    if (document.getElementById('back-to-top')) {
      document.getElementById('back-to-top').remove();
    }

    var style = document.createElement('style');
    style.textContent =
      '#back-to-top {' +
      '  position: fixed;' +
      '  bottom: 28px;' +
      '  left: 28px;' +
      '  z-index: 9000;' +
      '  width: 48px;' +
      '  height: 48px;' +
      '  border-radius: 50%;' +
      '  background: #ffffff;' +
      '  border: 1px solid rgba(0, 0, 0, 0.08);' +
      '  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);' +
      '  display: flex;' +
      '  align-items: center;' +
      '  justify-content: center;' +
      '  color: #4b5563;' +
      '  cursor: pointer;' +
      '  opacity: 0;' +
      '  pointer-events: none;' +
      '  transition: opacity 0.3s ease, transform 0.3s ease, border-color 0.3s ease, color 0.3s ease, background-color 0.3s ease;' +
      '}' +
      '.dark #back-to-top {' +
      '  background: #1f2937;' +
      '  border-color: rgba(255, 255, 255, 0.08);' +
      '  color: #d1d5db;' +
      '}' +
      '#back-to-top:hover {' +
      '  transform: scale(1.08) translateY(-2px);' +
      '  color: #FF1A8C;' +
      '  border-color: #FF1A8C;' +
      '  box-shadow: 0 6px 24px rgba(255, 26, 140, 0.15);' +
      '}' +
      '#back-to-top.visible {' +
      '  opacity: 1;' +
      '  pointer-events: auto;' +
      '}';
    document.head.appendChild(style);

    var btn = document.createElement('button');
    btn.id = 'back-to-top';
    btn.setAttribute('aria-label', 'Back to top');
    btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>';
    document.body.appendChild(btn);

    window.addEventListener('scroll', function () {
      if (window.scrollY > 300) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }, { passive: true });

    btn.addEventListener('click', function () {
      if (window.lenis) {
        window.lenis.scrollTo(0);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  })();



});


