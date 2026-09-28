$ErrorActionPreference = "Stop"

# Create directories if they don't exist
New-Item -ItemType Directory -Force -Path "public\hero-seq\desktop"
New-Item -ItemType Directory -Force -Path "public\video"

Write-Host "Processing Intro Film..."
# Intro Film
$introRaw = "public\intro\Intro film.mp4"
if (Test-Path $introRaw) {
    # Crop bottom 60px assuming watermark, scale to 1920w, remove audio
    ffmpeg -y -i "$introRaw" -vf "crop=iw:ih-60:0:0,scale=1920:-2,fps=30" -c:v libx264 -crf 26 -preset medium -an -movflags +faststart "public\intro\intro.mp4"
    ffmpeg -y -i "$introRaw" -vf "crop=iw:ih-60:0:0,scale=1920:-2,fps=30" -c:v libvpx-vp9 -crf 36 -b:v 0 -an "public\intro\intro.webm"
    # Create a vertical mobile version (crop to 9:16 from center)
    ffmpeg -y -i "$introRaw" -vf "crop=ih*9/16:ih-60,scale=-2:1080,fps=30" -c:v libx264 -crf 26 -preset medium -an -movflags +faststart "public\intro\intro-mobile.mp4"
    # Poster
    ffmpeg -y -i "$introRaw" -vframes 1 -q:v 2 "public\intro\poster.webp"
}

Write-Host "Processing Khalva Loop..."
# Herbs coming alive -> khalva-loop
$herbsRaw = "public\videos\Herbs coming alive .mp4"
if (Test-Path $herbsRaw) {
    ffmpeg -y -i "$herbsRaw" -vf "crop=iw:ih-60:0:0,scale=1080:-2,fps=30" -c:v libvpx-vp9 -crf 36 -b:v 0 -an "public\video\khalva-loop.webm"
}

Write-Host "Processing Hero Sequence..."
# Hero Sequence
$heroSeqRaw = "public\hero-seq\Hero scroll-sequence video.mp4"
if (Test-Path $heroSeqRaw) {
    # Extract frames at 24fps
    ffmpeg -y -i "$heroSeqRaw" -vf "crop=iw:ih-60:0:0,scale=1600:-2,fps=24" -q:v 70 "public\hero-seq\desktop\%03d.webp"
}

Write-Host "Converting images to WebP..."
# Images to WebP
$images = Get-ChildItem -Path public -Recurse -File -Include *.png,*.jpg | Where-Object { $_.FullName -notmatch "brand" } # keep logo as png
foreach ($img in $images) {
    $outPath = [System.IO.Path]::ChangeExtension($img.FullName, ".webp")
    ffmpeg -y -i "$img.FullName" -q:v 80 "$outPath"
    # Remove original to save space
    Remove-Item -Path $img.FullName -Force
}

Write-Host "Done!"
