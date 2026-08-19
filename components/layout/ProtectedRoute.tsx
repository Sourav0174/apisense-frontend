"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { useRouter, usePathname } from "next/navigation";
import { Activity } from "lucide-react";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(`/login?returnTo=${encodeURIComponent(pathname)}`);
    }
  }, [isLoading, isAuthenticated, router, pathname]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden">
        {/* Deep ambient background matching auth/dashboard */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-accent/10 blur-[120px] pointer-events-none" />
        
        <div className="relative flex flex-col items-center gap-6 z-10">
          <div className="w-16 h-16 rounded-2xl bg-surface/50 border border-surface-border flex items-center justify-center shadow-lg relative">
            <div className="absolute inset-0 bg-accent/10 rounded-2xl animate-pulse" />
            <Activity className="w-8 h-8 text-accent relative z-10 animate-[pulse_2s_ease-in-out_infinite]" />
          </div>
          <div className="space-y-2 text-center">
            <h2 className="text-xl font-semibold text-text-primary tracking-tight">APISense</h2>
            <p className="text-sm text-text-tertiary">Authenticating session...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will unmount and redirect via useEffect
  }

  return <>{children}</>;
}
