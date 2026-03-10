<?php
// api/manage_content.php
// Combined logic for Blogs and Inquiries management
require_once 'config.php';
session_start();
if (!isset($_SESSION['admin_logged_in']))
    sendResponse(false, 'Unauthorized');

$pdo = getDBConnection();
if (!$pdo) {
    sendResponse(false, 'Database connection failed');
}

$input = json_decode(file_get_contents('php://input'), true);

$type = $_GET['type'] ?? ''; // 'blog' or 'inquiry'

if ($type === 'blog') {
    $action = $input['action'] ?? '';

    if ($action === 'save') {
        $id = isset($input['id']) && is_numeric($input['id']) ? (int)$input['id'] : null;
        $title = trim($input['title'] ?? '');
        $cat = trim($input['category'] ?? 'Uncategorized');
        $date = $input['date'] ?? null;
        $img = trim($input['image'] ?? '');
        $imgDat = $input['imageData'] ?? null;
        $exc = trim($input['excerpt'] ?? '');
        $cont = trim($input['content'] ?? '');

        if (!$title) {
            sendResponse(false, 'Title is required');
        }

        // Validate date format
        if ($date && !preg_match('/^\d{4}-\d{2}-\d{2}$/', $date)) {
            sendResponse(false, 'Invalid date format');
        }

        if ($id) {
            $stmt = $pdo->prepare("UPDATE blog_posts SET title=?, category=?, published_date=?, image_path=?, image_data=?, excerpt=?, content=? WHERE id=?");
            $stmt->execute([$title, $cat, $date, $img, $imgDat, $exc, $cont, $id]);
        } else {
            $stmt = $pdo->prepare("INSERT INTO blog_posts (title, category, published_date, image_path, image_data, excerpt, content) VALUES (?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([$title, $cat, $date, $img, $imgDat, $exc, $cont]);
        }
        sendResponse(true, 'Blog post saved');

    } elseif ($action === 'delete') {
        $id = isset($input['id']) && is_numeric($input['id']) ? (int)$input['id'] : 0;
        if (!$id) {
            sendResponse(false, 'Missing blog post ID');
        }
        $stmt = $pdo->prepare("DELETE FROM blog_posts WHERE id=?");
        $stmt->execute([$id]);
        sendResponse(true, 'Blog post deleted');
    } else {
        sendResponse(false, 'Invalid action');
    }

} elseif ($type === 'inquiry') {
    $action = $input['action'] ?? '';
    if ($action === 'delete') {
        $id = isset($input['id']) && is_numeric($input['id']) ? (int)$input['id'] : 0;
        if (!$id) {
            sendResponse(false, 'Missing inquiry ID');
        }
        // Delete the associated document file if it exists
        $stmt = $pdo->prepare("SELECT document_path FROM inquiries WHERE id = ?");
        $stmt->execute([$id]);
        $row = $stmt->fetch();
        if ($row && !empty($row['document_path'])) {
            $filePath = __DIR__ . '/../' . $row['document_path'];
            $realPath = realpath($filePath);
            $uploadsDir = realpath(__DIR__ . '/../uploads');
            if ($realPath && $uploadsDir && strpos($realPath, $uploadsDir) === 0 && file_exists($realPath)) {
                unlink($realPath);
            }
        }
        $stmt = $pdo->prepare("DELETE FROM inquiries WHERE id=?");
        $stmt->execute([$id]);
        sendResponse(true, 'Inquiry deleted');
    } elseif ($action === 'delete_document') {
        $id = isset($input['id']) && is_numeric($input['id']) ? (int)$input['id'] : 0;
        if (!$id) {
            sendResponse(false, 'Missing inquiry ID');
        }
        // Delete only the document, keep the inquiry
        $stmt = $pdo->prepare("SELECT document_path FROM inquiries WHERE id = ?");
        $stmt->execute([$id]);
        $row = $stmt->fetch();
        if ($row && !empty($row['document_path'])) {
            $filePath = __DIR__ . '/../' . $row['document_path'];
            $realPath = realpath($filePath);
            $uploadsDir = realpath(__DIR__ . '/../uploads');
            if ($realPath && $uploadsDir && strpos($realPath, $uploadsDir) === 0 && file_exists($realPath)) {
                unlink($realPath);
            }
        }
        $stmt = $pdo->prepare("UPDATE inquiries SET document_name = NULL, document_path = NULL WHERE id = ?");
        $stmt->execute([$id]);
        sendResponse(true, 'Document deleted');
    } else {
        sendResponse(false, 'Invalid action');
    }
} else {
    sendResponse(false, 'Invalid type');
}
?>