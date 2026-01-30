
$files = @(
    "sprayzet.html",
    "evershine.html",
    "twinzy.html",
    "twin-tapes.html",
    "tapes.html",
    "about-us.html" # Verify all
)

$root = "c:\Users\sravi\Downloads\Twin"

# Specific known bad patterns to fix
# Key is Regex to match, Value is Replacement

# Fix 1: Twin Tapes pointing to sprayzet.html
# Need to capture the surrounding specific SVG context to be sure? 
# Or just: Any link with href="sprayzet.html" and text "Twin Tapes"
$corrections = @(
    @{
        Pattern = 'href="sprayzet\.html"([^>]*>[\s\S]*?Twin Tapes)'
        Replacement = 'href="twin-tapes.html"$1'
    },
    @{
        Pattern = 'href="twin-tapes\.html"([^>]*>[\s\S]*?Silox)'
        Replacement = 'href="#"$1'
    }
)

foreach ($file in $files) {
    $path = Join-Path $root $file
    if (Test-Path $path) {
        Write-Host "Fixing residuals in $file..."
        $content = Get-Content -Path $path -Raw -Encoding UTF8
        $originalContent = $content

        foreach ($fix in $corrections) {
             $content = [Regex]::Replace($content, $fix.Pattern, $fix.Replacement, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
        }

        if ($content -ne $originalContent) {
            Set-Content -Path $path -Value $content -Encoding UTF8
            Write-Host "Fixed $file"
        } else {
            Write-Host "No changes for $file"
        }
    }
}
Write-Host "Done."
