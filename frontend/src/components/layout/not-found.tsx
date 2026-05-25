import { Link } from "@tanstack/react-router";
import { Home, Search, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

export function NotFoundComponent() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 size-64 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 size-96 bg-violet-500/5 rounded-full blur-3xl animate-pulse [animation-delay:1s]" />
      </div>

      <div className="relative max-w-2xl w-full text-center">
        {/* Animated 404 with floating effect */}
        <div
          className={`transition-all duration-1000 ${
            mounted
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-8"
          }`}
        >
          <div className="relative inline-block">
            <h1 className="text-9xl md:text-[12rem] font-bold text-foreground/10 select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <Search className="size-16 md:size-20 text-primary/60 animate-pulse" />
                <div className="absolute -top-1 -right-1 size-3 bg-primary rounded-full animate-ping" />
              </div>
            </div>
          </div>
        </div>

        {/* Animated content */}
        <div
          className={`mt-8 space-y-4 transition-all duration-1000 delay-200 ${
            mounted
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
            Page Not Found
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved to a new location.
          </p>
        </div>

        {/* Animated suggestions */}
        <div
          className={`mt-8 grid gap-3 sm:grid-cols-2 max-w-md mx-auto transition-all duration-1000 delay-300 ${
            mounted
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <Link
            to="/"
            className="group relative inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:scale-105 hover:shadow-lg hover:shadow-primary/20"
          >
            <Home className="size-4 transition-transform group-hover:-translate-y-0.5" />
            <span>Go Home</span>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="group relative inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-6 py-3 text-sm font-medium text-foreground transition-all hover:bg-accent hover:scale-105 hover:shadow-lg"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            <span>Go Back</span>
          </button>
        </div>

        {/* Animated floating elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-1/4 left-1/4 size-2 bg-primary/40 rounded-full animate-bounce [animation-delay:0ms] animation-duration-[3s]" />
          <div className="absolute top-1/3 right-1/3 size-1.5 bg-violet-500/40 rounded-full animate-bounce [animation-delay:500ms] animation-duration-[2.5s]" />
          <div className="absolute bottom-1/3 left-1/3 size-2 bg-primary/30 rounded-full animate-bounce [animation-delay:1000ms] animation-duration-[3.5s]" />
          <div className="absolute bottom-1/4 right-1/4 size-1.5 bg-violet-500/30 rounded-full animate-bounce [animation-delay:1500ms] animation-duration-[2.8s]" />
        </div>

        {/* Helpful links */}
        <div
          className={`mt-12 transition-all duration-1000 delay-500 ${
            mounted
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-xs text-muted-foreground mb-3">Quick Links</p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <Link
              to="/tools"
              search={{ tab: "prompts" }}
              className="text-muted-foreground hover:text-foreground transition-colors hover:underline"
            >
              Prompts
            </Link>
            <span className="text-muted-foreground/30">•</span>
            <Link
              to="/tools"
              search={{ tab: "agents" }}
              className="text-muted-foreground hover:text-foreground transition-colors hover:underline"
            >
              Agents
            </Link>
            <span className="text-muted-foreground/30">•</span>
            <Link
              to="/tools"
              search={{ tab: "components" }}
              className="text-muted-foreground hover:text-foreground transition-colors hover:underline"
            >
              Components
            </Link>
            <span className="text-muted-foreground/30">•</span>
            <Link
              to="/tools"
              search={{ tab: "snippets" }}
              className="text-muted-foreground hover:text-foreground transition-colors hover:underline"
            >
              Snippets
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
