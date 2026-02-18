
let productsData = {
    "AIR FRESHNER": [
        {
            "name": "CITRUS",
            "imagePath": "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/4. TWINZY/1. HOME CARE PRODUCTS/1. AIR FRESHNER/AIR FRESHNER CITRUS.jpg",
            "category": "AIR FRESHNER"
        },
        {
            "name": "JASMINE",
            "imagePath": "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/4. TWINZY/1. HOME CARE PRODUCTS/1. AIR FRESHNER/AIR FRESHNER JASMINE.jpg",
            "category": "AIR FRESHNER"
        },
        {
            "name": "LAVENDER",
            "imagePath": "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/4. TWINZY/1. HOME CARE PRODUCTS/1. AIR FRESHNER/AIR FRESHNER LAVENDER.jpg",
            "category": "AIR FRESHNER"
        }
    ],
    "FURNITURE POLISH": [
        {
            "name": "FURNITURE POLISH 1",
            "imagePath": "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/4. TWINZY/1. HOME CARE PRODUCTS/2. FURNITURE POLISH/1.png",
            "category": "FURNITURE POLISH"
        },
        {
            "name": "FURNITURE POLISH 5",
            "imagePath": "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/4. TWINZY/1. HOME CARE PRODUCTS/2. FURNITURE POLISH/5.png",
            "category": "FURNITURE POLISH"
        }
    ]
};

let productDetails = {};

async function fetchProductDetails() {
    try {
        const response = await fetch('../api/products.php?brand=twinzy');
        const result = await response.json();
        if (result.success && result.data) {
            productsData = result.data;
            // Build productDetails from DB details
            Object.values(result.data).forEach(products => {
                products.forEach(p => {
                    if (p.details) {
                        productDetails[p.name] = { ...p.details, description: p.details.description || p.description };
                    }
                });
            });
        }
    } catch (error) {
        console.error('Error loading products from API:', error);
    }
    // Fallback: load static details for products not yet in DB
    try {
        const response = await fetch('../assets/evershine-details.json');
        const staticDetails = await response.json();
        Object.keys(staticDetails).forEach(key => {
            if (!productDetails[key]) productDetails[key] = staticDetails[key];
        });
    } catch (e) { }
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

    // 1. Generate Filters
    const categories = Object.keys(productsData);
    let filterHTML = '<button class="filter-tag active" data-filter="all">All Products</button>';

    categories.forEach(cat => {
        filterHTML += `<button class="filter-tag" data-filter="${cat}">${cat.toLowerCase().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</button>`;
    });

    filtersContainer.innerHTML = filterHTML;

    // 2. Collect all products
    let allProducts = [];
    categories.forEach(cat => {
        const products = productsData[cat];
        products.forEach(p => {
            allProducts.push({
                ...p,
                rawCategory: cat
            });
        });
    });

    // 3. Render Initial Grid (All)
    gridContainer.innerHTML = '';
    allProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.setAttribute('data-category', product.rawCategory);

        // Image path handling
        const encodedPath = product.imagePath.split('/').map(s => encodeURIComponent(s)).join('/');
        const imgSrc = product.imageData || ('../' + encodedPath);

        card.innerHTML = `
            <div class="product-image-wrapper">
                <img src="${imgSrc}" alt="${product.name}" class="product-img">
                <div class="product-overlay"></div>
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-category">${product.rawCategory.toLowerCase().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</p>
            </div>
        `;
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
    const filterTags = document.querySelectorAll('.filter-tag');
    const productCards = document.querySelectorAll('.product-card');
    const productCountElement = document.getElementById('product-count');

    function filterProducts(category) {
        let visibleCount = 0;

        productCards.forEach((card, index) => {
            const cardCategory = card.getAttribute('data-category');

            if (window.gsap) gsap.killTweensOf(card);

            if (category === 'all' || cardCategory === category) {
                visibleCount++;
                card.style.display = 'block';
                if (window.gsap) {
                    gsap.fromTo(card,
                        {
                            opacity: 0,
                            x: -20,
                            pointerEvents: 'auto'
                        },
                        {
                            opacity: 1,
                            x: 0,
                            duration: 0.4,
                            ease: 'power3.out',
                            delay: index * 0.03
                        }
                    );
                }
            } else {
                if (window.gsap) {
                    gsap.to(card, {
                        opacity: 0,
                        x: 20,
                        duration: 0.3,
                        ease: 'power2.in',
                        onComplete: () => {
                            card.style.display = 'none';
                        }
                    });
                } else {
                    card.style.display = 'none';
                }
            }
        });

        if (productCountElement) {
            gsap.to(productCountElement, {
                scale: 1.5,
                color: '#dc143c',
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                onStart: () => {
                    productCountElement.textContent = visibleCount;
                }
            });
        }
    }

    filterTags.forEach(tag => {
        tag.addEventListener('click', (e) => {
            filterTags.forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
            const filterValue = e.target.getAttribute('data-filter');
            filterProducts(filterValue);
        });

        if (window.gsap) {
            tag.addEventListener('mouseenter', () => {
                gsap.to(tag, { scale: 1.05, duration: 0.2, ease: 'back.out(2)' });
            });
            tag.addEventListener('mouseleave', () => {
                if (!tag.classList.contains('active')) {
                    gsap.to(tag, { scale: 1, duration: 0.2, ease: 'power2.out' });
                }
            });
        }
    });

    productCards.forEach((card) => {
        if (!window.gsap) return;
        const img = card.querySelector('.product-img');
        const overlay = card.querySelector('.product-overlay');
        const productName = card.querySelector('.product-name');
        const productCategory = card.querySelector('.product-category');
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
            }, 0.1)
            .to(productCategory, {
                y: -2,
                color: '#dc143c',
                duration: 0.3,
                ease: 'back.out(1.7)'
            }, 0.15);

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
            const category = card.querySelector('.product-category').textContent;
            openProductModal(name, imgSrc, category);
        });
    });

    // Close Modal Listeners
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

