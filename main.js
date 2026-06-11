/* ============================================================
   ELLIE DALSEG — Portfolio JS
   Handles: custom cursor, scroll reveals, typewriter,
            floating sparkles, card tilt
   ============================================================ */

// ── Wait for DOM ──────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {

  // ── Custom Cursor ────────────────────────────────────────
  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');

  if (dot && ring) {
    let mouseX = 0, mouseY = 0;
    let ringX  = 0, ringY  = 0;

    document.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top  = mouseY + 'px';
    });

    // ring lags behind dot for fluid feel
    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.left = ringX + 'px';
      ring.style.top  = ringY + 'px';
      requestAnimationFrame(animateRing);
    };
    animateRing();

    // hover state — grow ring on interactive elements
    document.querySelectorAll('a, button, .hero-tag, .int-chip, .project-card').forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  // ── Typewriter effect on hero subtitle ─────────────────
  const subtitle = document.getElementById('hero-subtitle');
  if (subtitle) {
    const text = subtitle.dataset.text || '';
    subtitle.textContent = '';
    let i = 0;
    const type = () => {
      if (i < text.length) {
        subtitle.textContent += text[i++];
        setTimeout(type, 38 + Math.random() * 25);
      } else {
        subtitle.classList.add('done');
      }
    };
    setTimeout(type, 1400); // delay after page load
  }

  // ── Scroll Reveal (IntersectionObserver) ────────────────
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // stagger delay based on index among siblings
        const siblings = [...entry.target.parentElement.children];
        const idx = siblings.indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, idx * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => observer.observe(el));

  // ── Floating Sparkles ────────────────────────────────────
  const sparkleChars = ['✦', '✧', '◦', '·', '✶', '✸'];
  const numSparkles = 18;

  for (let i = 0; i < numSparkles; i++) {
    const el = document.createElement('span');
    el.classList.add('sparkle');
    el.textContent = sparkleChars[Math.floor(Math.random() * sparkleChars.length)];

    // random position
    el.style.left = Math.random() * 100 + 'vw';
    el.style.top  = Math.random() * 100 + 'vh';
    el.style.fontSize = (0.4 + Math.random() * 0.8) + 'rem';

    // random drift direction
    const angle = Math.random() * Math.PI * 2;
    const dist  = 40 + Math.random() * 80;
    el.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
    el.style.setProperty('--dy', (Math.sin(angle) * dist - 80) + 'px');

    // random timing
    el.style.animationDuration  = (8 + Math.random() * 12) + 's';
    el.style.animationDelay     = (Math.random() * 10) + 's';
    el.style.animationIterationCount = 'infinite';

    document.body.appendChild(el);
  }

  // ── 3D Card Tilt on mousemove ───────────────────────────
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotX = ((y - cy) / cy) * -5;
      const rotY = ((x - cx) / cx) * 6;
      card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ── Subtle parallax on hero ─────────────────────────────
  const heroBg    = document.querySelector('.hero-bg');
  const heroName  = document.querySelector('.hero-name');
  const heroStar  = document.querySelector('.hero-star-wrap');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (heroBg)   heroBg.style.transform   = `translateY(${scrollY * 0.15}px)`;
    if (heroName) heroName.style.transform = `translateY(${scrollY * 0.08}px)`;
    if (heroStar) heroStar.style.transform = `translateY(calc(-50% + ${scrollY * 0.04}px))`;
  }, { passive: true });

  // ── Nav: highlight active section ──────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.style.color = 'var(--accent)';
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => navObserver.observe(s));

});
