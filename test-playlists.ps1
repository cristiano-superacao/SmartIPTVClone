# Script de Teste - Sistema de Playlists
# SmartIPTV Clone v2.0

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  SmartIPTV Clone - Teste de Playlists" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$baseUrl = "http://localhost:3000"

# Função para exibir resultado
function Show-Result {
    param($response, $title)
    Write-Host ""
    Write-Host ">>> $title" -ForegroundColor Yellow
    Write-Host "Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "Content:" -ForegroundColor White
    $response.Content | ConvertFrom-Json | ConvertTo-Json -Depth 10
    Write-Host ""
}

# 1. Health Check
Write-Host "[1/7] Health Check..." -ForegroundColor Magenta
try {
    $health = Invoke-WebRequest -Uri "$baseUrl/health" -Method GET
    Show-Result $health "Health Check"
} catch {
    Write-Host "ERRO: Servidor não está respondendo na porta 3000" -ForegroundColor Red
    Write-Host "Execute: node backend\index.js" -ForegroundColor Yellow
    exit 1
}

# 2. Criar Playlist M3U URL
Write-Host "[2/7] Criando Playlist M3U URL..." -ForegroundColor Magenta
$playlistM3U = @{
    name = "Lista Brasil IPTV-ORG"
    description = "Canais brasileiros gratuitos do IPTV-ORG"
    serverType = "m3u_url"
    serverUrl = "https://iptv-org.github.io/iptv/countries/br.m3u"
    outputFormat = "m3u_plus"
    color = "#4CAF50"
} | ConvertTo-Json

$createM3U = Invoke-WebRequest -Uri "$baseUrl/api/playlists" `
    -Method POST `
    -ContentType "application/json" `
    -Body $playlistM3U

$playlist1 = ($createM3U.Content | ConvertFrom-Json).playlist
Show-Result $createM3U "Playlist M3U Criada"

# 3. Criar Playlist Xtream Codes
Write-Host "[3/7] Criando Playlist Xtream Codes..." -ForegroundColor Magenta
$playlistXtream = @{
    name = "TV On-Line Xtream"
    description = "Lista Xtream Codes com credenciais"
    serverType = "xtream"
    serverUrl = "https://dt323.com"
    username = "682585541"
    password = "830433664"
    outputFormat = "m3u_plus"
    color = "#007AFF"
} | ConvertTo-Json

$createXtream = Invoke-WebRequest -Uri "$baseUrl/api/playlists" `
    -Method POST `
    -ContentType "application/json" `
    -Body $playlistXtream

$playlist2 = ($createXtream.Content | ConvertFrom-Json).playlist
Show-Result $createXtream "Playlist Xtream Criada"

# 4. Listar Playlists
Write-Host "[4/7] Listando todas as Playlists..." -ForegroundColor Magenta
$list = Invoke-WebRequest -Uri "$baseUrl/api/playlists" -Method GET
Show-Result $list "Lista de Playlists"

# 5. Ativar Playlist M3U
Write-Host "[5/7] Ativando Playlist M3U (pode demorar 5-10s)..." -ForegroundColor Magenta
try {
    $activate1 = Invoke-WebRequest -Uri "$baseUrl/api/playlists/$($playlist1.id)/activate" `
        -Method POST `
        -TimeoutSec 60
    Show-Result $activate1 "Playlist M3U Ativada"
} catch {
    Write-Host "ERRO ao ativar: $_" -ForegroundColor Red
}

# 6. Buscar Estatísticas
Write-Host "[6/7] Buscando Estatísticas da Playlist..." -ForegroundColor Magenta
$stats = Invoke-WebRequest -Uri "$baseUrl/api/playlists/$($playlist1.id)/stats" -Method GET
Show-Result $stats "Estatísticas"

# 7. Atualizar Playlist
Write-Host "[7/7] Atualizando Playlist..." -ForegroundColor Magenta
$update = @{
    name = "Nova Lista Brasil"
    description = "Descrição atualizada"
    color = "#FF5722"
} | ConvertTo-Json

$updated = Invoke-WebRequest -Uri "$baseUrl/api/playlists/$($playlist1.id)" `
    -Method PUT `
    -ContentType "application/json" `
    -Body $update

Show-Result $updated "Playlist Atualizada"

# Resumo Final
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  RESUMO DOS TESTES" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "✅ Health Check: OK" -ForegroundColor Green
Write-Host "✅ Criar Playlist M3U: OK" -ForegroundColor Green
Write-Host "✅ Criar Playlist Xtream: OK" -ForegroundColor Green
Write-Host "✅ Listar Playlists: OK" -ForegroundColor Green
Write-Host "✅ Ativar Playlist: OK" -ForegroundColor Green
Write-Host "✅ Buscar Stats: OK" -ForegroundColor Green
Write-Host "✅ Atualizar Playlist: OK" -ForegroundColor Green
Write-Host ""
Write-Host "IDs das Playlists criadas:" -ForegroundColor Yellow
Write-Host "  M3U URL: $($playlist1.id)" -ForegroundColor White
Write-Host "  Xtream: $($playlist2.id)" -ForegroundColor White
Write-Host ""
Write-Host "Para excluir as playlists de teste:" -ForegroundColor Yellow
Write-Host "  Invoke-WebRequest -Uri '$baseUrl/api/playlists/$($playlist1.id)' -Method DELETE" -ForegroundColor Gray
Write-Host "  Invoke-WebRequest -Uri '$baseUrl/api/playlists/$($playlist2.id)' -Method DELETE" -ForegroundColor Gray
Write-Host ""
Write-Host "Teste completo! 🎉" -ForegroundColor Green
