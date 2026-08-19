import React from "react";
import { cn } from "@/lib/utils";
import { Loader2, AlertCircle, Inbox } from "lucide-react";

export interface StateProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function LoadingState({ title = "Loading...", description, className, ...props }: Partial<StateProps>) {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8 text-center min-h-[200px] border border-dashed border-surface-border rounded-xl", className)} {...props}>
      <Loader2 className="h-8 w-8 text-accent animate-spin mb-4" />
      <h3 className="text-lg font-medium text-text-primary">{title}</h3>
      {description && <p className="text-sm text-text-secondary mt-1 max-w-sm">{description}</p>}
    </div>
  );
}

export function EmptyState({ title, description, action, className, ...props }: StateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8 text-center min-h-[200px] border border-dashed border-surface-border rounded-xl", className)} {...props}>
      <div className="h-12 w-12 rounded-full bg-surface-hover flex items-center justify-center mb-4">
        <Inbox className="h-6 w-6 text-text-secondary" />
      </div>
      <h3 className="text-lg font-medium text-text-primary">{title}</h3>
      {description && <p className="text-sm text-text-secondary mt-1 max-w-sm">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export function ErrorState({ title = "Something went wrong", description, action, className, ...props }: StateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8 text-center min-h-[200px] border border-dashed border-error/20 bg-error-bg/50 rounded-xl", className)} {...props}>
      <div className="h-12 w-12 rounded-full bg-error-bg flex items-center justify-center mb-4">
        <AlertCircle className="h-6 w-6 text-error" />
      </div>
      <h3 className="text-lg font-medium text-text-primary">{title}</h3>
      {description && <p className="text-sm text-error/80 mt-1 max-w-sm">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
