const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', (event) => {
    if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  },
  { threshold: 0.15 }
);

sections.forEach((section) => observer.observe(section));

const sectionLinks = document.querySelectorAll('.nav-links a[href^="#"]');
const sectionById = new Map(
  [...sectionLinks]
    .map((link) => link.getAttribute('href'))
    .filter(Boolean)
    .map((href) => [href.slice(1), document.getElementById(href.slice(1))])
);

const setActiveLink = () => {
  const offset = 140;
  let activeId = '';
  sectionById.forEach((section, id) => {
    if (section && section.offsetTop - offset <= window.scrollY) {
      activeId = id;
    }
  });

  sectionLinks.forEach((link) => {
    const targetId = link.getAttribute('href')?.slice(1);
    link.classList.toggle('active', targetId === activeId);
  });
};

setActiveLink();
window.addEventListener('scroll', setActiveLink, { passive: true });
