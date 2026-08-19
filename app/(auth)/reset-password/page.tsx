"use client";

import React, { useState, Suspense } from "react";
import { authService } from "@/lib/auth.service";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!token) {
      setError("Reset token is missing from the URL");
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      await authService.resetPassword({ token, new_password: password });
      
      // Backend revokes active sessions. Clear local state too just in case.
      await authService.logoutAll().catch(() => {});
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("auth:logout"));
      }

      setIsSuccess(true);
    } catch (e: unknown) {
      const err = e as Error & { message?: string };
      setError(err.message || "Failed to reset password. The link may have expired.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center space-y-6 py-4">
        <CheckCircle2 className="w-16 h-16 text-success mx-auto" />
        <div>
          <h3 className="text-xl font-semibold text-text-primary">Password Reset</h3>
          <p className="text-sm text-text-secondary mt-2">
            Your password has been successfully reset. You can now log in with your new password.
          </p>
        </div>
        <Link href="/login" className="block w-full mt-4">
          <Button className="w-full">Continue to Login</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-text-primary">Create new password</h3>
        <p className="text-sm text-text-secondary mt-1">Enter your new password below</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 pt-2">
        {error && (
          <div className="p-3 rounded-lg bg-danger/10 border border-danger/20 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-danger shrink-0 mt-0.5" />
            <div className="text-sm text-danger flex-1">{error}</div>
          </div>
        )}

        {!token && !error && (
          <div className="p-3 rounded-lg bg-warning/10 border border-warning/20 flex items-start gap-3 mb-4">
            <AlertCircle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
            <div className="text-sm text-warning flex-1">
              No reset token found. Please use the link sent to your email.
            </div>
          </div>
        )}

        <div className="space-y-4">
          <Input
            label="New Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isSubmitting || !token}
            placeholder="Min 8 characters"
            minLength={8}
          />
          <Input
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={isSubmitting || !token}
            placeholder="Min 8 characters"
            minLength={8}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting || !token}>
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Resetting...
            </>
          ) : (
            "Reset password"
          )}
        </Button>
      </form>

      <div className="text-center text-sm">
        <Link href="/login" className="text-accent hover:text-accent-hover font-medium">
          Back to login
        </Link>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
}
