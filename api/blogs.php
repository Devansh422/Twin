<?php
// api/blogs.php - Public endpoint to fetch blog posts
require_once 'config.php';

$pdo = getDBConnection();
if (!$pdo) {
    sendResponse(false, 'Database connection failed');
}

try {
    // Single post by ID
    if (isset($_GET['id']) && is_numeric($_GET['id'])) {
        $stmt = $pdo->prepare("SELECT * FROM blog_posts WHERE id = ?");
        $stmt->execute([(int)$_GET['id']]);
        $b = $stmt->fetch();
        if ($b) {
            sendResponse(true, 'Blog fetched', [
                'id' => $b['id'],
                'title' => $b['title'],
                'category' => $b['category'],
                'date' => $b['published_date'],
                'image' => $b['image_path'],
                'imageData' => $b['image_data'],
                'excerpt' => $b['excerpt'],
                'content' => $b['content']
            ]);
        } else {
            sendResponse(false, 'Blog post not found');
        }
    }

    // All posts
    $stmt = $pdo->query("SELECT * FROM blog_posts ORDER BY published_date DESC");
    $blogs = $stmt->fetchAll();

    $data = array_map(function ($b) {
        return [
            'id' => $b['id'],
            'title' => $b['title'],
            'category' => $b['category'],
            'date' => $b['published_date'],
            'image' => $b['image_path'],
            'imageData' => $b['image_data'],
            'excerpt' => $b['excerpt'],
            'content' => $b['content']
        ];
    }, $blogs);

    sendResponse(true, 'Blogs fetched', $data);
} catch (PDOException $e) {
    error_log("Blog Fetch Error: " . $e->getMessage());
    sendResponse(false, 'Failed to fetch blogs');
}
?>
