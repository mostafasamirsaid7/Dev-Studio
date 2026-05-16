# Environment Variables

Dev Studio runs on Replit and uses its built-in secrets store. No `.env` file is needed.

## Automatically Provided

| Variable | Source | Purpose |
|---|---|---|
| `DATABASE_URL` | Replit PostgreSQL | Database connection |
| `PORT` | Replit runtime | Server port |

## Optional (add via Replit Secrets)

| Variable | Purpose |
|---|---|
| `SLACK_WEBHOOK_URL` | Server-side Slack notifications |
| `SLACK_SIGNING_SECRET` | Verify incoming Slack requests |

## How to Add a Secret

1. Open the **Secrets** panel in your Replit project (lock icon in the sidebar)
2. Click **New Secret**
3. Enter the key name and value
4. The secret is available as `process.env.KEY_NAME` in server code

> Never put real credentials in `.env` files or source code.
