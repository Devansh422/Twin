(function () {
    const content = `
      <div class="about-wrapper">
        <div class="about-image-col">
            <div class="image-frame" style="height:500px">
                <img src="assets/director.webp" alt="Twin Tech Director" loading="lazy" />
                <div class="exp-badge">
                    <span class="years">Mr. P.K Sharma</span>
                    <span class="text">(Managing Director)</span>
                </div>
            </div>
        </div>
        <div class="about-content-col">
            <span class="eyebrow">Who We Are</span>
            <h2>Innovating Industrial & Consumer Solutions Since 2000</h2>
            <p class="lead"><b>Twin Tech India Pvt. Ltd.</b> is a leading manufacturer of industrial maintenance aerosols, car care products, self-adhesive tapes, and home care solutions.</p>
            <p>With over <strong>25 years of industry experience</strong>, we specialize in delivering high-performance products designed for durability, efficiency, and reliability across industrial and consumer applications.
From precision-engineered maintenance sprays to premium automotive care and strong adhesive solutions, our products are manufactured under strict quality standards to ensure consistent performance.
<br><strong>We also provide contract aerosol packaging with private label capabilities, ensuring quality and efficiency.</strong> 
</p>

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
