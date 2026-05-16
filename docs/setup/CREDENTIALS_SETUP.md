# Credentials Setup

Dev Studio uses Replit's built-in secrets store for all credentials.

## Database

No setup required. Replit automatically provisions a PostgreSQL database and sets `DATABASE_URL`.

## Slack (Optional)

If you want Slack notifications for deployments or errors:

1. Create a Slack app at [api.slack.com/apps](https://api.slack.com/apps)
2. Enable **Incoming Webhooks** and create a webhook URL
3. Add `SLACK_WEBHOOK_URL` to Replit Secrets
4. Optionally add `SLACK_SIGNING_SECRET` from your Slack app's Basic Information

## Authentication

Authentication is handled by Replit. Users sign in via their Replit account — no additional setup needed.
