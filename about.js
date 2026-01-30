(function(){
  const content = `
      <h2>About Us</h2>
      <div class="about-container">
        <div class="about-text animate-text">The manufacturing expertise your brand deserves</div>
        <div class="about-details">Twin Tech India Pvt. Ltd is a premier manufacturer and supplier of aerosols, sprays, and specialty machines for various industries. Our flagship brand, SPRAYZET, offers custom-designed, biodegradable aerosols for applications in agriculture, engineering, textiles, food manufacturing, and more. We also provide contract aerosol packaging with private label capabilities, ensuring quality and efficiency.<br><br>Our diverse product line includes industrial maintenance aerosols, self-adhesive tapes, home care products under "Hacker," air deodorizers under "Twinzy," and car care solutions under "Evershine." We are committed to high standards, innovation, and timely delivery.</div>
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
