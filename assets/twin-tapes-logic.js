
const productsData = {
    "Twin Tapes": [
        { "name": "DS POLYESTER TAPE", "imagePath": "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/3. TWIN TAPE/1. DS POLYESTER TAPE.jpg", "category": "Twin Tapes" },
        { "name": "Red-Polyester-Tape FILMIC LINER", "imagePath": "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/3. TWIN TAPE/10.Red-Polyester-Tape FILMIC LINER.jpg", "category": "Twin Tapes" },
        { "name": "MASKING TAPE", "imagePath": "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/3. TWIN TAPE/11. MASKING TAPE.jpg", "category": "Twin Tapes" },
        { "name": "SURFACE-PROTECTION-TAPE", "imagePath": "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/3. TWIN TAPE/12. SURFACE-PROTECTION-TAPE.jpg", "category": "Twin Tapes" },
        { "name": "SS FOAM TAPE", "imagePath": "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/3. TWIN TAPE/13. SS FOAM TAPE.jpg", "category": "Twin Tapes" },
        { "name": "Acrylic-Foam-Tape (VHB TAPE)", "imagePath": "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/3. TWIN TAPE/14. Acrylic-Foam-Tape (VHB TAPE).jpg", "category": "Twin Tapes" },
        { "name": "Kraft-Paper-Tape", "imagePath": "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/3. TWIN TAPE/15. Kraft-Paper-Tape.jpg", "category": "Twin Tapes" },
        { "name": "BOPP TAPE", "imagePath": "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/3. TWIN TAPE/16. BOPP TAPE.jpg", "category": "Twin Tapes" },
        { "name": "PVC-Insulation-Tape", "imagePath": "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/3. TWIN TAPE/17. PVC-Insulation-Tape.jpg", "category": "Twin Tapes" },
        { "name": "ADVERTISEMENT & BOPP PRINTED TAPE", "imagePath": "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/3. TWIN TAPE/18. ADVERTISEMENT & BOPP PRINTED TAPE.jpg", "category": "Twin Tapes" },
        { "name": "Silicon-Self-Fusing-Hit-Tape (SF-555)", "imagePath": "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/3. TWIN TAPE/19. Silicon-Self-Fusing-Hit-Tape (SF-555).jpg", "category": "Twin Tapes" },
        { "name": "Tissue-Tape", "imagePath": "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/3. TWIN TAPE/2.Tissue-Tape.jpg", "category": "Twin Tapes" },
        { "name": "Self Amalgamating Tape (SF-556)", "imagePath": "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/3. TWIN TAPE/20. Self Amalgamating Tape (SF-556).jpg", "category": "Twin Tapes" },
        { "name": "Pink-Rayon-Tape", "imagePath": "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/3. TWIN TAPE/21. Pink-Rayon-Tape.jpg", "category": "Twin Tapes" },
        { "name": "Kapton-Tape", "imagePath": "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/3. TWIN TAPE/22. Kapton-Tape.jpg", "category": "Twin Tapes" },
        { "name": "Cotton-Cloth-Tape", "imagePath": "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/3. TWIN TAPE/23. Cotton-Cloth-Tape.jpg", "category": "Twin Tapes" },
        { "name": "HDPE-Tape", "imagePath": "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/3. TWIN TAPE/24 HDPE-Tape.jpg", "category": "Twin Tapes" },
        { "name": "SINGLE SIDE POLYESTER TAPE", "imagePath": "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/3. TWIN TAPE/25 SINGLE SIDE POLYESTER TAPE.jpeg", "category": "Twin Tapes" },
        { "name": "Cloth-Tape", "imagePath": "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/3. TWIN TAPE/3.Cloth-Tape.jpg", "category": "Twin Tapes" },
        { "name": "DS FOAM TAPE", "imagePath": "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/3. TWIN TAPE/4. DS FOAM TAPE.jpg", "category": "Twin Tapes" },
        { "name": "Floor-Marking-Tape", "imagePath": "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/3. TWIN TAPE/5. Floor-Marking-Tape.jpg", "category": "Twin Tapes" },
        { "name": "ALUMINIUM FOIL TAPE", "imagePath": "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/3. TWIN TAPE/6. ALUMINIUM FOIL TAPE.jpg", "category": "Twin Tapes" },
        { "name": "Duct-Tape", "imagePath": "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/3. TWIN TAPE/7.Duct-Tape.jpg", "category": "Twin Tapes" },
        { "name": "Filament-Tape", "imagePath": "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/3. TWIN TAPE/8.Filament-Tape.jpg", "category": "Twin Tapes" },
        { "name": "Blue-Door-Holding-Tape", "imagePath": "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/3. TWIN TAPE/9. Blue-Door-Holding-Tape.jpg", "category": "Twin Tapes" }
    ]
};

