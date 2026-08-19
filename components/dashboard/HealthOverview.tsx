import React from "react";
import { Project } from "@/types";
import { Activity, Clock, ServerCrash, Zap } from "lucide-react";

interface HealthOverviewProps {
  project: Project;
}

export function HealthOverview({ project }: HealthOverviewProps) {
  const secondaryMetrics = [
    {
      title: "Uptime",
      value: `${project.uptime}%`,
      subtitle: "Last 30 days",
      icon: Clock,
      color: "text-text-primary",
    },
    {
      title: "Requests",
      value: `${(project.totalRequests / 1000).toFixed(1)}K`,
      subtitle: "Total volume",
      icon: Zap,
      color: "text-text-primary",
    },
    {
      title: "Error Rate",
      value: `${project.errorRate}%`,
      subtitle: "5xx and 4xx",
      icon: ServerCrash,
      color: "text-warning",
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row lg:items-end gap-12 py-6 border-b border-surface-border">
      {/* Hero Metric */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-success shadow-[0_0_12px_rgba(16,185,129,0.8)] animate-pulse" />
          <h2 className="text-sm font-medium text-text-secondary uppercase tracking-wider">Overall Health</h2>
        </div>
        <div className="flex items-baseline gap-4">
          <span className="text-7xl font-semibold tracking-tighter text-text-primary">
            {project.overallHealth}%
          </span>
          <span className="text-xl font-medium text-success">Healthy</span>
        </div>
      </div>

      {/* Secondary Metrics */}
      <div className="flex flex-wrap gap-10 lg:ml-auto">
        {secondaryMetrics.map((metric) => (
          <div key={metric.title} className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <metric.icon className="w-4 h-4 text-text-tertiary" />
              <span>{metric.title}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className={`text-2xl font-semibold tracking-tight ${metric.color}`}>
                {metric.value}
              </span>
            </div>
            <span className="text-xs text-text-tertiary">{metric.subtitle}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
