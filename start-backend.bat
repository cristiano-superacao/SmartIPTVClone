@echo off
echo ========================================
echo   Teste Backend - Sistema de Playlists
echo ========================================
echo.

cd /d "%~dp0backend"

echo [1] Iniciando servidor...
start "SmartIPTV Backend" cmd /k "node index.js"

echo.
echo Aguardando servidor iniciar (5 segundos)...
timeout /t 5 /nobreak > nul

echo.
echo [2] Testando Health Check...
curl -X GET http://localhost:3000/health
echo.

echo.
echo [3] Testando Status da API...
curl -X GET http://localhost:3000/api/status
echo.

echo.
echo ========================================
echo   Servidor rodando em nova janela
echo   Pressione CTRL+C na outra janela para parar
echo ========================================
pause
