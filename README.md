# 🏠 HelHome - Sistema de Gerenciamento de Propriedades

Sistema para gerenciamento de propriedades imobiliárias com frontend moderno em React/Vite e backend robusto em Node.js/Express.

## 🚀 Tecnologias Utilizadas

### Backend
- **Node.js + Express**: Framework web rápido e minimalista
- **Prisma ORM**: ORM moderno para acesso ao banco de dados
- **SQLite**: Banco de dados relacional
- **TypeScript**: Tipagem estática para JavaScript
- **CORS**: Middleware para segurança de requisições cross-origin

### Frontend
- **React 18**: Biblioteca JavaScript para construção de interfaces
- **Vite**: Build tool ultrarrápida para desenvolvimento moderno
- **TypeScript**: Tipagem estática para maior segurança
- **Tailwind CSS**: Framework CSS utilitário para design responsivo
- **React Icons**: Biblioteca de ícones para React

## 📋 Pré-requisitos

- Node.js 18+ ou superior
- npm, yarn ou pnpm
- Git

## 🛠️ Instalação e Configuração

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/helhome-case.git
cd helhome-case
```

### 2. Configuração do Backend
```bash
# Acesse a pasta do servidor
cd server

# Instale as dependências
npm install
# ou
yarn install
# ou
pnpm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas configurações

# Execute as migrações do banco de dados
npx prisma migrate dev

# Inicie o servidor em modo de desenvolvimento
npm run dev
```

### 3. Configuração do Frontend
```bash
# Acesse a pasta do frontend
cd web

# Instale as dependências
npm install
# ou
yarn install
# ou
pnpm install

# Configure as variáveis de ambiente
cp .env.example .env.local
# Edite o arquivo .env.local com suas configurações

# Inicie o aplicativo em modo de desenvolvimento
npm run dev
```
