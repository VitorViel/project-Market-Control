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

Email: admin@teste.com
Senha: 123123

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

📦 BACKEND

>> Anteriormente, era necessário rodar localmente via terminal. Nesta nova versão 3.0, está em nuvem. Por isso, só é necessário a pasta 'fronted' para rodar o arquivo com mais eficiência

# ⚔️ Comparativo: Backend Local (Node.js + SQLite) vs Supabase (API REST)

A partir daqui, serão detalhadas as diferenças entre a versão inicial do projeto Market-Control com backend local e a versão atual com Supabase.

---

## 📦 Visão Geral

| Aspecto                         | Versão Local (Node + SQLite)                            | Versão Atual (Supabase REST API)                               |
|----------------------------------|----------------------------------------------------------|----------------------------------------------------------------|
| 📁 Armazenamento                | SQLite local (`.db` no backend)                         | Supabase (PostgreSQL na nuvem)                                |
| 🔌 Backend                     | Express com rotas (`/login`, `/register`, etc.)         | Nenhum backend local — chamadas REST direto da API            |
| 📡 Comunicação                 | Fetch → API local (Node.js/Express)                     | Fetch → Supabase (headers + filtros)                          |
| 🔐 Autenticação                | JWT manual (via `jsonwebtoken`)                         | Supabase Auth (`signUp`, `signInWithPassword`)                |
| 🧠 Permissões                  | Controladas manualmente no backend                      | Regras (RLS) e policies definidas no painel Supabase          |
| 🔄 Deploy necessário           | Sim, precisa subir o backend                            | Não — tudo rodando direto via Supabase                        |
| 🧰 Gerenciamento de dados      | Comandos SQL via `db.run` / `db.get`                    | Interface web + REST com filtros (`?id=eq.123`)               |
| 🚀 Velocidade de entrega       | Mais lento (mais código e setup)                        | Muito mais rápido e direto                                    |
| 💣 Risco de erro humano        | Alto (precisa lembrar de validações, segurança)         | Baixo (Supabase cuida disso por padrão)                       |
| 🧩 Extensibilidade             | Alta (total liberdade, mas mais código)                 | Alta (com estrutura e segurança pronta)                       |

---

## ✅ Quando usar cada abordagem?

| Cenário                                                                 | Use Backend Local      | Use Supabase           |
|------------------------------------------------------------------------|-------------------------|------------------------|
| Projeto 100% offline ou em rede local                                  | ✅                      | ❌                     |
| Precisa de controle total sobre o backend                              | ✅                      | ❌                     |
| Foco em agilidade, produtividade e deploy rápido                       | ❌                      | ✅                     |
| Precisa escalar fácil com frontend moderno (React/Vite, etc)           | ❌                      | ✅                     |
| Precisa evitar configurar banco, autenticação e segurança manualmente | ❌                      | ✅                     |

---

## 🧠 Considerações sobre o projeto Market-Control

Com a migração para Supabase, o projeto:

- 🔥 Ganhou agilidade e clareza na estrutura
- 🧼 Reduziu dependências locais e complexidade
- 🌐 Está pronto para ser hospedado como SPA com backend serverless
- 💪 Ganhou segurança e escalabilidade nativas

---
