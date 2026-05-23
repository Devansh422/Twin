<?php
/**
 * Server-side SEO meta tag renderer.
 *
 * Drop this include at the very top of any page that wants server-rendered
 * <head> tags (search-engine and social-crawler friendly — they don't run JS).
 *
 * Usage in a brand page (e.g. evershine/index.php):
 *   <?php
 *     require_once __DIR__ . '/../seo-meta.php';
 *     $seo = renderSeoMeta('page', 'evershine', [
 *         'meta_title' => 'Evershine Car Care Products - Twin Tech India',
 *         'meta_description' => '...',
 *         // ...other fallback fields
 *     ]);
 *   ?>
 *   <!DOCTYPE html><html><head>
 *     <?= $seo['html'] ?>
 *     <?= $seo['scriptJson'] ?>
 *     ...rest of head...
 *
 * If the URL contains ?product=<slug> and that product has a SEO row, the
 * product's tags are rendered instead of the page-level ones. The page-level
 * tags are also exposed via window.__PAGE_LEVEL_SEO__ so the front-end can
 * restore them when the product modal closes.
 */

// Suppress the JSON Content-Type header that api/config.php normally sets
if (!defined('TWIN_NO_API_HEADERS')) define('TWIN_NO_API_HEADERS', true);
require_once __DIR__ . '/api/config.php';

// HTML pages can be cached briefly. Pages with ?product= are rendered as
// part of the same URL — we don't want a stale page to leak a different
// product's tags, so vary cache by query string by skipping aggressive caching.
if (!headers_sent()) {
    header('Content-Type: text/html; charset=utf-8');
}

function seoEsc($s) {
    return htmlspecialchars((string)$s, ENT_QUOTES | ENT_HTML5, 'UTF-8');
}

/**
 * Look up a SEO row from the database. Returns null if missing or on error.
 * Memoized per request.
 */
function fetchSeoRow($pageType, $pageId) {
    if (!$pageType || $pageId === '' || $pageId === null) return null;
    static $cache = [];
    $key = $pageType . '|' . $pageId;
    if (array_key_exists($key, $cache)) return $cache[$key];

    $pdo = getDBConnection();
    if (!$pdo) return $cache[$key] = null;

    try {
        $stmt = $pdo->prepare("SELECT * FROM seo_settings WHERE page_type = ? AND page_identifier = ? LIMIT 1");
        $stmt->execute([$pageType, $pageId]);
        return $cache[$key] = ($stmt->fetch() ?: null);
    } catch (Exception $e) {
        return $cache[$key] = null;
    }
}

/**
 * Render a SEO row as a block of <head> HTML.
 * Every tag is marked with data-seo-managed="1" so the front-end can swap
 * them out cleanly when a product modal opens or closes.
 */
function renderSeoTagsHtml($d) {
    if (!$d || empty($d['meta_title'])) return '';
    $m = ' data-seo-managed="1"';
    $out = '<title' . $m . '>' . seoEsc($d['meta_title']) . "</title>\n";

    $name = [
        'description'         => $d['meta_description']    ?? '',
        'keywords'            => $d['meta_keywords']       ?? '',
        'robots'              => $d['robots']              ?? '',
        'twitter:card'        => $d['twitter_card']        ?? '',
        'twitter:title'       => ($d['twitter_title']       ?? '') ?: (($d['og_title']       ?? '') ?: ($d['meta_title']       ?? '')),
        'twitter:description' => ($d['twitter_description'] ?? '') ?: (($d['og_description'] ?? '') ?: ($d['meta_description'] ?? '')),
        'twitter:image'       => ($d['twitter_image']       ?? '') ?: ($d['og_image']        ?? ''),
    ];
    foreach ($name as $n => $c) {
        if ($c !== '' && $c !== null) {
            $out .= '<meta name="' . seoEsc($n) . '" content="' . seoEsc($c) . '"' . $m . ">\n";
        }
    }

    $prop = [
        'og:title'       => ($d['og_title']       ?? '') ?: ($d['meta_title']       ?? ''),
        'og:description' => ($d['og_description'] ?? '') ?: ($d['meta_description'] ?? ''),
        'og:image'       => $d['og_image']    ?? '',
        'og:type'        => $d['og_type']     ?? 'website',
        'og:url'         => $d['canonical_url'] ?? '',
    ];
    foreach ($prop as $p => $c) {
        if ($c !== '' && $c !== null) {
            $out .= '<meta property="' . seoEsc($p) . '" content="' . seoEsc($c) . '"' . $m . ">\n";
        }
    }

    if (!empty($d['canonical_url'])) {
        $out .= '<link rel="canonical" href="' . seoEsc($d['canonical_url']) . '"' . $m . ">\n";
    }

    if (!empty($d['schema_json'])) {
        // Only emit if it parses — bad JSON-LD hurts SEO more than it helps.
        if (json_decode($d['schema_json']) !== null) {
            $out .= '<script type="application/ld+json"' . $m . '>' . $d['schema_json'] . "</script>\n";
        }
    }

    if (!empty($d['custom_head'])) {
        $out .= $d['custom_head'] . "\n";
    }

    return $out;
}

/**
 * Resolve the SEO that should be rendered for the current request.
 *
 * - $pageType / $pageId: this page's own page-level SEO row
 * - $fallback: associative array used when no DB row exists. Has the same
 *   keys as the seo_settings table (meta_title, meta_description, og_*, …).
 *
 * Returns:
 *   - html       : the rendered <head> tags (string)
 *   - scriptJson : a <script> exposing window.__PAGE_LEVEL_SEO__ for restore
 *   - isProduct  : true when the active SEO is a product (not the page)
 *   - productSlug: the ?product= value from the URL, if any
 *   - active     : the SEO row currently rendered into <head>
 *   - pageSeo    : the page-level row (for restore)
 *   - productSeo : the product-level row (if matched)
 */
function renderSeoMeta($pageType, $pageId, $fallback = null) {
    $pageSeo = fetchSeoRow($pageType, $pageId);
    if (!$pageSeo && is_array($fallback)) $pageSeo = $fallback;

    $productSlug = isset($_GET['product']) ? trim((string)$_GET['product']) : '';
    $productSeo = null;
    if ($productSlug !== '') {
        $productSeo = fetchSeoRow('product', $productSlug);
    }

    $active = $productSeo ?: $pageSeo;
    $html = renderSeoTagsHtml($active);

    $flags = JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT
           | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES;
    $pageLevelJson = $pageSeo ? json_encode($pageSeo, $flags) : 'null';
    $scriptJson = '<script>window.__PAGE_LEVEL_SEO__ = ' . $pageLevelJson . ';</script>';

    return [
        'html'        => $html,
        'scriptJson'  => $scriptJson,
        'isProduct'   => (bool)$productSeo,
        'productSlug' => $productSlug,
        'active'      => $active,
        'pageSeo'     => $pageSeo,
        'productSeo'  => $productSeo,
    ];
}
