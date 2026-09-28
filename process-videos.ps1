$ErrorActionPreference = "Stop"

# Setup directories
New-Item -ItemType Directory -Force -Path "public\hero-seq\desktop"
New-Item -ItemType Directory -Force -Path "public\hero-seq\mobile"
New-Item -ItemType Directory -Force -Path "public\videos"

# 1. Intro Film
$introRaw = "public\intro\Intro film.mp4"
if (Test-Path $introRaw) {
    ffmpeg -y -i "$introRaw" -vf "scale=1920:-2,fps=30" -c:v libx264 -crf 26 -preset medium -an -movflags +faststart "public\intro\intro.mp4"
    ffmpeg -y -i "$introRaw" -vf "scale=1920:-2,fps=30" -c:v libvpx-vp9 -crf 36 -b:v 0 -an "public\intro\intro.webm"
    ffmpeg -y -i "$introRaw" -vf "crop=ih*9/16:ih,scale=-2:1080,fps=30" -c:v libx264 -crf 26 -preset medium -an -movflags +faststart "public\intro\intro-mobile.mp4"
    ffmpeg -y -i "$introRaw" -vframes 1 -q:v 2 "public\intro\poster.webp"
}

# 2. Hero Sequence
$heroSeqRaw = "public\hero-seq\Hero scroll-sequence video.mp4"
if (Test-Path $heroSeqRaw) {
    # Desktop: 1600px, 18fps, max 150 frames
    ffmpeg -y -i "$heroSeqRaw" -vf "scale=1600:-2,fps=18" -vframes 150 -q:v 70 "public\hero-seq\desktop\%03d.webp"
    # Mobile: 900px portrait, 12fps, max 150 frames. (assuming center crop for portrait)
    ffmpeg -y -i "$heroSeqRaw" -vf "crop=ih*9/16:ih,scale=900:-2,fps=12" -vframes 150 -q:v 70 "public\hero-seq\mobile\%03d.webp"
}

# 3. Herbs coming alive -> herbs-alive
$herbsRaw = "public\videos\Herbs coming alive .mp4"
if (Test-Path $herbsRaw) {
    ffmpeg -y -i "$herbsRaw" -vf "scale=1920:-2,fps=30" -c:v libx264 -crf 26 -preset medium -an -movflags +faststart "public\videos\herbs-alive.mp4"
    ffmpeg -y -i "$herbsRaw" -vf "scale=1920:-2,fps=30" -c:v libvpx-vp9 -crf 36 -b:v 0 -an "public\videos\herbs-alive.webm"
}

# 4. Images to WebP (Root images that survived)
$rootImages = Get-ChildItem -Path . -File -Include *.png | Where-Object { $_.FullName -notmatch "brand" }
foreach ($img in $rootImages) {
    $outPath = "public\tree\" + [System.IO.Path]::ChangeExtension($img.Name, ".webp")
    if ($img.Name -eq "hero-still.png") { $outPath = "public\images\hero-still.webp" }
    ffmpeg -y -i $($img.FullName) -q:v 80 $outPath
}
