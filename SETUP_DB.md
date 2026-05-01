# Установка PostgreSQL

## Варіант 1: Використання Docker (Рекомендується)

Найпростіший спосіб - використати Docker Compose:

```bash
docker-compose up -d
```

Це автоматично запустить PostgreSQL контейнер з правильною конфігурацією.

## Варіант 2: Локальна установка PostgreSQL

### На Windows

1. Завантажте інсталер з [postgresql.org](https://www.postgresql.org/download/windows/)
2. Запустіть інсталер і дотримуйтесь інструкцій
3. При установці задайте пароль для користувача `postgres`
4. На запитання про порт введіть `5432`

### На macOS

```bash
# Використовуючи Homebrew
brew install postgresql@16
brew services start postgresql@16

# Або встановіть PostgreSQL App
# Завантажте з https://postgresapp.com/
```

### На Linux (Ubuntu/Debian)

```bash
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
sudo service postgresql start
```

## Створення БД

Після установки PostgreSQL:

```bash
# Підключіться як користувач postgres
psql -U postgres

# У PostgreSQL shell:
CREATE DATABASE exoplanets;
```

## Перевірка підключення

```bash
psql -U postgres -d exoplanets -h localhost
```

## Параметри для `.env` файлу

Якщо ви використали Docker:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=exoplanets
```

Якщо ви встановили локально (змініть пароль на те, що задали під час установки):
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=<ваш_пароль>
DB_NAME=exoplanets
```

## Розв'язування проблем

### Помилка: "Connection refused"
- Переконайтесь, що PostgreSQL запущений
- Перевірте, чи правильно вказані параметри DB_HOST, DB_PORT

### Помилка: "No database named 'exoplanets'"
- Створіть БД за допомогою SQL команди вище

### Помилка: "Password authentication failed"
- Перевірте пароль у `.env` файлі
- Переконайтесь, що користувач `postgres` існує
