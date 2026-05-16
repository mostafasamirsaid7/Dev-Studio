export function AuthForm() {
  const handleLogin = () => {
    const domain = window.location.host;
    const authUrl = `https://replit.com/auth_with_repl_site?domain=${domain}`;
    const width = 480;
    const height = 640;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    const popup = window.open(
      authUrl,
      "replitAuth",
      `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no`,
    );

    const interval = setInterval(() => {
      if (popup && popup.closed) {
        clearInterval(interval);
        window.location.reload();
      }
    }, 500);
  };

  return (
    <div className="rounded-lg border border-border bg-card p-6 space-y-5 shadow-sm text-center">
      <div className="space-y-1">
        <h2 className="font-semibold text-base">Welcome to Dev Studio</h2>
        <p className="text-sm text-muted-foreground">
          Sign in to access your personal dev hub.
        </p>
      </div>
      <button
        onClick={handleLogin}
        className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
      >
        Log in
      </button>
    </div>
  );
}
