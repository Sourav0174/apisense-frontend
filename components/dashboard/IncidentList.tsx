import React from "react";
import { Incident } from "@/types";

import { Badge } from "@/components/ui/Badge";
import { CheckCircle2, Clock } from "lucide-react";
import { EmptyState } from "@/components/ui/State";

interface IncidentListProps {
  incidents: Incident[];
}

export function IncidentList({ incidents }: IncidentListProps) {
  if (incidents.length === 0) {
    return (
      <div className="col-span-1 pt-6">
        <h2 className="text-lg font-semibold text-text-primary tracking-tight mb-6">Recent Incidents</h2>
        <EmptyState title="No active incidents" description="All services are operating normally." />
      </div>
    );
  }

  return (
    <div className="col-span-1 pt-6">
      <h2 className="text-lg font-semibold text-text-primary tracking-tight mb-6">Recent Incidents</h2>
      <div className="space-y-4">
        {incidents.map((incident) => (
          <div 
            key={incident.id} 
            className={`p-5 rounded-xl border ${
              incident.state === "investigating" 
                ? "bg-error-bg/10 border-error/20" 
                : "bg-surface border-surface-border"
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                {incident.state === "investigating" ? (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-error animate-pulse" />
                    <span className="font-semibold text-sm text-text-primary">Active Incident</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    <span className="font-medium text-sm text-text-secondary">Resolved</span>
                  </div>
                )}
              </div>
              <Badge variant={incident.severity === "critical" ? "error" : incident.severity === "warning" ? "warning" : "info"}>
                {incident.severity.charAt(0).toUpperCase() + incident.severity.slice(1)}
              </Badge>
            </div>
            
            <div className="mb-4">
              <div className="font-mono text-sm text-text-primary mb-1">
                <span className="text-text-tertiary mr-2">{incident.method}</span>
                {incident.path}
              </div>
              <div className="text-sm font-medium text-text-secondary">
                <span className={incident.statusCode >= 500 ? "text-error" : "text-warning"}>
                  {incident.statusCode}
                </span>{" "}
                {incident.statusText}
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-text-tertiary">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>Detected: {new Date(incident.detectedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              {incident.resolvedAt && (
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Resolved: {new Date(incident.resolvedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
