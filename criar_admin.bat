
@echo off
cd /d "%~dp0backend"
sqlite3 db.sqlite "INSERT INTO users (fullName, email, password, role) VALUES ('Admin Teste', 'admin@teste', '$2b$12$dFn0ArkdXQP/XlbjzuGe9OMMdJOScWebZVr6xRWne6ltlcdKaSY0q', 'admin');"
pause
