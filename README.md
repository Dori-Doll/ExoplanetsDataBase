# Довідник екзопланет (Exoplanet Directory) 🪐

Цей проєкт — це повностековий веб-додаток (monorepo), який відображає базу даних відкритих екзопланет. 
Взаємодія між клієнтом та сервером здійснюється **виключно через GraphQL**.

## 🛠 Технологічний стек

*   **Менеджер пакетів**: [pnpm](https://pnpm.io/) (у режимі monorepo workspaces).
*   **Бекенд (pps/api)**: [NestJS](https://nestjs.com/), GraphQL (@nestjs/graphql, @apollo/server), читання даних з CSV (csv-parser).
*   **Фронтенд (pps/web)**: [Vue 3](https://vuejs.org/) (Composition API), [Vite](https://vitejs.dev/), [Tailwind CSS](https://tailwindcss.com/), [Apollo Client](https://www.apollographql.com/docs/react/), GraphQL Code Generator.

## 📂 Структура проєкту

`	ext
Exoplanets/
├── apps/
│   ├── api/          # NestJS GraphQL сервер
│   └── web/          # Vue 3 фронтенд додаток
├── package.json      # Кореневий файл для pnpm workspaces
├── pnpm-workspace.yaml
└── README.md
`

## 🚀 Як запустити проєкт локально

### 1. Завантаження та встановлення
`ash
git clone https://github.com/Dori-Doll/ExoplanetsDataBase.git
cd ExoplanetsDataBase
pnpm install
`

### 2. Запуск бекенду (API)
Бекенд піднімає GraphQL сервер на порті 3000.
`ash
cd apps/api
pnpm start
`
*GraphQL Playground доступний за адресою: http://localhost:3000/graphql*

### 3. Запуск фронтенду (Web)
В іншому вікні терміналу запустіть клієнтську частину:
`ash
cd apps/web
pnpm dev
`
*Відкрийте браузер за посиланням, вказаним у терміналі (зазвичай http://localhost:5173).*
