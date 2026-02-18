<?php
// api/setup_admin.php
require_once 'config.php';

$pdo = getDBConnection();
if (!$pdo) {
    die("Database connection failed. Check config.php");
}

$username = 'admin';
$password = 'twin@2026';
$hash = password_hash($password, PASSWORD_DEFAULT);

// Check if user exists
$stmt = $pdo->prepare("SELECT id FROM admin_users WHERE username = ?");
$stmt->execute([$username]);
$user = $stmt->fetch();

if ($user) {
    // Update existing user
    $update = $pdo->prepare("UPDATE admin_users SET password_hash = ? WHERE username = ?");
    $update->execute([$hash, $username]);
    echo "Success! Admin password reset to: $password";
} else {
    // Insert new user
    $insert = $pdo->prepare("INSERT INTO admin_users (username, password_hash) VALUES (?, ?)");
    $insert->execute([$username, $hash]);
    echo "Success! Admin user created.<br>Username: $username<br>Password: $password";
}
?>