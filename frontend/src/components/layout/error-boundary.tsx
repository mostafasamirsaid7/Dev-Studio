import { Component, type ReactNode } from "react";
import { RefreshCw, Home, AlertTriangle } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  mounted: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  private mountTimer: NodeJS.Timeout | null = null;

  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, mounted: false };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    console.error("[ErrorBoundary] Caught error:", error, info.componentStack);
  }

  componentDidMount() {
    this.mountTimer = setTimeout(() => {
      this.setState({ mounted: true });
    }, 10);
  }

  componentWillUnmount() {
    if (this.mountTimer) {
      clearTimeout(this.mountTimer);
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, mounted: false });
    this.mountTimer = setTimeout(() => {
      this.setState({ mounted: true });
    }, 10);
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      const { mounted } = this.state;

      return (
        <div className="flex flex-1 items-center justify-center p-8 overflow-hidden relative">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 size-48 bg-destructive/5 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 size-64 bg-destructive/5 rounded-full blur-3xl animate-pulse [animation-delay:1s]" />
          </div>

          <div className="relative max-w-sm w-full text-center space-y-6">
            {/* Animated icon */}
            <div
              className={`transition-all duration-1000 ${
                mounted ? "opacity-100 scale-100" : "opacity-0 scale-75"
              }`}
            >
              <div className="relative inline-block">
                <div className="size-16 rounded-2xl bg-destructive/10 flex items-center justify-center mx-auto ring-1 ring-destructive/20">
                  <AlertTriangle className="size-8 text-destructive animate-pulse" />
                </div>
                <div className="absolute -top-1 -right-1 size-3 bg-destructive rounded-full animate-ping" />
              </div>
            </div>

            {/* Animated content */}
            <div
              className={`space-y-2 transition-all duration-1000 delay-200 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <h2 className="text-lg font-semibold text-foreground">Something went wrong</h2>
              <p className="text-sm text-muted-foreground">
                This section ran into an unexpected error. You can try again or go back home.
              </p>
            </div>

            {/* Error message */}
            {this.state.error?.message && (
              <div
                className={`transition-all duration-1000 delay-300 ${
                  mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <div className="text-xs text-muted-foreground bg-muted/60 rounded-xl px-3 py-2.5 font-mono text-left border border-border/60 max-h-20 overflow-y-auto scrollbar-thin">
                  {this.state.error.message}
                </div>
              </div>
            )}

            {/* Animated buttons */}
            <div
              className={`flex gap-2 justify-center transition-all duration-1000 delay-400 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <button
                onClick={this.handleRetry}
                className="group inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/20"
              >
                <RefreshCw className="size-4 transition-transform group-hover:rotate-180 duration-500" />
                Try again
              </button>
              <a
                href="/"
                className="group inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground hover:bg-accent transition-all hover:scale-105 hover:shadow-lg"
              >
                <Home className="size-4 transition-transform group-hover:-translate-y-0.5" />
                Go home
              </a>
            </div>

            {/* Floating particles */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              <div className="absolute top-1/4 left-1/4 size-1.5 bg-destructive/30 rounded-full animate-bounce [animation-delay:0ms] animation-duration-[3s]" />
              <div className="absolute top-1/3 right-1/3 size-1 bg-destructive/20 rounded-full animate-bounce [animation-delay:500ms] animation-duration-[2.5s]" />
              <div className="absolute bottom-1/3 left-1/3 size-1.5 bg-destructive/25 rounded-full animate-bounce [animation-delay:1000ms] animation-duration-[3.5s]" />
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
