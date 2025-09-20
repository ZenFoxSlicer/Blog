# Complete Git Setup Script
Write-Host "=== Git Setup for Angular Blog App ===" -ForegroundColor Green
Write-Host ""

# Set Git path
$gitPath = "C:\Program Files\Git\bin\git.exe"

# Step 1: Verify Git Installation
Write-Host "Step 1: Verifying Git installation..." -ForegroundColor Yellow
& $gitPath --version
Write-Host ""

# Step 2: Initialize Git Repository
Write-Host "Step 2: Initializing Git repository..." -ForegroundColor Yellow
& $gitPath init
Write-Host ""

# Step 3: Add all files
Write-Host "Step 3: Adding all files to Git..." -ForegroundColor Yellow
& $gitPath add .
Write-Host ""

# Step 4: Create initial commit
Write-Host "Step 4: Creating initial commit..." -ForegroundColor Yellow
& $gitPath commit -m "Initial commit: Angular blog app with SSR"
Write-Host ""

# Step 5: Check status
Write-Host "Step 5: Checking Git status..." -ForegroundColor Yellow
& $gitPath status
Write-Host ""

# Step 6: Show commit log
Write-Host "Step 6: Showing commit log..." -ForegroundColor Yellow
& $gitPath log --oneline
Write-Host ""

Write-Host "=== Git Setup Complete! ===" -ForegroundColor Green
Write-Host "Next steps:"
Write-Host "1. Create a repository on GitHub/GitLab"
Write-Host "2. Add remote origin: git remote add origin <your-repo-url>"
Write-Host "3. Push to remote: git push -u origin main"
Write-Host ""
Write-Host "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
