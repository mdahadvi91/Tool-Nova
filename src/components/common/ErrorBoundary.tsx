import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, ArrowLeft, Home } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  level?: 'shell' | 'route' | 'workspace' | 'tool';
  toolName?: string;
  onReset?: () => void;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public override state: ErrorBoundaryState = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  constructor(props: ErrorBoundaryProps) {
    super(props);
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ errorInfo });
    // Log diagnostic information in development
    if (typeof process !== 'undefined' && process.env?.NODE_ENV === 'development') {
      console.error(`[ErrorBoundary:${this.props.level || 'generic'}]`, error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render(): ReactNode {
    if (!this.state.hasError) {
      return this.props.children;
    }

    if (this.props.fallback) {
      return this.props.fallback;
    }

    const { level = 'generic', toolName } = this.props;

    if (level === 'tool') {
      return (
        <div className="w-full p-8 rounded-2xl bg-slate-900/80 border border-red-500/30 text-center space-y-4 shadow-xl backdrop-blur-md">
          <div className="w-12 h-12 mx-auto rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white">
              {toolName ? `Error loading ${toolName}` : 'Something went wrong while loading this tool'}
            </h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              The studio encountered an unexpected runtime error. Your local environment and platform layout remain safe.
            </p>
          </div>

          {this.state.error && (
            <div className="text-left bg-slate-950/80 border border-slate-800 p-3 rounded-xl max-w-lg mx-auto text-[11px] font-mono text-red-300 overflow-x-auto">
              {this.state.error.toString()}
            </div>
          )}

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={this.handleReset}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded-xl transition-colors shadow-sm"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Try Again</span>
            </button>
            <a
              href="/"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Tools</span>
            </a>
          </div>
        </div>
      );
    }

    if (level === 'workspace') {
      return (
        <div className="max-w-xl mx-auto my-12 p-8 rounded-3xl bg-slate-900/80 border border-amber-500/30 text-center space-y-4 shadow-2xl backdrop-blur-md">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-white">Workspace Render Error</h2>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              We encountered an issue rendering this workspace collection. Please try reloading or return to the platform directory.
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={this.handleReset}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded-xl transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reload Workspace</span>
            </button>
            <a
              href="/"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Platform Home</span>
            </a>
          </div>
        </div>
      );
    }

    // Shell / Route level
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-8 text-center space-y-5 shadow-2xl">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <div className="space-y-1.5">
            <h2 className="text-xl font-bold text-white">Application Encountered an Error</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              An unexpected component failure occurred. You can safely return to the home screen or refresh the page.
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded-xl transition-colors shadow-md"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reload App</span>
            </button>
            <a
              href="/"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Go to Home</span>
            </a>
          </div>
        </div>
      </div>
    );
  }
}
