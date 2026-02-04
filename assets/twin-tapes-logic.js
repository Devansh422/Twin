
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

let productDetails = {};

async function fetchProductDetails() {
    try {
        const response = await fetch('./assets/evershine-details.json');
        productDetails = await response.json();
    } catch (error) {
        console.error('Error loading product details:', error);
    }
}

async function initDynamicProducts() {
    await fetchProductDetails();
    
    const filtersContainer = document.querySelector('.product-filters');
    const gridContainer = document.querySelector('.products-grid');
    const countElement = document.getElementById('product-count');

    if (!filtersContainer || !gridContainer) {
        console.warn('Dynamic product containers not found');
        return;
    }

    filtersContainer.innerHTML = '<button class="filter-tag active" data-filter="all" style="cursor: default;">All Products</button>';

    const allProducts = productsData["Twin Tapes"].map(p => ({...p, rawCategory: "Twin Tapes"}));

    gridContainer.innerHTML = '';
    allProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.setAttribute('data-category', "Twin Tapes");
        
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
        gridContainer.appendChild(card);
    });

    if (countElement) countElement.textContent = allProducts.length;

    attachEventListeners();
    animateCardsEntrance();
}

function attachEventListeners() {
    const productCards = document.querySelectorAll('.product-card');

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

        // Add Modal Click Listener
        card.addEventListener('click', () => {
            const name = card.querySelector('.product-name').textContent;
            const imgSrc = card.querySelector('.product-img').src;
            const category = "Twin Tapes";
            openProductModal(name, imgSrc, category);
        });
    });

    const closeModalBtn = document.getElementById('closeModal');
    const modalOverlay = document.getElementById('productModal');

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeProductModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeProductModal();
        });
    }
}

function openProductModal(name, imgSrc, category) {
    const modal = document.getElementById('productModal');
    
    // Case-insensitive lookup
    const detailKey = Object.keys(productDetails).find(key => key.toLowerCase() === name.toLowerCase());
    const details = productDetails[detailKey] || productDetails['default'];

    if (!modal || !details) return;

    document.getElementById('modalProductName').textContent = name;
    document.getElementById('modalTableName').textContent = name;
    document.getElementById('modalProductImg').src = imgSrc;
    document.getElementById('modalProductCategory').textContent = category;
    document.getElementById('modalProductDescription').textContent = details.description;
    document.getElementById('modalPackSize').textContent = details.packSize;
    document.getElementById('modalForm').textContent = details.form;
    document.getElementById('modalAvailability').textContent = details.availability || "In stock";

    // Populate Table
    const table = document.getElementById('modalProductTable');
    table.innerHTML = '';
    if (details.tableData) {
        Object.entries(details.tableData).forEach(([key, value]) => {
            const row = `<tr><td>${key}</td><td>${value}</td></tr>`;
            table.innerHTML += row;
        });
        table.style.display = 'table';
        document.getElementById('modalTableName').style.display = 'block';
    } else {
        table.style.display = 'none';
        document.getElementById('modalTableName').style.display = 'none';
    }

    const featuresList = document.getElementById('modalFeatures');
    const featuresSection = document.getElementById('featuresSection');
    if (details.features && details.features.length > 0) {
        featuresList.innerHTML = details.features.map(f => `<li>${f}</li>`).join('');
        featuresSection.style.display = 'block';
    } else {
        featuresSection.style.display = 'none';
    }

    const benefitsList = document.getElementById('modalBenefits');
    const benefitsSection = document.getElementById('benefitsSection');
    if (details.benefits && details.benefits.length > 0) {
        benefitsList.innerHTML = details.benefits.map(b => `<li>${b}</li>`).join('');
        benefitsSection.style.display = 'block';
    } else {
        benefitsSection.style.display = 'none';
    }

    if (window.applyCTAStyles) window.applyCTAStyles();

    modal.style.display = 'flex';
    gsap.set(modal, { opacity: 0 });
    gsap.to(modal, { 
        opacity: 1, 
        duration: 0.5,
        ease: 'power2.out'
    });
    
    const contentCol = modal.querySelector('.modal-content-col');
    if (contentCol) contentCol.scrollTop = 0;

    document.body.style.overflow = 'hidden';
    if (window.lenis) window.lenis.stop();
}

function closeProductModal() {
    const modal = document.getElementById('productModal');
    if (!modal) return;

    gsap.to(modal, { 
        opacity: 0, 
        duration: 0.3, 
        ease: 'power2.in',
        onComplete: () => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
            if (window.lenis) window.lenis.start();
        } 
    });
}

function animateCardsEntrance() {
    const preloader = document.getElementById('loading-overlay');
    const checkAllLoaded = () => {
        if (preloader && preloader.style.opacity !== '0') {
            preloader.style.opacity = '0';
            setTimeout(() => {
                if (preloader.parentElement) preloader.remove();
            }, 500);
        }
    };

    setTimeout(checkAllLoaded, 5000);

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
            }
        });
    }

    if (!window.gsap) return;
    gsap.utils.toArray('.product-card').forEach((card) => {
        gsap.set(card, { opacity: 1, y: 0, rotation: 0 });
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDynamicProducts);
} else {
    initDynamicProducts();
}
