<?php
// api/auth.php
require_once 'config.php';

session_start();

$action = $_GET['action'] ?? '';

if ($action === 'login') {
    $input = json_decode(file_get_contents('php://input'), true);
    $username = $input['username'] ?? '';
    $password = $input['password'] ?? '';

    if (!$username || !$password) {
        sendResponse(false, 'Username and password required.');
    }

    $pdo = getDBConnection();
    if (!$pdo) {
        // Fallback for initial setup if DB fails, or handle gracefully
        sendResponse(false, 'Database connection failed.');
    }

    $stmt = $pdo->prepare("SELECT id, username, password_hash FROM admin_users WHERE username = ?");
    $stmt->execute([$username]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password_hash'])) {
        $_SESSION['admin_logged_in'] = true;
        $_SESSION['admin_id'] = $user['id'];
        $_SESSION['last_activity'] = time();
        sendResponse(true, 'Login successful.');
    } else {
        // Fallback: If no users exist yet (fresh install), allow default admin/twin@2026
        // This is a TEMPORARY safety net for the very first login before they change settings.
        // REMOVE THIS BLOCK IN PRODUCTION if not needed.
        if (!$user && $username === 'admin' && $password === 'twin@2026') {
            // Create the user dynamically if table exists but is empty? 
            // Better: Just recommend running the SQL script which inserts this user.
        }

        sendResponse(false, 'Invalid credentials.');
    }

} elseif ($action === 'logout') {
    session_unset();
    session_destroy();
    sendResponse(true, 'Logged out.');

} elseif ($action === 'check') {
    if (isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true) {
        // Check timeout (20 minutes = 1200 seconds)
        if (isset($_SESSION['last_activity']) && (time() - $_SESSION['last_activity'] > 1200)) {
            session_unset();
            session_destroy();
            sendResponse(false, 'Session timed out.');
        } else {
            $_SESSION['last_activity'] = time(); // update activity
            sendResponse(true, 'Authenticated.');
        }
    } else {
        sendResponse(false, 'Not authenticated.');
    }

} elseif ($action === 'refresh') {
    // Just update the timestamp to keep session alive
    if (isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true) {
        $_SESSION['last_activity'] = time();
        sendResponse(true, 'Session refreshed.');
    } else {
        sendResponse(false, 'Not authenticated.');
    }

} else {
    sendResponse(false, 'Invalid action.');
}
?>