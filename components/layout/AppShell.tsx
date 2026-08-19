import React from "react";
import { Sidebar } from "./Sidebar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-background relative selection:bg-accent-subtle selection:text-white">
      {/* Subtle Cinematic Ambient Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-success/5 blur-[140px] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-accent/3 blur-[160px] mix-blend-screen pointer-events-none" />

      <Sidebar className="hidden md:flex flex-shrink-0 z-10" />
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto z-10 relative">
        {children}
      </main>
    </div>
  );
}

