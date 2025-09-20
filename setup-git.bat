@echo off
set PATH=%PATH%;C:\Program Files\Git\bin
git --version
git status
git add .
git commit -m "Initial commit: Angular blog app with SSR"
git log --oneline
pause
