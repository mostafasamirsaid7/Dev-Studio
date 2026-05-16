# Integrations

## Slack (Optional)

Dev Studio can send server-side Slack notifications for deployments or errors.

**Setup:**
1. Create a Slack app at [api.slack.com/apps](https://api.slack.com/apps)
2. Enable **Incoming Webhooks** and create a webhook URL
3. Add `SLACK_WEBHOOK_URL` to Replit Secrets
4. Optionally add `SLACK_SIGNING_SECRET` for request verification

The integration code lives in `server/slack-notifications.ts`.

## Future Integrations

The `src/agents/` and `src/lib/ai/` modules provide scaffolding for connecting AI providers (OpenAI, Anthropic, etc.) when you're ready to add live AI capabilities.
