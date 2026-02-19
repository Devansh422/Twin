(function () {
  var WHATSAPP_URL = 'https://api.whatsapp.com/send/?phone=9310052702&text&type=phone_number&app_absent=0';

  function applyAssets() {
    if (!window.ASSETS) return;
    var logoSrc = window.ASSETS.logo || '';

    var logo = document.getElementById('site-logo');
    // For index.html, src is empty -> set it. For sub-pages, src is set -> leave it.
    if (logo && (!logo.getAttribute('src') || logo.getAttribute('src') === '')) {
      logo.src = logoSrc;
    }

    var logoFooter = document.getElementById('site-logo-footer');
    // Footer logos are usually empty -> set them
    if (logoFooter && (!logoFooter.getAttribute('src') || logoFooter.getAttribute('src') === '')) {
      logoFooter.src = logoSrc;
    }
  }

  function setupWhatsAppButtons() {
    var nodes = document.querySelectorAll('.whatsapp');
    if (!nodes || !nodes.length) return;

    nodes.forEach(function (el) {
      try {
        el.setAttribute('aria-label', 'Chat on WhatsApp');
      } catch (e) { }

      var tag = (el.tagName || '').toUpperCase();
      if (tag === 'A') {
        if (!el.getAttribute('href')) el.setAttribute('href', WHATSAPP_URL);
        el.setAttribute('target', '_blank');
        el.setAttribute('rel', 'noopener');
        return;
      }

      if (tag === 'BUTTON' && !el.getAttribute('type')) el.setAttribute('type', 'button');

      if (el.dataset && el.dataset.waBound === 'true') return;
      el.addEventListener('click', function () {
        window.open(WHATSAPP_URL, '_blank', 'noopener');
      });
      if (el.dataset) el.dataset.waBound = 'true';
    });
  }

  function setupResponsiveNav() {
    var nav = document.querySelector('nav');
    if (!nav) return;
    var navList = nav.querySelector('ul.navigation');
    if (!navList) return;

    if (!nav.querySelector('.nav-toggle')) {
      var toggle = document.createElement('button');
      toggle.type = 'button';
      toggle.className = 'nav-toggle';
      toggle.setAttribute('aria-label', 'Toggle navigation');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';

      var actionButtons = nav.querySelector('.action_buttons');
      if (actionButtons) actionButtons.insertBefore(toggle, actionButtons.firstChild);
      else nav.appendChild(toggle);

      function closeNav() {
        nav.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
        nav.querySelectorAll('li.open').forEach(function (li) { li.classList.remove('open'); });
      }

      function toggleNav() {
        var isOpen = nav.classList.toggle('nav-open');
        toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        if (!isOpen) {
          nav.querySelectorAll('li.open').forEach(function (li) { li.classList.remove('open'); });
        }
      }

      toggle.addEventListener('click', function (e) {
        e.stopPropagation();
        toggleNav();
      });

      document.addEventListener('click', function (e) {
        if (!nav.classList.contains('nav-open')) return;
        if (nav.contains(e.target)) return;
        closeNav();
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeNav();
      });

      navList.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          if (!window.matchMedia('(max-width: 1023px)').matches) return;
          // Don't close when tapping dropdown toggles
          if (a.classList && a.classList.contains('dropdown')) return;
          if (a.closest && a.closest('li.has-subdropdown') && a.parentElement && a.parentElement.classList && a.parentElement.classList.contains('has-subdropdown')) return;
          closeNav();
        });
      });

      // Tap-to-toggle dropdowns on mobile/touch screens
      nav.querySelectorAll('li.has-dropdown > a.dropdown').forEach(function (a) {
        a.addEventListener('click', function (e) {
          var isMobile = window.matchMedia('(max-width: 1023px)').matches || window.matchMedia('(hover: none)').matches || window.matchMedia('(pointer: coarse)').matches;
          if (!isMobile) return;
          e.preventDefault();
          e.stopPropagation();
          var li = a.closest('li.has-dropdown');
          if (!li) return;
          var willOpen = !li.classList.contains('open');
          nav.querySelectorAll('li.has-dropdown.open').forEach(function (other) { other.classList.remove('open'); });
          // also close any open subdropdowns inside
          nav.querySelectorAll('li.has-subdropdown.open').forEach(function (other) { other.classList.remove('open'); });
          if (willOpen) li.classList.add('open');
        });
      });

      // Tap-to-toggle subdropdowns (if present) on mobile/touch screens
      nav.querySelectorAll('li.has-subdropdown > a').forEach(function (a) {
        a.addEventListener('click', function (e) {
          var isMobile = window.matchMedia('(max-width: 1023px)').matches || window.matchMedia('(hover: none)').matches || window.matchMedia('(pointer: coarse)').matches;
          if (!isMobile) return;
          e.preventDefault();
          e.stopPropagation();
          var li = a.closest('li.has-subdropdown');
          if (!li) return;
          var willOpen = !li.classList.contains('open');
          // close sibling subdropdowns
          var parent = li.parentElement;
          if (parent) {
            parent.querySelectorAll('li.has-subdropdown.open').forEach(function (other) { other.classList.remove('open'); });
          }
          if (willOpen) li.classList.add('open');
        });
      });
    }
  }

  function runAll() {
    applyAssets();
    setupWhatsAppButtons();
    setupResponsiveNav();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runAll);
  } else {
    runAll();
  }
})();
