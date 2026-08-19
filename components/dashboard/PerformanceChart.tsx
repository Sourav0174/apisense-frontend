"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { TimeSeriesData } from "@/types";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

interface PerformanceChartProps {
  data: TimeSeriesData[];
}

export function PerformanceChart({ data }: PerformanceChartProps) {
  const formattedData = React.useMemo(() => {
    return data.map(d => {
      const date = new Date(d.timestamp);
      return {
        ...d,
        time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
    });
  }, [data]);

  return (
    <div className="col-span-1 lg:col-span-3 pt-6">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-xl font-semibold text-text-primary tracking-tight mb-1">Performance</h2>
          <p className="text-sm text-text-secondary">Latency over the last 24 hours</p>
        </div>
        <div className="flex items-center gap-4 text-sm font-medium">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_8px_rgba(var(--accent-rgb),0.5)]"></div>
            <span className="text-sm font-medium text-text-primary">Avg Latency</span>
          </div>
        </div>
      </div>
      
      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={formattedData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.2} />
                <stop offset="95%" stopColor="var(--accent)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--surface-border)" />
            <XAxis 
              dataKey="time" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--text-tertiary)', fontSize: 12, fontFamily: 'var(--font-mono)' }}
              minTickGap={30}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--text-tertiary)', fontSize: 12, fontFamily: 'var(--font-mono)' }}
              dx={-10}
            />
            <Tooltip
              contentStyle={{ 
                backgroundColor: 'rgba(5,5,5,0.9)', 
                borderColor: 'var(--surface-border)',
                borderRadius: '8px',
                color: 'var(--text-primary)',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 10px 40px -10px rgba(0,0,0,0.5)',
                fontFamily: 'var(--font-mono)',
                fontSize: '13px'
              }}
              itemStyle={{ color: 'var(--accent)', fontWeight: 600 }}
              labelStyle={{ color: 'var(--text-secondary)', marginBottom: '4px' }}
            />
            <Area 
              type="monotone" 
              dataKey="latency" 
              stroke="var(--accent)" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorLatency)" 
              activeDot={{ r: 5, fill: "var(--accent)", stroke: "var(--background)", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
