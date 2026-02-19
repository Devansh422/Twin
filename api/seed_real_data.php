<?php
// api/seed_real_data.php
require_once 'config.php';

header('Content-Type: text/html; charset=utf-8');

$pdo = getDBConnection();
if (!$pdo)
    die("DB Connection Failed");

echo "<h1>Seeding Real Data...</h1>";

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// ==========================================
// 1. Truncate Tables
// ==========================================
echo "<h3>1. Clearing old data...</h3>";
$pdo->exec("SET FOREIGN_KEY_CHECKS = 0");
$pdo->exec("TRUNCATE TABLE products");
$pdo->exec("TRUNCATE TABLE blog_posts");
$pdo->exec("SET FOREIGN_KEY_CHECKS = 1");
echo "Tables truncated.<br>";

// ==========================================
// 2. Seed Blog Posts (Hardcoded)
// ==========================================
echo "<h3>2. Seeding Blog Posts...</h3>";

$blogs = [
    [
        'title' => 'The Future of Adhesive Technology',
        'category' => 'Industry News',
        'date' => '2026-01-15',
        'excerpt' => 'Discover the latest trends and innovations in the adhesive industry and what they mean for manufacturing and construction.',
        'content' => 'Full content pending...',
        'image' => 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=2070&auto=format&fit=crop'
    ],
    [
        'title' => '5 Ways to Boost Your Workshop\'s Efficiency',
        'category' => 'Productivity',
        'date' => '2026-01-22',
        'excerpt' => 'Simple changes and the right products can make a huge difference in your daily workflow and output quality.',
        'content' => 'Full content pending...',
        'image' => 'https://images.unsplash.com/photo-1521790797524-12432c82538e?q=80&w=2070&auto=format&fit=crop'
    ],
    [
        'title' => 'A Guide to Perfect Car Detailing at Home',
        'category' => 'DIY Projects',
        'date' => '2026-01-28',
        'excerpt' => 'Learn the secrets from the pros on how to get a showroom shine on your vehicle using our Evershine products.',
        'content' => 'Full content pending...',
        'image' => 'https://images.unsplash.com/photo-1607863680198-23d4b2565df0?q=80&w=2070&auto=format&fit=crop'
    ],
    [
        'title' => 'Inside Twin Tech: Our Commitment to Quality',
        'category' => 'Company Culture',
        'date' => '2026-02-01',
        'excerpt' => 'A look behind the scenes at our manufacturing process and the values that drive our team to deliver the best.',
        'content' => 'Full content pending...',
        'image' => 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop'
    ],
    [
        'title' => 'Extending the Life of Your Machinery',
        'category' => 'Maintenance Tips',
        'date' => '2026-02-05',
        'excerpt' => 'Proper maintenance is key. We share our top tips for using industrial sprays to protect and prolong your equipment\'s lifespan.',
        'content' => 'Full content pending...',
        'image' => 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=2070&auto=format&fit=crop'
    ],
    [
        'title' => 'Partnering with Local Distributors',
        'category' => 'Community',
        'date' => '2026-02-12',
        'excerpt' => 'Read about our successful partnership program and how we\'re growing together with businesses across the country.',
        'content' => 'Full content pending...',
        'image' => 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop'
    ]
];

$stmt = $pdo->prepare("INSERT INTO blog_posts (title, category, published_date, excerpt, content, image_path) VALUES (?, ?, ?, ?, ?, ?)");
foreach ($blogs as $b) {
    $stmt->execute([$b['title'], $b['category'], $b['date'], $b['excerpt'], $b['content'], $b['image']]);
    echo "Inserted blog: {$b['title']}<br>";
}

// ==========================================
// 3. Load Product Details
// ==========================================
echo "<h3>3. Loading Product Details...</h3>";
$globalDetails = [];

// Load Evershine details
$evershinePath = '../assets/evershine-details.json';
if (file_exists($evershinePath)) {
    $json = file_get_contents($evershinePath);
    $evDetails = json_decode($json, true);
    if ($evDetails) {
        $globalDetails = array_merge($globalDetails, $evDetails);
        echo "Loaded details for " . count($evDetails) . " Evershine items.<br>";
    } else {
        echo "Warning: Failed to decode Evershine details JSON.<br>";
    }
} else {
    echo "Warning: Evershine details file not found at $evershinePath<br>";
}

// Load Sprayzet details
$sprayzetPath = '../assets/sprayzet-details.json';
if (file_exists($sprayzetPath)) {
    $json = file_get_contents($sprayzetPath);
    $spDetails = json_decode($json, true);
    if ($spDetails) {
        $globalDetails = array_merge($globalDetails, $spDetails);
        echo "Loaded details for " . count($spDetails) . " Sprayzet items.<br>";
    } else {
        echo "Warning: Failed to decode Sprayzet details JSON.<br>";
    }
} else {
    echo "Warning: Sprayzet details file not found at $sprayzetPath<br>";
}

