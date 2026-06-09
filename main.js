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

/* =============================================
   20. INTERACTIVE HERO & BRAND VIBE CONTROLLER
   ============================================= */
(function initInteractiveHero() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  let width = canvas.width = canvas.offsetWidth;
  let height = canvas.height = canvas.offsetHeight;
  
  let particles = [];
  let mouse = { x: null, y: null, active: false };
  let energyLevel = 2; // Default from range slider
  
  const canvasConfigs = {
    disruptor: {
      count: 70,
      colors: ['#FF6B35', '#FF1A8C', '#8B2FC9'],
      maxSpeed: 1.4,
      connectionDist: 100,
      lineOpacity: 0.18,
      mouseRepelRadius: 110,
      forceMultiplier: 0.08
    },
    minimalist: {
      count: 25,
      colors: document.documentElement.classList.contains('dark') ? ['#ffffff', '#64748b'] : ['#0f172a', '#475569'],
      maxSpeed: 0.4,
      connectionDist: 140,
      lineOpacity: 0.06,
      mouseRepelRadius: 70,
      forceMultiplier: 0.02
    },
    visionary: {
      count: 55,
      colors: ['#06b6d4', '#0ea5e9', '#10b981'],
      maxSpeed: 1.1,
      connectionDist: 110,
      lineOpacity: 0.15,
      mouseRepelRadius: 130,
      forceMultiplier: 0.12,
      vortex: true
    }
  };
  
  const archetypesData = {
    disruptor: {
      line1: "We Don't Just",
      line2: "Build Brands.",
      line3: "We Build Weapons.",
      badge: "Creative Brand Building Agency · Perungalathur, Chennai, India",
      desc: "Strategy-first brand engineering for startups, D2C brands, and local businesses ready to stop being invisible.",
      stat1: "340%",
      stat1Growth: "↑ Avg Reach",
      stat1Desc: "Instagram organic growth generated",
      stat2: "50+",
      stat3: "5.0★",
      mobStat1: "50+ Brands Built",
      mobStat2: "5.0★ Rating",
      mobStat3: "0 Templates",
      mobStat4: "340% Avg Growth"
    },
    minimalist: {
      line1: "The Art of",
      line2: "True Restraint.",
      line3: "Luxury Refined.",
      badge: "Bespoke Minimalist Brand Studio · Luxury & Design",
      desc: "Curating ultra-high-end visual systems and silent prestige for brands that value substance over noise.",
      stat1: "99.8%",
      stat1Growth: "↑ Retention",
      stat1Desc: "Client satisfaction & lifetime retention rate",
      stat2: "12",
      stat3: "Elite",
      mobStat1: "12 Elite Clients",
      mobStat2: "100% Bespoke",
      mobStat3: "Zero Noise",
      mobStat4: "99.8% Retention"
    },
    visionary: {
      line1: "Brands Built For",
      line2: "The Next Epoch.",
      line3: "Future Systems.",
      badge: "Futuristic Identity Engineering Lab · Next-Gen Brand Systems",
      desc: "Architecting hyper-scalable, tech-forward, and automated digital brand experiences built to scale infinitely.",
      stat1: "$12M+",
      stat1Growth: "↑ Raised",
      stat1Desc: "Seed and Series-A capital raised by clients",
      stat2: "15x",
      stat3: "AI",
      mobStat1: "15x Avg ROI",
      mobStat2: "AI Integrated",
      mobStat3: "Future Proof",
      mobStat4: "$12M+ Raised"
    }
  };
  
  let activeConfigName = 'disruptor';
  let config = canvasConfigs.disruptor;
  
  // Theme change listener
  const themeObserver = new MutationObserver(() => {
    canvasConfigs.minimalist.colors = document.documentElement.classList.contains('dark') ? ['#ffffff', '#64748b'] : ['#0f172a', '#475569'];
    if (activeConfigName === 'minimalist') {
      config = canvasConfigs.minimalist;
      particles.forEach(p => {
        p.color = config.colors[Math.floor(Math.random() * config.colors.length)];
      });
    }
  });
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  
  class Particle {
    constructor() {
      this.reset();
      this.x = Math.random() * width;
      this.y = Math.random() * height;
    }
    
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.radius = Math.random() * 2 + 1;
      this.color = config.colors[Math.floor(Math.random() * config.colors.length)];
      
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * config.maxSpeed + 0.1;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
    }
    
    update() {
      const speedFactor = energyLevel === 1 ? 0.45 : (energyLevel === 3 ? 2.2 : 1.0);
      
      if (config.vortex) {
        const dx = this.x - width / 2;
        const dy = this.y - height / 2;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        this.vx += (-dy / dist) * 0.015 * speedFactor;
        this.vy += (dx / dist) * 0.015 * speedFactor;
        this.vx -= (dx / dist) * 0.005;
        this.vy -= (dy / dist) * 0.005;
      }
      
      this.x += this.vx * speedFactor;
      this.y += this.vy * speedFactor;
      
      if (mouse.active && mouse.x !== null && mouse.y !== null) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        
        if (dist < config.mouseRepelRadius) {
          const force = (config.mouseRepelRadius - dist) / config.mouseRepelRadius;
          const angle = Math.atan2(dy, dx);
          this.x += Math.cos(angle) * force * 5 * config.forceMultiplier * speedFactor;
          this.y += Math.sin(angle) * force * 5 * config.forceMultiplier * speedFactor;
        }
      }
      
      if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
        this.reset();
      }
    }
    
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = activeConfigName !== 'minimalist' ? 8 : 0;
      ctx.shadowColor = this.color;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }
  
  function initParticles() {
    particles = [];
    for (let i = 0; i < config.count; i++) {
      particles.push(new Particle());
    }
  }
  
  function animate() {
    ctx.clearRect(0, 0, width, height);
    
    ctx.lineWidth = 0.8;
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
      
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < config.connectionDist) {
          const alpha = (config.connectionDist - dist) / config.connectionDist * config.lineOpacity;
          ctx.strokeStyle = `rgba(${activeConfigName === 'disruptor' ? '255,26,140' : (activeConfigName === 'visionary' ? '6,182,212' : (document.documentElement.classList.contains('dark') ? '255,255,255' : '15,23,42'))}, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    
    requestAnimationFrame(animate);
  }
  
  function transitionTextElement(el, newText) {
    el.style.opacity = 0;
    setTimeout(() => {
      el.innerHTML = newText;
      el.style.opacity = 1;
    }, 250);
  }
  
  function transitionText(id, newText) {
    const el = document.getElementById(id);
    if (el) transitionTextElement(el, newText);
  }
  
  function setArchetype(name) {
    const hero = document.getElementById('hero');
    if (!hero) return;
    
    hero.classList.remove('archetype-disruptor', 'archetype-minimalist', 'archetype-visionary');
    hero.classList.add(`archetype-${name}`);
    
    document.querySelectorAll('.archetype-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.getElementById(`archetype-${name}-btn`);
    if (activeBtn) activeBtn.classList.add('active');
    
    const content = archetypesData[name];
    if (content) {
      const lines = hero.querySelectorAll('.hero-headline .hero-line');
      if (lines.length >= 3) {
        transitionTextElement(lines[0], content.line1);
        transitionTextElement(lines[1], content.line2);
        transitionTextElement(lines[2], content.line3);
      }
      
      const badgeText = document.getElementById('hero-badge-text');
      if (badgeText) transitionTextElement(badgeText, content.badge);
      
      const subCopy = hero.querySelector('.hero-sub');
      if (subCopy) {
        subCopy.style.opacity = 0;
        setTimeout(() => {
          subCopy.innerHTML = content.desc + `<span class="block mt-1.5 text-xs sm:text-sm font-medium text-brand-magenta dark:text-brand-pink">Based in Perungalathur, Chennai. <span id="hero-typing" class="inline-block min-w-[6ch]"></span></span>`;
          subCopy.style.opacity = 1;
        }, 250);
      }
      
      // Desktop Card stats
      transitionText('card-stat-1', content.stat1);
      transitionText('card-stat-growth', content.stat1Growth);
      transitionText('card-stat-desc', content.stat1Desc);
      transitionText('card-stat-2', content.stat2);
      transitionText('card-stat-3', content.stat3);
      
      // Mobile stats
      transitionText('mob-stat-1', content.mobStat1);
      transitionText('mob-stat-2', content.mobStat2);
      transitionText('mob-stat-3', content.mobStat3);
      transitionText('mob-stat-4', content.mobStat4);
    }
    
    // Update canvas active configurations
    activeConfigName = name;
    config = canvasConfigs[name];
    initParticles();
  }
  
  // Resize handler
  window.addEventListener('resize', () => {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
    initParticles();
  }, { passive: true });
  
  // Mouse track
  const heroSection = document.getElementById('hero');
  if (heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    }, { passive: true });
    
    heroSection.addEventListener('mouseleave', () => {
      mouse.active = false;
    }, { passive: true });
  }
  
  // Controller button clicks
  const disruptorBtn = document.getElementById('archetype-disruptor-btn');
  const minimalistBtn = document.getElementById('archetype-minimalist-btn');
  const visionaryBtn = document.getElementById('archetype-visionary-btn');
  const energySlider = document.getElementById('particle-energy');
  const energyValText = document.getElementById('energy-val');
  
  if (disruptorBtn) disruptorBtn.addEventListener('click', () => setArchetype('disruptor'));
  if (minimalistBtn) minimalistBtn.addEventListener('click', () => setArchetype('minimalist'));
  if (visionaryBtn) visionaryBtn.addEventListener('click', () => setArchetype('visionary'));
  
  if (energySlider && energyValText) {
    energySlider.addEventListener('input', (e) => {
      energyLevel = parseInt(e.target.value, 10);
      const labels = ['Calm', 'Medium', 'Hyper-Growth'];
      energyValText.textContent = labels[energyLevel - 1];
    }, { passive: true });
  }
  
  // Card 3D tilt
  const tiltCard = document.getElementById('interactive-brand-card');
  if (tiltCard) {
    tiltCard.addEventListener('mousemove', (e) => {
      const rect = tiltCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cardWidth = rect.width;
      const cardHeight = rect.height;
      
      const rotateX = ((y / cardHeight) - 0.5) * -24;
      const rotateY = ((x / cardWidth) - 0.5) * 24;
      
      tiltCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    }, { passive: true });
    
    tiltCard.addEventListener('mouseleave', () => {
      tiltCard.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    }, { passive: true });
    
    // Cycle archetype on click
    tiltCard.addEventListener('click', () => {
      const order = ['disruptor', 'minimalist', 'visionary'];
      const nextIndex = (order.indexOf(activeConfigName) + 1) % order.length;
      setArchetype(order[nextIndex]);
    });
  }
  
  // Set default archetype class on load
  const hero = document.getElementById('hero');
  if (hero) {
    hero.classList.add('archetype-disruptor');
  }
  
  initParticles();
  animate();
})();
