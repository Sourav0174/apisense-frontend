import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading = false, children, disabled, ...props }, ref) => {
    
    // We separate the motion props so we can cast cleanly if needed, but it's simpler to just use a standard button and framer-motion's whileTap
    const MotionButton = motion.button as React.ElementType;

    return (
      <MotionButton
        ref={ref}
        disabled={disabled || isLoading}
        whileTap={!disabled && !isLoading ? { scale: 0.98 } : undefined}
        className={cn(
          "inline-flex items-center justify-center rounded-xl font-medium transition-all focus:outline-none focus:ring-2 focus:ring-accent/40 disabled:opacity-50 disabled:cursor-not-allowed",
          {
            "bg-accent text-white hover:bg-accent-hover shadow-[0_0_20px_rgba(var(--accent-rgb),0.25)]": variant === "primary",
            "bg-surface text-text-secondary border border-surface-border hover:bg-surface-hover hover:text-text-primary": variant === "secondary",
            "bg-transparent text-text-tertiary hover:text-text-primary hover:bg-surface-hover": variant === "ghost",
            "bg-error-bg text-error hover:bg-error-bg/80 border border-error/20": variant === "danger",
            "h-8 px-4 text-xs": size === "sm",
            "h-10 px-5 text-sm": size === "md",
            "h-12 px-8 text-base": size === "lg",
          },
          className
        )}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
        {children}
      </MotionButton>
    );
  }
);
Button.displayName = "Button";
