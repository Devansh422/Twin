
$files = @(
    "sprayzet.html",
    "evershine.html",
    "twinzy.html",
    "twin-tapes.html",
    "about-us.html",
    "tapes.html"
)

$root = "c:\Users\sravi\Downloads\Twin"

# Robust Regex with whitespace handling for "Twin Tapes"
# Match: href="sprayzet.html" ... Twin Tapes 
# Replace with: href="twin-tapes.html"
$fixPattern = 'href="sprayzet\.html"([^>]*>[\s\S]*?Twin[\s\r\n]+Tapes)'
$replacement = 'href="twin-tapes.html"$1'

foreach ($file in $files) {
    $path = Join-Path $root $file
    if (Test-Path $path) {
        Write-Host "Robust fixing $file..."
        $content = Get-Content -Path $path -Raw -Encoding UTF8
        $originalContent = $content

        $content = [Regex]::Replace($content, $fixPattern, $replacement, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)

        if ($content -ne $originalContent) {
            Set-Content -Path $path -Value $content -Encoding UTF8
            Write-Host "Fixed whitespace issue in $file"
        } else {
            Write-Host "No changes for $file"
        }
    }
}
Write-Host "Done."
