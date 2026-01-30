(function(){
  const content = `
      <div class="about-container">
        <div style="width: 50%"><img src="assets/director.png" style="width:400px; height:auto;" class="about-image" alt="About Us" /></div>
        <div class="about-details"><h1 style-="line-height : 1; padding-top: 0;">About Us</h1><br> Twin Tech India Pvt. Ltd is a premier manufacturer and supplier of aerosols, sprays, and specialty machines for various industries. Our flagship brand, SPRAYZET, offers custom-designed, biodegradable aerosols for applications in agriculture, engineering, textiles, food manufacturing, and more. We also provide contract aerosol packaging with private label capabilities, ensuring quality and efficiency.<br><br>Our diverse product line includes industrial maintenance aerosols, self-adhesive tapes, home care products under "Hacker," air deodorizers under "Twinzy," and car care solutions under "Evershine." We are committed to high standards, innovation, and timely delivery.</div>
      </div>
  `;

  function injectAbout() {
    const el = document.getElementById('about-section');
    if (!el) return;
    // Prevent double injection
    if (el.dataset.injected === '1') return; 
    
    el.innerHTML = content;
    el.dataset.injected = '1';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectAbout);
  } else {
    injectAbout();
  }
})();
