# Setup Guide

Dev Studio runs fully on Replit — no local setup needed.

## Quick Start

1. Open the project in Replit
2. The PostgreSQL database is automatically provisioned
3. Click **Run** — the app starts on port 5000
4. Sign in with your Replit account

## Commands

```bash
npm run dev        # Start the dev server (Express + Vite)
npm run build      # Build for production
npm run db:push    # Push schema changes to the database
npm run lint       # Run ESLint
npm run format     # Format code with Prettier
```

## Project Structure

```
server/
  db.ts                  # Drizzle ORM database client
  routes.ts              # All /api/* route handlers
shared/
  schema.ts              # Database schema (source of truth)
src/
  routes/                # TanStack Router pages
  components/
    ui/                  # shadcn/ui base components
    auth/                # Auth gate and login form
    layout/              # App shell, sidebar, navigation
    tools/               # Prompts, agents, components, snippets, templates
    interview/           # Interview prep components
    connectors/          # Connector cards and editors
    social/              # Social draft components
    mails/               # Mail template components
    tech-skills/         # Tech skill area views
    soft-skills/         # Soft skill views
  hooks/                 # Custom React hooks
  lib/
    store.ts             # Zustand store — all app state and actions
    api.ts               # REST API client
  types/                 # TypeScript type definitions
  data/seeds/            # Initial seed data
docs/                    # Documentation
.github/                 # GitHub workflows
```

See [Environment Variables](./ENVIRONMENT.md) for configuration details.
