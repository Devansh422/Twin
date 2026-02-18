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
    $stmt = $pdo->query("SELECT * FROM products ORDER BY created_at DESC");
    $allProducts = $stmt->fetchAll();

    // Structure products by brand/category for the frontend
    foreach ($allProducts as $p) {
        $brand = $p['brand']; // 'evershine', 'sprayzet', etc.
        $cat = $p['category'];

        // Frontend expects: productsData[brand][category] = [ {name, ...} ]
        if (!isset($data['products'][$brand]))
            $data['products'][$brand] = [];
        if (!isset($data['products'][$brand][$cat]))
            $data['products'][$brand][$cat] = [];

        // Extract details for separate details object if needed, or keep attached
        $prodObj = [
            'id' => $p['id'],
            'name' => $p['name'],
            'imagePath' => $p['image_path'],
            'imageData' => $p['image_data'],
            'description' => $p['description'],
            // merge JSON details
        ];

        // Frontend expects a separate 'details' object keyed by product name
        if ($p['details']) {
            $det = json_decode($p['details'], true);
            $data['details'][$p['name']] = array_merge($det, ['description' => $p['description']]);
        }

        $data['products'][$brand][$cat][] = $prodObj;
    }

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
        return [
            'id' => $i['id'],
            'type' => $i['type'],
            'date' => $i['submitted_at'],
            'data' => array_merge(
                ['name' => $i['name'], 'email' => $i['email'], 'phone' => $i['phone']],
                json_decode($i['details'], true) ?: []
            )
        ];
    }, $inquiries);

    sendResponse(true, 'Data loaded', $data);

} catch (PDOException $e) {
    error_log("Dashboard Data Error: " . $e->getMessage());
    sendResponse(false, 'Failed to fetch data');
}
?>