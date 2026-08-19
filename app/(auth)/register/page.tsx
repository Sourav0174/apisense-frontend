"use client";

import React, { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Link from "next/link";
import { Loader2, AlertCircle } from "lucide-react";

export default function RegisterPage() {
  const { register } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await register({ full_name: fullName, email, password });
      // Router push to verify-email is handled in context
    } catch (e: unknown) {
      const err = e as Error & { message?: string };
      setError(err.message || "Failed to create account. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-text-primary">Create an account</h3>
        <p className="text-sm text-text-secondary mt-1">Start monitoring your APIs with APISense</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 rounded-lg bg-danger/10 border border-danger/20 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-danger shrink-0 mt-0.5" />
            <div className="text-sm text-danger flex-1">{error}</div>
          </div>
        )}

        <div className="space-y-4">
          <Input
            label="Full Name"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            disabled={isSubmitting}
            placeholder="Jane Doe"
          />
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
            placeholder="Min 8 characters"
            minLength={8}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Creating account...
            </>
          ) : (
            "Create account"
          )}
        </Button>
      </form>

      <div className="text-center text-sm text-text-secondary">
        Already have an account?{" "}
        <Link href="/login" className="text-accent hover:text-accent-hover font-medium">
          Sign in
        </Link>
      </div>
    </div>
  );
}
