@echo off
chcp 65001 >nul
cd /d "%~dp0"
title 陈鑫杰作品集预览 - 请勿关闭此窗口

echo.
echo 正在启动网站，请稍候...
echo 启动成功后浏览器会自动打开。
echo 预览期间请不要关闭本窗口。
echo.

start "" /min powershell.exe -NoProfile -WindowStyle Hidden -Command "Start-Sleep -Seconds 3; Start-Process 'http://127.0.0.1:5173/'"
"C:\Program Files\nodejs\node.exe" "node_modules\vite\bin\vite.js" --host 127.0.0.1 --port 5173

echo.
echo 网站预览已停止。
pause
