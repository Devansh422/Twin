/**
 * Product detail helper — shared utilities used by every brand logic file
 * (evershine, sprayzet, twin-tapes, twinzy) when opening a product modal.
 *
 * URL format (clean / SEO-friendly):
 *   Brand page:    https://twinindia.com/<brand>/
 *   Product page:  https://twinindia.com/<brand>/<product-slug>
 *
 * Apache rewrites the path form to /<brand>/index.php?product=<slug>, so the
 * server-side SEO renderer keeps working. The browser URL stays clean.
 *
 * Provides on window.ProductDetail:
 *   - slugify(text)                : turn a name into a URL-safe slug
 *   - findByParam(list, param)     : match a URL param (slug first, name fallback)
 *   - readSlugFromUrl()            : detect the current product slug (path or ?product=)
 *   - pushUrl(slug)                : update history to /<brand>/<slug>
 *   - clearUrl()                   : update history back to /<brand>/
 *   - applySeo(slug)               : load that product's SEO and swap it in
 *   - restoreSeo()                 : revert to the brand page's SEO
 */
(function () {
    // Brand keys whose pages own the path under "/<key>/...".
    // Custom brands route through "/brand/<brand-key>/..." and are handled
    // separately by brand/index.php — but the helper still works there
    // because we just treat the brand segment as whatever path[0] is.
    var BUILTIN_BRANDS = ['evershine', 'sprayzet', 'twin-tapes', 'twinzy'];

    // Match the same slugify rule the server uses (see api/config.php::generateSlug).
    function slugifyClient(text) {
        return String(text || '')
            .replace(/&/g, ' and ')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }

    /**
     * Inspect the current URL and return:
     *   { brand: 'evershine', slug: 'all-in-one-rust-off' } if we're on a product page,
     *   { brand: 'evershine', slug: '' }                    if we're on the brand page,
     *   null                                                  if the URL isn't a brand page.
     */
    function parseLocation() {
        var segs = window.location.pathname.split('/').filter(function (s) {
            return s && s !== 'index.php' && s !== 'index.html';
        });
        // /brand/<bs>/<ps>  → custom-brand product
        if (segs[0] === 'brand' && segs.length >= 2) {
            return { brand: 'brand', brandKey: segs[1], slug: segs[2] || '' };
        }
        // /<bs>/<ps>  → built-in brand product
        if (segs.length >= 1 && BUILTIN_BRANDS.indexOf(segs[0]) !== -1) {
            return { brand: segs[0], brandKey: segs[0], slug: segs[1] || '' };
        }
        // /<bs>/  → unknown brand, still parse for consistency
        if (segs.length >= 1) {
            return { brand: segs[0], brandKey: segs[0], slug: segs[1] || '' };
        }
        return null;
    }

    function readSlugFromUrl() {
        var loc = parseLocation();
        if (loc && loc.slug) return loc.slug;
        // Legacy fallback for old links / bookmarks
        try {
            var params = new URLSearchParams(window.location.search);
            return params.get('product') || '';
        } catch (e) {
            return '';
        }
    }

    function findProductByParam(list, param) {
        if (!param) return null;
        var raw = String(param).trim();
        var lower = raw.toLowerCase();
        // 1. Exact slug match (preferred for canonical URLs)
        var p = list.find(function (x) { return x.slug && String(x.slug).toLowerCase() === lower; });
        if (p) return p;
        // 2. Slug derived from name (handles old links built before slugs existed)
        p = list.find(function (x) { return slugifyClient(x.name) === lower; });
        if (p) return p;
        // 3. Exact name match (legacy URLs like ?product=SAFETY%20SOLVENT)
        p = list.find(function (x) { return x.name && x.name.toLowerCase() === lower; });
        return p || null;
    }

    function buildBrandPath() {
        var loc = parseLocation();
        if (!loc) return '/';
        if (loc.brand === 'brand' && loc.brandKey) {
            return '/brand/' + encodeURIComponent(loc.brandKey) + '/';
        }
        return '/' + encodeURIComponent(loc.brand) + '/';
    }

    function buildProductPath(slug) {
        var loc = parseLocation();
        if (!loc || !slug) return null;
        if (loc.brand === 'brand' && loc.brandKey) {
            return '/brand/' + encodeURIComponent(loc.brandKey) + '/' + encodeURIComponent(slug);
        }
        return '/' + encodeURIComponent(loc.brand) + '/' + encodeURIComponent(slug);
    }

    function pushProductUrl(slug) {
        if (!slug || !window.history || !window.history.replaceState) return;
        var path = buildProductPath(slug);
        if (!path) return;
        try {
            window.history.replaceState({ productSlug: slug }, '', path);
        } catch (e) { /* ignore */ }
    }

    function clearProductUrl() {
        if (!window.history || !window.history.replaceState) return;
        try {
            window.history.replaceState({}, '', buildBrandPath());
        } catch (e) { /* ignore */ }
    }

    function applyProductSeo(slug) {
        if (!slug) return Promise.resolve(false);
        if (typeof window.applySeoForProduct === 'function') {
            return window.applySeoForProduct(slug);
        }
        return Promise.resolve(false);
    }

    function restoreParentSeo() {
        if (typeof window.restorePageSeo === 'function') window.restorePageSeo();
    }

    window.ProductDetail = {
        slugify: slugifyClient,
        findByParam: findProductByParam,
        readSlugFromUrl: readSlugFromUrl,
        parseLocation: parseLocation,
        pushUrl: pushProductUrl,
        clearUrl: clearProductUrl,
        applySeo: applyProductSeo,
        restoreSeo: restoreParentSeo
    };
})();
