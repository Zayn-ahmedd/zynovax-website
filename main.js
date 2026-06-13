/**
 * ZYNOVAX — Premium Brand Agency Website
 * Main JavaScript — main.js
 */

"use strict";


/* =============================================
   4. SMOOTH SCROLL for internal links (with Lenis inertia scroll support)
   ============================================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      if (window.lenis) {
        window.lenis.scrollTo(target);
      } else {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});


/* =============================================
   5. REVEAL ON SCROLL (Intersection Observer)
   ============================================= */
(function initReveal() {
  const elements = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
})();


/* =============================================
   6. COUNTER ANIMATION (Stats Section)
   ============================================= */
(function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      const target = parseInt(el.getAttribute('data-target') || '0', 10);
      const suffix = el.getAttribute('data-suffix') || '';
      const prefix = el.getAttribute('data-prefix') || '';
      const duration = 1800;
      const start = performance.now();

      function ease(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
      }

      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.round(ease(progress) * target);
        el.textContent = prefix + current + suffix;
        if (progress < 1) {
          requestAnimationFrame(update);
        }
      }

      requestAnimationFrame(update);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
})();


/* =============================================
   7. TESTIMONIALS — DRAG TO SCROLL
   ============================================= */
(function initTestimonialScroll() {
  const track = document.getElementById('testimonial-track');
  if (!track) return;

  let isDown = false;
  let startX;
  let scrollLeft;

  track.addEventListener('mousedown', (e) => {
    isDown = true;
    track.classList.add('dragging');
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
  });

  track.addEventListener('mouseleave', () => {
    isDown = false;
    track.classList.remove('dragging');
  });

  track.addEventListener('mouseup', () => {
    isDown = false;
    track.classList.remove('dragging');
  });

  track.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 1.5;
    track.scrollLeft = scrollLeft - walk;
  });

  // Touch support
  let touchStart = 0;
  let touchScrollLeft = 0;

  track.addEventListener('touchstart', (e) => {
    touchStart = e.touches[0].pageX;
    touchScrollLeft = track.scrollLeft;
  }, { passive: true });

  track.addEventListener('touchmove', (e) => {
    const x = e.touches[0].pageX;
    const walk = (touchStart - x) * 1.2;
    track.scrollLeft = touchScrollLeft + walk;
  }, { passive: true });
})();


/* =============================================
   8. CONTACT FORM
   ============================================= */
(function initForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const submitBtn = document.getElementById('submit-btn');
  const submitText = form.querySelector('.submit-text');
  const submitArrow = form.querySelector('.submit-arrow');
  const submitSpinner = form.querySelector('.submit-spinner');
  const successMsg = document.getElementById('form-success');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Basic validation
    let valid = true;
    const required = form.querySelectorAll('[required]');
    required.forEach(input => {
      const errorEl = input.closest('.form-group')?.querySelector('.form-error');
      if (!input.value.trim()) {
        input.style.borderColor = '#ef4444';
        if (errorEl) errorEl.classList.remove('hidden');
        valid = false;
      } else if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
        input.style.borderColor = '#ef4444';
        if (errorEl) errorEl.classList.remove('hidden');
        valid = false;
      } else {
        input.style.borderColor = '';
        if (errorEl) errorEl.classList.add('hidden');
      }
    });

    if (!valid) return;

    // Show loading state
    submitBtn.disabled = true;
    if (submitText) submitText.textContent = 'Sending...';
    if (submitArrow) submitArrow.classList.add('hidden');
    if (submitSpinner) submitSpinner.classList.remove('hidden');

    // Simulate form submission (replace with actual API call)
    await new Promise(resolve => setTimeout(resolve, 1800));

    // Build mailto link as fallback
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const business = document.getElementById('business').value;
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value;

    const body = `Name: ${name}\nEmail: ${email}\nBusiness: ${business}\nService: ${service}\n\nMessage:\n${message}`;
    window.location.href = `mailto:info@zynovax.in?subject=Brand%20Enquiry%20from%20${encodeURIComponent(name)}&body=${encodeURIComponent(body)}`;

    // Show success
    submitBtn.style.display = 'none';
    if (successMsg) successMsg.classList.remove('hidden');
    form.reset();
  });

  // Real-time validation clearing
  form.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('input', () => {
      input.style.borderColor = '';
      const errorEl = input.closest('.form-group')?.querySelector('.form-error');
      if (errorEl) errorEl.classList.add('hidden');
    });
  });
})();


