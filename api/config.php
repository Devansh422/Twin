<?php
// api/config.php

// Database Credentials
// ON HOSTINGER: Update these with your actual database details
define('DB_HOST', 'localhost');
define('DB_NAME', 'u280154569_twin_db'); // Example name, change this!
define('DB_USER', 'u280154569_twin_user'); // Example user, change this!
define('DB_PASS', 'V9#qL2!xR7@tZ4^mK8$wH3&cP6*eY1'); // Change this!

// Error Reporting (Turn off for production, on for debugging)
error_reporting(E_ALL);
ini_set('display_errors', 0); // Security: Don't show errors to user

// Set Headers for CORS (if needed) and JSON
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Adjust for security in production
header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle Preflight Options Request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database Connection
function getDBConnection()
{
    try {
        $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ];
        return new PDO($dsn, DB_USER, DB_PASS, $options);
    } catch (PDOException $e) {
        // Log error and return null
        error_log("Database Connection Error: " . $e->getMessage());
        return null;
    }
}

// Helper to send JSON response
function sendResponse($success, $message = '', $data = [])
{
    echo json_encode(['success' => $success, 'message' => $message, 'data' => $data]);
    exit();
}
?>