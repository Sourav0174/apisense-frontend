import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, CheckCircle2, ChevronRight, Loader2, Play } from "lucide-react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { Select } from "../ui/Select";
import { KeyValueEditor } from "./KeyValueEditor";
import { Endpoint } from "@/types";

interface EndpointFormProps {
  onComplete: (endpoint: Endpoint) => void;
  onCancel: () => void;
}

type TestState = "idle" | "testing" | "success" | "error";

interface TestResult {
  statusCode: number;
  statusText: string;
  latency: number;
  size: string;
  timestamp: string;
}

interface KeyValuePair {
  id: string;
  key: string;
  value: string;
}

export function EndpointForm({ onComplete, onCancel }: EndpointFormProps) {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("GET");
  const [name, setName] = useState("");
  const [interval, setInterval] = useState("5");
  
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [headers, setHeaders] = useState<KeyValuePair[]>([]);
  const [queryParams, setQueryParams] = useState<KeyValuePair[]>([]);
  const [body, setBody] = useState("");
  const [expectedStatus, setExpectedStatus] = useState("200");
  
  const [testState, setTestState] = useState<TestState>("idle");
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!url) newErrors.url = "URL is required";
    else if (!url.startsWith("http://") && !url.startsWith("https://")) {
      newErrors.url = "URL must start with http:// or https://";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleTest = () => {
    if (!validate()) return;

    setTestState("testing");
    setTestResult(null);

    // Mock network request
    setTimeout(() => {
      // Simulate success for MVP
      setTestResult({
        statusCode: 200,
        statusText: "OK",
        latency: Math.floor(Math.random() * 200) + 50,
        size: "12.4 KB",
        timestamp: new Date().toISOString()
      });
      setTestState("success");
    }, 1500);
  };

  const handleStartMonitoring = () => {
    // Generate a mock endpoint based on form data
    const newEndpoint: Endpoint = {
      id: Math.random().toString(36).substr(2, 9),
      method: method as Endpoint["method"],
      path: url.replace(/^https?:\/\/[^\/]+/, ""), // Extract path for display
      status: "healthy",
      latency: testResult?.latency || 0,
      uptime: 100,
      lastChecked: new Date().toISOString(),
    };
    
    // In a real app we'd dispatch to a store or hit an API
    onComplete(newEndpoint);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="space-y-6 pb-24"> {/* Padding for fixed footer */}
        
        {/* Basic Configuration */}
        <section className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5 ml-4">Endpoint URL *</label>
            <Input 
              placeholder="https://api.example.com/v1/users" 
              value={url}
              onChange={e => setUrl(e.target.value)}
              error={errors.url}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5 ml-4">HTTP Method</label>
              <Select value={method} onChange={e => setMethod(e.target.value)}>
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="PATCH">PATCH</option>
                <option value="DELETE">DELETE</option>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5 ml-4">Monitoring Interval</label>
              <Select value={interval} onChange={e => setInterval(e.target.value)}>
                <option value="1">1 minute</option>
                <option value="5">5 minutes</option>
                <option value="10">10 minutes</option>
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
              </Select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5 ml-4">Endpoint Name (Optional)</label>
            <Input 
              placeholder="e.g. User API Production" 
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
        </section>

        {/* Advanced Configuration Toggle */}
        <button 
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-2 text-sm font-medium text-text-tertiary hover:text-text-primary transition-colors"
        >
          <ChevronRight className={`w-4 h-4 transition-transform ${showAdvanced ? "rotate-90" : ""}`} />
          Advanced Configuration
        </button>

        {/* Advanced Configuration Panel */}
        <AnimatePresence>
          {showAdvanced && (
            <motion.section
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="space-y-6 pt-4 border-t border-surface-border">
                <KeyValueEditor 
                  label="Headers" 
                  pairs={headers} 
                  onChange={setHeaders} 
                  isSensitive={true} // Usually authorization headers
                />
                
                <KeyValueEditor 
                  label="Query Parameters" 
                  pairs={queryParams} 
                  onChange={setQueryParams} 
                />

                {(method === "POST" || method === "PUT" || method === "PATCH") && (
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1.5">Request Body</label>
                    <textarea 
                      value={body}
                      onChange={e => setBody(e.target.value)}
                      className="w-full h-32 p-4 rounded-xl bg-surface border border-surface-border text-sm text-text-primary font-mono placeholder:text-text-tertiary focus:outline-none focus:ring-1 focus:ring-accent/50 focus:border-accent/50 transition-all custom-scrollbar resize-none"
                      placeholder='{\n  "key": "value"\n}'
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1.5">Expected Status Code</label>
                  <Input 
                    placeholder="200" 
                    value={expectedStatus}
                    onChange={e => setExpectedStatus(e.target.value)}
                    className="w-1/3"
                  />
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Test Results Area */}
        <AnimatePresence mode="wait">
          {testState !== "idle" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`p-5 rounded-2xl border ${
                testState === "testing" ? "border-surface-border bg-surface" :
                testState === "success" ? "border-success/30 bg-success-bg" :
                "border-error/30 bg-error-bg"
              }`}
            >
              {testState === "testing" && (
                <div className="flex items-center gap-3 text-text-secondary">
                  <Loader2 className="w-5 h-5 animate-spin text-accent" />
                  <span className="font-medium">Checking endpoint...</span>
                </div>
              )}

              {testState === "success" && testResult && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-success font-medium">
                    <CheckCircle2 className="w-5 h-5" />
                    Endpoint is reachable
                  </div>
                  <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-black/40 border border-surface-border">
                    <div>
                      <div className="text-xs text-text-tertiary mb-1 uppercase tracking-wider">Status</div>
                      <div className="font-mono text-sm text-text-primary">{testResult.statusCode} {testResult.statusText}</div>
                    </div>
                    <div>
                      <div className="text-xs text-text-tertiary mb-1 uppercase tracking-wider">Response Time</div>
                      <div className="font-mono text-sm text-text-primary">{testResult.latency}ms</div>
                    </div>
                    <div>
                      <div className="text-xs text-text-tertiary mb-1 uppercase tracking-wider">Size</div>
                      <div className="font-mono text-sm text-text-primary">{testResult.size}</div>
                    </div>
                  </div>
                </div>
              )}

              {testState === "error" && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-error font-medium">
                    <AlertTriangle className="w-5 h-5" />
                    Endpoint check failed
                  </div>
                  <div className="p-4 rounded-xl bg-black/40 border border-surface-border text-sm text-text-secondary leading-relaxed">
                    Connection timed out after 5000ms. Please verify the URL and ensure the endpoint is publicly accessible.
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Fixed Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-surface-border bg-background/95 backdrop-blur-3xl flex items-center justify-between">
        <Button variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <div className="flex items-center gap-3">
          {testState !== "success" ? (
            <Button variant="secondary" onClick={handleTest} isLoading={testState === "testing"}>
              <Play className="w-4 h-4 mr-2" />
              Test Endpoint
            </Button>
          ) : (
            <Button variant="secondary" onClick={handleTest}>
              Retest
            </Button>
          )}
          
          <Button 
            variant="primary" 
            onClick={handleStartMonitoring}
            disabled={testState !== "success"}
          >
            Start Monitoring
          </Button>
        </div>
      </div>
    </div>
  );
}
