# Довідник екзопланет (Exoplanet Directory) 🪐

Цей проєкт — це повностековий веб-додаток (monorepo), який відображає базу даних відкритих екзопланет. 
Взаємодія між клієнтом та сервером здійснюється **виключно через GraphQL**.

## 🔗 Швидкі посилання (запущена локально)

| Компонент | URL | Опис |
|-----------|-----|------|
| **Frontend** | [http://localhost:5173/](http://localhost:5173/) | Vue.js веб-додаток з базою екзопланет |
| **Backend GraphQL** | [http://localhost:3000/graphql](http://localhost:3000/graphql) | GraphQL API (Playground & API) |

> ℹ️ **Важливо:** Ці URL доступні **тільки коли обидва сервери запущені локально** (див. розділ "🚀 Як запустити проєкт локально")

---

## 🛠 Технологічний стек

*   **Менеджер пакетів**: [pnpm](https://pnpm.io/) (у режимі monorepo workspaces)
*   **Бекенд (apps/api)**: 
    - [NestJS](https://nestjs.com/) - фреймворк
    - GraphQL (@nestjs/graphql, @apollo/server) - API
    - **PostgreSQL** з TypeORM - база даних
    - CSV Parser - завантаження даних
*   **Фронтенд (apps/web)**: 
    - [Vue 3](https://vuejs.org/) (Composition API)
    - [Vite](https://vitejs.dev/) - dev server
    - [Tailwind CSS](https://tailwindcss.com/) - стилізація
    - [Apollo Client](https://www.apollographql.com/docs/react/) - GraphQL клієнт
*   **База даних**: PostgreSQL 16 (локальна установка **АБО** Docker)
*   **Дані**: 6100+ екзопланет завантажені з CSV у PostgreSQL при запуску

---

## 📂 Структура проєкту

```
Exoplanets/
├── apps/
│   ├── api/              # NestJS GraphQL сервер з TypeORM
│   │   ├── src/
│   │   │   ├── planet/   # GraphQLResolver, Service, Model
│   │   │   ├── app.module.ts
│   │   │   └── main.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── web/              # Vue 3 фронтенд додаток
│       ├── src/
│       │   ├── components/
│       │   ├── views/
│       │   ├── App.vue
│       │   └── main.ts
│       ├── package.json
│       └── vite.config.ts
├── exoplanets.csv        # Дані про екзопланети
├── docker-compose.yml    # PostgreSQL контейнер (optional)
├── package.json          # Кореневий файл для pnpm workspaces
├── pnpm-workspace.yaml
└── README.md
```

---

## 🚀 Як запустити проєкт локально

### Передумови:
- **Node.js 18+** та **pnpm 8+**
- **PostgreSQL 16** встановлена локально, **АБО** Docker встановлений

### ⚙️ Крок 1: Завантаження та встановлення залежностей

```bash
git clone https://github.com/Dori-Doll/ExoplanetsDataBase.git
cd ExoplanetsDataBase
pnpm install
```

### 🗄️ Крок 2: Запуск PostgreSQL бази даних

**Варіант А: Локальна PostgreSQL (рекомендується)**
- Впевніться, що PostgreSQL 16 запущена локально на порті 5432
- База даних `exoplanets` буде автоматично створена при першому запуску бекенду

**Варіант Б: Docker (альтернатива)**
```bash
docker-compose up -d
```

### 🖥️ Крок 3: Запуск бекенду (API) — **Терміналу 1️⃣**

```bash
cd apps/api
pnpm start:dev
```

**Результат:**
- ✅ Бекенд запущений на **[http://localhost:3000](http://localhost:3000)**
- 📊 GraphQL Playground & API доступні на **[http://localhost:3000/graphql](http://localhost:3000/graphql)**
- ✅ Автоматично завантажуються 6100 екзопланет з CSV у базу даних
- 💾 У логах ви побачите: `"Successfully loaded 6100 exoplanets into database"`

### 🌐 Крок 4: Запуск фронтенду (Web) — **Терміналу 2️⃣**

В **новому вікні терміналу**:
```bash
cd apps/web
pnpm dev
```

**Результат:**
- ✅ Фронтенд запущений на **[http://localhost:5173/](http://localhost:5173/)**
- 🌐 **Відкрийте браузер** та перейдіть за цією адресою
- 🎨 Vue DevTools доступні на **[http://localhost:5173/__devtools__/](http://localhost:5173/__devtools__/)**

---

## 📡 Архітектура: Frontend ↔ Backend

```
┌──────────────────────────────────────────┐
│  Frontend (Vue 3)                        │
│  http://localhost:5173/                  │
│  ┌──────────────────────────────────────┐│
│  │ Apollo Client                        ││
│  │ ↓ GraphQL Query/Mutation             ││
│  └──────────────────────────────────────┘│
└──────────────────────────────────────────┘
            ↓ HTTP POST
┌──────────────────────────────────────────┐
│  Backend (NestJS + GraphQL)              │
│  http://localhost:3000/graphql           │
│  ┌──────────────────────────────────────┐│
│  │ GraphQL Resolver                     ││
│  │ ↓ Service (Business Logic)           ││
│  │ ↓ TypeORM Repository                 ││
│  └──────────────────────────────────────┘│
└──────────────────────────────────────────┘
            ↓ SQL
┌──────────────────────────────────────────┐
│  PostgreSQL Database                     │
│  localhost:5432 / database: exoplanets   │
│  (6100+ екзопланет)                      │
└──────────────────────────────────────────┘
```

Всі запити даних проходять через GraphQL API, що забезпечує єдиний інтерфейс для отримання інформації про екзопланети.

---

## 🔍 GraphQL API Запити

### Отримати всі екзопланети
```graphql
query {
  planets {
    id
    pl_name
    hostname
    disc_year
    pl_bmasse
    sy_dist
  }
}
```

### Пошук екзопланети за назвою
```graphql
query {
  planetByName(name: "Kepler-452 b") {
    pl_name
    hostname
    disc_year
    pl_bmasse
  }
}
```

### Пошук екзопланет за назвою хоста
```graphql
query {
  planetsByHostname(hostname: "Kepler-452") {
    pl_name
    disc_year
    sy_dist
  }
}
```

---

## 📦 Структура БД

```sql
CREATE TABLE planets (
  id SERIAL PRIMARY KEY,
  pl_name VARCHAR(255) NOT NULL,
  hostname VARCHAR(255) NOT NULL,
  disc_year INT,
  pl_bmasse FLOAT,
  sy_dist FLOAT
);
```

- **pl_name** - назва екзопланети
- **hostname** - назва материнської зірки
- **disc_year** - рік відкриття
- **pl_bmasse** - маса планети (в масах Землі)
- **sy_dist** - відстань від Землі (в парсеках)

---

## 🎯 Основні можливості

- ✅ **6100+ екзопланет** в базі даних
- ✅ **GraphQL API** для отримання даних
- ✅ **Vue 3** інтерфейс для перегляду та пошуку
- ✅ **PostgreSQL** база даних
- ✅ **Автоматичне завантаження** даних з CSV при запуску
- ✅ **Монореп** архітектура (pnpm workspaces)

---

## 🐛 Розв'язання проблем

### Помилка: "ECONNREFUSED" при запуску бекенду
**Рішення:** Переконайтеся, що PostgreSQL запущена:
```bash
# На Windows
net start postgresql-x64-16

# На macOS (з Homebrew)
brew services start postgresql@16

# Або використайте Docker
docker-compose up -d
```

### Помилка: "Port 5173 is already in use"
**Рішення:** Вбийте процес на цьому порті або запустіть на іншому:
```bash
cd apps/web
pnpm dev -- --port 5174
```

### GraphQL Playground не відкривається
**Рішення:** Переконайтеся, що бекенд запущений на порті 3000:
```bash
curl http://localhost:3000/graphql
```

---

## 📝 Ліцензія

Цей проєкт використовує відкриті дані про екзопланети.

---

## 👨‍💻 Розробник

Проєкт розроблений як навчальний приклад повностекового веб-додатку з GraphQL.

---

**Остаточне оновлення:** 5 січня 2026 р.
