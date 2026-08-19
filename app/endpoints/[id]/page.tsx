"use client";

import React, { use } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { EndpointHeader } from "@/components/endpoint/EndpointHeader";
import { EndpointMetrics } from "@/components/endpoint/EndpointMetrics";
import { RequestTraces } from "@/components/endpoint/RequestTraces";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { mockEndpoints, mockTimeSeriesData } from "@/data/mock";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: { 
    opacity: 1, 
    y: 0,
    filter: "blur(0px)",
    transition: { 
      type: "spring", 
      stiffness: 250, 
      damping: 30,
      mass: 1.2
    }
  }
};

export default function EndpointPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const endpoint = mockEndpoints.find(ep => ep.id === resolvedParams.id) || mockEndpoints[0];

  return (
    <ProtectedRoute>
      <AppShell>
        <div className="p-8 max-w-[1600px] mx-auto w-full relative">
          <motion.div 
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <EndpointHeader endpoint={endpoint} />
            </motion.div>

            <motion.div variants={itemVariants}>
              <EndpointMetrics endpoint={endpoint} />
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="col-span-1 lg:col-span-2 space-y-8">
                <div className="pt-6">
                  <h2 className="text-lg font-semibold text-text-primary tracking-tight mb-6">Latency History</h2>
                  <PerformanceChart data={mockTimeSeriesData} />
                </div>
                <RequestTraces endpoint={endpoint} />
              </div>
              
              <div className="col-span-1 lg:col-span-1 pt-6 space-y-6">
                {/* Optional: Add AI Insights for this specific endpoint here */}
                <div className="p-5 rounded-xl border border-surface-border bg-surface/50">
                  <h3 className="text-sm font-semibold text-text-primary mb-3">AI Analysis</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    Traffic patterns are normal. The P99 latency spike observed at 14:00 corresponds with a known database backup window. No further action is required.
                  </p>
                </div>

                <div className="p-5 rounded-xl border border-surface-border bg-surface/50">
                  <h3 className="text-sm font-semibold text-text-primary mb-3">Endpoint Configuration</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-text-secondary">Monitoring</span>
                      <span className="text-sm font-mono text-success">Active</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-text-secondary">Interval</span>
                      <span className="text-sm font-mono text-text-primary">1 minute</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-text-secondary">Timeout</span>
                      <span className="text-sm font-mono text-text-primary">5000ms</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </AppShell>
    </ProtectedRoute>
  );
}
