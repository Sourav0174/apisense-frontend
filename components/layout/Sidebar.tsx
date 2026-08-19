"use client";

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
  User,
  LogOut
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const { logout } = useAuth();
  const pathname = usePathname();
  
  const navItems = [
    { name: "Overview", icon: LayoutDashboard, href: "/" },
    { name: "Projects", icon: FolderGit2, href: "/projects" },
    { name: "Endpoints", icon: Activity, href: "/endpoints" },
    { name: "Incidents", icon: AlertTriangle, href: "/incidents" },
    { name: "Alerts", icon: Bell, href: "/alerts" },
    { name: "AI Insights", icon: Sparkles, href: "/insights" },
  ];

  const bottomItems = [
    { name: "Settings", icon: Settings, href: "/settings" },
    { name: "Account", icon: User, href: "/account" },
  ];

  const isActive = (href: string) => {
    if (href === "/" && pathname === "/") return true;
    if (href !== "/" && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <aside className={cn("w-64 border-r border-surface-border bg-black/40 backdrop-blur-3xl flex flex-col h-full", className)}>
      <div className="h-24 flex items-center px-8 border-b border-surface-border">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shadow-[inset_0_0_12px_rgba(var(--accent-rgb),0.2)]">
            <Activity className="w-5 h-5 text-accent" />
          </div>
          <span className="font-semibold tracking-tight text-white/95">APISense</span>
        </Link>
      </div>
      
      <div className="flex-1 py-8 flex flex-col justify-between px-4">
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-300",
                isActive(item.href)
                  ? "bg-accent-subtle text-accent shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]" 
                  : "text-text-secondary hover:bg-surface-hover hover:text-text-primary"
              )}
            >
              <item.icon className={cn("w-4 h-4", isActive(item.href) ? "text-accent" : "text-text-tertiary")} />
              {item.name}
            </Link>
          ))}
        </nav>

        <nav className="space-y-1">
          {bottomItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-300",
                isActive(item.href)
                  ? "bg-accent-subtle text-accent shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]" 
                  : "text-text-secondary hover:bg-surface-hover hover:text-text-primary"
              )}
            >
              <item.icon className={cn("w-4 h-4", isActive(item.href) ? "text-accent" : "text-text-tertiary")} />
              {item.name}
            </Link>
          ))}
          
          <button
            onClick={() => logout()}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-xl text-text-secondary hover:bg-danger/10 hover:text-danger transition-all duration-300 mt-2"
          >
            <LogOut className="w-4 h-4 text-text-tertiary" />
            Sign out
          </button>
        </nav>
      </div>
    </aside>
  );
}
