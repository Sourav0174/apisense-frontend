import React from "react";
import { Endpoint } from "@/types";

import { ArrowRight } from "lucide-react";

interface RequestTracesProps {
  endpoint: Endpoint;
}

// Generate some fake request traces based on the endpoint status
const generateMockTraces = (endpoint: Endpoint) => {
  const traces = [];
  const now = new Date();
  
  for (let i = 0; i < 10; i++) {
    const isError = endpoint.status === "down" || (endpoint.status === "degraded" && Math.random() > 0.7);
    const statusCode = isError ? (Math.random() > 0.5 ? 500 : 502) : 200;
    const latency = isError ? endpoint.latency * 3 + Math.floor(Math.random() * 500) : endpoint.latency + Math.floor(Math.random() * 40 - 20);
    
    // Offset time by random seconds ago
    const timestamp = new Date(now.getTime() - Math.floor(Math.random() * 1000 * 60 * 30));
    
    traces.push({
      id: `req-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: timestamp.toISOString(),
      method: endpoint.method,
      path: endpoint.path,
      statusCode,
      latency: Math.max(5, latency), // Ensure no negative latency
      region: ["us-east-1", "eu-west-1", "ap-south-1", "us-west-2"][Math.floor(Math.random() * 4)],
    });
  }
  
  // Sort by newest first
  return traces.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

export function RequestTraces({ endpoint }: RequestTracesProps) {
  const traces = generateMockTraces(endpoint);

  return (
    <div className="pt-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-text-primary tracking-tight">Recent Request Traces</h2>
        <span className="text-sm font-medium text-text-tertiary">Live</span>
      </div>
      <div className="overflow-x-auto rounded-xl border border-surface-border bg-surface/20">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-text-tertiary uppercase border-b border-surface-border">
            <tr>
              <th className="px-6 py-4 font-medium tracking-wider">Timestamp</th>
              <th className="px-6 py-4 font-medium tracking-wider">Status</th>
              <th className="px-6 py-4 font-medium text-right tracking-wider">Latency</th>
              <th className="px-6 py-4 font-medium tracking-wider">Region</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-border">
            {traces.map((trace) => (
              <tr key={trace.id} className="hover:bg-surface-hover transition-colors duration-150 group cursor-pointer">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="font-mono text-text-secondary group-hover:text-text-primary transition-colors">
                    {new Date(trace.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit', fractionalSecondDigits: 3 })}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`font-mono font-medium ${trace.statusCode >= 500 ? "text-error" : "text-success"}`}>
                    {trace.statusCode}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <span className={`font-mono ${trace.latency > 1000 ? "text-warning" : "text-text-secondary"} group-hover:text-text-primary transition-colors`}>
                    {trace.latency}ms
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="font-mono text-text-tertiary text-xs border border-surface-border px-2 py-1 rounded bg-surface">
                    {trace.region}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <ArrowRight className="w-4 h-4 text-text-tertiary opacity-0 group-hover:opacity-100 transition-opacity inline-block group-hover:translate-x-1" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
