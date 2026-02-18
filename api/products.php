<?php
// api/products.php
require_once 'config.php';
// Auth check moved to POST method only
// session_start(); // already called in config or here? config doesn't start session.
session_start();

$pdo = getDBConnection();
$input = json_decode(file_get_contents('php://input'), true);
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $brand = $_GET['brand'] ?? '';
    if (!$brand)
        sendResponse(false, 'Brand required');

    $stmt = $pdo->prepare("SELECT * FROM products WHERE brand = ?");
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

    // Add or Edit
    $action = $input['action'] ?? 'add';
    $brand = $input['brand'] ?? '';
    $category = $input['category'] ?? '';
    $name = $input['name'] ?? '';

    $desc = $input['description'] ?? '';
    $details = json_encode($input['details'] ?? []);
    $imgPath = $input['imagePath'] ?? '';
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
        $id = $input['id'] ?? 0;
        $stmt = $pdo->prepare("UPDATE products SET brand=?, category=?, name=?, image_path=?, image_data=?, description=?, details=? WHERE id=?");
        $stmt->execute([$brand, $category, $name, $imgPath, $imgData, $desc, $details, $id]);
        sendResponse(true, 'Product updated');
    } elseif ($action === 'delete') {
        $id = $input['id'] ?? 0;
        if (!$id)
            sendResponse(false, 'Missing id');
        $stmt = $pdo->prepare("DELETE FROM products WHERE id=?");
        $stmt->execute([$id]);
        sendResponse(true, 'Product deleted');
    }
}
?>