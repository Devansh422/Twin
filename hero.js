(function(){
  const sections = {
    'numbers-section': `
      <div class="num-card">
        <div class="counter-wrapper">
            <span class="count" data-target="30">0</span>
            <span class="suffix">+</span>
        </div>
        <h3>Global & Domestic Clients</h3>
        <p class="details">Long-term partnerships built on quality, consistency, and timely delivery.</p>
      </div>
      <div class="num-card">
        <div class="counter-wrapper">
            <span class="count" data-target="25">0</span>
            <span class="suffix">+</span>
        </div>
        <h3>Years of Experience</h3>
        <p class="details">Deep industry knowledge refined through years of hands-on production excellence.</p>
      </div>
      <div class="num-card">
        <div class="counter-wrapper">
            <span class="count" data-target="1">0</span>
            <span class="suffix">M+</span>
        </div>
        <h3>Units Annually</h3>
        <p class="details">High-capacity manufacturing designed to meet growing market demands.</p>
      </div>
    `,

    'work-section': `
      <h2>Our Brands</h2>
      <h1 class="animate-text">Engineering Excellence Through Trusted Brands</h1>
      <p class="details">Twin Tech India Pvt. Ltd. drive excellence through three specialized brands delivering performance, precision, and reliability across industrial, automotive, and adhesive solutions.</p>
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
      <h1 class="animate-text">Partners in Progress</h1>
      <p class="details">Trusted partners in progress, working together to drive innovation, quality, and long-term manufacturing excellence.</p>
      <div class="slider-container">
        <div class="slider-track" id="track-1"></div>
      </div>
      <div class="slider-container">
        <div class="slider-track" id="track-2"></div>
      </div>
      <div class="slider-container">
        <div class="slider-track" id="track-3"></div>
      </div>
    `
  };

  function setupBrandSlider() {
    const tracks = ["track-1", "track-2", "track-3"];
    const imageFolder = "assets/Logos/";
    // All logo images: Asset 335.png to Asset 430.png (96 total)
    const allImages = [];
    for (let i = 335; i <= 430; i++) {
      allImages.push(`Asset ${i}.png`);
    }

    // Split images across 3 tracks (32 each)
    const perTrack = Math.ceil(allImages.length / 3);
    const trackImages = [
      allImages.slice(0, perTrack),
      allImages.slice(perTrack, perTrack * 2),
      allImages.slice(perTrack * 2)
    ];

    tracks.forEach((trackId, idx) => {
      const track = document.getElementById(trackId);
      if (!track) return;

      const images = trackImages[idx];

      function createImage(filename) {
        const img = document.createElement("img");
        // Filenames contain spaces; encode to a safe URL.
        img.src = encodeURI(`${imageFolder}${filename}`);
        img.alt = `Client Logo`;
        img.classList.add("brand-logo");
        return img;
      }

      // Duplicate enough times to ensure seamless infinite scroll
      // Keep this an even number so the -50% loop boundary stays seamless.
      const duplicates = 4;
      for (let k = 0; k < duplicates; k++) {
        images.forEach(file => track.appendChild(createImage(file)));
      }

      if (window.gsap) {
        // Wait for images to load to get correct widths if needed, 
        // though % based works, we use a small timeout to let the browser settle
        setTimeout(() => {
          // Much slower durations for easier reading of logos
          const speed = 90 + (idx * 15);
          const direction = (idx % 2 === 0) ? -1 : 1;

          if (direction === 1) {
            // Move Right
            gsap.set(track, { xPercent: -50 });
            gsap.to(track, {
              xPercent: 0,
              duration: speed,
              ease: "none",
              repeat: -1
            });
          } else {
            // Move Left
            gsap.to(track, {
              xPercent: -50,
              duration: speed,
              ease: "none",
              repeat: -1
            });
          }
        }, 100);

        const container = track.closest(".slider-container");
        if (container) {
          container.addEventListener("mouseenter", () => {
             const activeTweens = gsap.getTweensOf(track);
             activeTweens.forEach(t => t.pause());
          });
          container.addEventListener("mouseleave", () => {
             const activeTweens = gsap.getTweensOf(track);
             activeTweens.forEach(t => t.play());
          });
        }
      }
    });
  }

  function setupCounters() {
    if (!window.gsap || !window.ScrollTrigger) return;
    
    // Select all counters
    const counters = document.querySelectorAll('.num-card .count');
    
    counters.forEach(counter => {
      const targetValue = parseFloat(counter.getAttribute('data-target'));
      // Create a proxy object to animate
      let proxy = { val: 0 };
      
      gsap.to(proxy, {
        val: targetValue,
        duration: 2, 
        ease: "power2.out",
        scrollTrigger: {
          trigger: counter,
          start: "top 85%", // Start when top of number hits 85% of viewport height
          toggleActions: "play none none reverse" 
        },
        onUpdate: function() {
          // Update the element's text with the rounded value
          counter.textContent = Math.floor(proxy.val); 
          // If the target is decimal (like 1.5), you might want to use toFixed
          if (targetValue % 1 !== 0) {
             counter.textContent = proxy.val.toFixed(1);
          }
        }
      });
    });
  }

  function injectAll() {
    Object.keys(sections).forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      if (el.dataset.injected === '1' || el.dataset.heroInjected === '1') return;
      el.innerHTML = sections[id];
      el.dataset.injected = '1';
    });
    setupBrandSlider();
    setupCounters();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectAll);
  } else {
    injectAll();
  }
})();
