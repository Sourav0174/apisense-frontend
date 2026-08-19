import React from "react";
import { AIInsight as AIInsightType } from "@/types";
import { Card, CardContent } from "@/components/ui/Card";
import { Sparkles, ArrowRight } from "lucide-react";

interface AIInsightProps {
  insight: AIInsightType;
}

export function AIInsight({ insight }: AIInsightProps) {
  // Since the original mock is just a string, we split it to simulate the two parts.
  // In a real app, the backend would provide structured `observation` and `recommendation`.
  const observationText = insight.content.split(". ")[0] + ".";
  const recommendationText = insight.content.split(". ").slice(1).join(". ");

  const formatText = (text: string) => {
    return text.split(/(`[^`]+`)/).map((part, i) => {
      if (part.startsWith('`') && part.endsWith('`')) {
        return <span key={i} className="font-mono text-accent bg-accent/10 px-1.5 py-0.5 rounded text-xs">{part.slice(1, -1)}</span>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div className="col-span-1 lg:col-span-3 border-t border-b border-surface-border py-8 my-8">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent-subtle flex items-center justify-center border border-accent/20">
          <Sparkles className="w-6 h-6 text-accent" />
        </div>
        
        <div className="flex-1 space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-text-primary tracking-tight flex items-center gap-3 mb-4">
              AI Insight
              <span className="text-xs font-mono font-medium text-text-tertiary">
                {new Date(insight.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <span className="text-xs font-medium text-text-tertiary uppercase tracking-wider">Observed</span>
                <p className="text-text-primary leading-relaxed text-sm">
                  {formatText(observationText)}
                </p>
              </div>
              
              <div className="space-y-2 pl-0 md:pl-8 md:border-l border-surface-border">
                <span className="text-xs font-medium text-accent uppercase tracking-wider">Possible</span>
                <p className="text-text-secondary leading-relaxed text-sm">
                  {formatText(recommendationText)}
                </p>
              </div>
            </div>
          </div>
          
          <button className="flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors font-medium group">
            View detailed analysis
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
