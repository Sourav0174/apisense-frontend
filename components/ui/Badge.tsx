import { cn } from "@/lib/utils";
import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "error" | "info";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-medium tracking-wider uppercase backdrop-blur-sm transition-colors border",
        {
          "bg-white/[0.03] border-white/[0.08] text-text-secondary": variant === "default",
          "bg-success/10 border-success/20 text-success": variant === "success",
          "bg-warning/10 border-warning/20 text-warning": variant === "warning",
          "bg-error/10 border-error/20 text-error": variant === "error",
          "bg-info/10 border-info/20 text-info": variant === "info",
        },
        className
      )}
      {...props}
    />
  );
}
