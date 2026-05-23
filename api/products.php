<?php
// api/products.php
require_once 'config.php';
session_start();

$pdo = getDBConnection();
if (!$pdo) {
    sendResponse(false, 'Database connection failed');
}

// Ensure the products table has a slug column and existing rows are backfilled.
ensureProductSlugColumn($pdo);

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $brand = $_GET['brand'] ?? '';
    if (!$brand)
        sendResponse(false, 'Brand required');

    // Lookup a single product by slug (used by SEO loader and direct product URLs)
    $slugParam = trim($_GET['slug'] ?? '');
    if ($slugParam !== '') {
        $stmt = $pdo->prepare("SELECT * FROM products WHERE brand = ? AND slug = ? LIMIT 1");
        $stmt->execute([$brand, $slugParam]);
        $p = $stmt->fetch(PDO::FETCH_ASSOC);
        if (!$p) sendResponse(false, 'Not found');
        $details = $p['details'] ? json_decode($p['details'], true) : null;
        sendResponse(true, 'OK', [
            'id' => (int)$p['id'],
            'name' => $p['name'],
            'slug' => $p['slug'],
            'brand' => $p['brand'],
            'category' => $p['category'],
            'imagePath' => $p['image_path'],
            'imageData' => $p['image_data'],
            'description' => $p['description'],
            'details' => $details,
        ]);
    }

    // Return flat list of all products for search
    if ($brand === 'all') {
        $stmt = $pdo->query("SELECT name, slug, brand, category, image_path FROM products ORDER BY brand, category, name");
        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $searchData = [];
        foreach ($products as $p) {
            $searchData[] = [
                'name' => $p['name'],
                'slug' => $p['slug'],
                'brand' => $p['brand'],
                'category' => $p['category'],
                'imagePath' => $p['image_path']
            ];
        }
        sendResponse(true, 'All products fetched', $searchData);
    }

    $stmt = $pdo->prepare("SELECT * FROM products WHERE brand = ? ORDER BY category, sort_order ASC, created_at ASC");
    $stmt->execute([$brand]);
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Fetch category ordering for this brand
    $catOrderMap = [];
    try {
        $catOrderStmt = $pdo->prepare("SELECT category, sort_order FROM category_order WHERE brand = ? ORDER BY sort_order ASC");
        $catOrderStmt->execute([$brand]);
        $catOrderRows = $catOrderStmt->fetchAll(PDO::FETCH_ASSOC);
        foreach ($catOrderRows as $row) {
            $catOrderMap[$row['category']] = (int)$row['sort_order'];
        }
    } catch (Exception $e) {
        // Table may not exist yet
    }

    // Format for frontend: Group by Category
    $data = [];
    foreach ($products as $p) {
        $cat = $p['category'];
        if (!isset($data[$cat]))
            $data[$cat] = [];

        $details = $p['details'] ? json_decode($p['details'], true) : null;
        $data[$cat][] = [
            'id' => (int)$p['id'],
            'name' => $p['name'],
            'slug' => $p['slug'],
            'imagePath' => $p['image_path'],
            'imageData' => $p['image_data'],
            'description' => $p['description'],
            'details' => $details,
            'category' => $cat
        ];
    }

    // Sort categories by custom order (unordered categories go to the end)
    if (!empty($catOrderMap)) {
        uksort($data, function($a, $b) use ($catOrderMap) {
            $orderA = isset($catOrderMap[$a]) ? $catOrderMap[$a] : PHP_INT_MAX;
            $orderB = isset($catOrderMap[$b]) ? $catOrderMap[$b] : PHP_INT_MAX;
            return $orderA - $orderB;
        });
    }

    sendResponse(true, 'Products fetched', $data);
}


