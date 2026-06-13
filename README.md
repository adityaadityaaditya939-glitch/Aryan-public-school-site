# Aryan Public School Website

Official website for **Aryan Public School** — a fully functional school portal with admissions, authentication, announcements, and admin data export.

## Features

- **Public website** — Home, About, Admissions, Contact, Feedback
- **Student admission form** — Submissions stored in Neon PostgreSQL
- **Authentication portals** — Separate login for Students, Teachers, and Admin
- **Complaints / feedback** — Students and parents can submit concerns
- **Teacher announcements** — Teachers publish updates that appear in "Important Announcements & Links"
- **Admin dashboard** — View stats, review submissions, update statuses, create student/teacher accounts, and download data as **CSV or Excel**

## Tech Stack

- **Frontend:** Next.js 16, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes (Node.js)
- **Database:** Neon PostgreSQL
- **Auth:** JWT (httpOnly cookies) + bcrypt password hashing
- **Hosting:** Vercel (recommended)

## Getting Started

### 1. Install dependencies

```bash
cd aryan-public-school
npm install
```

### 2. Configure environment

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

When deploying to Vercel with Neon integration, `DATABASE_URL` is injected automatically.

### 3. Initialize the database

**Option A — CLI script (recommended):**

```bash
npm run db:setup
```

**Option B — API route (after starting the dev server):**

```bash
curl -X POST http://localhost:3000/api/setup -H "x-setup-secret: YOUR_SETUP_SECRET"
```

This creates all tables and a default admin account.

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Default Admin Login

After setup:
- **Email:** `admin@aryanpublicschool.edu.in` (or your `ADMIN_EMAIL`)
- **Password:** `Admin@12345` (or your `ADMIN_PASSWORD`)
- **Role:** Admin

> Change the admin password immediately after first login in production.

## Deploy to Vercel

1. Push this project to GitHub
2. Import the repo in [Vercel](https://vercel.com)
3. Connect your Neon database via the Vercel dashboard (Neon integration)
4. Add `JWT_SECRET` and `SETUP_SECRET` in Vercel Environment Variables
5. Deploy, then call `/api/setup` once to initialize the database

## Adding Users

**From the Admin dashboard:** Go to the **Users** tab and create student or teacher accounts with email and password.

**Via SQL** (alternative):

```sql
INSERT INTO users (email, password_hash, full_name, role)
VALUES ('teacher@school.edu', '$2a$12$...', 'Teacher Name', 'teacher');
```

Use bcrypt to hash passwords (cost factor 12).

## Project Structure

```
src/
├── app/              # Pages and API routes
├── components/       # Reusable UI components
├── lib/              # Database, auth, validation, export utilities
└── middleware.ts     # Route protection for dashboards
public/images/        # School photos and logo
```

## Security Notes

- Passwords are hashed with bcrypt (12 rounds)
- Sessions use httpOnly, secure cookies
- Admin export and setup routes require authentication/secrets
- Input validation with Zod on all form submissions
