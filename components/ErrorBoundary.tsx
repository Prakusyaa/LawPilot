"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle } from "lucide-react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div
          className="flex items-center justify-center min-h-[400px] p-6"
          role="alert"
        >
          <div className="max-w-sm w-full rounded-lg border border-wire bg-layer p-8 text-center">
            <div className="flex justify-center mb-5">
              <div className="w-12 h-12 rounded-full bg-layer-2 border border-wire flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-ink-3" aria-hidden="true" />
              </div>
            </div>
            <h2 className="text-base font-semibold text-ink mb-2">
              Terjadi Kesalahan
            </h2>
            <p className="text-sm text-ink-2 leading-relaxed mb-6">
              Terjadi kesalahan tak terduga. Muat ulang halaman untuk mencoba
              lagi.
            </p>
            <button
              onClick={() => window.location.reload()}
              aria-label="Muat Ulang Halaman"
              className="w-full py-2.5 rounded-md text-sm font-semibold transition-colors"
              style={{
                backgroundColor: "var(--lp-accent)",
                color: "var(--lp-accent-fg)",
              }}
            >
              Muat Ulang
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
