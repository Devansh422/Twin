<?php
// api/download_document.php
// Secure endpoint for admin to download uploaded documents
require_once 'config.php';

// Override JSON header from config for file downloads
header_remove('Content-Type');

session_start();
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    http_response_code(403);
    echo 'Unauthorized';
    exit();
}

$id = isset($_GET['id']) && is_numeric($_GET['id']) ? (int)$_GET['id'] : 0;
if (!$id) {
    http_response_code(400);
    echo 'Invalid request';
    exit();
}

$pdo = getDBConnection();
if (!$pdo) {
    http_response_code(500);
    echo 'Database error';
    exit();
}

$stmt = $pdo->prepare("SELECT document_name, document_path FROM inquiries WHERE id = ?");
$stmt->execute([$id]);
$row = $stmt->fetch();

if (!$row || !$row['document_path']) {
    http_response_code(404);
    echo 'Document not found';
    exit();
}

$filePath = __DIR__ . '/../' . $row['document_path'];

// Validate the resolved path stays within the uploads directory
$realPath = realpath($filePath);
$uploadsDir = realpath(__DIR__ . '/../uploads');
if (!$realPath || !$uploadsDir || strpos($realPath, $uploadsDir) !== 0) {
    http_response_code(404);
    echo 'Document not found';
    exit();
}

if (!file_exists($realPath)) {
    http_response_code(404);
    echo 'File not found on server';
    exit();
}

// Determine MIME type
$ext = strtolower(pathinfo($row['document_name'], PATHINFO_EXTENSION));
$mimeTypes = [
    'pdf'  => 'application/pdf',
    'doc'  => 'application/msword',
    'docx' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'txt'  => 'text/plain',
    'rtf'  => 'application/rtf',
    'jpg'  => 'image/jpeg',
    'jpeg' => 'image/jpeg',
    'png'  => 'image/png',
];
$mime = $mimeTypes[$ext] ?? 'application/octet-stream';

// Sanitize filename for Content-Disposition
$safeName = preg_replace('/[^a-zA-Z0-9._-]/', '_', $row['document_name']);

header('Content-Type: ' . $mime);
header('Content-Disposition: attachment; filename="' . $safeName . '"');
header('Content-Length: ' . filesize($realPath));
header('Cache-Control: no-cache, must-revalidate');

readfile($realPath);
exit();
?>
