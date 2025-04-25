
@echo off
cd /d "%~dp0backend"
sqlite3 db.sqlite "DELETE * FROM users;"
pause