// Function to find details case-insensitive
function getProductDetails($name, &$allDetails)
{
    if (!$allDetails)
        return null;

    // Exact match
    if (isset($allDetails[$name]))
        return $allDetails[$name];

    // Case-insensitive match
    foreach ($allDetails as $key => $val) {
        if (strcasecmp($key, $name) === 0)
            return $val;
    }

    // Return default if exists
    if (isset($allDetails['default']))
        return $allDetails['default'];

    return [
        'description' => 'No description available.',
        'packSize' => 'N/A',
        'form' => 'N/A'
    ];
}

// ==========================================
// 4. Seed Products from JS Files
// ==========================================
echo "<h3>4. Seeding Products...</h3>";

$brands = [
    'evershine' => '../assets/car-care-logic.js',
    'sprayzet' => '../assets/product-logic.js',
    'twin-tapes' => '../assets/twin-tapes-logic.js',
    'twinzy' => '../assets/twinzy-logic.js'
];

$stmt = $pdo->prepare("INSERT INTO products (brand, category, name, image_path, description, details) VALUES (?, ?, ?, ?, ?, ?)");

foreach ($brands as $brandName => $filePath) {
    echo "<h4>Processing $brandName...</h4>";

    if (!file_exists($filePath)) {
        echo "File not found: $filePath<br>";
        continue;
    }

    $content = file_get_contents($filePath);

    // Extract JSON object using Regex
    // Look for: productsData = { ... };
    // This regex looks for the assignment, then a brace, then content, then the closing brace and semicolon.
    // We use a non-greedy match for content, but we need to ensure we capture the full object.

    // Simpler approach: Find first '{' and the last '};' before 'Admin panel' or end of file.
    // Most files have `productsData` as the first major object.

    $startPos = strpos($content, 'productsData = {');
    if ($startPos === false) {
        echo "Could not find productsData start in $brandName<br>";
        continue;
    }
    $startPos += 15; // move past "productsData = "

    // Find matching closing brace. Since we can't do recursive parsing easily without complex regex, 
    // and we know the structure is `};` followed by newline or next statement.
    // Let's look for `};` which is standard in these files.
    $endPos = strpos($content, '};', $startPos);

    if ($endPos === false) {
        // Fallback for files that might look different
        echo "Could not find productsData end in $brandName<br>";
        continue;
    }

    $jsonStr = substr($content, $startPos, $endPos - $startPos + 1);

    // Clean up JS specific things to make it valid JSON
    // 1. Remove trailing commas
    $jsonStr = preg_replace('/,\s*}/', '}', $jsonStr);
    $jsonStr = preg_replace('/,\s*\]/', ']', $jsonStr);

    // 2. Ensure keys are double quoted (they seem to be, but just in case)
    // The files viewed show keys are quoted in double quotes or single quotes.
    // If they are single quotes, we need to convert.
    // The files showed ` "TWO WHEELER BIKE": ...` so double quotes are used.

    $productsData = json_decode($jsonStr, true);

    if (json_last_error() !== JSON_ERROR_NONE) {
        echo "JSON Decode Error for $brandName: " . json_last_error_msg() . "<br>";
        echo "<textarea style='width:100%;height:100px;'>$jsonStr</textarea><br>";
        continue;
    }

    $count = 0;

    // Iterate Categories
    foreach ($productsData as $categoryName => $productsList) {
        foreach ($productsList as $prod) {
            $name = $prod['name'];

            // Fix image path: The JS has relative paths often starting with specific folders.
            // We want to store a path that is usable by the admin panel.
            // The admin panel is in /admin/
            // The assets are in /assets/
            // The imagePath in JS is often "BRAND WISE PRODUCTS..."
            // We should prepend "../assets/" if it doesn't have it, or just store it as is and let the frontend handle it?
            // The admin panel expects `../` relative to itself (which maps to root). 
            // Ideally, we store "assets/..." or "BRAND..." and ensure the frontend prepends "../assets/".
            // The current JS does: `imgSrc = '../' + encodedPath;`
            // So we should store the raw path from the JSON.
            // CAUTION: The JS logic does encoding. We should store the raw string.

            $imagePath = $prod['imagePath'];

            // Get Details
            $det = getProductDetails($name, $globalDetails);
            $desc = $det['description'] ?? '';

            // Prepare details JSON
            // We store the whole details object + any table data
            $detailsJson = json_encode($det);

            // Insert
            try {
                $stmt->execute([
                    $brandName,
                    $categoryName,
                    $name,
                    $imagePath,
                    $desc,
                    $detailsJson
                ]);
                $count++;
            } catch (PDOException $e) {
                echo "Error inserting $name: " . $e->getMessage() . "<br>";
            }
        }
    }
    echo "Inserted $count products for $brandName.<br>";
}

echo "<h2>Done! <a href='../admin/'>Go into Admin Panel</a></h2>";
?>