import React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, children, ...props }, ref) => {
    return (
      <div className="w-full relative">
        <select
          ref={ref}
          className={cn(
            "flex w-full h-10 px-4 pr-10 appearance-none rounded-xl bg-surface border border-surface-border text-sm text-text-primary",
            "focus:outline-none focus:ring-1 focus:ring-accent/50 focus:border-accent/50 focus:bg-surface-hover transition-all shadow-[inset_0_1px_0_0_rgba(255,255,255,0.02)]",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-error/50 focus:ring-error/50 focus:border-error/50",
            className
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary pointer-events-none" />
        
        {error && (
          <p className="mt-1.5 ml-4 text-xs text-error font-medium">{error}</p>
        )}
      </div>
    );
  }
);
Select.displayName = "Select";
