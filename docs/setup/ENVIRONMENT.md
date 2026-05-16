# Environment Variables

Dev Studio runs on Replit and uses its built-in secrets store. No `.env` file is needed.

## Automatically Provided

| Variable | Source | Purpose |
|---|---|---|
| `DATABASE_URL` | Replit PostgreSQL | Database connection string |
| `PORT` | Replit runtime | Server port (defaults to 5000) |

## Optional

Add these via the **Secrets** panel in your Replit project (lock icon in the sidebar).

| Variable | Purpose |
|---|---|
| `SLACK_WEBHOOK_URL` | Slack notifications from the server |
| `SLACK_SIGNING_SECRET` | Verify incoming Slack requests |

## How to Add a Secret

1. Open the **Secrets** panel in your Replit project
2. Click **New Secret**
3. Enter the key and value
4. Access it in server code as `process.env.KEY_NAME`

> Never put credentials in source code or commit them to version control.
