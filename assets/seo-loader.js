/**
 * SEO loader / swapper.
 *
 * Two modes:
 *   1. SSR mode (preferred): the server already rendered the right <head>
 *      tags. window.__PAGE_LEVEL_SEO__ holds the brand/page-level SEO so we
 *      can restore it when a product modal closes. No initial fetch needed.
 *   2. Legacy mode: the script tag has data-page-type / data-page-id; the
 *      loader fetches the SEO from the API and applies it client-side.
 *
 * Either way, two helpers are exposed:
 *   - window.applySeoForProduct(slug) — swap in a product's SEO
 *   - window.restorePageSeo()         — revert to the page/brand SEO
 */
(function () {
    var MANAGED_ATTR = 'data-seo-managed';

    function clearManagedTags() {
        document.querySelectorAll('[' + MANAGED_ATTR + ']').forEach(function (el) {
            // <title> can be re-used via document.title; everything else gets removed
            if (el.tagName === 'TITLE') {
                el.removeAttribute(MANAGED_ATTR);
                return;
            }
            el.parentNode && el.parentNode.removeChild(el);
        });
    }

    function setMeta(attr, attrVal, content, managed) {
        if (!content) return;
        var sel = 'meta[' + attr + '="' + attrVal + '"]';
        var el = document.querySelector(sel);
        if (el) {
            el.setAttribute('content', content);
            if (managed) el.setAttribute(MANAGED_ATTR, '1');
            else el.removeAttribute(MANAGED_ATTR);
        } else {
            el = document.createElement('meta');
            el.setAttribute(attr, attrVal);
            el.setAttribute('content', content);
            if (managed) el.setAttribute(MANAGED_ATTR, '1');
            document.head.appendChild(el);
        }
    }

    function setLink(rel, href, managed) {
        if (!href) return;
        var el = document.querySelector('link[rel="' + rel + '"]');
        if (el) {
            el.setAttribute('href', href);
            if (managed) el.setAttribute(MANAGED_ATTR, '1');
            else el.removeAttribute(MANAGED_ATTR);
        } else {
            el = document.createElement('link');
            el.setAttribute('rel', rel);
            el.setAttribute('href', href);
            if (managed) el.setAttribute(MANAGED_ATTR, '1');
            document.head.appendChild(el);
        }
    }

    function applySeoData(d, options) {
        if (!d) return;
        var managed = !!(options && options.managed);
        if (managed) clearManagedTags();

        if (d.meta_title) document.title = d.meta_title;
        setMeta('name', 'description', d.meta_description, managed);
        setMeta('name', 'keywords', d.meta_keywords, managed);
        setMeta('name', 'robots', d.robots, managed);
        setLink('canonical', d.canonical_url, managed);

        setMeta('property', 'og:title',       d.og_title       || d.meta_title,       managed);
        setMeta('property', 'og:description', d.og_description || d.meta_description, managed);
        setMeta('property', 'og:image',       d.og_image,                              managed);
        setMeta('property', 'og:type',        d.og_type,                               managed);
        setMeta('property', 'og:url',         d.canonical_url,                         managed);

        setMeta('name', 'twitter:card',        d.twitter_card,                                                                  managed);
        setMeta('name', 'twitter:title',       d.twitter_title       || d.og_title       || d.meta_title,                       managed);
        setMeta('name', 'twitter:description', d.twitter_description || d.og_description || d.meta_description,                 managed);
        setMeta('name', 'twitter:image',       d.twitter_image       || d.og_image,                                             managed);

        if (d.schema_json) {
            try {
                JSON.parse(d.schema_json);
                var s = document.createElement('script');
                s.type = 'application/ld+json';
                s.textContent = d.schema_json;
                if (managed) s.setAttribute(MANAGED_ATTR, '1');
                document.head.appendChild(s);
            } catch (e) { /* invalid JSON, skip */ }
        }

        if (d.custom_head) {
            var temp = document.createElement('div');
            temp.innerHTML = d.custom_head;
            while (temp.firstChild) {
                var child = temp.firstChild;
                if (managed && child.setAttribute) child.setAttribute(MANAGED_ATTR, '1');
                document.head.appendChild(child);
            }
        }
    }

    // SSR injected the page-level SEO so we can restore it later.
    var pageLevelSeo = (typeof window !== 'undefined' && window.__PAGE_LEVEL_SEO__) || null;

    window.applySeoForProduct = function (slug) {
        if (!slug) return Promise.resolve(false);
        return fetch('/api/seo.php?page_type=product&page_identifier=' + encodeURIComponent(slug), { cache: 'no-store' })
            .then(function (res) { return res.json(); })
            .then(function (json) {
                if (json && json.success && json.data && json.data.meta_title) {
                    applySeoData(json.data, { managed: true });
                    return true;
                }
                return false;
            })
            .catch(function () { return false; });
    };

    window.restorePageSeo = function () {
        clearManagedTags();
        if (pageLevelSeo) applySeoData(pageLevelSeo, { managed: false });
    };

    // Legacy fallback: only fire if the script tag has data-page-* AND no
    // server-side SEO has already been injected.
    var script = document.currentScript;
    if (!script) return;

    var pageType = script.getAttribute('data-page-type');
    var pageId = script.getAttribute('data-page-id');
    if (!pageType || !pageId) return;
    if (pageLevelSeo) return; // server already handled it

    fetch('/api/seo.php?page_type=' + encodeURIComponent(pageType) + '&page_identifier=' + encodeURIComponent(pageId), { cache: 'no-store' })
        .then(function (res) { return res.json(); })
        .then(function (json) {
            if (!json.success || !json.data || !json.data.meta_title) return;
            pageLevelSeo = json.data;
            applySeoData(json.data, { managed: false });
        })
        .catch(function () { /* silent */ });
})();
