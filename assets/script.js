// ═══════════════════════════════════════════════
// DOVA — Legal Pages Interactivity
// ═══════════════════════════════════════════════

(function () {
  'use strict';

  // ─── Theme Toggle ───
  const themeToggle = document.getElementById('themeToggle');
  const rootEl = document.documentElement;

  function initTheme() {
    const saved = localStorage.getItem('dova-theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = saved || (systemDark ? 'dark' : 'light');
    rootEl.setAttribute('data-theme', theme);
    updateThemeIcon(theme);
  }

  function updateThemeIcon(theme) {
    if (themeToggle) {
      themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
      themeToggle.setAttribute(
        'aria-label',
        theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
      );
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = rootEl.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      rootEl.setAttribute('data-theme', next);
      localStorage.setItem('dova-theme', next);
      updateThemeIcon(next);
    });
  }

  // ─── Back to Top ───
  const backToTop = document.getElementById('backToTop');

  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ─── Init ───
  initTheme();

  // Listen to system theme changes
  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (e) => {
      if (!localStorage.getItem('dova-theme')) {
        const theme = e.matches ? 'dark' : 'light';
        rootEl.setAttribute('data-theme', theme);
        updateThemeIcon(theme);
      }
    });
})();