# Contributing Guide

## Getting Started

1. Fork the repository on GitHub
2. Create a feature branch from `main`
3. Make your changes
4. Open a Pull Request

## Branch Naming

| Type | Pattern |
|---|---|
| Feature | `feature/short-description` |
| Bug fix | `fix/short-description` |
| Docs | `docs/short-description` |

## Commit Messages

Use concise, descriptive messages with a prefix:

```
feat: add prompt versioning
fix: resolve date serialization error
docs: update architecture diagram
refactor: simplify route handlers
chore: update dependencies
```

## Code Style

- TypeScript everywhere — no `any` unless unavoidable
- Follow the existing file and folder conventions
- Run `npm run lint` and `npm run format` before committing
- Keep components small and focused

## Before Submitting a PR

```bash
npm run lint       # must pass
npx tsc --noEmit   # must pass
npm run build      # must succeed
```

## Pull Request Checklist

- [ ] Lint and type check pass
- [ ] Build succeeds
- [ ] No unrelated changes included
- [ ] Documentation updated if needed

## Adding a New Asset Type

1. Add the table to `shared/schema.ts`
2. Run `npm run db:push`
3. Add CRUD routes to `server/routes.ts`
4. Add the API calls to `src/lib/api.ts`
5. Add state and actions to `src/lib/store.ts`
6. Create components in `src/components/`
7. Add a route in `src/routes/`

## Getting Help

- Read the [docs](./README.md)
- Open a [GitHub issue](https://github.com/firstall31-dot/Dev-Studio/issues)
- Start a [discussion](https://github.com/firstall31-dot/Dev-Studio/discussions)
