@echo off
setlocal
set "TARGET=%~dp0Start-Flight-Study.bat"
set "DESKTOP=%USERPROFILE%\Desktop"
set "LINK=%DESKTOP%\Flight Study.lnk"
powershell -NoProfile -ExecutionPolicy Bypass -Command "$w=New-Object -ComObject WScript.Shell; $s=$w.CreateShortcut('%LINK%'); $s.TargetPath='%TARGET%'; $s.WorkingDirectory='%~dp0'; $s.IconLocation='%~dp0icons\flight-study.ico'; $s.Description='Flight Study - دفتر مطالعه'; $s.Save()"
if exist "%LINK%" (echo Shortcut created on Desktop.& pause) else (echo Could not create shortcut.& pause)
