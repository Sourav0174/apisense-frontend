"use client";

import React, { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Link from "next/link";
import { Loader2, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await login({ username: email, password });
      // Router push is handled in context
    } catch (e: unknown) {
      const err = e as Error & { message?: string };
      if (err.message?.toLowerCase().includes("not verified")) {
        setError("Your email is not verified.");
      } else {
        setError(err.message || "Failed to sign in. Please check your credentials.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-text-primary">Welcome back</h3>
        <p className="text-sm text-text-secondary mt-1">Sign in to your APISense account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 rounded-lg bg-danger/10 border border-danger/20 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-danger shrink-0 mt-0.5" />
            <div className="text-sm text-danger flex-1">
              {error}
              {error === "Your email is not verified." && (
                <div className="mt-2">
                  <Link href={`/verify-email?email=${encodeURIComponent(email)}`} className="text-danger font-medium hover:underline">
                    Verify email now &rarr;
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="space-y-4">
          <Input
            label="Email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isSubmitting}
            placeholder="you@example.com"
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isSubmitting}
            placeholder="••••••••"
          />
        </div>

        <div className="flex items-center justify-between">
          <Link href="/forgot-password" className="text-sm text-accent hover:text-accent-hover font-medium">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign in"
          )}
        </Button>
      </form>

      <div className="text-center text-sm text-text-secondary">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-accent hover:text-accent-hover font-medium">
          Create one now
        </Link>
      </div>
    </div>
  );
}
