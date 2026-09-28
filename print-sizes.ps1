$files = @(
    "public\intro\Intro film.mp4",
    "public\intro\intro.mp4",
    "public\intro\intro.webm",
    "public\intro\intro-mobile.mp4",
    "public\hero-seq\Hero scroll-sequence video.mp4",
    "public\hero-seq\desktop\001.webp",
    "public\videos\Herbs coming alive .mp4",
    "public\videos\herbs-alive.mp4",
    "public\videos\herbs-alive.webm",
    "blossoms.png",
    "public\tree\blossoms.webp"
)

Write-Host "| File | Original Size | New Size |"
Write-Host "|---|---|---|"
foreach ($f in $files) {
    if (Test-Path $f) {
        $info = Get-Item $f
        $mb = "{0:N2} MB" -f ($info.Length / 1MB)
        Write-Host "| $f | $mb | - |"
    }
}
