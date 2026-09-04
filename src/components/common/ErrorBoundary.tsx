import React, { Component } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  resetKey?: string;
  title?: string;
  description?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  declare readonly props: ErrorBoundaryProps;
  declare setState: (state: Partial<ErrorBoundaryState>) => void;
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    if ((import.meta as ImportMeta & { env?: { DEV?: boolean } }).env?.DEV) {
      console.error('ToolNova render error:', error, info.componentStack);
    }
  }

  componentDidUpdate(previousProps: ErrorBoundaryProps) {
    if (previousProps.resetKey !== this.props.resetKey && this.state.hasError) {
      this.setState({ hasError: false });
    }
  }

  private retry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <div
        role="alert"
        className="rounded-2xl border border-rose-500/30 bg-rose-950/20 p-8 text-center"
      >
        <AlertTriangle className="mx-auto mb-3 h-8 w-8 text-rose-400" />
        <h2 className="text-lg font-bold text-white">
          {this.props.title || 'This studio could not be loaded'}
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-slate-400">
          {this.props.description ||
            'Something went wrong while opening this tool. Your files have not been uploaded. Try loading the studio again.'}
        </p>
        <button
          type="button"
          onClick={this.retry}
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-950"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Try again
        </button>
      </div>
    );
  }
}