if ($method === 'POST') {
    if (!isset($_SESSION['admin_logged_in']))
        sendResponse(false, 'Unauthorized');

    $input = json_decode(file_get_contents('php://input'), true);
    if (!$input) {
        sendResponse(false, 'Invalid JSON input');
    }

    $action = $input['action'] ?? 'add';
    $brand = trim($input['brand'] ?? '');
    $category = trim($input['category'] ?? '');
    $name = trim($input['name'] ?? '');

    $desc = trim($input['description'] ?? '');
    $details = json_encode($input['details'] ?? []);
    $imgPath = trim($input['imagePath'] ?? '');
    $imgData = $input['imageData'] ?? null;

    // Optional explicit slug from admin (will be sanitized + made unique)
    $slugInput = isset($input['slug']) ? trim($input['slug']) : '';

    if ($action === 'add') {
        if (!$brand || !$category || !$name)
            sendResponse(false, 'Missing required fields');

        $baseSlug = $slugInput !== '' ? generateSlug($slugInput) : generateSlug($name);
        $slug = uniqueProductSlug($pdo, $brand, $baseSlug, 0);

        $stmt = $pdo->prepare("INSERT INTO products (brand, category, name, slug, image_path, image_data, description, details) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$brand, $category, $name, $slug, $imgPath, $imgData, $desc, $details]);
        $newId = (int)$pdo->lastInsertId();
        sendResponse(true, 'Product added', ['id' => $newId, 'slug' => $slug]);

    } elseif ($action === 'edit') {
        if (!$brand || !$category || !$name)
            sendResponse(false, 'Missing required fields');
        $id = isset($input['id']) && is_numeric($input['id']) ? (int)$input['id'] : 0;
        if (!$id) sendResponse(false, 'Missing product ID');

        // Get current slug to keep SEO links stable when the name/slug doesn't change
        $cur = $pdo->prepare("SELECT slug FROM products WHERE id = ?");
        $cur->execute([$id]);
        $curRow = $cur->fetch(PDO::FETCH_ASSOC);
        $currentSlug = $curRow ? (string)$curRow['slug'] : '';

        if ($slugInput !== '') {
            $baseSlug = generateSlug($slugInput);
        } elseif ($currentSlug !== '') {
            $baseSlug = $currentSlug; // keep existing slug if admin didn't change it
        } else {
            $baseSlug = generateSlug($name);
        }
        $slug = uniqueProductSlug($pdo, $brand, $baseSlug, $id);

        // If the slug changed, migrate any associated SEO row to the new identifier
        if ($currentSlug !== '' && $currentSlug !== $slug) {
            try {
                $migrate = $pdo->prepare("UPDATE seo_settings SET page_identifier = ? WHERE page_type = 'product' AND page_identifier = ?");
                $migrate->execute([$slug, $currentSlug]);
            } catch (Exception $e) { /* ignore */ }
        }

        $stmt = $pdo->prepare("UPDATE products SET brand=?, category=?, name=?, slug=?, image_path=?, image_data=?, description=?, details=? WHERE id=?");
        $stmt->execute([$brand, $category, $name, $slug, $imgPath, $imgData, $desc, $details, $id]);
        sendResponse(true, 'Product updated', ['id' => $id, 'slug' => $slug]);

    } elseif ($action === 'delete') {
        $id = isset($input['id']) && is_numeric($input['id']) ? (int)$input['id'] : 0;
        if (!$id)
            sendResponse(false, 'Missing product ID');

        // Also delete the product's SEO entry (if any) so we don't leave orphans
        try {
            $look = $pdo->prepare("SELECT slug FROM products WHERE id = ?");
            $look->execute([$id]);
            $row = $look->fetch(PDO::FETCH_ASSOC);
            if ($row && !empty($row['slug'])) {
                $delSeo = $pdo->prepare("DELETE FROM seo_settings WHERE page_type = 'product' AND page_identifier = ?");
                $delSeo->execute([$row['slug']]);
            }
        } catch (Exception $e) { /* ignore */ }

        $stmt = $pdo->prepare("DELETE FROM products WHERE id=?");
        $stmt->execute([$id]);
        sendResponse(true, 'Product deleted');
    } elseif ($action === 'reorder') {
        // Expects: { action: 'reorder', orders: [ { id: int, sort_order: int }, ... ] }
        $orders = $input['orders'] ?? [];
        if (!is_array($orders) || empty($orders))
            sendResponse(false, 'Missing order data');
        $stmt = $pdo->prepare("UPDATE products SET sort_order = ? WHERE id = ?");
        $pdo->beginTransaction();
        try {
            foreach ($orders as $item) {
                $id = isset($item['id']) && is_numeric($item['id']) ? (int)$item['id'] : 0;
                $sortOrder = isset($item['sort_order']) && is_numeric($item['sort_order']) ? (int)$item['sort_order'] : 0;
                if ($id > 0) {
                    $stmt->execute([$sortOrder, $id]);
                }
            }
            $pdo->commit();
            sendResponse(true, 'Product order updated');
        } catch (Exception $e) {
            $pdo->rollBack();
            sendResponse(false, 'Failed to update order');
        }
    } elseif ($action === 'reorder_categories') {
        // Expects: { action: 'reorder_categories', brand: string, orders: [ { category: string, sort_order: int }, ... ] }
        if (!$brand) sendResponse(false, 'Brand required');
        $orders = $input['orders'] ?? [];
        if (!is_array($orders) || empty($orders))
            sendResponse(false, 'Missing category order data');
        $pdo->beginTransaction();
        try {
            // Delete existing order for this brand and re-insert
            $delStmt = $pdo->prepare("DELETE FROM category_order WHERE brand = ?");
            $delStmt->execute([$brand]);
            $insStmt = $pdo->prepare("INSERT INTO category_order (brand, category, sort_order) VALUES (?, ?, ?)");
            foreach ($orders as $item) {
                $cat = trim($item['category'] ?? '');
                $sortOrder = isset($item['sort_order']) && is_numeric($item['sort_order']) ? (int)$item['sort_order'] : 0;
                if ($cat !== '') {
                    $insStmt->execute([$brand, $cat, $sortOrder]);
                }
            }
            $pdo->commit();
            sendResponse(true, 'Category order updated');
        } catch (Exception $e) {
            $pdo->rollBack();
            sendResponse(false, 'Failed to update category order');
        }
    } else {
        sendResponse(false, 'Invalid action');
    }
}
?>