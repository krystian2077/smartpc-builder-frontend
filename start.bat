@echo off
echo ========================================
echo   SmartPC Builder Frontend - Starter
echo ========================================
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    echo.
)

REM Check if backend is running
echo Checking backend connection...
curl -s http://localhost:8000/api/v1/health >nul 2>&1
if errorlevel 1 (
    echo.
    echo WARNING: Backend is not running on http://localhost:8000
    echo Please start the backend first!
    echo.
    pause
)

REM Start dev server
echo Starting Next.js development server...
echo.
echo Frontend will be available at: http://localhost:3000
echo Backend should be running at: http://localhost:8000
echo.
echo Press Ctrl+C to stop the server
echo.
npm run dev

