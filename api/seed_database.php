<?php
// api/seed_database.php
require_once 'config.php';

$pdo = getDBConnection();
if (!$pdo)
    die("DB Connection Failed");

echo "<h2>Seeding Database...</h2>";

// 1. Seed Blog Posts
$stmt = $pdo->query("SELECT count(*) FROM blog_posts");
if ($stmt->fetchColumn() == 0) {
    $sql = "INSERT INTO blog_posts (title, category, published_date, excerpt, content, image_path) VALUES 
    ('Welcome to our new Admin Panel', 'News', NOW(), 'We have upgraded to a dynamic database system.', 'This is a sample blog post to verify the database migration. you can edit or delete this.', '../assets/images/blog-default.jpg')";
    $pdo->query($sql);
    echo "Inserted sample blog post.<br>";
} else {
    echo "Blog posts already exist. Skipped.<br>";
}

// 2. Seed Products
$stmt = $pdo->query("SELECT count(*) FROM products");
if ($stmt->fetchColumn() == 0) {
    $brands = ['evershine', 'sprayzet', 'twin-tapes', 'twinzy'];

    $insert = $pdo->prepare("INSERT INTO products (brand, category, name, description, image_path, details) VALUES (?, ?, ?, ?, ?, ?)");

    foreach ($brands as $b) {
        $insert->execute([
            $b,
            'Sample Category',
            'Sample Product (' . ucfirst($b) . ')',
            'This is a sample product description.',
            '',
            json_encode(['packSize' => '1L', 'form' => 'Liquid'])
        ]);
        echo "Inserted sample product for $b.<br>";
    }
} else {
    echo "Products already exist. Skipped.<br>";
}

echo "<h3>Done! Go back to <a href='../admin/'>Admin Panel</a> and refresh.</h3>";
?>