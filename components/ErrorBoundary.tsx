"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-[400px] p-4" role="alert">
          <Card className="w-full max-w-md bg-slate-900 border-slate-800 text-center">
            <CardContent className="pt-6 space-y-4">
              <AlertTriangle className="w-12 h-12 text-red-500 mx-auto" aria-hidden="true" />
              <h2 className="text-xl font-bold text-white">Oops!</h2>
              <p className="text-slate-400">
                Terjadi kesalahan tak terduga. Muat ulang halaman untuk mencoba lagi.
              </p>
              <Button 
                onClick={() => window.location.reload()} 
                className="w-full bg-blue-600 hover:bg-blue-700"
                aria-label="Muat Ulang Halaman"
              >
                Muat Ulang
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
