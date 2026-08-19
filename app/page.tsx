"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Header } from "@/components/layout/Header";
import { HealthOverview } from "@/components/dashboard/HealthOverview";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { EndpointList } from "@/components/dashboard/EndpointList";
import { IncidentList } from "@/components/dashboard/IncidentList";
import { AIInsight } from "@/components/dashboard/AIInsight";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { Drawer } from "@/components/ui/Drawer";
import { EndpointForm } from "@/components/dashboard/EndpointForm";
import { Endpoint } from "@/types";

import { 
  mockProject, 
  mockTimeSeriesData, 
  mockEndpoints as initialEndpoints, 
  mockIncidents, 
  mockAIInsight, 
  mockActivityFeed 
} from "@/data/mock";

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

export default function DashboardPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [endpoints, setEndpoints] = useState(initialEndpoints);

  const handleAddEndpoint = (newEndpoint: Endpoint) => {
    setEndpoints(prev => [newEndpoint, ...prev]);
    setIsDrawerOpen(false);
  };

  return (
    <>
      <AppShell>
        <Header 
          title="Overview" 
          description="Monitor the health and performance of your APIs." 
          projectName={mockProject.name}
          onAddClick={() => setIsDrawerOpen(true)}
        />
        
        <div className="p-8 max-w-[1600px] mx-auto w-full relative">
          
          <AnimatePresence>
            {/* Show a subtle success toast if we just added an endpoint (for polish, using a simple absolute div) */}
          </AnimatePresence>

          <motion.div 
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Top Level Metrics */}
            <motion.div variants={itemVariants}>
              <HealthOverview project={mockProject} />
            </motion.div>

            {/* AI Insight */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <AIInsight insight={mockAIInsight} />
            </motion.div>

            {/* Main Content Grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Chart takes up 2/3 or full width on small */}
              <div className="col-span-1 lg:col-span-2 space-y-6">
                <PerformanceChart data={mockTimeSeriesData} />
                <EndpointList endpoints={endpoints} />
              </div>
              
              {/* Sidebar-like column for Incidents & Activity */}
              <div className="col-span-1 lg:col-span-1 space-y-6">
                <IncidentList incidents={mockIncidents} />
                <ActivityFeed events={mockActivityFeed} />
              </div>
            </motion.div>

          </motion.div>
        </div>
      </AppShell>

      <Drawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        title="Add Endpoint"
      >
        <EndpointForm 
          onComplete={handleAddEndpoint} 
          onCancel={() => setIsDrawerOpen(false)} 
        />
      </Drawer>
    </>
  );
}
