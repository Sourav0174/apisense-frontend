import React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, Calendar, Plus } from "lucide-react";

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  description?: string;
  projectName?: string;
  onAddClick?: () => void;
}

export function Header({ title, description, projectName = "Production APIs", onAddClick, className, ...props }: HeaderProps) {
  return (
    <header className={cn("shrink-0 border-b border-surface-border bg-black/40 backdrop-blur-3xl z-10 sticky top-0", className)} {...props}>
      <div className="max-w-[1600px] mx-auto w-full h-24 px-8 flex items-center justify-between">
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-text-secondary uppercase mb-2">
            <span className="hover:text-text-primary cursor-pointer transition-colors">{projectName}</span>
            <ChevronDown className="w-3 h-3" />
          </div>
          <div className="flex items-baseline gap-3">
            <h1 className="text-3xl font-semibold text-text-primary tracking-tight">{title}</h1>
            {description && <p className="text-sm text-text-secondary hidden md:block font-medium">{description}</p>}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-surface rounded-xl border border-surface-border text-sm font-medium text-text-secondary cursor-pointer hover:bg-surface-hover hover:text-text-primary transition-all">
            <Calendar className="w-4 h-4 text-text-tertiary" />
            <span>Last 24 Hours</span>
            <ChevronDown className="w-3 h-3 ml-1" />
          </div>
          
          <button 
            onClick={onAddClick}
            className="flex items-center gap-2 bg-accent text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-accent-hover transition-all shadow-[0_0_20px_rgba(var(--accent-rgb),0.2)]"
          >
            <Plus className="w-4 h-4" />
            <span>Add Endpoint</span>
          </button>
        </div>
      </div>
    </header>
  );
}
