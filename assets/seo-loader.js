/**
 * SEO Loader - Fetches SEO settings from the API and applies them to the current page.
 *
 * Usage: Add to any page's <head>:
 *   <script src="/assets/seo-loader.js" data-page-type="page" data-page-id="home"></script>
 *
 * For product pages: data-page-type="product" data-page-id="123"
 * For blog posts:    data-page-type="blog" data-page-id="456"
 */
(function () {
    const script = document.currentScript;
    if (!script) return;

    const pageType = script.getAttribute('data-page-type');
    const pageId = script.getAttribute('data-page-id');
    if (!pageType || !pageId) return;

    // Determine API base path relative to current page
    const depth = (window.location.pathname.replace(/\/[^/]*$/, '').match(/\//g) || []).length;
    const prefix = depth > 1 ? '../'.repeat(depth - 1) : './';
    const apiUrl = prefix + 'api/seo.php?page_type=' + encodeURIComponent(pageType) + '&page_identifier=' + encodeURIComponent(pageId);

    fetch(apiUrl)
        .then(function (res) { return res.json(); })
        .then(function (json) {
            if (!json.success || !json.data || !json.data.meta_title) return;
            var d = json.data;

            // Helper: set or create a meta tag
            function setMeta(attr, attrVal, content) {
                if (!content) return;
                var sel = 'meta[' + attr + '="' + attrVal + '"]';
                var el = document.querySelector(sel);
                if (el) {
                    el.setAttribute('content', content);
                } else {
                    el = document.createElement('meta');
                    el.setAttribute(attr, attrVal);
                    el.setAttribute('content', content);
                    document.head.appendChild(el);
                }
            }

            // Title
            if (d.meta_title) document.title = d.meta_title;

            // Basic meta
            setMeta('name', 'description', d.meta_description);
            setMeta('name', 'keywords', d.meta_keywords);
            setMeta('name', 'robots', d.robots);

            // Canonical
            if (d.canonical_url) {
                var link = document.querySelector('link[rel="canonical"]');
                if (link) {
                    link.setAttribute('href', d.canonical_url);
                } else {
                    link = document.createElement('link');
                    link.setAttribute('rel', 'canonical');
                    link.setAttribute('href', d.canonical_url);
                    document.head.appendChild(link);
                }
            }

            // Open Graph
            setMeta('property', 'og:title', d.og_title || d.meta_title);
            setMeta('property', 'og:description', d.og_description || d.meta_description);
            setMeta('property', 'og:image', d.og_image);
            setMeta('property', 'og:type', d.og_type);

            // Twitter Card
            setMeta('name', 'twitter:card', d.twitter_card);
            setMeta('name', 'twitter:title', d.twitter_title || d.og_title || d.meta_title);
            setMeta('name', 'twitter:description', d.twitter_description || d.og_description || d.meta_description);
            setMeta('name', 'twitter:image', d.twitter_image || d.og_image);

            // JSON-LD Schema
            if (d.schema_json) {
                try {
                    JSON.parse(d.schema_json); // Validate
                    var s = document.createElement('script');
                    s.type = 'application/ld+json';
                    s.textContent = d.schema_json;
                    document.head.appendChild(s);
                } catch (e) { /* invalid JSON, skip */ }
            }

            // Custom head HTML
            if (d.custom_head) {
                var temp = document.createElement('div');
                temp.innerHTML = d.custom_head;
                while (temp.firstChild) {
                    document.head.appendChild(temp.firstChild);
                }
            }
        })
        .catch(function () { /* SEO fetch failed silently */ });
})();
