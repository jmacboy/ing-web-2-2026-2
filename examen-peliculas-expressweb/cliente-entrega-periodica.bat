@echo off
setlocal EnableExtensions

REM ============================================================
REM ENTREGA PERIODICA - EXAMEN
REM Crea y envia un ZIP nuevo cada cierto tiempo.
REM Excluye: node_modules, data, .git, ZIPs y archivos BAT.
REM ============================================================

set "PROJECT_DIR=%~dp0"
set "SERVER_IP=192.168.70.166"
set "SERVER_PORT=3000"
set "INTERVAL_MINUTES=20"

echo.
echo ==================================================
echo           ENTREGA PERIODICA DE EXAMEN
echo ==================================================
echo.

set /p "STUDENT_NAME=Nombre completo: "
set /p "STUDENT_CODE=Codigo de estudiante: "

if "%STUDENT_NAME%"=="" (
    echo.
    echo Error: debes ingresar tu nombre.
    pause
    exit /b 1
)

if "%STUDENT_CODE%"=="" (
    echo.
    echo Error: debes ingresar tu codigo.
    pause
    exit /b 1
)

set /a WAIT_SECONDS=INTERVAL_MINUTES*60

:LOOP
echo.
echo --------------------------------------------------
echo Preparando nueva entrega...
echo --------------------------------------------------

for /f "tokens=1-3 delims=/ " %%a in ("%date%") do set "TODAY=%%c-%%b-%%a"
for /f "tokens=1-3 delims=:., " %%a in ("%time%") do set "CLOCK=%%a-%%b-%%c"
set "NOW=%TODAY%_%CLOCK%"

set "SAFE_NAME=%STUDENT_NAME: =_%"
set "TEMP_ZIP=%TEMP%\examen_%STUDENT_CODE%_%RANDOM%.zip"
set "FILENAME=%STUDENT_CODE%_%SAFE_NAME%_%NOW%.zip"

echo Nombre:   %STUDENT_NAME%
echo Codigo:   %STUDENT_CODE%
echo Fecha:    %NOW%
echo.

echo Creando ZIP nuevo...

powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$source = '%PROJECT_DIR%';" ^
  "$zip = '%TEMP_ZIP%';" ^
  "$items = Get-ChildItem -LiteralPath $source -Force | Where-Object { $_.Name -notin @('node_modules','data','.git') -and $_.Extension -ne '.zip' -and $_.Extension -ne '.bat' };" ^
  "Compress-Archive -Path $items.FullName -DestinationPath $zip -Force"

if errorlevel 1 (
    echo.
    echo ERROR: No se pudo crear el ZIP.
    goto WAIT
)

echo ZIP creado. Enviando al servidor...

powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$zipBytes = [System.IO.File]::ReadAllBytes('%TEMP_ZIP%');" ^
  "$base64 = [Convert]::ToBase64String($zipBytes);" ^
  "$body = @{ studentName='%STUDENT_NAME%'; studentCode='%STUDENT_CODE%'; filename='%FILENAME%'; zipBase64=$base64; timestamp='%NOW%' } | ConvertTo-Json -Compress;" ^
  "try { $response = Invoke-RestMethod -Uri 'http://%SERVER_IP%:%SERVER_PORT%/submit' -Method Post -ContentType 'application/json' -Body $body; Write-Host 'Entrega recibida correctamente.' } catch { Write-Host 'ERROR: No se pudo enviar la entrega.'; Write-Host $_.Exception.Message; }"

del /q "%TEMP_ZIP%" >nul 2>&1

:WAIT
echo.
echo Proxima entrega en %INTERVAL_MINUTES% minutos...
timeout /t %WAIT_SECONDS% /nobreak >nul
goto LOOP
