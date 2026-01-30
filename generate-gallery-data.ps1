$galleryRoot = "$PSScriptRoot\GALLERY"
$outputFile = "$PSScriptRoot\gallery-data.js"

$categories = @(
    "CSR ACTIVITIES",
    "EVENTS AND CELEBRATION",
    "EXHIBITIONS & TRADESHOWS",
    "TWIN STAFF"
)

$validExtensions = @(".jpg", ".jpeg", ".png", ".gif", ".webp")

$galleryData = @()

foreach ($category in $categories) {
    $categoryPath = Join-Path $galleryRoot $category
    if (Test-Path $categoryPath) {
        $images = Get-ChildItem -Path $categoryPath -File | Where-Object { $validExtensions -contains $_.Extension.ToLower() }
        
        foreach ($img in $images) {
            # Relative path construction: GALLERY/Category/Filename
            # We specifically want forward slashes for web URLs and percent encoding for spaces
            $relPath = "GALLERY/$category/" + $img.Name
            
            # Simple URL encoding for spaces (browsers handle basic paths, but spaces need %20 usually in CSS urls or strictly valid HTML)
            # However, for <img src="..."> browsers explain specific spaces fine. 
            # Sticking to raw path or basic replace for safety if needed, JS will handle it.
            # Let's keep it simple string for now.
            
            $galleryData += @{
                category = $category
                src = $relPath
            }
        }
    }
}

$json = $galleryData | ConvertTo-Json -Depth 3 -Compress
$jsContent = "const galleryData = $json;"

Set-Content -Path $outputFile -Value $jsContent -Encoding UTF8

Write-Host "Generated gallery-data.js with $($galleryData.Count) images."