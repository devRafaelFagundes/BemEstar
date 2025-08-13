document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('siteHeader');
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const current = window.scrollY || document.documentElement.scrollTop;
    if (current > lastScroll && current > 50) {
      header.classList.add('hide');
    } else {
      header.classList.remove('hide');
    }
    lastScroll = current <= 0 ? 0 : current;
  });

  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('siteNav');

  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
  });

  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      if (nav.classList.contains('open')) {
        nav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  const yearNode = document.getElementById('year');
  if (yearNode) yearNode.textContent = new Date().getFullYear();
});
