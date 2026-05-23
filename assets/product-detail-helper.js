/**
 * Product detail helper — shared utilities used by every brand logic file
 * (evershine, sprayzet, twin-tapes, twinzy) when opening a product modal.
 *
 * Provides:
 *   - findProductByParam(list, param)  : match a URL param (slug first, name fallback)
 *   - pushProductUrl(slug)             : push ?product=<slug> into history
 *   - clearProductUrl()                : remove ?product= from history
 *   - applyProductSeo(slug)            : load that product's SEO and swap it in
 *   - restoreParentSeo()               : revert to the brand page's SEO
 */
(function () {
    // Match the same slugify rule the server uses so client-only callers can
    // synthesise a slug for a product that doesn't have one stored yet.
    function slugifyClient(text) {
        return String(text || '')
            .replace(/&/g, ' and ')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }

    function findProductByParam(list, param) {
        if (!param) return null;
        const raw = String(param).trim();
        const lower = raw.toLowerCase();
        // 1. Exact slug match (preferred for canonical URLs)
        let p = list.find(x => x.slug && String(x.slug).toLowerCase() === lower);
        if (p) return p;
        // 2. Slug derived from name (handles old links built before slugs existed)
        p = list.find(x => slugifyClient(x.name) === lower);
        if (p) return p;
        // 3. Exact name match (legacy URLs like ?product=SAFETY%20SOLVENT)
        p = list.find(x => x.name && x.name.toLowerCase() === lower);
        return p || null;
    }

    function pushProductUrl(slug) {
        if (!slug || !window.history || !window.history.replaceState) return;
        try {
            const url = new URL(window.location.href);
            url.searchParams.set('product', slug);
            window.history.replaceState({}, '', url.toString());
        } catch (e) { /* ignore */ }
    }

    function clearProductUrl() {
        if (!window.history || !window.history.replaceState) return;
        try {
            const url = new URL(window.location.href);
            if (url.searchParams.has('product')) {
                url.searchParams.delete('product');
                window.history.replaceState({}, '', url.toString());
            }
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
        pushUrl: pushProductUrl,
        clearUrl: clearProductUrl,
        applySeo: applyProductSeo,
        restoreSeo: restoreParentSeo
    };
})();
