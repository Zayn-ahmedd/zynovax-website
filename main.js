/**
 * ZYNOVAX — Premium Brand Agency Website
 * Main JavaScript — main.js
 */

"use strict";

/* =============================================
   1. DARK MODE TOGGLE
   ============================================= */
(function initTheme() {
  const html = document.documentElement;
  const btn = document.getElementById('theme-toggle');

  // Load saved theme or system preference
  const saved = localStorage.getItem('zynovax-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (saved === 'dark' || (!saved && prefersDark)) {
    html.classList.add('dark');
  } else {
    html.classList.remove('dark');
  }

  if (!btn) return;

  btn.addEventListener('click', () => {
    html.classList.toggle('dark');
    localStorage.setItem('zynovax-theme', html.classList.contains('dark') ? 'dark' : 'light');
  });
})();


/* =============================================
   2. NAVBAR — scroll behaviour & active states
   ============================================= */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Scrolled style
    if (scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back-to-top visibility
    if (backToTop) {
      if (scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }
  }, { passive: true });

  // Back to top click
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();


/* =============================================
   3. MOBILE NAVIGATION
   ============================================= */
(function initMobileNav() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  const hamOpen = document.getElementById('ham-open');
  const hamClose = document.getElementById('ham-close');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!btn || !menu) return;

  function toggle(force) {
    const open = force !== undefined ? force : menu.classList.contains('hidden');
    menu.classList.toggle('hidden', !open);
    hamOpen.classList.toggle('hidden', open);
    hamClose.classList.toggle('hidden', !open);
    btn.setAttribute('aria-expanded', open.toString());
  }

  btn.addEventListener('click', () => toggle());

  // Close on link click
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => toggle(false));
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!btn.contains(e.target) && !menu.contains(e.target)) {
      toggle(false);
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') toggle(false);
  });
})();


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
  waBtn.href = 'https://wa.me/919876543210?text=Hi%20Zynovax%2C%20I%27d%20love%20to%20learn%20about%20your%20brand%20building%20services!';
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
  '%cZYNOVAX%c\nBrand Engineering Agency · Perungalathur, Chennai, India\ninfo@zynovax.in',
  'background: linear-gradient(135deg, #FF6B35, #FF1A8C, #8B2FC9); color: white; font-size: 24px; font-weight: bold; padding: 8px 16px; border-radius: 8px; font-family: sans-serif;',
  'color: #888; font-size: 12px; margin-top: 4px;'
);
