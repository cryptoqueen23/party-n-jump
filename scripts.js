// Sticky header
const header = document.querySelector('.site-header');

window.addEventListener('scroll', () => {
  if (!header) return;
  header.classList.toggle('scrolled', window.scrollY > 40);
});

// Mobile menu
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', open);
    document.body.classList.toggle('menu-open', open);
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    });
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      nav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
      menuToggle.focus();
    }
  });
}

// FAQ Accordion
document.querySelectorAll('.faq-item button').forEach(button => {

  button.addEventListener('click', () => {

    const item = button.closest('.faq-item');
    const open = item.classList.toggle('open');

    button.setAttribute('aria-expanded', open);

    const symbol = button.querySelector('span:last-child');

    if (symbol) {
      symbol.textContent = open ? '−' : '+';
    }

  });

});

// Scroll reveal animation
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(entries => {

  entries.forEach(entry => {

    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }

  });

}, {
  threshold: 0.15
});

revealElements.forEach(el => revealObserver.observe(el));

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {

  anchor.addEventListener('click', e => {

    const target = document.querySelector(anchor.getAttribute('href'));

    if (!target) return;

    e.preventDefault();

    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

  });

});

// Hero video fallback
const heroVideo = document.querySelector('.hero-video');

if (heroVideo) {

  heroVideo.play().catch(() => {
    console.log('Autoplay prevented by browser.');
  });

}

// Optional parallax effect
window.addEventListener('scroll', () => {

  if (!heroVideo) return;

  heroVideo.style.transform =
    `translateY(${window.scrollY * 0.12}px) scale(1.05)`;

});