function initDynamicProducts() {
    const filtersContainer = document.querySelector('.product-filters');
    const gridContainer = document.querySelector('.products-grid');
    const countElement = document.getElementById('product-count');

    if (!filtersContainer || !gridContainer) {
        console.warn('Dynamic product containers not found');
        return;
    }

    // 1. Generate Filters (Simplified for single category)
    // Since there are no categories, we can just hide the filter container or show a single label.
    // The user requested "no categories", so we might just clear the filter container or add a "All Products" label.
    // However, the existing logic expects a filter structure. Let's provide a single "All Products" button that is active and hidden/styled appropriately, 
    // or just not generate buttons if we don't want them. 
    // Let's stick to the "All Products" button but maybe we can hide the filter section in CSS if desired, 
    // but the user said "Twin Tapes - no categories - direct products".
    
    // We will still populate "All Products" so the logic works, but maybe we can make it purely visual or just one button.
    filtersContainer.innerHTML = '<button class="filter-tag active" data-filter="all" style="cursor: default;">All Products</button>';

    // 2. Collect all products
    const allProducts = productsData["Twin Tapes"].map(p => ({...p, rawCategory: "Twin Tapes"}));

    // 3. Render Initial Grid (All)
    gridContainer.innerHTML = '';
    allProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.setAttribute('data-category', "Twin Tapes");
        
        // Image path handling
        const encodedPath = product.imagePath.split('/').map(s => encodeURIComponent(s)).join('/');
        const imgSrc = './' + encodedPath;

        const displayName = product.name.replace(/^\d+\.\s*/, '').replace(/-/g, ' ').replace(/\.jpg|\.jpeg|\.png/i, '');

        card.innerHTML = `
            <div class="product-image-wrapper">
                <img src="${imgSrc}" alt="${displayName}" class="product-img">
                <div class="product-overlay"></div>
            </div>
            <div class="product-info">
                <h3 class="product-name" style="font-size: 1.2rem;">${displayName}</h3>
            </div>
        `;
        // Removed category display from card content as requested (implied by "no categories")
        gridContainer.appendChild(card);
    });

    // Update count
    if (countElement) countElement.textContent = allProducts.length;

    // Re-initialize event listeners
    attachEventListeners();
    
    // Initial animation for cards
    animateCardsEntrance();
}

function attachEventListeners() {
    const productCards = document.querySelectorAll('.product-card');

    // No filter click listeners needed as there is only one state.

    productCards.forEach((card) => {
        if (!window.gsap) return;
        const img = card.querySelector('.product-img');
        const overlay = card.querySelector('.product-overlay');
        const productName = card.querySelector('.product-name');
        const imageWrapper = card.querySelector('.product-image-wrapper');

        const hoverTimeline = gsap.timeline({ paused: true });

        hoverTimeline
            .to(img, {
                rotation: 1, 
                duration: 0.6,
                ease: 'power2.out'
            }, 0)
            .to(overlay, {
                opacity: 0.7,
                duration: 0.4,
                ease: 'power2.out'
            }, 0)
            .to(productName, {
                y: -2,
                color: '#dc143c',
                duration: 0.3,
                ease: 'back.out(1.7)'
            }, 0.1);

        card.addEventListener('mouseenter', () => hoverTimeline.play());
        card.addEventListener('mouseleave', () => hoverTimeline.reverse());

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 50;
            const rotateY = (centerX - x) / 50;

            gsap.to(imageWrapper, {
                rotationX: rotateX,
                rotationY: rotateY,
                transformPerspective: 1000,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(imageWrapper, {
                rotationX: 0,
                rotationY: 0,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
    });
}

function animateCardsEntrance() {
    // Check if preloader exists
    const preloader = document.getElementById('loading-overlay');
    
    // Check helper
    const checkAllLoaded = () => {
        if (preloader && preloader.style.opacity !== '0') {
            preloader.style.opacity = '0';
            setTimeout(() => {
                if (preloader.parentElement) preloader.remove();
            }, 500);
        }
    };

    // Safety timeout: force remove after 5 seconds to prevent infinite spinning
    setTimeout(checkAllLoaded, 5000);

    // Wait for all images in the grid to load before removing preloader
    const gridImages = document.querySelectorAll('.products-grid img');
    let loadedCount = 0;
    const totalImages = gridImages.length;

    if (totalImages === 0) {
        checkAllLoaded();
    } else {
        gridImages.forEach(img => {
            if (img.complete) {
                loadedCount++;
                if (loadedCount === totalImages) checkAllLoaded();
            } else {
                img.onload = () => {
                    loadedCount++;
                    if (loadedCount === totalImages) checkAllLoaded();
                };
                img.onerror = () => {
                    loadedCount++; // Count errors as loaded to avoid sticking
                    if (loadedCount === totalImages) checkAllLoaded();
                };
            }
        });
    }

    if (!window.gsap || !window.ScrollTrigger) return;
    
    gsap.utils.toArray('.product-card').forEach((card, index) => {
        gsap.set(card, { opacity: 1, y: 0, rotation: 0 });
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDynamicProducts);
} else {
    initDynamicProducts();
}
