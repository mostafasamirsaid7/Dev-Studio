# Setup Guide

Dev Studio runs fully on Replit — no local setup needed.

## Quick Start

1. Open the project in Replit
2. The database is automatically provisioned
3. Click **Run** — the app starts on port 5000
4. Sign in with your Replit account

## Available Commands

```bash
npm run dev        # Start dev server
npm run build      # Build for production
npm run db:push    # Push schema changes to the database
npm run lint       # Run ESLint
npm run format     # Format code with Prettier
```

## Project Structure

```
server/                  # Express server (Node.js, runs at startup)
│   db.ts                # Drizzle ORM database client
│   routes.ts            # All API route handlers
│   slack-notifications.ts  # Optional Slack integration
shared/
│   schema.ts            # Database schema (Drizzle)
src/
├── routes/              # TanStack Router pages
├── components/          # React components
│   ├── ui/              # shadcn/ui base components
│   ├── auth/            # Auth-related components
│   ├── layout/          # App shell, sidebar, page layout
│   ├── tools/           # Prompts, agents, components, snippets, templates
│   ├── interview/       # Interview prep components
│   ├── connectors/      # Connector cards & editors
│   ├── social/          # Social draft components
│   ├── mails/           # Mail template components
│   ├── tech-skills/     # Tech skill area components
│   └── soft-skills/     # Soft skill components
├── hooks/               # Custom React hooks
├── lib/                 # Core utilities
│   ├── store.ts         # Zustand store (all app state)
│   ├── api.ts           # API client (talks to /api/* routes)
│   └── utils.ts         # Shared helpers
├── types/               # TypeScript type definitions
├── data/seeds/          # Initial seed data
├── agents/              # Agent base classes and skill definitions
├── prompts/             # Prompt chains, templates, system prompts
└── styles.css           # Global styles
```

See [Environment Variables](./ENVIRONMENT.md) for configuration details.
