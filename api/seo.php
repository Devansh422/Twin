<?php
// api/seo.php
// SEO settings CRUD endpoint
require_once 'config.php';

// Public GET: allow fetching SEO for a specific page without auth
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $pdo = getDBConnection();
    if (!$pdo) sendResponse(false, 'Database connection failed');

    $pageType = $_GET['page_type'] ?? '';
    $pageId = $_GET['page_identifier'] ?? '';

    if ($pageType && $pageId) {
        // Fetch single SEO entry (public)
        $stmt = $pdo->prepare("SELECT * FROM seo_settings WHERE page_type = ? AND page_identifier = ?");
        $stmt->execute([$pageType, $pageId]);
        $row = $stmt->fetch();
        sendResponse(true, 'OK', $row ?: []);
    }

    // Fetch all SEO entries (admin only)
    session_start();
    if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
        sendResponse(false, 'Unauthorized');
    }

    $stmt = $pdo->query("SELECT * FROM seo_settings ORDER BY page_type, page_identifier");
    $rows = $stmt->fetchAll();
    sendResponse(true, 'OK', $rows);
}

// POST: admin-only operations
session_start();
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    sendResponse(false, 'Unauthorized');
}

$pdo = getDBConnection();
if (!$pdo) sendResponse(false, 'Database connection failed');

$input = json_decode(file_get_contents('php://input'), true);
$action = $input['action'] ?? '';

if ($action === 'save') {
    $pageType = trim($input['page_type'] ?? '');
    $pageId = trim($input['page_identifier'] ?? '');

    if (!$pageType || !$pageId) {
        sendResponse(false, 'page_type and page_identifier are required');
    }

    $fields = [
        'meta_title', 'meta_description', 'meta_keywords',
        'canonical_url', 'robots',
        'og_title', 'og_description', 'og_image', 'og_type',
        'twitter_card', 'twitter_title', 'twitter_description', 'twitter_image',
        'schema_json', 'custom_head'
    ];

    // Check if entry exists
    $stmt = $pdo->prepare("SELECT id FROM seo_settings WHERE page_type = ? AND page_identifier = ?");
    $stmt->execute([$pageType, $pageId]);
    $existing = $stmt->fetch();

    if ($existing) {
        // Update
        $sets = [];
        $vals = [];
        foreach ($fields as $f) {
            if (array_key_exists($f, $input)) {
                $sets[] = "$f = ?";
                $vals[] = $input[$f];
            }
        }
        if (empty($sets)) {
            sendResponse(false, 'No fields to update');
        }
        $vals[] = $existing['id'];
        $sql = "UPDATE seo_settings SET " . implode(', ', $sets) . " WHERE id = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute($vals);
    } else {
        // Insert
        $cols = ['page_type', 'page_identifier'];
        $placeholders = ['?', '?'];
        $vals = [$pageType, $pageId];

        foreach ($fields as $f) {
            if (array_key_exists($f, $input)) {
                $cols[] = $f;
                $placeholders[] = '?';
                $vals[] = $input[$f];
            }
        }

        $sql = "INSERT INTO seo_settings (" . implode(', ', $cols) . ") VALUES (" . implode(', ', $placeholders) . ")";
        $stmt = $pdo->prepare($sql);
        $stmt->execute($vals);
    }

    sendResponse(true, 'SEO settings saved');

} elseif ($action === 'delete') {
    $pageType = trim($input['page_type'] ?? '');
    $pageId = trim($input['page_identifier'] ?? '');

    if (!$pageType || !$pageId) {
        sendResponse(false, 'page_type and page_identifier are required');
    }

    $stmt = $pdo->prepare("DELETE FROM seo_settings WHERE page_type = ? AND page_identifier = ?");
    $stmt->execute([$pageType, $pageId]);
    sendResponse(true, 'SEO settings deleted');

} else {
    sendResponse(false, 'Invalid action');
}
?>