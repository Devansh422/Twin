
$files = @(
    "index.html",
    "sprayzet.html",
    "evershine.html",
    "twinzy.html",
    "twin-tapes.html",
    "about-us.html" # Including generic pages that might have nav
)

$root = "c:\Users\sravi\Downloads\Twin"

# 1. Simple Filename Replacements (Global)
# This handles imports, simple links that were already named correctly but just need renaming
$simpleReplacements = @{
    "industrial-maintenance.html" = "sprayzet.html"
    "car-care.html" = "evershine.html"
    "tapes.html" = "twin-tapes.html"
}

# 2. Regex Definitions for "Link by Text" repairs
# Structure: Key = New Filename, Value = Regex Pattern for the keyword in the link text
# Regex explains: Match <a ... href="..."> ... Keyword ... </a>
# We capture:
# $1: Opening part up to href="
# $2: Current Value of href (discarded)
# $3: Closing quote of href, rest of tag, content, closing /a
$regexMap = @{
    "sprayzet.html" = "(<a\s+(?:[^>]*?\s+)?href=[""'])([^""']*?)([""'][^>]*>[\s\S]*?SprayZet[\s\S]*?</a>)"
    "evershine.html" = "(<a\s+(?:[^>]*?\s+)?href=[""'])([^""']*?)([""'][^>]*>[\s\S]*?Ever.*?hine[\s\S]*?</a>)"
    "twin-tapes.html" = "(<a\s+(?:[^>]*?\s+)?href=[""'])([^""']*?)([""'][^>]*>[\s\S]*?Twin Tapes[\s\S]*?</a>)"
    "twinzy.html" = "(<a\s+(?:[^>]*?\s+)?href=[""'])([^""']*?)([""'][^>]*>[\s\S]*?Twinzy[\s\S]*?</a>)"
}

foreach ($file in $files) {
    $path = Join-Path $root $file
    if (Test-Path $path) {
        Write-Host "Processing $file..."
        $content = Get-Content -Path $path -Raw -Encoding UTF8
        $originalContent = $content

        # Apply Simple Replacements
        foreach ($key in $simpleReplacements.Keys) {
            $content = $content.Replace($key, $simpleReplacements[$key])
        }

        # Apply Regex Fixes
        foreach ($targetFile in $regexMap.Keys) {
            $pattern = $regexMap[$targetFile]
            try {
                # [Regex]::Replace(input, pattern, replacement, options)
                # ${1} is group 1, etc.
                $content = [Regex]::Replace($content, $pattern, "`${1}$targetFile`${3}", [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
            }
            catch {
                Write-Host "Error regex replacing $targetFile in $file : $_"
            }
        }

        if ($content -ne $originalContent) {
            Set-Content -Path $path -Value $content -Encoding UTF8
            Write-Host "Updated $file"
        } else {
            Write-Host "No changes needed for $file"
        }
    } else {
        Write-Host "Skipping $file (Not Found)"
    }
}
Write-Host "Done."
