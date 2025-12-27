import { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

/**
 * ErrorBoundary - Catches JavaScript errors in child component tree
 * Prevents entire app from crashing on component errors.
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
        // TODO: Send to error reporting service (e.g., Sentry)
    }

    handleRetry = (): void => {
        this.setState({ hasError: false, error: null });
    };

    render(): ReactNode {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="min-h-screen flex items-center justify-center bg-brand-bg p-6">
                    <div className="max-w-md w-full text-center">
                        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-brand-danger/10 flex items-center justify-center">
                            <i className="fa-solid fa-triangle-exclamation text-2xl text-brand-danger" />
                        </div>
                        <h1 className="text-2xl font-bold text-brand-text-primary mb-2">
                            Something went wrong
                        </h1>
                        <p className="text-brand-text-secondary mb-6">
                            We encountered an unexpected error. Please try refreshing the page.
                        </p>
                        <div className="space-y-3">
                            <button
                                onClick={this.handleRetry}
                                className="w-full px-4 py-2.5 bg-brand-accent hover:bg-brand-accent-light text-white font-medium rounded-xl transition-all duration-200"
                            >
                                Try Again
                            </button>
                            <button
                                onClick={() => window.location.reload()}
                                className="w-full px-4 py-2.5 bg-brand-elevated hover:bg-zinc-700 text-white font-medium rounded-xl border border-white/10 transition-all duration-200"
                            >
                                Refresh Page
                            </button>
                        </div>
                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <details className="mt-6 text-left">
                                <summary className="text-sm text-brand-text-muted cursor-pointer hover:text-brand-text-secondary">
                                    Error Details
                                </summary>
                                <pre className="mt-2 p-4 bg-brand-surface rounded-xl text-xs text-brand-danger overflow-auto">
                                    {this.state.error.message}
                                    {'\n\n'}
                                    {this.state.error.stack}
                                </pre>
                            </details>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
