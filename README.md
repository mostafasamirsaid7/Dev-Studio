# Dev Studio

> Your personal AI dev hub — save, organize, search and reuse prompts, agents, components, templates, snippets and interview prep all in one place.

## Features

- **Prompts** — versioned prompt library with variables and usage tracking
- **AI Agents** — custom agents with system prompts, tools, and model config
- **Components** — reusable code components with dependency tracking
- **Templates** — project starter templates with tech stacks
- **Snippets** — code snippets organized by language
- **Interview Prep** — Q&A bank with difficulty levels and answer depths
- **Tech Skills** — frontend, backend, DevOps, testing, database checklists
- **Soft Skills** — communication and interview preparation tracks
- **Social Drafts** — draft posts for Twitter/LinkedIn/etc.
- **Mail Templates** — reusable email templates by channel

## Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TanStack Router, TanStack Query |
| State | Zustand (persisted to localStorage + synced to DB) |
| Styling | Tailwind CSS v4, shadcn/ui |
| Server | Express 5 + tsx |
| ORM | Drizzle ORM |
| Database | Replit PostgreSQL |
| Build | Vite |
| Language | TypeScript |

## Running on Replit

1. Open the project in Replit
2. Click **Run** — the database is auto-provisioned and the app starts on port 5000
3. Sign in with your Replit account

## Commands

```bash
npm run dev        # Start dev server (Express + Vite)
npm run build      # Build for production
npm run db:push    # Push schema changes to the database
npm run lint       # Run ESLint
npm run format     # Run Prettier
```

## Project Structure

```
server/
  db.ts            # Drizzle ORM client
  routes.ts        # All /api/* route handlers
shared/
  schema.ts        # Database schema (source of truth)
src/
  routes/          # TanStack Router pages
  components/      # React components
  hooks/           # Custom React hooks (useAuth, use-mobile)
  lib/
    store.ts       # Zustand store — all state & actions
    api.ts         # REST API client
  types/           # TypeScript type definitions
  data/seeds/      # Initial seed data
docs/              # Documentation
.github/           # GitHub workflows
```

## Documentation

- [Setup & Commands](./docs/setup/README.md)
- [Environment Variables](./docs/setup/ENVIRONMENT.md)
- [Architecture](./docs/architecture/README.md)
- [Data Models](./docs/architecture/DATA_MODELS.md)
- [Contributing](./docs/CONTRIBUTING.md)
