// ===== HEADER SCROLL =====
const header = document.getElementById('header');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  header.classList.toggle('scrolled', scrollY > 40);
  backToTop.classList.toggle('visible', scrollY > 400);
});

// ===== MOBILE NAV =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
  // Animate hamburger
  const spans = navToggle.querySelectorAll('span');
  if (open) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

// Close nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.querySelectorAll('span').forEach(s => {
      s.style.transform = '';
      s.style.opacity = '';
    });
  });
});

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger siblings
      const siblings = entry.target.closest('.teams-grid, .news-grid, .staff-grid, .recruit-grid, .about-grid');
      if (siblings) {
        const all = [...siblings.querySelectorAll('[data-reveal]')];
        const idx = all.indexOf(entry.target);
        entry.target.style.transitionDelay = `${idx * 0.1}s`;
      }
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));

// ===== SMOOTH SCROLL for anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link:not(.nav-cta)');

const activateNav = () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navItems.forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('href') === `#${current}`) item.classList.add('active');
  });
};

window.addEventListener('scroll', activateNav, { passive: true });

// ===== CONTACT FORM (prevent default & show feedback) =====
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = '送信中...';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = '送信完了 ✓';
      btn.style.background = '#00a651';
      form.reset();
      setTimeout(() => {
        btn.textContent = '送信する';
        btn.disabled = false;
        btn.style.background = '';
      }, 3000);
    }, 1200);
  });
}

// ===== TICKER PAUSE ON HOVER =====
const ticker = document.querySelector('.ticker-content');
if (ticker) {
  ticker.addEventListener('mouseenter', () => ticker.style.animationPlayState = 'paused');
  ticker.addEventListener('mouseleave', () => ticker.style.animationPlayState = 'running');
}

// ===== HERO PARALLAX (subtle) =====
const heroField = document.querySelector('.hero-field');
if (heroField) {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY < window.innerHeight) {
      heroField.style.transform = `translateY(${scrollY * 0.3}px)`;
    }
  }, { passive: true });
}
