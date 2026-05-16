# Data Models

All data is stored in Replit PostgreSQL via Drizzle ORM. The schema is defined in `shared/schema.ts`.

## Asset Types

### Prompt

Versioned prompt library with variables and usage tracking.

```typescript
interface Prompt {
  id: string;           // UUID (auto-generated)
  userId: string;       // Replit user ID
  title: string;
  description?: string;
  category?: string;
  tags: string[];
  body: string;         // Prompt content
  variables: string[];  // Template variables e.g. ["language", "framework"]
  model?: string;       // Preferred AI model
  favorite: boolean;
  usageCount: number;
  versions: {           // Version history (stored as JSON)
    id: string;
    createdAt: number;
    body: string;
    note?: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}
```

### Agent

Custom AI agent with system prompt and tool list.

```typescript
interface Agent {
  id: string;
  userId: string;
  name: string;
  role?: string;
  systemPrompt: string;
  tools: string[];
  model?: string;
  temperature: number;  // 0–2, default 0.7
  status: string;       // "active" | "idle" | "draft"
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}
```

### Component

Reusable code component with dependency list.

```typescript
interface ComponentAsset {
  id: string;
  userId: string;
  name: string;
  description?: string;
  category?: string;
  tags: string[];
  code: string;
  dependencies: string[];
  favorite: boolean;
  usageCount: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### Template

Project starter template with tech stack.

```typescript
interface Template {
  id: string;
  userId: string;
  name: string;
  description?: string;
  stack: string[];      // e.g. ["React", "Node.js", "PostgreSQL"]
  tags: string[];
  structure?: string;   // Project structure description
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Snippet

Code snippet organized by language.

```typescript
interface Snippet {
  id: string;
  userId: string;
  title: string;
  language: string;
  description?: string;
  code: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}
```

### Connector

External service or contact record.

```typescript
interface Connector {
  id: string;
  userId: string;
  type: string;
  name: string;
  email?: string;
  phone?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Social Draft

Draft post for social platforms.

```typescript
interface SocialDraft {
  id: string;
  userId: string;
  platform: string;
  content: string;
  mediaUrls: string[];
  createdAt: Date;
  updatedAt: Date;
}
```

### Mail Template

Reusable email template by channel.

```typescript
interface MailTemplate {
  id: string;
  userId: string;
  channel: string;
  subject?: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Interview Question

Q&A entry for interview preparation.

```typescript
interface InterviewQuestion {
  id: string;
  userId?: string;      // null for global (seeded) questions
  question: string;
  answer: string;
  difficulty?: string;  // "junior" | "mid" | "senior"
  domain: string;       // "frontend" | "backend" | "devops" | ...
  tags: string[];
  isGlobal: boolean;    // true = visible to all users
  createdAt: Date;
}
```

### User Progress

Tracks checklist completion per user.

```typescript
interface UserProgress {
  userId: string;    // composite PK
  itemId: string;    // composite PK
  areaId: string;
  completed: boolean;
  updatedAt: Date;
}
```

## Database Schema

The actual schema is in `shared/schema.ts` and uses Drizzle ORM with Replit PostgreSQL.

All timestamp columns (`created_at`, `updated_at`) default to `NOW()` on the database side. When sending data from the frontend, date strings are stripped and timestamps are handled server-side.

## Types

TypeScript definitions live in `src/types/`:

- `src/types/tools.ts` — Prompt, Agent, ComponentAsset, Template, Snippet, Connector, SocialDraft, MailTemplate
- `src/types/skills.ts` — InterviewQuestion, FocusArea, Difficulty
- `src/types/common.ts` — Shared utility types

## Related

- [Architecture Overview](./README.md)
- [Setup Guide](../setup/README.md)
