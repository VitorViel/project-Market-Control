📦 Projeto: MARKET-CONTROL
==========================

📝 DESCRIÇÃO GERAL
------------------
Sistema de controle de mercado com:
- Login e registro de usuários
- Autenticação via JWT
- Cadastro, edição e remoção de produtos
- Painel único para vendedores e admins
- Admins podem promover usuários e deletar outros usuários
- UI responsiva com Tailwind e React 18 (Vite)

# 🚀 Versão 3.0 – Release oficial do Market-Control

Histórico completo de melhorias desde a versão inicial do sistema.

---

## ✅ Funcionalidades iniciais (v1.0)
- Login e cadastro com JWT
- Painel principal com listagem de produtos
- CRUD de produtos (adicionar, editar, remover)
- Controle de acesso por role (`vendedor` e `admin`)
- Popup de listagem de usuários acessível apenas para admins
- Botão de logout funcional
- Backend em Node.js + Express + SQLite
- Frontend com React 18 + Vite + TypeScript + Tailwind

---

## 🆕 Versão 2.x – Melhorias progressivas

### 🔹 v2.0 a v2.2 – Interface e usabilidade
- Modo claro/escuro com toggle no canto inferior direito
- Animações suaves usando Framer Motion
- Skeleton loaders durante carregamentos
- Autofocus em campos de login/cadastro
- Toast centralizado com estilo unificado
- Tooltips em ícones e botões de ação
- Responsividade aprimorada em todas as telas
- Layout do dashboard reorganizado

### 🔹 v2.3 – Controle de usuários aprimorado
- Proteção para o usuário `admin@teste.com` (não pode ser editado nem excluído)
- Cargo de admin fixado como texto (não editável)
- Botão "Excluir" adicionado individualmente por usuário
- Confirmação antes de deletar usuários
- Verificação da role no backend para garantir consistência

### 🔹 v2.4 – Integração Supabase + identidade visual
- Frontend integrado com Supabase (REST API)
- Produtos e usuários migrados para tabelas do Supabase
- Tokens dinâmicos usados no `userService.ts` via `localStorage`
- Adicionado favicon personalizado no navegador
- Corrigido uso de `import.meta.env` com `vite-env.d.ts`

### 🔹 v2.5 – Ajustes finos de experiência
- Adicionado botão de mostrar senha (ícone de olho) no login/cadastro
- Alternância entre senha visível e oculta com ícones interativos
- Correção visual de inputs no modo escuro

---

## 🔐 Versão 3.0 – Segurança e edição refinadas
- Nova permissão de edição de nome:
  - Admin pode editar **vendedores**
  - Admin pode editar **seu próprio nome**
  - Admin **não pode editar outros admins**
- Campo de nome com `<input>` reativo inline
- Chamada `updateUserName()` implementada no `userService.ts`
- Atualização automática da lista após edição
- Correções finais de estrutura e validação de uso do `PageWrapper`

---

🎯 Projeto 100% funcional, responsivo, com segurança de roles e integração completa com Supabase.
