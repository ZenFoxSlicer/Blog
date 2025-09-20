# Git Setup Script
Write-Host "Setting up Git repository..." -ForegroundColor Green

# Add Git to PATH
$env:PATH += ";C:\Program Files\Git\bin"

# Check Git version
Write-Host "Git version:" -ForegroundColor Yellow
& "C:\Program Files\Git\bin\git.exe" --version

# Initialize repository
Write-Host "Initializing Git repository..." -ForegroundColor Yellow
& "C:\Program Files\Git\bin\git.exe" init

# Add all files
Write-Host "Adding files to Git..." -ForegroundColor Yellow
& "C:\Program Files\Git\bin\git.exe" add .

# Commit files
Write-Host "Committing files..." -ForegroundColor Yellow
& "C:\Program Files\Git\bin\git.exe" commit -m "Initial commit: Angular dental blog app with SSR"

# Show status
Write-Host "Git status:" -ForegroundColor Yellow
& "C:\Program Files\Git\bin\git.exe" status

Write-Host "Git setup complete!" -ForegroundColor Green
