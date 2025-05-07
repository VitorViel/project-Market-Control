📦 Market Control - Sistema de Controle de Produtos
===================================================

Sistema de gerenciamento de produtos com autenticação, controle de usuários (admin e vendedor), tema dark/light, animações com Framer Motion e integração total com Supabase.

---

## 🚀 Como rodar o projeto

### 1. Pré-requisitos

- [Node.js 18+](https://nodejs.org/) instalado
- Acesso ao repositório do projeto
- Conta no [Supabase](https://supabase.com/) (caso precise criar seu próprio backend)

---

### 2. Clonar o repositório

```bash
git clone https://github.com/seu-user/market-control.git
cd market-control
```

---

### 3. Instalar as dependências

```bash
npm install
```

---

### 4. Configurar o arquivo `.env`

Crie um arquivo `.env` na raiz da pasta frontend com as seguintes variáveis (disponíveis no painel do Supabase):

```env
VITE_SUPABASE_URL=https://SEU-PROJETO.supabase.co
VITE_SUPABASE_ANON_KEY=sua-anon-key-aqui
```

---

### 5. Rodar o projeto

```bash
npm run dev
```

> A aplicação será acessível em `http://localhost:5173`

---

## 🛠️ Tecnologias

- React 18 + Vite
- TypeScript
- TailwindCSS
- Framer Motion
- Supabase (Auth + REST API)

---

## 📦 Funcionalidades

- Cadastro e login de usuários
- Diferenciação de papéis: `admin` e `vendedor`
- CRUD de produtos
- Listagem e gerenciamento de usuários (admins)
- Tema claro/escuro com toggle
- Animações de entrada/saída suaves
- Skeleton loaders e autofocus em formulários
- Integração direta com Supabase (sem backend local)

---

## 💡 Dica extra

Caso enfrente problemas ao instalar pacotes:

```bash
rm -rf node_modules
rm package-lock.json
npm install
```

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

> Anteriormente, era necessário rodar localmente via terminal. Nesta nova versão 3.0, está em nuvem. Por isso, só é necessário a pasta 'fronted' para rodar o projeto completo com mais eficiência

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

Feito com 💻 e ☕ por **Vitor Viel**