<?php
// api/submit_inquiry.php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(false, 'Invalid request method.');
}

// Get POST data (Multipart form data handling)
$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$phone = trim($_POST['phone'] ?? ''); // Optional
// Determine type based on source or explicit field
$type = 'Contact';
if (isset($_POST['lead_source']) || (isset($_POST['source']) && $_POST['source'] === 'lead'))
    $type = 'Lead';
if (isset($_POST['company-name']))
    $type = 'Distributor';
if (isset($_POST['apply-for']))
    $type = 'Career';

if (!$name || !$email) {
    sendResponse(false, 'Name and Email are required.');
}

// Collect other fields into a details array
$details = [];
foreach ($_POST as $key => $value) {
    if (!in_array($key, ['name', 'email', 'phone'])) {
        $details[$key] = $value;
    }
}

// Handle File (Resume) upload
$documentName = null;
$documentPath = null;

if (isset($_FILES['resume']) && $_FILES['resume']['error'] === UPLOAD_ERR_OK) {
    $uploadsDir = __DIR__ . '/../uploads';
    if (!is_dir($uploadsDir)) {
        mkdir($uploadsDir, 0755, true);
    }

    $originalName = $_FILES['resume']['name'];
    $fileSize = $_FILES['resume']['size'];
    $maxSize = 10 * 1024 * 1024; // 10MB limit

    if ($fileSize > $maxSize) {
        sendResponse(false, 'File too large. Maximum size is 10MB.');
    }

    // Validate file type
    $allowedExtensions = ['pdf', 'doc', 'docx', 'txt', 'rtf', 'jpg', 'jpeg', 'png'];
    $ext = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));
    if (!in_array($ext, $allowedExtensions)) {
        sendResponse(false, 'Invalid file type. Allowed: PDF, DOC, DOCX, TXT, RTF, JPG, PNG.');
    }

    // Generate unique filename to prevent overwrites and path traversal
    $safeName = uniqid('doc_', true) . '.' . $ext;
    $destPath = $uploadsDir . '/' . $safeName;

    if (move_uploaded_file($_FILES['resume']['tmp_name'], $destPath)) {
        $documentName = $originalName;
        $documentPath = 'uploads/' . $safeName;
        $details['resume_filename'] = $originalName . ' (' . round($fileSize / 1024, 1) . 'KB)';
    } else {
        error_log('Failed to move uploaded file: ' . $originalName);
    }
}

$detailsJson = json_encode($details);
$message = $_POST['message'] ?? $_POST['business-plans'] ?? $_POST['details'] ?? '';

$pdo = getDBConnection();
if (!$pdo) {
    sendResponse(false, 'Database error. Please try again later.');
}

try {
    $stmt = $pdo->prepare("INSERT INTO inquiries (type, name, email, phone, details, message, document_name, document_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([$type, $name, $email, $phone, $detailsJson, $message, $documentName, $documentPath]);
    sendResponse(true, 'Inquiry submitted successfully.');
} catch (PDOException $e) {
    error_log("Insert Inquiry Error: " . $e->getMessage());
    sendResponse(false, 'Failed to save inquiry.');
}
?>