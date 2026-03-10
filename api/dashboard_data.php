<?php
// api/dashboard_data.php
require_once 'config.php';

session_start();
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    sendResponse(false, 'Unauthorized');
}

$pdo = getDBConnection();
if (!$pdo) {
    sendResponse(false, 'Database connection failed');
}

$data = [
    'products' => [],
    'details' => [],
    'blogs' => [],
    'inquiries' => []
];

try {
    // 1. Fetch Products
    $stmt = $pdo->query("SELECT * FROM products ORDER BY brand, category, sort_order ASC, created_at ASC");
    $allProducts = $stmt->fetchAll();

    // Fetch all category orderings
    $catOrderMap = [];
    try {
        $catOrderStmt = $pdo->query("SELECT brand, category, sort_order FROM category_order ORDER BY brand, sort_order ASC");
        $catOrderRows = $catOrderStmt->fetchAll();
        foreach ($catOrderRows as $row) {
            $catOrderMap[$row['brand']][$row['category']] = (int)$row['sort_order'];
        }
    } catch (Exception $e) {
        // Table may not exist yet
    }

    // Structure products by brand/category for the frontend
    foreach ($allProducts as $p) {
        $brand = $p['brand']; // 'evershine', 'sprayzet', etc.
        $cat = $p['category'];

        // Frontend expects: productsData[brand][category] = [ {name, ...} ]
        if (!isset($data['products'][$brand]))
            $data['products'][$brand] = [];
        if (!isset($data['products'][$brand][$cat]))
            $data['products'][$brand][$cat] = [];

        // Decode details JSON and embed directly in product object (keyed by ID, no name collisions)
        $det = $p['details'] ? json_decode($p['details'], true) : [];
        if (!is_array($det)) $det = [];

        $prodObj = [
            'id' => $p['id'],
            'name' => $p['name'],
            'imagePath' => $p['image_path'],
            'imageData' => $p['image_data'],
            'description' => $p['description'],
            'details' => $det,
            'sort_order' => (int)($p['sort_order'] ?? 0),
        ];

        // Also keep backward-compatible name-keyed details map (uses product ID suffix to avoid collisions)
        $detWithDesc = array_merge($det, ['description' => $p['description'] ?? '']);
        $data['details'][$p['id']] = $detWithDesc;

        $data['products'][$brand][$cat][] = $prodObj;
    }

    // Sort categories within each brand by custom order
    foreach ($data['products'] as $brand => &$categories) {
        if (isset($catOrderMap[$brand]) && !empty($catOrderMap[$brand])) {
            $brandOrder = $catOrderMap[$brand];
            uksort($categories, function($a, $b) use ($brandOrder) {
                $orderA = isset($brandOrder[$a]) ? $brandOrder[$a] : PHP_INT_MAX;
                $orderB = isset($brandOrder[$b]) ? $brandOrder[$b] : PHP_INT_MAX;
                return $orderA - $orderB;
            });
        }
    }
    unset($categories);

    // 2. Fetch Blogs
    $stmt = $pdo->query("SELECT * FROM blog_posts ORDER BY published_date DESC");
    $blogs = $stmt->fetchAll();
    // Map to frontend structure
    $data['blogs'] = array_map(function ($b) {
        return [
            'id' => $b['id'],
            'title' => $b['title'],
            'category' => $b['category'],
            'date' => $b['published_date'],
            'image' => $b['image_path'],
            'imageData' => $b['image_data'],
            'excerpt' => $b['excerpt'],
            'content' => $b['content']
        ];
    }, $blogs);

    // 3. Fetch Inquiries
    $stmt = $pdo->query("SELECT * FROM inquiries ORDER BY submitted_at DESC");
    $inquiries = $stmt->fetchAll();
    $data['inquiries'] = array_map(function ($i) {
        $item = [
            'id' => $i['id'],
            'type' => $i['type'],
            'date' => $i['submitted_at'],
            'data' => array_merge(
                ['name' => $i['name'], 'email' => $i['email'], 'phone' => $i['phone']],
                json_decode($i['details'], true) ?: []
            )
        ];
        if (!empty($i['document_name'])) {
            $item['document_name'] = $i['document_name'];
        }
        return $item;
    }, $inquiries);

    sendResponse(true, 'Data loaded', $data);

} catch (PDOException $e) {
    error_log("Dashboard Data Error: " . $e->getMessage());
    sendResponse(false, 'Failed to fetch data');
}
?>