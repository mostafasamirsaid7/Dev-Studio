# Integrations

## Slack (Optional)

Dev Studio can send server-side Slack notifications.

**Setup:**

1. Create a Slack app at [api.slack.com/apps](https://api.slack.com/apps)
2. Enable **Incoming Webhooks** and copy the webhook URL
3. Add `SLACK_WEBHOOK_URL` to Replit Secrets
4. Optionally add `SLACK_SIGNING_SECRET` for request verification

## Adding More Integrations

All API calls must go through the Express server (`server/routes.ts`) — never directly from the browser. Add a new route, store any API keys in Replit Secrets, and call them server-side only.
