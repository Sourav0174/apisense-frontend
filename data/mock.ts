import { Project, Endpoint, TimeSeriesData, Incident, AIInsight, ActivityEvent } from "../types";

export const mockProject: Project = {
  id: "proj_1",
  name: "Production APIs",
  description: "Core billing and user management services",
  overallHealth: 98.7,
  uptime: 99.98,
  totalRequests: 124800,
  errorRate: 0.14,
  avgLatency: 184,
};

export const mockEndpoints: Endpoint[] = [
  { id: "ep_1", method: "GET", path: "/api/users", status: "healthy", latency: 124, uptime: 99.99, lastChecked: new Date(Date.now() - 1000 * 60 * 2).toISOString() },
  { id: "ep_2", method: "POST", path: "/api/auth/login", status: "healthy", latency: 218, uptime: 99.97, lastChecked: new Date(Date.now() - 1000 * 60 * 1).toISOString() },
  { id: "ep_3", method: "GET", path: "/api/payments", status: "degraded", latency: 842, uptime: 98.21, lastChecked: new Date(Date.now() - 1000 * 60 * 5).toISOString() },
  { id: "ep_4", method: "GET", path: "/api/reports", status: "down", latency: 0, uptime: 94.82, lastChecked: new Date(Date.now() - 1000 * 60 * 12).toISOString() },
  { id: "ep_5", method: "PUT", path: "/api/users/:id", status: "healthy", latency: 145, uptime: 99.95, lastChecked: new Date(Date.now() - 1000 * 60 * 3).toISOString() },
];

export const mockTimeSeriesData: TimeSeriesData[] = Array.from({ length: 24 }).map((_, i) => {
  const timestamp = new Date();
  timestamp.setHours(timestamp.getHours() - (23 - i));
  return {
    timestamp: timestamp.toISOString(),
    latency: 150 + Math.random() * 50 + (i > 18 ? 200 : 0), // Latency spike in recent hours
    requests: 4000 + Math.random() * 1000,
    errors: i > 18 ? 50 + Math.random() * 20 : Math.random() * 5, // Errors spike with latency
  };
});

export const mockIncidents: Incident[] = [
  {
    id: "inc_1",
    endpointId: "ep_4",
    method: "GET",
    path: "/api/reports",
    statusCode: 503,
    statusText: "Service Unavailable",
    detectedAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    severity: "critical",
    state: "investigating",
  },
  {
    id: "inc_2",
    endpointId: "ep_3",
    method: "GET",
    path: "/api/payments",
    statusCode: 504,
    statusText: "Gateway Timeout",
    detectedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    resolvedAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    severity: "warning",
    state: "resolved",
  },
];

export const mockAIInsight: AIInsight = {
  id: "insight_1",
  content: "API health is currently stable overall, but `/api/payments` has experienced a significant increase in response time during the last 30 minutes. Error activity is also slightly elevated. Consider investigating the payment service and its downstream dependencies.",
  createdAt: new Date().toISOString(),
  relatedEndpointId: "ep_3",
};

export const mockActivityFeed: ActivityEvent[] = [
  { id: "evt_1", type: "incident_detected", description: "GET /api/reports began failing with 503 Service Unavailable", timestamp: new Date(Date.now() - 1000 * 60 * 12).toISOString() },
  { id: "evt_2", type: "latency_spike", description: "GET /api/payments latency increased to 842ms", timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString() },
  { id: "evt_3", type: "recovered", description: "GET /api/payments recovered from Gateway Timeout", timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString() },
  { id: "evt_4", type: "config_changed", description: "Alert thresholds updated for /api/auth/*", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() },
  { id: "evt_5", type: "endpoint_added", description: "Added GET /api/users to monitoring", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() },
];
