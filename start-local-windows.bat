@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo [LOI] Chua cai Node.js 20.19+ hoac 22.12+.
  echo Truy cap https://nodejs.org de cai dat.
  pause
  exit /b 1
)
if not exist ".env" (
  copy /Y ".env.example" ".env" >nul
  echo [CAU HINH] Da tao file .env - CAN mo va dat ADMIN_PASSWORD va CLOUDINARY_API_SECRET.
)
if not exist "node_modules\vite" (
  echo Dang cai dat thu vien React va Vite...
  call npm install
  if errorlevel 1 (
    echo Khong cai duoc thu vien. Kiem tra ket noi mang va Node.js.
    pause
    exit /b 1
  )
)
echo Mo dia chi Local duoc hien thi trong Terminal, mac dinh http://localhost:555
call npm run dev
pause
