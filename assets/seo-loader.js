/**
 * SEO Loader - Fetches SEO settings from the API and applies them to the current page.
 *
 * Usage: Add to any page's <head>:
 *   <script src="/assets/seo-loader.js" data-page-type="page" data-page-id="home"></script>
 *
 * For product pages: data-page-type="product" data-page-id="<slug>"
 * For blog posts:    data-page-type="blog"    data-page-id="<id>"
 *
 * Also exposes window.applySeoForProduct(slug) so brand pages can swap in
 * product-specific SEO when a product modal is opened from a URL parameter.
 */
(function () {
    function apiPrefix() {
        // Walk up from the current URL's directory to the site root so the
        // helper works whether it's called from /, /evershine/, /blog/, etc.
        const depth = (window.location.pathname.replace(/\/[^/]*$/, '').match(/\//g) || []).length;
        return depth > 1 ? '../'.repeat(depth - 1) : './';
    }

    // Tags we manage so we can swap them out cleanly when switching between
    // page-level SEO and product-level SEO.
    const MANAGED_ATTR = 'data-seo-managed';

    function clearManagedTags() {
        document.querySelectorAll('[' + MANAGED_ATTR + ']').forEach(el => el.remove());
    }

    function setMeta(attr, attrVal, content, managed) {
        if (!content) return;
        const sel = 'meta[' + attr + '="' + attrVal + '"]';
        let el = document.querySelector(sel);
        if (el) {
            el.setAttribute('content', content);
            if (managed) el.setAttribute(MANAGED_ATTR, '1');
        } else {
            el = document.createElement('meta');
            el.setAttribute(attr, attrVal);
            el.setAttribute('content', content);
            if (managed) el.setAttribute(MANAGED_ATTR, '1');
            document.head.appendChild(el);
        }
    }

    function applySeoData(d, options) {
        if (!d) return;
        const managed = !!(options && options.managed);

        // Clear previously-managed product tags first so they don't accumulate.
        if (managed) clearManagedTags();

        if (d.meta_title) document.title = d.meta_title;
        setMeta('name', 'description', d.meta_description, managed);
        setMeta('name', 'keywords', d.meta_keywords, managed);
        setMeta('name', 'robots', d.robots, managed);

        if (d.canonical_url) {
            let link = document.querySelector('link[rel="canonical"]');
            if (link) {
                link.setAttribute('href', d.canonical_url);
                if (managed) link.setAttribute(MANAGED_ATTR, '1');
            } else {
                link = document.createElement('link');
                link.setAttribute('rel', 'canonical');
                link.setAttribute('href', d.canonical_url);
                if (managed) link.setAttribute(MANAGED_ATTR, '1');
                document.head.appendChild(link);
            }
        }

        setMeta('property', 'og:title', d.og_title || d.meta_title, managed);
        setMeta('property', 'og:description', d.og_description || d.meta_description, managed);
        setMeta('property', 'og:image', d.og_image, managed);
        setMeta('property', 'og:type', d.og_type, managed);

        setMeta('name', 'twitter:card', d.twitter_card, managed);
        setMeta('name', 'twitter:title', d.twitter_title || d.og_title || d.meta_title, managed);
        setMeta('name', 'twitter:description', d.twitter_description || d.og_description || d.meta_description, managed);
        setMeta('name', 'twitter:image', d.twitter_image || d.og_image, managed);

        if (d.schema_json) {
            try {
                JSON.parse(d.schema_json);
                const s = document.createElement('script');
                s.type = 'application/ld+json';
                s.textContent = d.schema_json;
                if (managed) s.setAttribute(MANAGED_ATTR, '1');
                document.head.appendChild(s);
            } catch (e) { /* invalid JSON */ }
        }

        if (d.custom_head) {
            const temp = document.createElement('div');
            temp.innerHTML = d.custom_head;
            while (temp.firstChild) {
                const child = temp.firstChild;
                if (managed && child.setAttribute) child.setAttribute(MANAGED_ATTR, '1');
                document.head.appendChild(child);
            }
        }
    }

    // Cache page-level SEO so we can restore it when the modal closes.
    let pageLevelSeo = null;

    // Public helper: load product SEO by slug and apply it (replacing any
    // currently-applied product SEO). Brand pages call this when they open a
    // product modal from a URL parameter.
    window.applySeoForProduct = function (slug) {
        if (!slug) return Promise.resolve(false);
        const url = apiPrefix() + 'api/seo.php?page_type=product&page_identifier=' + encodeURIComponent(slug);
        return fetch(url, { cache: 'no-store' })
            .then(res => res.json())
            .then(json => {
                if (json && json.success && json.data && json.data.meta_title) {
                    applySeoData(json.data, { managed: true });
                    return true;
                }
                // No product SEO configured — leave the page-level SEO intact.
                return false;
            })
            .catch(() => false);
    };

    // Public helper: revert to the brand/page-level SEO (called when the
    // product modal closes).
    window.restorePageSeo = function () {
        clearManagedTags();
        if (pageLevelSeo) applySeoData(pageLevelSeo, { managed: false });
    };

    const script = document.currentScript;
    if (!script) return;

    const pageType = script.getAttribute('data-page-type');
    const pageId = script.getAttribute('data-page-id');
    if (!pageType || !pageId) return;

    const apiUrl = apiPrefix() + 'api/seo.php?page_type=' + encodeURIComponent(pageType) + '&page_identifier=' + encodeURIComponent(pageId);

    fetch(apiUrl)
        .then(res => res.json())
        .then(json => {
            if (!json.success || !json.data || !json.data.meta_title) return;
            pageLevelSeo = json.data;
            applySeoData(json.data, { managed: false });
        })
        .catch(() => { /* SEO fetch failed silently */ });
})();
