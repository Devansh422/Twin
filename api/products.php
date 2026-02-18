<?php
// api/products.php
require_once 'config.php';
session_start();
if (!isset($_SESSION['admin_logged_in']))
    sendResponse(false, 'Unauthorized');

$pdo = getDBConnection();
$input = json_decode(file_get_contents('php://input'), true);
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    // Add or Edit
    $action = $input['action'] ?? 'add';
    $brand = $input['brand'] ?? '';
    $category = $input['category'] ?? '';
    $name = $input['name'] ?? '';
    if (!$brand || !$category || !$name)
        sendResponse(false, 'Missing required fields');

    $desc = $input['description'] ?? '';
    $details = json_encode($input['details'] ?? []);
    $imgPath = $input['imagePath'] ?? '';
    $imgData = $input['imageData'] ?? null;

    if ($action === 'add') {
        $stmt = $pdo->prepare("INSERT INTO products (brand, category, name, image_path, image_data, description, details) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$brand, $category, $name, $imgPath, $imgData, $desc, $details]);
        sendResponse(true, 'Product added');
    } elseif ($action === 'edit') {
        $id = $input['id'] ?? 0;
        $stmt = $pdo->prepare("UPDATE products SET brand=?, category=?, name=?, image_path=?, image_data=?, description=?, details=? WHERE id=?");
        $stmt->execute([$brand, $category, $name, $imgPath, $imgData, $desc, $details, $id]);
        sendResponse(true, 'Product updated');
    } elseif ($action === 'delete') {
        $id = $input['id'] ?? 0;
        $stmt = $pdo->prepare("DELETE FROM products WHERE id=?");
        $stmt->execute([$id]);
        sendResponse(true, 'Product deleted');
    }
}
?>