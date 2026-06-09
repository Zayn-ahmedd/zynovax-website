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
   INIT LOG
   ============================================= */
console.log(
  '%cZYNOVAX%c\nBrand Engineering Agency · Perungalathur, Chennai, India\ninfo@zynovax.in',
  'background: linear-gradient(135deg, #FF6B35, #FF1A8C, #8B2FC9); color: white; font-size: 24px; font-weight: bold; padding: 8px 16px; border-radius: 8px; font-family: sans-serif;',
  'color: #888; font-size: 12px; margin-top: 4px;'
);
