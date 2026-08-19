import React from "react";
import { ArrowLeft, MoreVertical, Pause, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Endpoint } from "@/types";
import { cn } from "@/lib/utils";

interface EndpointHeaderProps {
  endpoint: Endpoint;
}

export function EndpointHeader({ endpoint }: EndpointHeaderProps) {
  const router = useRouter();

  const getMethodColor = (method: string) => {
    switch (method) {
      case "GET": return "bg-info-bg text-info border-info/20";
      case "POST": return "bg-success-bg text-success border-success/20";
      case "PUT":
      case "PATCH": return "bg-warning-bg text-warning border-warning/20";
      case "DELETE": return "bg-error-bg text-error border-error/20";
      default: return "bg-surface-hover text-text-secondary border-surface-border";
    }
  };

  return (
    <div className="mb-8">
      <button 
        onClick={() => router.push("/")}
        className="flex items-center gap-2 text-sm font-medium text-text-tertiary hover:text-text-primary transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </button>

      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div>
          <div className="flex items-center gap-4 mb-3">
            <span className={cn(
              "text-sm font-mono font-bold px-2.5 py-1 rounded-md border",
              getMethodColor(endpoint.method)
            )}>
              {endpoint.method}
            </span>
            <Badge variant={endpoint.status === "healthy" ? "success" : endpoint.status === "degraded" ? "warning" : "error"}>
              {endpoint.status === "healthy" ? "Monitoring Active" : endpoint.status === "degraded" ? "Degraded Performance" : "Endpoint Down"}
            </Badge>
          </div>
          <h1 className="text-3xl font-bold text-text-primary tracking-tight font-mono mb-2">
            {endpoint.path}
          </h1>
          <p className="text-text-secondary">
            Last checked: {new Date(endpoint.lastChecked).toLocaleString()}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="secondary" className="gap-2">
            <Pause className="w-4 h-4" />
            Pause
          </Button>
          <Button variant="secondary" className="gap-2">
            <Settings className="w-4 h-4" />
            Configure
          </Button>
          <Button variant="secondary" className="px-3">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
