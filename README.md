# 🍽️ Recipe Finder

A full-stack recipe management application built with **Next.js 16** (frontend) and **Laravel 12** (backend). Users can create, search, view, edit, and delete recipes with ease.

---

## ✨ Features

- **Search** — filter recipes by title or ingredient
- **CRUD** — create, read, update, and delete recipes
- **Recipe detail view** — ingredients list with bullet points, numbered step-by-step instructions
- **Modern UI** — dark theme, responsive grid layout (1–3 columns), Tailwind CSS 4 styling
- **Full-text search** — backend scope query searches across `title` and `ingredients` columns

---

## 🧱 Tech Stack

| Layer    | Technology                              |
| -------- | --------------------------------------- |
| Frontend | Next.js 16, React 19, TypeScript, Tailwind CSS 4 |
| Backend  | Laravel 12, PHP 8.2+                    |
| Database | MySQL (via Laravel migrations)          |
| API      | RESTful JSON (port 8000)                |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- PHP 8.2+
- Composer
- MySQL (or SQLite for local dev)

### Backend Setup

```bash
cd backend
composer install
cp .env.example .env
# Update .env with your database credentials
php artisan key:generate
php artisan migrate
php artisan serve
```

The API server starts at **http://localhost:8000**.

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend starts at **http://localhost:3000**.

> Set `NEXT_PUBLIC_API_URL=http://localhost:8000/api` in `frontend/.env.local` (optional — defaults to `http://localhost:8000/api`).

---

## 📡 API Endpoints

| Method | Endpoint                 | Description          |
| ------ | ------------------------ | -------------------- |
| GET    | `/api/recipes`           | List all recipes     |
| GET    | `/api/recipes?search=`   | Search recipes       |
| POST   | `/api/recipes`           | Create a recipe      |
| GET    | `/api/recipes/{id}`      | Show a recipe        |
| PUT    | `/api/recipes/{id}`      | Update a recipe      |
| DELETE | `/api/recipes/{id}`      | Delete a recipe      |

### Recipe Schema

```json
{
  "id": 1,
  "title": "Spaghetti Carbonara",
  "ingredients": "200g spaghetti\n2 eggs\n100g pancetta\n50g parmesan",
  "instructions": "Boil pasta.\nFry pancetta.\nMix eggs with cheese.\nCombine everything.",
  "created_at": "2026-07-10T12:00:00Z",
  "updated_at": "2026-07-10T12:00:00Z"
}
```

---

## 🗂️ Project Structure

```
18. Recipe Finder/
├── frontend/                     # Next.js 16 application
│   └── src/
│       └── app/
│           ├── components/       # RecipeCard, RecipeFormModal
│           ├── lib/              # API client (fetch wrapper)
│           ├── types/            # TypeScript interfaces
│           ├── recipes/          # Recipe list + detail pages
│           ├── globals.css       # Tailwind base
│           ├── layout.tsx        # Root layout
│           └── page.tsx          # Landing page
├── backend/                      # Laravel 12 application
│   ├── app/
│   │   ├── Http/Controllers/    # RecipeController
│   │   └── Models/              # Recipe Eloquent model
│   ├── database/migrations/     # Creates `recipes` table
│   └── routes/api.php           # API route registration
└── README.md
```

---

## 🗄️ Database

The database is named **`recipe_finder`** (MySQL). The `recipes` table has the following columns:

| Column       | Type      | Description            |
| ------------ | --------- | ---------------------- |
| `id`         | bigint PK | Auto-increment         |
| `title`      | string    | Recipe name            |
| `ingredients`| text      | One ingredient per line|
| `instructions`| text     | Step-by-step directions|
| `created_at` | timestamp |                        |
| `updated_at` | timestamp |                        |

---

## 📄 License

MIT
