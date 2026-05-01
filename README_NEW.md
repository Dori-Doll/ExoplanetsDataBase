# Довідник екзопланет (Exoplanet Directory) 🪐

Цей проєкт — це повностековий веб-додаток (monorepo), який відображає базу даних відкритих екзопланет. 
Взаємодія між клієнтом та сервером здійснюється **виключно через GraphQL**.

## 🛠 Технологічний стек

*   **Менеджер пакетів**: [pnpm](https://pnpm.io/) (у режимі monorepo workspaces).
*   **Бекенд (apps/api)**: [NestJS](https://nestjs.com/), GraphQL (@nestjs/graphql, @apollo/server), **PostgreSQL** (TypeORM), читання даних з CSV.
*   **Фронтенд (apps/web)**: [Vue 3](https://vuejs.org/) (Composition API), [Vite](https://vitejs.dev/), [Tailwind CSS](https://tailwindcss.com/), [Apollo Client](https://www.apollographql.com/docs/react/), GraphQL Code Generator.
*   **База даних**: PostgreSQL 16 (Docker контейнер)

## 📂 Структура проєкту

```
Exoplanets/
├── apps/
│   ├── api/          # NestJS GraphQL сервер з TypeORM
│   └── web/          # Vue 3 фронтенд додаток
├── docker-compose.yml # PostgreSQL контейнер
├── package.json      # Кореневий файл для pnpm workspaces
├── pnpm-workspace.yaml
└── README.md
```

## 🚀 Як запустити проєкт локально

### 0. Запуск PostgreSQL БД (обов'язково)

Встановіть [Docker](https://www.docker.com/) та запустіть контейнер PostgreSQL:

```bash
docker-compose up -d
```

Це запустить PostgreSQL на порті 5432 з наступними параметрами:
- **Username**: postgres
- **Password**: postgres
- **Database**: exoplanets

Перевірити статус БД:
```bash
docker-compose ps
```

Зупинити БД:
```bash
docker-compose down
```

### 1. Завантаження та встановлення

```bash
git clone https://github.com/Dori-Doll/ExoplanetsDataBase.git
cd ExoplanetsDataBase
pnpm install
```

### 2. Запуск бекенду (API)

Бекенд піднімає GraphQL сервер на порті 3000 та автоматично завантажує дані з CSV до PostgreSQL.

```bash
cd apps/api
pnpm start:dev
```

*GraphQL Playground доступний за адресою: http://localhost:3000/graphql*

**При першому запуску** сервер автоматично:
- Створить таблицю `planets` в БД
- Завантажить дані з файлу `exoplanets.csv`

### 3. Запуск фронтенду (Web)

В іншому вікні терміналу запустіть клієнтську частину:

```bash
cd apps/web
pnpm dev
```

*Відкрийте браузер за посиланням, вказаним у терміналі (зазвичай http://localhost:5173).*

## 📝 Переменні середовища (`.env`)

Файл `apps/api/.env` містить конфігурацію підключення до БД:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=exoplanets
PORT=3000
NODE_ENV=development
```

Змініть ці значення за необхідності.
