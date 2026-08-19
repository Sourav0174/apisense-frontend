import React from "react";
import { Activity } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Premium ambient background matching dashboard */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-accent/10 blur-[120px] pointer-events-none" />
      
      <div className="flex-1 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative z-10">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-surface/50 border border-surface-border shadow-lg relative mb-6">
            <div className="absolute inset-0 bg-accent/10 rounded-2xl" />
            <Activity className="w-8 h-8 text-accent relative z-10" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-text-primary">
            APISense
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-surface/50 border border-surface-border py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 backdrop-blur-xl">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
