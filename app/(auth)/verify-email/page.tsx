"use client";

import React, { useEffect, useState, Suspense } from "react";
import { authService } from "@/lib/auth.service";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Loader2, CheckCircle2, Mail } from "lucide-react";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const initialEmail = searchParams.get("email") || "";
  
  const [status, setStatus] = useState<"idle" | "verifying" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  const [resendEmail, setResendEmail] = useState(initialEmail);
  const [isResending, setIsResending] = useState(false);
  const [resendStatus, setResendStatus] = useState<"idle" | "success" | "cooldown">("idle");

  const verifyToken = async (t: string) => {
    setStatus("verifying");
    try {
      await authService.verifyEmail(t);
      setStatus("success");
    } catch (e: unknown) {
      const err = e as Error & { message?: string };
      setStatus("error");
      setErrorMsg(err.message || "Invalid or expired verification token.");
    }
  };

  useEffect(() => {
    if (token && status === "idle") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      verifyToken(token);
    }
  }, [token, status]);

  const handleResend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (resendStatus === "cooldown") return;
    
    setIsResending(true);
    try {
      await authService.resendVerification(resendEmail);
      setResendStatus("success");
      setTimeout(() => setResendStatus("cooldown"), 3000);
      setTimeout(() => setResendStatus("idle"), 60000); // 1 minute cooldown
    } catch {
      // Backend anti-enumeration: always show success
      setResendStatus("success");
      setTimeout(() => setResendStatus("cooldown"), 3000);
      setTimeout(() => setResendStatus("idle"), 60000);
    } finally {
      setIsResending(false);
    }
  };

  if (status === "verifying") {
    return (
      <div className="text-center space-y-6 py-4">
        <Loader2 className="w-12 h-12 text-accent animate-spin mx-auto" />
        <h3 className="text-xl font-semibold text-text-primary">Verifying your email...</h3>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="text-center space-y-6 py-4">
        <CheckCircle2 className="w-16 h-16 text-success mx-auto" />
        <div>
          <h3 className="text-xl font-semibold text-text-primary">Email Verified</h3>
          <p className="text-sm text-text-secondary mt-2">
            Your email has been successfully verified. You can now access all APISense features.
          </p>
        </div>
        <Link href="/login" className="block w-full">
          <Button className="w-full">Continue to Login</Button>
        </Link>
      </div>
    );
  }

  // Token is either absent, invalid, or expired
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
          <Mail className="w-6 h-6 text-accent" />
        </div>
        <h3 className="text-xl font-semibold text-text-primary">Check your email</h3>
        <p className="text-sm text-text-secondary mt-2">
          {errorMsg 
            ? "Your verification link was invalid or has expired. Request a new one below." 
            : "We sent a verification link to your email address."}
        </p>
      </div>

      <form onSubmit={handleResend} className="space-y-4 pt-4 border-t border-surface-border">
        {resendStatus === "success" && (
          <div className="p-3 rounded-lg bg-success/10 border border-success/20 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
            <div className="text-sm text-success flex-1">
              If an account exists with that email, we&apos;ve sent a new verification link.
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Input
            label="Email address"
            type="email"
            value={resendEmail}
            onChange={(e) => setResendEmail(e.target.value)}
            required
            disabled={isResending || resendStatus !== "idle"}
          />
        </div>

        <Button 
          type="submit" 
          className="w-full" 
          variant={resendStatus !== "idle" ? "secondary" : "primary"}
          disabled={isResending || resendStatus !== "idle"}
        >
          {isResending ? (
            <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending...</>
          ) : resendStatus !== "idle" ? (
            "Verification email sent"
          ) : (
            "Resend verification email"
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

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}
