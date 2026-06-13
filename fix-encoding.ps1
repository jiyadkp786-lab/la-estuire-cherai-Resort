# fix-encoding.ps1 - Fix all UTF-8 encoding artifacts in HTML files and App.jsx

$htmlFiles = Get-ChildItem "public\*.html"

foreach ($file in $htmlFiles) {
    $content = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
    
    # Arrow artifacts
    $content = $content.Replace("â†'", "&#8594;")
    $content = $content.Replace("â†"", "&#8592;")
    
    # Bullet artifacts
    $content = $content.Replace("â€¢", "-")
    
    # Em dash artifacts (various malformed forms)
    $content = $content.Replace("â€"", "-")
    $content = $content.Replace("â€"", "-")
    $content = $content.Replace("â€" ", " - ")
    $content = $content.Replace(" â€" ", " - ")
    
    # Smart quote artifacts
    $content = $content.Replace("â€™", "'")
    $content = $content.Replace("â€˜", "'")
    $content = $content.Replace("â€œ", '"')
    
    # Broken range dash artifacts (e.g. 30â€"45 or 30â??"45)
    $content = $content.Replace("â??", "-")
    $content = $content.Replace("â?", "-")
    
    [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
    Write-Host "Fixed: $($file.Name)"
}

Write-Host "All HTML files fixed."
