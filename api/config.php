<?php
// api/config.php

// Database Credentials
// ON HOSTINGER: Update these with your actual database details
define('DB_HOST', 'localhost');
define('DB_NAME', 'u280154569_twin_db'); // Example name, change this!
define('DB_USER', 'u280154569_twin_user'); // Example user, change this!
define('DB_PASS', 'V9#qL2!xR7@tZ4^mK8$wH3&cP6*eY1'); // Change this!

// Error Reporting (Turn off for production, on for debugging)
error_reporting(E_ALL);
ini_set('display_errors', 0); // Security: Don't show errors to user

// API-only headers. Server-rendered HTML pages (e.g. seo-meta.php) define
// TWIN_NO_API_HEADERS before including this file so they can serve text/html
// without the JSON content-type clobbering their response.
if (!defined('TWIN_NO_API_HEADERS')) {
    // Set Headers for CORS (if needed) and JSON
    header('Content-Type: application/json');
    // Prevent stale API data (especially important when hosting/CDN caches GET responses)
    header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
    header('Pragma: no-cache');
    header('Expires: 0');
    header('Access-Control-Allow-Origin: *'); // Adjust for security in production
    header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');

    // Handle Preflight Options Request
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit();
    }
}

// Database Connection
function getDBConnection()
{
    try {
        $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ];
        return new PDO($dsn, DB_USER, DB_PASS, $options);
    } catch (PDOException $e) {
        // Log error and return null
        error_log("Database Connection Error: " . $e->getMessage());
        return null;
    }
}

// Helper to send JSON response
function sendResponse($success, $message = '', $data = [])
{
    echo json_encode(['success' => $success, 'message' => $message, 'data' => $data]);
    exit();
}

// Convert a name to a URL-safe slug
function generateSlug($text)
{
    $text = (string)$text;
    // Replace ampersands explicitly so words don't collapse
    $text = str_replace('&', ' and ', $text);
    // Remove accents/special unicode where possible
    if (function_exists('iconv')) {
        $converted = @iconv('UTF-8', 'ASCII//TRANSLIT//IGNORE', $text);
        if ($converted !== false) $text = $converted;
    }
    $text = strtolower($text);
    // Replace anything that isn't a-z 0-9 with dashes
    $text = preg_replace('/[^a-z0-9]+/', '-', $text);
    $text = trim($text, '-');
    if ($text === '') $text = 'product';
    // Keep within seo_settings.page_identifier (varchar 100) so the slug can be
    // used directly as the SEO row identifier.
    if (strlen($text) > 90) $text = substr($text, 0, 90);
    return trim($text, '-');
}

// Ensure slug uniqueness within a brand (optionally excluding an id)
function uniqueProductSlug(PDO $pdo, $brand, $baseSlug, $excludeId = 0)
{
    $slug = $baseSlug;
    $suffix = 1;
    $stmt = $pdo->prepare("SELECT id FROM products WHERE brand = ? AND slug = ? AND id != ? LIMIT 1");
    while (true) {
        $stmt->execute([$brand, $slug, (int)$excludeId]);
        if (!$stmt->fetch()) return $slug;
        $suffix++;
        $slug = $baseSlug . '-' . $suffix;
    }
}

// Lightweight one-time migration: add `slug` column to products if it doesn't exist
// and backfill slugs for any existing rows. Safe to call on every request — it
// checks the schema and exits early once everything is in place.
function ensureProductSlugColumn(PDO $pdo)
{
    static $checked = false;
    if ($checked) return;
    try {
        $col = $pdo->query("SHOW COLUMNS FROM products LIKE 'slug'")->fetch();
        if (!$col) {
            $pdo->exec("ALTER TABLE products ADD COLUMN slug VARCHAR(150) DEFAULT NULL AFTER name");
            // Add unique key (brand, slug). NULLs are allowed multiple times in MySQL unique keys.
            try {
                $pdo->exec("ALTER TABLE products ADD UNIQUE KEY brand_slug (brand, slug)");
            } catch (Exception $e) { /* ignore if exists */ }
        }
        // Backfill any rows missing a slug
        $rows = $pdo->query("SELECT id, brand, name FROM products WHERE slug IS NULL OR slug = ''")->fetchAll();
        if ($rows) {
            $upd = $pdo->prepare("UPDATE products SET slug = ? WHERE id = ?");
            foreach ($rows as $r) {
                $base = generateSlug($r['name']);
                $unique = uniqueProductSlug($pdo, $r['brand'], $base, (int)$r['id']);
                $upd->execute([$unique, (int)$r['id']]);
            }
        }
        $checked = true;
    } catch (Exception $e) {
        // Don't break the app if migration fails (e.g. user lacks ALTER perms)
        error_log('ensureProductSlugColumn failed: ' . $e->getMessage());
    }
}
?>