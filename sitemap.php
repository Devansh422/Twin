<?php
/**
 * sitemap.xml generator — lists every page on the site (homepage, brand pages,
 * marketing pages, every product, and every blog post) so search engines can
 * discover them.
 *
 * Submit https://twinindia.com/sitemap.xml in Google Search Console.
 */
if (!defined('TWIN_NO_API_HEADERS')) define('TWIN_NO_API_HEADERS', true);
require_once __DIR__ . '/api/config.php';

header('Content-Type: application/xml; charset=utf-8');
header('Cache-Control: public, max-age=3600');

$site = 'https://twinindia.com';

function smXmlEsc($s) {
    return htmlspecialchars((string)$s, ENT_QUOTES | ENT_XML1, 'UTF-8');
}

function smTag($loc, $lastmod = null, $changefreq = 'weekly', $priority = '0.7') {
    $loc = smXmlEsc($loc);
    $out  = "  <url>\n";
    $out .= "    <loc>$loc</loc>\n";
    if ($lastmod) $out .= "    <lastmod>" . smXmlEsc($lastmod) . "</lastmod>\n";
    if ($changefreq) $out .= "    <changefreq>" . smXmlEsc($changefreq) . "</changefreq>\n";
    if ($priority) $out .= "    <priority>" . smXmlEsc($priority) . "</priority>\n";
    $out .= "  </url>\n";
    return $out;
}

echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";

// Static / marketing pages
$today = date('Y-m-d');
$staticPages = [
    ['/',                      '1.0', 'weekly'],
    ['/about-us/',             '0.7', 'monthly'],
    ['/customer/',             '0.5', 'monthly'],
    ['/application/',          '0.6', 'monthly'],
    ['/career/',               '0.4', 'monthly'],
    ['/contact-us/',           '0.6', 'monthly'],
    ['/distributor/',          '0.5', 'monthly'],
    ['/gallery/',              '0.5', 'monthly'],
    ['/blog/',                 '0.7', 'weekly'],
    ['/private-labelling/',    '0.5', 'monthly'],
    ['/upcoming-projects/',    '0.4', 'monthly'],
    ['/evershine/',            '0.9', 'weekly'],
    ['/sprayzet/',             '0.9', 'weekly'],
    ['/twin-tapes/',           '0.9', 'weekly'],
    ['/twinzy/',               '0.9', 'weekly'],
];
foreach ($staticPages as $p) {
    echo smTag($site . $p[0], $today, $p[2], $p[1]);
}

// Products — clean path URLs, /<brand>/<slug>, so each product is its own
// distinct page in search-engine eyes (not a duplicate of the brand page).
$pdo = getDBConnection();
$builtinBrands = ['evershine', 'sprayzet', 'twin-tapes', 'twinzy'];
if ($pdo) {
    try {
        $stmt = $pdo->query("SELECT brand, slug, updated_at FROM products WHERE slug IS NOT NULL AND slug != '' ORDER BY brand, slug");
        foreach ($stmt as $row) {
            $brand = $row['brand'];
            $slug = $row['slug'];
            if (in_array($brand, $builtinBrands, true)) {
                $url = $site . '/' . rawurlencode($brand) . '/' . rawurlencode($slug);
            } else {
                // Custom brands use the /brand/<bs>/<ps> form
                $url = $site . '/brand/' . rawurlencode($brand) . '/' . rawurlencode($slug);
            }
            $lastmod = !empty($row['updated_at']) ? date('Y-m-d', strtotime($row['updated_at'])) : $today;
            echo smTag($url, $lastmod, 'weekly', '0.8');
        }
    } catch (Exception $e) { /* table may not exist */ }

    // Blog posts
    try {
        $stmt = $pdo->query("SELECT id, published_date FROM blog_posts ORDER BY published_date DESC");
        foreach ($stmt as $row) {
            $url = $site . '/blog/post.html?id=' . (int)$row['id'];
            $lastmod = !empty($row['published_date']) ? $row['published_date'] : $today;
            echo smTag($url, $lastmod, 'monthly', '0.6');
        }
    } catch (Exception $e) { /* table may not exist */ }
}

echo '</urlset>' . "\n";
