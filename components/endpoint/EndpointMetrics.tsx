import React from "react";
import { Activity, Clock, ServerCrash, ShieldCheck } from "lucide-react";
import { Endpoint } from "@/types";

interface EndpointMetricsProps {
  endpoint: Endpoint;
}

export function EndpointMetrics({ endpoint }: EndpointMetricsProps) {
  const metrics = [
    {
      label: "Uptime (30d)",
      value: `${endpoint.uptime}%`,
      trend: "+0.1%",
      trendUp: true,
      icon: <ShieldCheck className="w-5 h-5 text-success" />,
      color: "text-success",
    },
    {
      label: "P99 Latency",
      value: `${endpoint.latency + 45}ms`,
      trend: "-12ms",
      trendUp: true,
      icon: <Clock className="w-5 h-5 text-warning" />,
      color: "text-text-primary",
    },
    {
      label: "Average Latency",
      value: `${endpoint.latency}ms`,
      trend: "-5ms",
      trendUp: true,
      icon: <Activity className="w-5 h-5 text-accent" />,
      color: "text-text-primary",
    },
    {
      label: "Error Rate",
      value: endpoint.status === "healthy" ? "0.02%" : endpoint.status === "degraded" ? "2.4%" : "15.8%",
      trend: endpoint.status === "healthy" ? "-0.01%" : "+2.1%",
      trendUp: endpoint.status === "healthy",
      icon: <ServerCrash className={`w-5 h-5 ${endpoint.status === "healthy" ? "text-text-tertiary" : "text-error"}`} />,
      color: endpoint.status === "healthy" ? "text-text-primary" : "text-error",
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {metrics.map((m, i) => (
        <div key={i} className="p-5 rounded-xl border border-surface-border bg-surface flex flex-col justify-between h-32">
          <div className="flex items-start justify-between">
            <span className="text-sm font-medium text-text-secondary">{m.label}</span>
            <div className="p-2 rounded-lg bg-surface-hover">
              {m.icon}
            </div>
          </div>
          <div className="flex items-end justify-between">
            <span className={`text-2xl font-bold font-mono tracking-tight ${m.color}`}>
              {m.value}
            </span>
            <span className={`text-xs font-medium font-mono ${m.trendUp ? "text-success" : "text-error"}`}>
              {m.trend}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
