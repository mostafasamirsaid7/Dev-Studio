# Architecture Overview

Dev Studio is a personal AI development hub built with React + Express on Replit.

## System Architecture

```
┌──────────────────────────────────────────────────────┐
│                   Browser / Client                    │
│  React 19 · TanStack Router · TanStack Query          │
│  Zustand (state) · shadcn/ui (components)             │
└─────────────────────────┬────────────────────────────┘
                          │  fetch /api/*
┌─────────────────────────▼────────────────────────────┐
│              Express Server (server.ts)               │
│  GET  /api/auth/user       — Replit identity          │
│  /api/prompts              — CRUD prompts             │
│  /api/agents               — CRUD agents             │
│  /api/components           — CRUD components         │
│  /api/snippets             — CRUD snippets           │
│  /api/templates            — CRUD templates          │
│  /api/connectors           — CRUD connectors         │
│  /api/social-drafts        — CRUD social drafts      │
│  /api/mail-templates       — CRUD mail templates     │
│  /api/interview-questions  — CRUD interview Q&A      │
│  /api/progress             — User checklist progress │
└─────────────────────────┬────────────────────────────┘
                          │  Drizzle ORM
┌─────────────────────────▼────────────────────────────┐
│           Replit PostgreSQL (DATABASE_URL)            │
│  prompts · agents · components · snippets            │
│  templates · connectors · social_drafts              │
│  mail_templates · interview_questions · user_progress│
└──────────────────────────────────────────────────────┘
```

## Authentication

Users authenticate via Replit. When a user is signed in, the Replit proxy injects two headers into every request:

- `x-replit-user-id` — stable unique user ID
- `x-replit-user-name` — display name

The server reads these in `server.ts` → `GET /api/auth/user`. The frontend's `AuthProvider` (`src/hooks/use-auth.tsx`) fetches that endpoint on mount to establish the session. Unauthenticated requests return 401 and the app redirects to `/auth`.

## Data Flow

```
User action in UI
  → Zustand store action (optimistic update)
  → fetch /api/<resource>  (POST / DELETE)
  → Express route handler
  → Drizzle query against PostgreSQL
  → Response updates store (or rolls back on error)
  → Toast notification shown
```

## Technology Stack

| Layer | Technology |
|---|---|
| Frontend framework | React 19 |
| Routing | TanStack Router |
| Data fetching | TanStack Query |
| State management | Zustand (persisted to localStorage) |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Forms | React Hook Form + Zod |
| Server | Express 5 + tsx |
| ORM | Drizzle ORM |
| Database | Replit PostgreSQL |
| Build tool | Vite |
| Language | TypeScript |

## Key Files

| File | Purpose |
|---|---|
| `server.ts` | Express entry point, auth endpoint, Vite dev middleware |
| `server/routes.ts` | All `/api/*` route handlers |
| `server/db.ts` | Drizzle ORM client |
| `shared/schema.ts` | Database schema (source of truth) |
| `src/lib/store.ts` | Zustand store — all app state and actions |
| `src/lib/api.ts` | REST API client called by the store |
| `src/hooks/use-auth.tsx` | Auth context and `useAuth()` hook |
| `src/routes/__root.tsx` | Root layout with providers |
