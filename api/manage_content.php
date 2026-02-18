<?php
// api/manage_content.php
// Combined logic for Blogs and Inquiries deletion
require_once 'config.php';
session_start();
if (!isset($_SESSION['admin_logged_in']))
    sendResponse(false, 'Unauthorized');

$pdo = getDBConnection();
$input = json_decode(file_get_contents('php://input'), true);

$type = $_GET['type'] ?? ''; // 'blog' or 'inquiry'

if ($type === 'blog') {
    $action = $input['action'] ?? '';

    if ($action === 'save') {
        $id = $input['id'] ?? null; // If ID exists, it's an edit
        $title = $input['title'];
        $cat = $input['category'];
        $date = $input['date'];
        $img = $input['image'];
        $imgDat = $input['imageData'];
        $exc = $input['excerpt'];
        $cont = $input['content'];

        if ($id) {
            $stmt = $pdo->prepare("UPDATE blog_posts SET title=?, category=?, published_date=?, image_path=?, image_data=?, excerpt=?, content=? WHERE id=?");
            $stmt->execute([$title, $cat, $date, $img, $imgDat, $exc, $cont, $id]);
        } else {
            $stmt = $pdo->prepare("INSERT INTO blog_posts (title, category, published_date, image_path, image_data, excerpt, content) VALUES (?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([$title, $cat, $date, $img, $imgDat, $exc, $cont]);
        }
        sendResponse(true, 'Blog post saved');

    } elseif ($action === 'delete') {
        $id = $input['id'];
        $stmt = $pdo->prepare("DELETE FROM blog_posts WHERE id=?");
        $stmt->execute([$id]);
        sendResponse(true, 'Blog post deleted');
    }

} elseif ($type === 'inquiry') {
    // Only delete needed for inquiries
    $action = $input['action'] ?? '';
    if ($action === 'delete') {
        $id = $input['id'];
        $stmt = $pdo->prepare("DELETE FROM inquiries WHERE id=?");
        $stmt->execute([$id]);
        sendResponse(true, 'Inquiry deleted');
    }
} else {
    sendResponse(false, 'Invalid type');
}
?>