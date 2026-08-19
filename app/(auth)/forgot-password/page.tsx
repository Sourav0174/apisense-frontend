"use client";

import React, { useState } from "react";
import { authService } from "@/lib/auth.service";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Link from "next/link";
import { Loader2, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setIsSubmitting(true);

    try {
      await authService.forgotPassword(email);
    } catch {
      // Backend anti-enumeration means it always returns 200 basically,
      // but if there's a real network error, we ignore it from user perspective 
      // or handle silently.
    } finally {
      setIsSubmitting(false);
      setIsSuccess(true);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center space-y-6 py-4">
        <CheckCircle2 className="w-16 h-16 text-success mx-auto" />
        <div>
          <h3 className="text-xl font-semibold text-text-primary">Check your email</h3>
          <p className="text-sm text-text-secondary mt-2">
            We&apos;ve sent a password reset link to your email.
          </p>
        </div>
        <Link href="/login" className="block w-full mt-4">
          <Button variant="secondary" className="w-full">Back to login</Button>
        </Link>
        <p className="mt-6 text-center text-sm text-text-secondary">
          Didn&apos;t receive the email? <button onClick={() => handleSubmit()} className="text-accent hover:text-accent-hover font-medium">Click to resend</button>
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-text-primary">Reset your password</h3>
        <p className="text-sm text-text-secondary mt-1">Enter your email and we&apos;ll send you a reset link</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 pt-2">
        <Input
          label="Email address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isSubmitting}
          placeholder="you@example.com"
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Sending instructions...
            </>
          ) : (
            "Send reset instructions"
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
