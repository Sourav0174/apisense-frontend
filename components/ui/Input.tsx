import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          ref={ref}
          className={cn(
            "flex w-full h-10 px-4 rounded-xl bg-surface border border-surface-border text-sm text-text-primary placeholder:text-text-tertiary",
            "focus:outline-none focus:ring-1 focus:ring-accent/50 focus:border-accent/50 focus:bg-surface-hover transition-all shadow-[inset_0_1px_0_0_rgba(255,255,255,0.02)]",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-error/50 focus:ring-error/50 focus:border-error/50",
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1.5 ml-4 text-xs text-error font-medium">{error}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";
