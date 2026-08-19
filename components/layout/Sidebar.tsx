import React from "react";
import { cn } from "@/lib/utils";
import { 
  Activity, 
  LayoutDashboard, 
  FolderGit2, 
  AlertTriangle, 
  Bell, 
  Sparkles,
  Settings,
  User
} from "lucide-react";

export function Sidebar({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const navItems = [
    { name: "Overview", icon: LayoutDashboard, active: true },
    { name: "Projects", icon: FolderGit2, active: false },
    { name: "Endpoints", icon: Activity, active: false },
    { name: "Incidents", icon: AlertTriangle, active: false },
    { name: "Alerts", icon: Bell, active: false },
    { name: "AI Insights", icon: Sparkles, active: false },
  ];

  const bottomItems = [
    { name: "Settings", icon: Settings },
    { name: "Account", icon: User },
  ];

  return (
    <aside className={cn("w-64 border-r border-surface-border bg-black/40 backdrop-blur-3xl flex flex-col h-full", className)}>
      <div className="h-24 flex items-center px-8 border-b border-surface-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shadow-[inset_0_0_12px_rgba(var(--accent-rgb),0.2)]">
            <Activity className="w-5 h-5 text-accent" />
          </div>
          <span className="font-semibold tracking-tight text-white/95">APISense</span>
        </div>
      </div>
      
      <div className="flex-1 py-8 flex flex-col justify-between px-4">
        <nav className="space-y-1">
          {navItems.map((item) => (
            <button
              key={item.name}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-300",
                item.active 
                  ? "bg-accent-subtle text-accent shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]" 
                  : "text-text-secondary hover:bg-surface-hover hover:text-text-primary"
              )}
            >
              <item.icon className={cn("w-4 h-4", item.active ? "text-accent" : "text-text-tertiary")} />
              {item.name}
            </button>
          ))}
        </nav>

        <nav className="space-y-1">
          {bottomItems.map((item) => (
            <button
              key={item.name}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-xl text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-all duration-300"
            >
              <item.icon className="w-4 h-4 text-text-tertiary" />
              {item.name}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}
