(function(){
  function applyAssets(){
    if (!window.ASSETS) return;
    const logo = document.getElementById('site-logo');
    if (logo) logo.src = window.ASSETS.logo || logo.src;
    const logoFooter = document.getElementById('site-logo-footer');
    if (logoFooter) logoFooter.src = window.ASSETS.logo || logoFooter.src;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyAssets);
  } else {
    applyAssets();
  }
})();
