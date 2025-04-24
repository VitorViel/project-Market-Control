📦 Market Control - Sistema de Controle de Produtos

Este é um sistema web completo para controle de produtos em um mercado.
Inclui login, cadastro, painel administrativo e permissões por cargo (admin/vendedor).

---

✅ Pré-requisitos:

1. Node.js instalado (https://nodejs.org)
2. Qualquer editor de código (recomendado: VS Code)

---

🚀 Como rodar o projeto:

1. Clone o repositório:

git clone https://github.com/VitorViel/project-Market-Control.git
cd project-Market-Control

2. Abra dois terminais separados:

---

📦 Terminal 1: BACKEND

cd backend
npm install
npm run dev

> Isso inicia o servidor backend (porta 3001)

---

💻 Terminal 2: FRONTEND

cd frontend
npm install
npm run dev

> Isso inicia o site no navegador (porta 5173)

---

🌐 Acesse no navegador:

http://localhost:5173

---

🔐 Login de admin para testes (caso banco venha pré-carregado):

Email: admin@teste 
Senha: 123123123

Caso o banco não venha pré-carregado, execute o app "criar_admin.bat", localizado na pasta raíz do projeto e realize o login novamente com as credenciais citadas acima

---

📋 Observações:

- Todos os usuários novos são cadastrados como **vendedor**
- Somente **admins** conseguem ver o botão "Lista de usuários"
- Admins podem promover ou rebaixar cargos de usuários

---

🧰 Tecnologias e versões utilizadas

(TODAS AS VERSÕES JÁ ESTÃO APLICADAS NOS PACKAGE-JSON's, TANTO FRONTEND COMO BACKEND)

📦 FRONTEND (frontend/package.json)
React + Vite + Tailwind:

Pacote	Versão recomendada
react	18.2.0
react-dom	18.2.0
typescript	5.2+
vite	4.5+
tailwindcss	3.3+
react-router-dom	6.14+
react-hot-toast	2.4+

⚙️ BACKEND (backend/package.json)
Node + Express + SQLite + JWT:

Pacote	Versão recomendada
express	4.18+
cors	2.8+
sqlite3	5.1+
sqlite	4.2+
jsonwebtoken	9.0+
bcrypt	5.1+
nodemon (dev)	3.0+

No capricho
