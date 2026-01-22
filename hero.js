(function(){
  const sections = {
    'hero-section': `
      <video id="heroVideo" autoplay muted loop playsinline style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; z-index: -1;">
        <source src="${(window.ASSETS && window.ASSETS.heroVideo) || './assets/hero-video.mp4'}" type="video/mp4">
        Your browser does not support the video tag.
      </video>
      <div class="hero-content">
        <h1 class="animate-text">Manufacturing at Scale.<br>Quality Without Compromise</h1>
        <span class="sub-text">From precison-driven production to global supply, we maufacture products brand trust efficiently, reliably, responsibly</span>
        <div class="cta-button">
          <button>Enquire Now</button>
        </div>
      </div>
    `,

    'about-section': `
      <h2>About Us</h2>
      <div class="about-container">
        <div class="about-text animate-text">The manufacturing expertise your brand deserves</div>
        <div class="about-details">Twin Tech India Pvt. Ltd is a premier manufacturer and supplier of aerosols, sprays, and specialty machines for various industries. Our flagship brand, SPRAYZET, offers custom-designed, biodegradable aerosols for applications in agriculture, engineering, textiles, food manufacturing, and more. We also provide contract aerosol packaging with private label capabilities, ensuring quality and efficiency.<br><br>Our diverse product line includes industrial maintenance aerosols, self-adhesive tapes, home care products under "Hacker," air deodorizers under "Twinzy," and car care solutions under "Evershine." We are committed to high standards, innovation, and timely delivery.</div>
      </div>
    `,

    'numbers-section': `
      <div class="num-1">
        <div class="counter-item">30+</div>
        <h2 class="animate-text">Global & Domestic Clients</h2>
        <span class="details">Long-term partnerships built on quality, consistency, and timely delivery.</span>
      </div>
      <div class="num-1">
        <div class="counter-item">15+</div>
        <h2 class="animate-text">Years of Manufacturing Experience</h2>
        <span class="details">Deep industry knowledge refined through years of hands-on production excellence.</span>
      </div>
      <div class="num-1">
        <div class="counter-item">1M+</div>
        <h2 class="animate-text">Units Manufactured Annually</h2>
        <span class="details">High-capacity manufacturing designed to meet growing market demands.</span>
      </div>
    `,

    'work-section': `
      <h2>How We Work</h2>
      <h1 class="animate-text">Built on Process. Driven by Precision.</h1>
      <p class="details">We follow a collaborative, step-by-step approach understanding requirements, aligning teams, ensuring precision manufacturing, and delivering consistent quality. Every stage is designed to optimize efficiency, maintain standards, and create solutions that support long-term growth and operational excellence.</p>
    `,

    'products-section': `
      <h2>Our Products</h2>
      <div class="products-wrapper">
        <div class="products-container">
          <div class="products-heading animate-text">Products That Power Your Brand</div>
          <div class="products-details">At Twin Tech India Pvt. Ltd., we deliver high-quality products tailored to meet diverse industrial needs, including aerosols, tapes, and household items. At Twin Tech India Pvt. Ltd., we are committed to delivering the highest quality products to our clients. Our range of industrial maintenance aerosols, auto care products, adhesive tapes, and household items are designed to meet the diverse needs of various industries.</div>
        </div>
        <div class="product-list">
          <div class="product">
            <div class="s-no">01</div>
            <div class="content">
              <div class="content-heading">Industrial Maintenance</div>
              <div class="content-detail">Our aerosol range ensures high-quality cleaning, dust removal, and flaw detection, adhering to international standards for optimal performance in industrial maintenance applications.</div>
            </div>
          </div>
          <div class="product">
            <div class="s-no">02</div>
            <div class="content">
              <div class="content-heading">Self Adhesive Tapes</div>
              <div class="content-detail">We manufacture superior-quality self-adhesive tapes like Polyester, Foam, and Masking Tapes, rigorously tested to meet diverse industrial needs, offering strength, reliability, and precision</div>
            </div>
          </div>
          <div class="product">
            <div class="s-no">03</div>
            <div class="content">
              <div class="content-heading">Car Care Products</div>
              <div class="content-detail">Our high-quality car care products are designed to help maintain a vehicle's shine and protect its body, keeping it looking brand new while extending its life with regular, consistent application.</div>
            </div>
          </div>
        </div>
      </div>
    `
    ,
    'work-bottom': `
      <h2>Our clients</h2>
      <h1 class="animate-text">Partners in Progress, Driving Innovation Together.</h1>
      <p class="details">Trusted partners in progress, working together to drive innovation, quality, and long-term manufacturing excellence.</p>
      <div class="slider-container">
        <div class="slider-track" id="track"></div>
      </div>
    `
  };

  function injectAll() {
    Object.keys(sections).forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      if (el.dataset.injected === '1' || el.dataset.heroInjected === '1') return;
      el.innerHTML = sections[id];
      el.dataset.injected = '1';
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectAll);
  } else {
    injectAll();
  }
})();
