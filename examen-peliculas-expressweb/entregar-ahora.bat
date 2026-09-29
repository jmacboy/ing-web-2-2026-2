@echo off
setlocal EnableExtensions

REM ==========================================================
REM             ENTREGA MANUAL INMEDIATA
REM ==========================================================

REM IP de la PC del profesor
set "SERVER_IP=192.168.70.166"

REM Puerto del servidor
set "SERVER_PORT=3000"


REM ==========================================================
REM             CARPETA DEL PROYECTO
REM ==========================================================

REM La carpeta donde esta este BAT es la raiz del proyecto.
set "PROJECT_DIR=%~dp0"
set "PROJECT_DIR=%PROJECT_DIR:~0,-1%"


REM ==========================================================
REM             DATOS DEL ESTUDIANTE
REM ==========================================================

echo.
echo ==================================================
echo             ENTREGA DEL EXAMEN
echo ==================================================
echo.

echo Proyecto:
echo %PROJECT_DIR%
echo.

set /p "STUDENT_NAME=Nombre completo: "
set /p "STUDENT_CODE=Codigo de estudiante: "

if "%STUDENT_NAME%"=="" (
    echo.
    echo ERROR: Debes ingresar tu nombre.
    pause
    exit /b 1
)

if "%STUDENT_CODE%"=="" (
    echo.
    echo ERROR: Debes ingresar tu codigo.
    pause
    exit /b 1
)


REM ==========================================================
REM             CREAR ZIP TEMPORAL
REM ==========================================================

set "TEMP_ZIP=%TEMP%\examen_%STUDENT_CODE%_%RANDOM%.zip"

echo.
echo [%TIME%] Comprimiendo proyecto...
echo.

powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$src=$env:PROJECT_DIR; $dst=$env:TEMP_ZIP; $items=Get-ChildItem -LiteralPath $src -Force | Where-Object { $_.Name -notin @('node_modules','data','.git') }; if(-not $items){throw 'No hay archivos para comprimir'}; Compress-Archive -Path $items.FullName -DestinationPath $dst -Force"

if errorlevel 1 (
    echo.
    echo ERROR: No se pudo crear el ZIP.
    pause
    exit /b 1
)


REM ==========================================================
REM             ENVIAR AL SERVIDOR
REM ==========================================================

echo.
echo [%TIME%] Enviando al servidor...
echo.

powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$bytes=[IO.File]::ReadAllBytes($env:TEMP_ZIP); $b64=[Convert]::ToBase64String($bytes); $body=@{studentName=$env:STUDENT_NAME;studentCode=$env:STUDENT_CODE;filename=[IO.Path]::GetFileName($env:TEMP_ZIP);zipBase64=$b64;timestamp=(Get-Date).ToString('o')}|ConvertTo-Json -Compress; try { $r=Invoke-RestMethod -Uri ('http://%SERVER_IP%:%SERVER_PORT%/submit') -Method Post -ContentType 'application/json' -Body $body -TimeoutSec 30; Write-Host ('OK: '+$r.savedFilename); Write-Host ('SHA-256: '+$r.sha256) } catch { Write-Host ('ERROR: '+$_.Exception.Message); exit 1 }"

set "RESULT=%ERRORLEVEL%"


REM ==========================================================
REM             LIMPIAR ZIP TEMPORAL
REM ==========================================================

del /q "%TEMP_ZIP%" >nul 2>&1


REM ==========================================================
REM             RESULTADO
REM ==========================================================

echo.

if "%RESULT%"=="0" (
    echo ==================================================
    echo       ENTREGA RECIBIDA CORRECTAMENTE
    echo ==================================================
) else (
    echo ==================================================
    echo       ERROR: LA ENTREGA NO FUE RECIBIDA
    echo ==================================================
)

echo.
pause
exit /b %RESULT%
