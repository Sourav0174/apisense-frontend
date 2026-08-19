import React from "react";
import { useRouter } from "next/navigation";
import { Endpoint } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface EndpointListProps {
  endpoints: Endpoint[];
}

function MethodBadge({ method }: { method: Endpoint["method"] }) {
  return (
    <span className={cn(
      "text-xs font-mono font-medium px-2 py-1 rounded border",
      {
        "bg-info-bg text-info border-info/20": method === "GET",
        "bg-success-bg text-success border-success/20": method === "POST",
        "bg-warning-bg text-warning border-warning/20": method === "PUT" || method === "PATCH",
        "bg-error-bg text-error border-error/20": method === "DELETE",
      }
    )}>
      {method}
    </span>
  );
}

export function EndpointList({ endpoints }: EndpointListProps) {
  const router = useRouter();

  return (
    <div className="col-span-1 lg:col-span-2 pt-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-text-primary tracking-tight">Endpoint Health</h2>
      </div>
      <div className="overflow-x-auto rounded-xl border border-surface-border bg-surface/20">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-text-tertiary uppercase border-b border-surface-border">
            <tr>
              <th className="px-6 py-4 font-medium tracking-wider">Endpoint</th>
              <th className="px-6 py-4 font-medium tracking-wider">Status</th>
              <th className="px-6 py-4 font-medium text-right tracking-wider">Latency</th>
              <th className="px-6 py-4 font-medium text-right tracking-wider">Uptime</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-border">
            {endpoints.map((ep) => (
              <tr 
                key={ep.id} 
                onClick={() => router.push(`/endpoints/${ep.id}`)}
                className="hover:bg-surface-hover transition-colors duration-150 group cursor-pointer"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-4">
                    <MethodBadge method={ep.method} />
                    <span className="font-mono text-text-secondary group-hover:text-text-primary transition-colors">{ep.path}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant={ep.status === "healthy" ? "success" : ep.status === "degraded" ? "warning" : "error"}>
                    {ep.status.charAt(0).toUpperCase() + ep.status.slice(1)}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right font-mono text-text-secondary group-hover:text-text-primary transition-colors">
                  {ep.latency > 0 ? `${ep.latency}ms` : "—"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right font-mono text-text-secondary group-hover:text-text-primary transition-colors">
                  {ep.uptime}%
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
