<?php
// api/submit_inquiry.php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(false, 'Invalid request method.');
}

// Get POST data (Multipart form data handling)
$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$phone = $_POST['phone'] ?? ''; // Optional
// Determine type based on source or explicit field
$type = 'Contact';
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

// Handle File (Resume) for Career
if (isset($_FILES['resume']) && $_FILES['resume']['error'] === UPLOAD_ERR_OK) {
    // For now, we won't actually save the file to disk to keep hosting simple, 
    // or we can save it to an 'uploads' folder.
    // Let's just save the filename metadata for now as requested by user constraints previously.
    // If strict file storage is needed: move_uploaded_file(...)
    $details['resume_filename'] = $_FILES['resume']['name'] . ' (' . round($_FILES['resume']['size'] / 1024, 1) . 'KB)';
}

$detailsJson = json_encode($details);
$message = $_POST['message'] ?? $_POST['business-plans'] ?? $_POST['details'] ?? '';

$pdo = getDBConnection();
if (!$pdo) {
    sendResponse(false, 'Database error. Please try again later.');
}

try {
    $stmt = $pdo->prepare("INSERT INTO inquiries (type, name, email, phone, details, message) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->execute([$type, $name, $email, $phone, $detailsJson, $message]);
    sendResponse(true, 'Inquiry submitted successfully.');
} catch (PDOException $e) {
    error_log("Insert Inquiry Error: " . $e->getMessage());
    sendResponse(false, 'Failed to save inquiry.');
}
?>