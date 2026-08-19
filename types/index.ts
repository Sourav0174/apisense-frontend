export type HealthStatus = "healthy" | "degraded" | "down" | "info";

export interface Project {
  id: string;
  name: string;
  description?: string;
  overallHealth: number; // percentage (0-100)
  uptime: number; // percentage (0-100)
  totalRequests: number;
  errorRate: number; // percentage (0-100)
  avgLatency: number; // in ms
}

export interface Endpoint {
  id: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  path: string;
  status: HealthStatus;
  latency: number; // in ms
  uptime: number; // percentage
  lastChecked: string; // ISO date string
}

export interface TimeSeriesData {
  timestamp: string; // ISO date string
  latency: number;
  requests: number;
  errors: number;
}

export interface Incident {
  id: string;
  endpointId: string;
  method: string;
  path: string;
  statusCode: number;
  statusText: string;
  detectedAt: string; // ISO date string
  resolvedAt?: string; // ISO date string
  severity: "critical" | "warning" | "info";
  state: "investigating" | "resolved" | "monitoring";
}

export interface AIInsight {
  id: string;
  content: string;
  createdAt: string; // ISO date string
  relatedEndpointId?: string;
}

export interface ActivityEvent {
  id: string;
  type: "recovered" | "incident_detected" | "config_changed" | "latency_spike" | "endpoint_added";
  description: string;
  timestamp: string; // ISO date string
}
