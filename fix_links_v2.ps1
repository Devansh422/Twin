
$files = @(
    "index.html",
    "sprayzet.html",
    "evershine.html",
    "twinzy.html",
    "twin-tapes.html",
    "tapes.html",
    "about-us.html"
)

$root = "c:\Users\sravi\Downloads\Twin"

# Detailed Text-to-Link mapping
$linkCorrections = [ordered]@{
    "SprayZet" = "sprayzet.html"
    "Evershine" = "evershine.html"
    "Everhine" = "evershine.html" # Typo fix
    "Twin Tapes" = "twin-tapes.html"
    "Twinzy" = "twinzy.html"
}

foreach ($file in $files) {
    $path = Join-Path $root $file
    if (Test-Path $path) {
        Write-Host "Refining $file..."
        $content = Get-Content -Path $path -Raw -Encoding UTF8
        $originalContent = $content

        foreach ($textKey in $linkCorrections.Keys) {
            $targetHref = $linkCorrections[$textKey]
            
            # Pattern: 
            # Capture 1: <a ... href="
            # Capture 2: anything (old href)
            # Capture 3: " ... > ... TextKey ... </a>
            # Note: We escape double quotes for PowerShell string " -> ""
            $pattern = "(<a\s+(?:[^>]*?\s+)?href=[""'])([^""']*?)([""'][^>]*>[\s\S]*?" + [Regex]::Escape($textKey) + "[\s\S]*?</a>)"
            
            # Use a MatchEvaluator to print what is being replaced for debugging
            $evaluator = { param($match) 
                 # Write-Host "Fixing link for $textKey in $file"
                 return $match.Groups[1].Value + $targetHref + $match.Groups[3].Value
            }
            
            $content = [Regex]::Replace($content, $pattern, $evaluator, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
        }

        if ($content -ne $originalContent) {
            Set-Content -Path $path -Value $content -Encoding UTF8
            Write-Host "Corrected links in $file"
        } else {
            Write-Host "No corrections made in $file"
        }
    }
}
