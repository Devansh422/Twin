(function () {
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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyAssets);
  } else {
    applyAssets();
  }
})();
