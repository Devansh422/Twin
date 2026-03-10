<?php
// api/products.php
require_once 'config.php';
session_start();

$pdo = getDBConnection();
if (!$pdo) {
    sendResponse(false, 'Database connection failed');
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $brand = $_GET['brand'] ?? '';
    if (!$brand)
        sendResponse(false, 'Brand required');

    // Return flat list of all products for search
    if ($brand === 'all') {
        $stmt = $pdo->query("SELECT name, brand, category, image_path FROM products ORDER BY brand, category, name");
        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $searchData = [];
        foreach ($products as $p) {
            $searchData[] = [
                'name' => $p['name'],
                'brand' => $p['brand'],
                'category' => $p['category'],
                'imagePath' => $p['image_path']
            ];
        }
        sendResponse(true, 'All products fetched', $searchData);
    }

    $stmt = $pdo->prepare("SELECT * FROM products WHERE brand = ? ORDER BY category, sort_order ASC, created_at ASC");
    $stmt->execute([$brand]);
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Format for frontend: Group by Category
    $data = [];
    foreach ($products as $p) {
        $cat = $p['category'];
        if (!isset($data[$cat]))
            $data[$cat] = [];

        $details = $p['details'] ? json_decode($p['details'], true) : null;
        $data[$cat][] = [
            'name' => $p['name'],
            'imagePath' => $p['image_path'],
            'imageData' => $p['image_data'],
            'description' => $p['description'],
            'details' => $details,
            'category' => $cat
        ];
    }

    sendResponse(true, 'Products fetched', $data);
}


if ($method === 'POST') {
    if (!isset($_SESSION['admin_logged_in']))
        sendResponse(false, 'Unauthorized');

    $input = json_decode(file_get_contents('php://input'), true);
    if (!$input) {
        sendResponse(false, 'Invalid JSON input');
    }

    $action = $input['action'] ?? 'add';
    $brand = trim($input['brand'] ?? '');
    $category = trim($input['category'] ?? '');
    $name = trim($input['name'] ?? '');

    $desc = trim($input['description'] ?? '');
    $details = json_encode($input['details'] ?? []);
    $imgPath = trim($input['imagePath'] ?? '');
    $imgData = $input['imageData'] ?? null;

    if ($action === 'add') {
        if (!$brand || !$category || !$name)
            sendResponse(false, 'Missing required fields');
        $stmt = $pdo->prepare("INSERT INTO products (brand, category, name, image_path, image_data, description, details) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$brand, $category, $name, $imgPath, $imgData, $desc, $details]);
        sendResponse(true, 'Product added');
    } elseif ($action === 'edit') {
        if (!$brand || !$category || !$name)
            sendResponse(false, 'Missing required fields');
        $id = isset($input['id']) && is_numeric($input['id']) ? (int)$input['id'] : 0;
        if (!$id) sendResponse(false, 'Missing product ID');
        $stmt = $pdo->prepare("UPDATE products SET brand=?, category=?, name=?, image_path=?, image_data=?, description=?, details=? WHERE id=?");
        $stmt->execute([$brand, $category, $name, $imgPath, $imgData, $desc, $details, $id]);
        sendResponse(true, 'Product updated');
    } elseif ($action === 'delete') {
        $id = isset($input['id']) && is_numeric($input['id']) ? (int)$input['id'] : 0;
        if (!$id)
            sendResponse(false, 'Missing product ID');
        $stmt = $pdo->prepare("DELETE FROM products WHERE id=?");
        $stmt->execute([$id]);
        sendResponse(true, 'Product deleted');
    } elseif ($action === 'reorder') {
        // Expects: { action: 'reorder', orders: [ { id: int, sort_order: int }, ... ] }
        $orders = $input['orders'] ?? [];
        if (!is_array($orders) || empty($orders))
            sendResponse(false, 'Missing order data');
        $stmt = $pdo->prepare("UPDATE products SET sort_order = ? WHERE id = ?");
        $pdo->beginTransaction();
        try {
            foreach ($orders as $item) {
                $id = isset($item['id']) && is_numeric($item['id']) ? (int)$item['id'] : 0;
                $sortOrder = isset($item['sort_order']) && is_numeric($item['sort_order']) ? (int)$item['sort_order'] : 0;
                if ($id > 0) {
                    $stmt->execute([$sortOrder, $id]);
                }
            }
            $pdo->commit();
            sendResponse(true, 'Product order updated');
        } catch (Exception $e) {
            $pdo->rollBack();
            sendResponse(false, 'Failed to update order');
        }
    } else {
        sendResponse(false, 'Invalid action');
    }
}
?>