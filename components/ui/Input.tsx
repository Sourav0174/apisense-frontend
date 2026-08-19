"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, label, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    
    const isPasswordType = type === "password";
    const currentType = isPasswordType ? (showPassword ? "text" : "password") : type;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="block text-sm font-medium text-text-secondary">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            type={currentType}
            className={cn(
              "flex w-full h-10 px-4 rounded-xl bg-surface border border-surface-border text-sm text-text-primary placeholder:text-text-tertiary",
              "focus:outline-none focus:ring-1 focus:ring-accent/50 focus:border-accent/50 focus:bg-surface-hover transition-all shadow-[inset_0_1px_0_0_rgba(255,255,255,0.02)]",
              "disabled:cursor-not-allowed disabled:opacity-50",
              error && "border-error/50 focus:ring-error/50 focus:border-error/50",
              isPasswordType && "pr-10",
              className
            )}
            {...props}
          />
          {isPasswordType && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-primary transition-colors focus:outline-none"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          )}
        </div>
        {error && (
          <p className="text-xs text-error mt-1">{error}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";
