@echo off
title Premiere Pro Debug Mode Enabler
color 0A
echo Enabling Debug Mode for Premiere Pro...

reg add "HKCU\Software\Adobe\CSXS.9" /v PlayerDebugMode /t REG_SZ /d 1 /f
reg add "HKCU\Software\Adobe\CSXS.11" /v PlayerDebugMode /t REG_SZ /d 1 /f
reg add "HKCU\Software\Adobe\CSXS.12" /v PlayerDebugMode /t REG_SZ /d 1 /f

echo.
echo Debug Mode ON! Now restart Premiere Pro
echo Window ^> Extensions ^> SoundBoard Pro
pause