/* =============================================
   9. ACTIVE NAV LINK ON SCROLL
   ============================================= */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href === `#${id}`) {
            link.style.color = '#FF1A8C';
          } else {
            link.style.color = '';
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
})();


/* =============================================
   10. PARALLAX on hero orbs (subtle)
   ============================================= */
(function initParallax() {
  const orbs = document.querySelectorAll('.hero-orb');
  if (!orbs.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    orbs.forEach((orb, i) => {
      const factor = (i + 1) * 0.4;
      orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
    });
  }, { passive: true });
})();


/* =============================================
   11. CURSOR GLOW EFFECT
   ============================================= */
(function initCursorGlow() {
  if (window.matchMedia('(pointer: coarse)').matches) return; // skip touch devices

  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
    background: radial-gradient(circle, rgba(255,26,140,0.04) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    transition: opacity 0.3s ease;
    opacity: 0;
  `;
  document.body.appendChild(glow);

  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
    glow.style.opacity = '1';
  }, { passive: true });

  document.addEventListener('mouseleave', () => {
    glow.style.opacity = '0';
  });
})();


/* =============================================
   12. TYPING EFFECT in hero (optional)
   ============================================= */
(function initTypingEffect() {
  const tagline = document.querySelector('[data-typing]');
  if (!tagline) return;

  const words = tagline.getAttribute('data-typing').split(',');
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const word = words[wordIndex % words.length].trim();

    if (!isDeleting) {
      tagline.textContent = word.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex >= word.length) {
        isDeleting = true;
        setTimeout(type, 2000);
        return;
      }
    } else {
      tagline.textContent = word.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex <= 0) {
        isDeleting = false;
        wordIndex++;
      }
    }

    setTimeout(type, isDeleting ? 60 : 100);
  }

  type();
})();


/* =============================================
   13. SERVICE CARD TILT EFFECT
   ============================================= */
(function initTilt() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const cards = document.querySelectorAll('.service-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
      card.style.transform = `perspective(600px) rotateY(${x}deg) rotateX(${y}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();


/* =============================================
   14. SCROLL PROGRESS BAR
   ============================================= */
(function initProgressBar() {
  const bar = document.createElement('div');
  bar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    width: 0%;
    background: linear-gradient(90deg, #FF6B35, #FF1A8C, #8B2FC9);
    z-index: 9999;
    transition: width 0.1s ease;
    pointer-events: none;
  `;
  document.body.appendChild(bar);

  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / total) * 100;
    bar.style.width = progress + '%';
  }, { passive: true });
})();


/* =============================================
   15. LAZY LOAD images
   ============================================= */
(function initLazyLoad() {
  const imgs = document.querySelectorAll('img[loading="lazy"]');
  if (!imgs.length || 'loading' in HTMLImageElement.prototype) return; // native support

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.src = e.target.dataset.src || e.target.src;
        observer.unobserve(e.target);
      }
    });
  });
  imgs.forEach(img => observer.observe(img));
})();


/* =============================================
   16. PERFORMANCE: requestIdleCallback polyfill
   ============================================= */
window.requestIdleCallback = window.requestIdleCallback || function (cb) {
  const start = Date.now();
  return setTimeout(() => {
    cb({ didTimeout: false, timeRemaining: () => Math.max(0, 50 - (Date.now() - start)) });
  }, 1);
};


/* =============================================
   17. ACCESSIBLE: Skip to main content
   ============================================= */
(function initSkipLink() {
  const skip = document.createElement('a');
  skip.href = '#main-content';
  skip.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:bg-white focus:text-brand-pink focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg focus:text-sm focus:font-medium';
  skip.textContent = 'Skip to main content';
  document.body.insertBefore(skip, document.body.firstChild);

  // Add id to first section
  const hero = document.getElementById('hero');
  if (hero) hero.setAttribute('id', 'main-content');
})();


/* =============================================
   18. LENIS SMOOTH SCROLL INTEGRATION
   ============================================= */
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

/* =============================================
   19. WHATSAPP FLOATING BUTTON (copied from shared.js)
   ============================================= */
(function initWhatsApp() {
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


/* =============================================
   INIT LOG
   ============================================= */
console.log(
  '%cZYNOVAX%c\nCreative Brand Building Agency · Perungalathur, Chennai, India\ninfo@zynovax.in',
  'background: linear-gradient(135deg, #FF6B35, #FF1A8C, #8B2FC9); color: white; font-size: 24px; font-weight: bold; padding: 8px 16px; border-radius: 8px; font-family: sans-serif;',
  'color: #888; font-size: 12px; margin-top: 4px;'
);

/* =============================================
   21. DYNAMIC GLOBAL SCROLL TO TOP INJECTOR
   ============================================= */
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

// ── Lead Capture Popup Modal ──
(function initLeadCapturePopup() {
  if (localStorage.getItem('leadPopupClosed') === 'true') return;

  setTimeout(() => {
    if (localStorage.getItem('leadPopupClosed') === 'true') return;

    var modalHtml = `
<div id="lead-capture-modal" class="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md opacity-0 pointer-events-none transition-all duration-500 ease-out transform scale-95" style="backdrop-filter: blur(8px);">
  <div class="relative w-full max-w-4xl bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-800 grid grid-cols-1 md:grid-cols-12">
    <!-- Close button -->
    <button id="close-lead-modal" class="absolute top-4 right-4 z-50 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors focus:outline-none" aria-label="Close modal">
      <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    <!-- Left Column (Brand Value Pitch - Dark Accent Background) -->
    <div class="md:col-span-5 bg-gradient-to-br from-brand-indigo via-brand-purple to-brand-magenta p-8 sm:p-10 text-white flex flex-col justify-between relative overflow-hidden">
      <div class="absolute -top-12 -left-12 w-48 h-48 bg-white/10 rounded-full blur-2xl" aria-hidden="true"></div>
      
      <div class="relative z-10 space-y-6 my-auto">
        <div class="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/15 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <rect width="20" height="16" x="2" y="4" rx="2"/>
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
          </svg>
        </div>
        
        <h2 class="font-syne font-extrabold text-2xl sm:text-3xl leading-tight">
          90% of brands have shifted to AI. Have you?
        </h2>
        <p class="text-white/80 text-sm leading-relaxed">
          Your competitors are already using custom AI automation and performance marketing engines to scale, automate, and win. Let us help you stay ahead before the gap gets bigger.
        </p>
      </div>

      <!-- Baseline Row -->
      <div class="relative z-10 flex gap-4 pt-6 mt-8 border-t border-white/10 text-white/70">
        <a href="tel:+919876543210" class="hover:text-white transition-colors" aria-label="Call Zynovax">
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </a>
        <a href="mailto:hello@zynovax.in" class="hover:text-white transition-colors" aria-label="Email Zynovax">
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </a>
        <a href="https://instagram.com/zynovax" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors" aria-label="Zynovax Instagram">
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7 4h10a3 3 0 013 3v10a3 3 0 01-3 3H7a3 3 0 01-3-3V7a3 3 0 013-3z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
            <line x1="17.5" y1="6.5" href="sitemap.xml" x2="17.51" y2="6.5" />
          </svg>
        </a>
        <a href="https://linkedin.com/company/zynovax" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors" aria-label="Zynovax LinkedIn">
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
            <rect x="2" y="9" width="4" height="12" />
            <circle cx="4" cy="4" r="2" />
          </svg>
        </a>
      </div>
    </div>

    <!-- Right Column (Intake Form & CTA Booking - Clean White Background) -->
    <div class="md:col-span-7 p-8 sm:p-10 bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col justify-center">
      <form id="lead-capture-form" class="space-y-4">
        <div>
          <label for="lead-name" class="block text-xs font-mono uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">Name</label>
          <input type="text" id="lead-name" required placeholder="Enter Your Name*" class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/80 rounded-xl text-sm focus:outline-none focus:border-brand-pink transition-colors dark:text-white" />
        </div>
        
        <div>
          <label for="lead-phone" class="block text-xs font-mono uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">Phone</label>
          <input type="tel" id="lead-phone" required placeholder="Enter Your Mobile Number*" class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/80 rounded-xl text-sm focus:outline-none focus:border-brand-pink transition-colors dark:text-white" />
        </div>

        <div>
          <label for="lead-email" class="block text-xs font-mono uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">Email</label>
          <input type="email" id="lead-email" required placeholder="Enter Your Email*" class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/80 rounded-xl text-sm focus:outline-none focus:border-brand-pink transition-colors dark:text-white" />
        </div>

        <div>
          <label for="lead-service" class="block text-xs font-mono uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">Select Required Service</label>
          <div class="relative">
            <select id="lead-service" required class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/80 rounded-xl text-sm focus:outline-none focus:border-brand-pink transition-colors appearance-none cursor-pointer dark:text-white">
              <option value="" disabled selected>Select Required Service*</option>
              <option value="Brand Strategy">Brand Strategy</option>
              <option value="Visual Identity">Visual Identity</option>
              <option value="Social Media Management">Social Media Management</option>
              <option value="Performance Marketing">Performance Marketing</option>
              <option value="Content & Copywriting">Content & Copywriting</option>
              <option value="AI Brand Tools">AI Brand Tools</option>
              <option value="Others">Others</option>
            </select>
            <div class="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-500">
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <div class="pt-2">
          <button type="submit" class="w-full py-4 px-6 bg-gradient-to-r from-brand-pink to-brand-purple hover:from-brand-purple hover:to-brand-pink text-white font-syne font-bold text-sm rounded-xl tracking-wider uppercase transition-all duration-300 transform active:scale-[0.98] shadow-lg shadow-brand-pink/25">
            Book a Strategy Call & Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
`;

    var wrapper = document.createElement('div');
    wrapper.innerHTML = modalHtml;
    var modal = wrapper.firstElementChild;
    document.body.appendChild(modal);

    setTimeout(() => {
      modal.classList.remove('opacity-0', 'pointer-events-none', 'scale-95');
      modal.classList.add('opacity-100', 'pointer-events-auto', 'scale-100');
    }, 50);

    function closeModal() {
      modal.classList.remove('opacity-100', 'pointer-events-auto', 'scale-100');
      modal.classList.add('opacity-0', 'pointer-events-none', 'scale-95');
      localStorage.setItem('leadPopupClosed', 'true');
      setTimeout(() => {
        modal.remove();
      }, 500);
    }

    document.getElementById('close-lead-modal')?.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    document.getElementById('lead-capture-form')?.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('lead-name').value;
      const phone = document.getElementById('lead-phone').value;
      const email = document.getElementById('lead-email').value;
      const service = document.getElementById('lead-service').value;

      // Show loading state
      const submitBtn = e.target.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'SUBMITTING SECURELY...';

      // Dispatch to Formspree API (or Web3Forms)
      fetch('https://formspree.io/f/xnqyoogv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          phone: phone,
          email: email,
          service: service,
          _subject: 'New B2B Lead from Zynovax Website Popup',
          _to: 'info@zynovax.in'
        })
      })
        .then(() => {
          showThankYouState();
        })
        .catch((err) => {
          console.error('Submission error, fallback to thank you state:', err);
          showThankYouState();
        });

      function showThankYouState() {
        const modalWindow = modal.firstElementChild;
        modalWindow.innerHTML = `
          <!-- Close button -->
          <button id="close-lead-modal" class="absolute top-4 right-4 z-50 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors focus:outline-none" aria-label="Close modal">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div class="col-span-12 p-10 sm:p-12 text-center space-y-6 animate-fadeIn">
            <!-- Success Icon -->
            <div class="w-20 h-20 bg-gradient-to-tr from-brand-pink to-brand-purple text-white rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10 shadow-lg shadow-brand-pink/20">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 class="font-syne font-extrabold text-3xl text-gray-900 dark:text-white leading-tight">Lead Received Securely!</h3>
            <p class="text-gray-500 dark:text-gray-400 text-base max-w-md mx-auto leading-relaxed">
              Our strategy division will review your brand within 24 hours.
            </p>
            <div class="pt-4">
              <a href="audit.html" class="inline-block px-8 py-4 bg-gradient-to-r from-brand-pink to-brand-purple hover:from-brand-purple hover:to-brand-pink text-white font-syne font-bold text-sm rounded-xl tracking-wider uppercase transition-all duration-300 transform hover:scale-[1.04] active:scale-[0.98] shadow-lg shadow-brand-pink/25">
                Book a Call
              </a>
            </div>
          </div>
        `;

        localStorage.setItem('leadPopupClosed', 'true');

        // Re-bind close event
        document.getElementById('close-lead-modal')?.addEventListener('click', closeModal);
      }
    });

  }, 4000);
})();


