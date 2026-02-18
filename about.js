(function () {
    const content = `
      <div class="about-wrapper">
        <div class="about-image-col">
            <div class="image-frame" style="height:500px">
                <img src="assets/director.webp" alt="Twin Tech Director" loading="lazy" />
                <div class="exp-badge">
                    <span class="years">25+</span>
                    <span class="text">Years Experience</span>
                </div>
            </div>
        </div>
        <div class="about-content-col">
            <span class="eyebrow">Who We Are</span>
            <h2>Innovating Industrial & consumer Solutions</h2>
            <p class="lead">Twin Tech India Pvt. Ltd is a premier manufacturer and supplier of aerosols, sprays, and specialty machines.</p>
            <p>Our flagship brand, <strong>SPRAYZET</strong>, leads with custom-designed, biodegradable aerosols for agriculture, engineering, and food industries. From "Evershine" car care to "Twinzy" air deodorizers, we deliver private label excellence built on quality and efficiency.</p>
            
            <ul class="highlights">
                <li>
                    <span class="check-icon">✓</span>
                    <div>
                        <strong>Custom Manufacturing</strong>
                        <span>Tailored aerosol and chemical solutions.</span>
                    </div>
                </li>
                <li>
                    <span class="check-icon">✓</span>
                    <div>
                        <strong>Eco-Friendly</strong>
                        <span>Biodegradable products meeting global standards.</span>
                    </div>
                </li>
            </ul>

            <a href="about-us/" class="cta-button" style="width: fit-content">
                Discover More
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
        </div>
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
