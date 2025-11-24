# SmartPC Builder Frontend - PowerShell Starter
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  SmartPC Builder Frontend - Starter" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
    Write-Host ""
}

# Check if backend is running
Write-Host "Checking backend connection..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8000/api/v1/health" -TimeoutSec 2 -UseBasicParsing -ErrorAction Stop
    Write-Host "Backend is running!" -ForegroundColor Green
} catch {
    Write-Host ""
    Write-Host "WARNING: Backend is not running on http://localhost:8000" -ForegroundColor Red
    Write-Host "Please start the backend first!" -ForegroundColor Yellow
    Write-Host ""
    $continue = Read-Host "Continue anyway? (y/n)"
    if ($continue -ne "y") {
        exit
    }
}
Write-Host ""

# Start dev server
Write-Host "Starting Next.js development server..." -ForegroundColor Green
Write-Host ""
Write-Host "Frontend will be available at: http://localhost:3000" -ForegroundColor Green
Write-Host "Backend should be running at: http://localhost:8000" -ForegroundColor Green
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""
npm run dev

