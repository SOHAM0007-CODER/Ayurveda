$ErrorActionPreference = "Stop"

# Process About Video (assuming it's in public\videos\)
$aboutRaw = Get-ChildItem -Path "public\videos" -Filter "*.mp4" | Where-Object { $_.Name -notmatch "Herbs coming alive" -and $_.Name -notmatch "herbs-alive" }
if ($aboutRaw -and $aboutRaw.Count -gt 0) {
    $aboutVideo = $aboutRaw[0].FullName
    Write-Host "Processing About Video: $aboutVideo"
    ffmpeg -y -i "$aboutVideo" -vf "scale=1920:-2,fps=30" -c:v libx264 -crf 26 -preset medium -an -movflags +faststart "public\videos\khalva-loop.mp4"
    ffmpeg -y -i "$aboutVideo" -vf "scale=1920:-2,fps=30" -c:v libvpx-vp9 -crf 36 -b:v 0 -an "public\videos\khalva-loop.webm"
} else {
    Write-Host "No About Video found!"
}

# Convert PNGs to WebP
$imgDirs = @("public\dosha", "public\panchakarma", "public\textures")
foreach ($dir in $imgDirs) {
    if (Test-Path $dir) {
        $pngs = Get-ChildItem -Path $dir -Filter "*.png"
        foreach ($png in $pngs) {
            $outPath = [System.IO.Path]::ChangeExtension($png.FullName, ".webp")
            ffmpeg -y -i $($png.FullName) -q:v 80 $outPath
        }
    }
}
