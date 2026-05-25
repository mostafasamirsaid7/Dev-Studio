# 🔑 API Credentials and Integrations Setup

> [!NOTE]
> Dev Studio is built with standard passport.js authentication and outbound API integrations. This guide outlines how to easily configure database connections, set up local secure auth, register Google OAuth credentials, and connect your server to Slack.

---

## 🗄️ 1. Database Connection (PostgreSQL)

Dev Studio uses PostgreSQL for data persistence. You can run Postgres locally or connect to a managed cloud database.

### 💻 Running PostgreSQL Locally

If you do not have Postgres installed:

1. Download and install PostgreSQL from the [official website](https://www.postgresql.org/download/).
2. Create a database named `dev_studio_db`.
3. Set your connection string in your **`backend/.env`** file under the key `DATABASE_URL`:
   ```ini
   DATABASE_URL=postgresql://postgres:your_db_password@localhost:5432/dev_studio_db
   ```
4. Synchronize the schema and initialize seeding:
   ```bash
   # Push tables to postgres database
   npm run db:push --prefix backend

   # Run database seed
   npm run db:seed --prefix backend
   ```

---

## 🔐 2. Authentication

Dev Studio supports two modes of authentication out of the box.

### 📧 Mode A: Standard Email & Password (Local & Default)

- **Zero setup required.**
- Users can register a new account on the login page immediately.
- Passwords are securely hashed on the backend using `bcryptjs` (12 rounds) and verified locally.
- Session authorization is handled via a secure `httpOnly` signed JWT cookie (`ds_token`).

### 🌐 Mode B: Sign-in with Google (OAuth 2.0)

To enable modern social sign-in:

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project or select an existing one.
3. Navigate to **APIs & Services** > **Credentials**.
4. Click **Configure Consent Screen**, fill out the basic app details, and save.
5. Click **Create Credentials** > **OAuth Client ID**.
6. Select **Web Application** as the application type.
7. Under **Authorized Redirect URIs**, add your local development callback URL:
   ```
   http://localhost:5000/api/auth/google/callback
   ```
8. Copy the generated **Client ID** and **Client Secret** into your **`backend/.env`** file:
   ```ini
   GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=your_client_secret_here
   ```
9. Restart your local server. The "Sign in with Google" button will be activated automatically!

---

## 💬 3. Slack Webhooks (Optional)

To enable server-side automated message updates into your Slack channels, please refer to the detailed guide in our [Integrations Center](../integrations/README.md).
