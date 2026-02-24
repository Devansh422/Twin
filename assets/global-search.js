(function () {
    // Detect base path from assets-config
    var scripts = document.getElementsByTagName('script');
    var basePath = '';
    for (var i = 0; i < scripts.length; i++) {
        var src = scripts[i].getAttribute('src') || '';
        if (src.indexOf('global-search') !== -1) {
            basePath = src.substring(0, src.indexOf('assets/'));
            break;
        }
    }

    var brandPageMap = {
        'sprayzet': 'sprayzet/',
        'evershine': 'evershine/',
        'twin-tapes': 'twin-tapes/',
        'twinzy': 'twinzy/'
    };
    var brandLabelMap = {
        'sprayzet': 'SprayZet',
        'evershine': 'Evershine',
        'twin-tapes': 'Twin Tapes',
        'twinzy': 'Twinzy'
    };

    var allSiteProducts = [];
    var searchLoaded = false;

    function loadSearchProducts() {
        if (searchLoaded) return Promise.resolve();
        return fetch(basePath + 'api/products.php?brand=all', { cache: 'no-store' })
            .then(function (res) { return res.json(); })
            .then(function (result) {
                if (result.success && result.data) {
                    allSiteProducts = result.data.map(function (p) {
                        var brandKey = p.brand || '';
                        return {
                            name: p.name,
                            brand: brandLabelMap[brandKey] || brandKey,
                            category: p.category,
                            brandPage: brandPageMap[brandKey] || ('brand/index.html?brand=' + encodeURIComponent(brandKey) + '&'),
                            imagePath: p.imagePath || ''
                        };
                    });
                }
                searchLoaded = true;
            })
            .catch(function () { searchLoaded = true; });
    }

    // Inject search button into nav action_buttons
    function injectSearchButton() {
        var actionButtons = document.querySelector('nav .action_buttons');
        if (!actionButtons) return;

        var searchBtn = document.createElement('button');
        searchBtn.type = 'button';
        searchBtn.className = 'search-toggle';
        searchBtn.setAttribute('aria-label', 'Search products');
        searchBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>';
        actionButtons.insertBefore(searchBtn, actionButtons.firstChild);

        searchBtn.addEventListener('click', openSearch);
    }

    // Inject search overlay into body
    function injectSearchOverlay() {
        var overlay = document.createElement('div');
        overlay.id = 'global-search-overlay';
        overlay.className = 'search-overlay';
        overlay.innerHTML =
            '<div class="search-container">' +
                '<div class="search-input-wrapper">' +
                    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>' +
                    '<input type="text" id="global-search-input" placeholder="Search products across all brands..." autocomplete="off">' +
                    '<button type="button" class="search-close" id="search-close-btn" aria-label="Close search">&times;</button>' +
                '</div>' +
                '<div class="search-results" id="search-results"></div>' +
            '</div>';
        document.body.appendChild(overlay);

        document.getElementById('search-close-btn').addEventListener('click', closeSearch);
        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) closeSearch();
        });
        document.getElementById('global-search-input').addEventListener('input', handleSearch);
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeSearch();
        });
    }

    function openSearch() {
        var overlay = document.getElementById('global-search-overlay');
        if (!overlay) return;
        overlay.classList.add('active');
        setTimeout(function () {
            document.getElementById('global-search-input').focus();
        }, 100);
        document.body.style.overflow = 'hidden';
        // Fetch products on first open
        if (!searchLoaded) {
            var resultsContainer = document.getElementById('search-results');
            resultsContainer.innerHTML = '<div class="no-results">Loading products...</div>';
            loadSearchProducts().then(function () {
                resultsContainer.innerHTML = '';
            });
        }
    }

    function closeSearch() {
        var overlay = document.getElementById('global-search-overlay');
        if (!overlay) return;
        overlay.classList.remove('active');
        document.getElementById('global-search-input').value = '';
        document.getElementById('search-results').innerHTML = '';
        document.body.style.overflow = '';
    }

    function escapeHtml(str) {
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }

    function handleSearch(e) {
        var query = (e.target.value || '').trim().toLowerCase();
        var resultsContainer = document.getElementById('search-results');

        if (query.length < 2) {
            resultsContainer.innerHTML = '';
            return;
        }

        if (!searchLoaded) {
            resultsContainer.innerHTML = '<div class="no-results">Loading products...</div>';
            loadSearchProducts().then(function () {
                handleSearch(e);
            });
            return;
        }

        var words = query.split(/\s+/);
        var matches = allSiteProducts.filter(function (p) {
            var text = (p.name + ' ' + p.brand + ' ' + p.category).toLowerCase();
            return words.every(function (w) { return text.indexOf(w) !== -1; });
        }).slice(0, 15);

        if (matches.length === 0) {
            resultsContainer.innerHTML = '<div class="no-results">No products found for "' + escapeHtml(e.target.value.trim()) + '"</div>';
            return;
        }

        var html = '';
        for (var i = 0; i < matches.length; i++) {
            var p = matches[i];
            var imgSrc = p.imagePath ? (basePath + encodeURI(p.imagePath)) : '';
            var href;
            if (p.brandPage.indexOf('?') !== -1) {
                href = basePath + p.brandPage + 'product=' + encodeURIComponent(p.name);
            } else {
                href = basePath + p.brandPage + '?product=' + encodeURIComponent(p.name);
            }
            html += '<a href="' + href + '" class="search-result-item">' +
                (imgSrc ? '<img src="' + imgSrc + '" alt="" loading="lazy" onerror="this.style.display=\'none\'">' : '') +
                '<div class="search-result-info">' +
                    '<span class="search-result-name">' + escapeHtml(p.name) + '</span>' +
                    '<span class="search-result-meta">' + escapeHtml(p.brand) + ' &bull; ' + escapeHtml(p.category) + '</span>' +
                '</div>' +
            '</a>';
        }
        resultsContainer.innerHTML = html;
    }

    function init() {
        injectSearchButton();
        injectSearchOverlay();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
