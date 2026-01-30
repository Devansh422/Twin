
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

$linkCorrections = [ordered]@{
    "SprayZet" = "sprayzet.html"
    "Evershine" = "evershine.html"
    "Everhine" = "evershine.html"
    "Twin Tapes" = "twin-tapes.html"
    "Twinzy" = "twinzy.html"
    "Silox" = "index.html#silox" # Guessing for now, valid link better than broken? Or keep # if unknown? User didn't specify Silox. I'll leave it alone unless requested.
    # Actually user didn't specify Silox, so I will SKIP Silox.
}

# Generic Link-Tag Regex (Finds any <a>...</a> block)
$tagPattern = "<a\s[^>]*>[\s\S]*?</a>"

foreach ($file in $files) {
    $path = Join-Path $root $file
    if (Test-Path $path) {
        Write-Host "Processing $file..."
        $content = Get-Content -Path $path -Raw -Encoding UTF8
        
        # MatchEvaluator to process each link individually
        $evaluator = { param($match) 
            $linkHtml = $match.Value
            $lowerHtml = $linkHtml.ToLower()
            
            # Check content and pick target
            $target = $null
            
            # Use specific conditions to detect label
            if ($linkHtml -match "SprayZet") { $target = "sprayzet.html" }
            elseif ($linkHtml -match "Evershine") { $target = "evershine.html" }
            elseif ($linkHtml -match "Everhine") { $target = "evershine.html" }
            elseif ($linkHtml -match "Twin Tapes") { $target = "twin-tapes.html" }
            elseif ($linkHtml -match "Twinzy") { $target = "twinzy.html" }
            
            if ($target) {
                # Replace href in this specific link block
                # regex to find href="value"
                $linkHtml = [Regex]::Replace($linkHtml, 'href=["''][^"'']*["'']', "href=""$target""", [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
            }
            
            return $linkHtml
        }
        
        $newContent = [Regex]::Replace($content, $tagPattern, $evaluator, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
        
        # Also do the global filename replacements just in case they are not in <a> tags (like meta tags or scripts?? rare but safe)
        # But prioritize the Link Logic above.
        # Actually, let's just Stick to the Link Logic for Nav.
        # But wait, footer links might be simple text.
        
        if ($newContent -ne $content) {
            Set-Content -Path $path -Value $newContent -Encoding UTF8
            Write-Host "Updated $file"
        } else {
            Write-Host "No link text matches found in $file"
        }
    }
}
Write-Host "Done."
