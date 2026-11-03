param (
    [int]$ProjectNumber = 3,
    [string]$Owner = "wikialisa",
    [string]$Repo = "wikialisa/UI"
)

Write-Host "🚀 Dang them 9 Issues vao Project #$ProjectNumber..."

for ($i = 1; $i -le 9; $i++) {
    $url = "https://github.com/$Repo/issues/$i"
    Write-Host "-> Them Issue $i ($url)..."
    gh project item-add $ProjectNumber --owner $Owner --url $url
}

Write-Host "🎉 Hoan tat nap 9 Issues vao Project #$ProjectNumber!"
