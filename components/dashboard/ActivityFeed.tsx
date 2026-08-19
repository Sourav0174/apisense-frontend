import React from "react";
import { ActivityEvent } from "@/types";

import { AlertTriangle, CheckCircle2, Settings, Zap, Plus, Activity } from "lucide-react";

interface ActivityFeedProps {
  events: ActivityEvent[];
}

export function ActivityFeed({ events }: ActivityFeedProps) {
  const getIcon = (type: ActivityEvent["type"]) => {
    switch (type) {
      case "incident_detected":
        return <AlertTriangle className="w-4 h-4 text-error" />;
      case "recovered":
        return <CheckCircle2 className="w-4 h-4 text-success" />;
      case "latency_spike":
        return <Zap className="w-4 h-4 text-warning" />;
      case "config_changed":
        return <Settings className="w-4 h-4 text-info" />;
      case "endpoint_added":
        return <Plus className="w-4 h-4 text-text-secondary" />;
      default:
        return <Activity className="w-4 h-4 text-text-tertiary" />;
    }
  };

  const getBg = (type: ActivityEvent["type"]) => {
    switch (type) {
      case "incident_detected": return "bg-error-bg";
      case "recovered": return "bg-success-bg";
      case "latency_spike": return "bg-warning-bg";
      case "config_changed": return "bg-info-bg";
      default: return "bg-surface-hover";
    }
  };

  return (
    <div className="col-span-1 lg:col-span-1 pt-6">
      <h2 className="text-lg font-semibold text-text-primary tracking-tight mb-6">Recent Activity</h2>
      <div className="relative pl-6 space-y-8 before:absolute before:inset-y-0 before:left-6 before:-ml-px before:w-px before:bg-surface-border">
        {events.map((event) => (
          <div key={event.id} className="relative group">
            <div className={`absolute -left-9 w-6 h-6 rounded-full flex items-center justify-center ring-4 ring-background ${getBg(event.type)} transition-transform duration-300 group-hover:scale-110`}>
              {getIcon(event.type)}
            </div>
            <div className="pl-4">
              <p className="text-sm text-text-primary leading-snug">
                {event.description}
              </p>
              <p className="text-xs font-mono text-text-tertiary mt-1.5">
                {new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
