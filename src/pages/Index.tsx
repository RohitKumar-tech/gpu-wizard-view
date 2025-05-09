
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import MetricsGrid from '@/components/MetricsGrid';
import GPUUtilizationChart from '@/components/GPUUtilizationChart';
import ProcessTable from '@/components/ProcessTable';
import SuggestionPanel from '@/components/SuggestionPanel';
import HistoricalChart from '@/components/HistoricalChart';
import { mockGPUData, updateMockData } from '@/lib/mockData';
import { GPUData } from '@/lib/types';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const [gpuData, setGpuData] = useState<GPUData>(mockGPUData);
  const { toast } = useToast();

  // Update data every 3 seconds to simulate real-time monitoring
  useEffect(() => {
    const interval = setInterval(() => {
      const newData = updateMockData();
      setGpuData(newData);
      
      // Show toast for critical metrics
      const criticalMetric = newData.metrics.find(m => m.status === 'critical');
      if (criticalMetric) {
        toast({
          title: `Alert: High ${criticalMetric.label}`,
          description: `${criticalMetric.label} has reached ${criticalMetric.value}${criticalMetric.unit}. Consider optimizing workload.`,
          variant: "destructive",
        });
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, [toast]);

  return (
    <div className="min-h-screen p-4">
      <Header />
      
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">
          {gpuData.name} Monitoring
          <span className="inline-block ml-2 px-2 py-0.5 bg-gpuwizard-accent/20 text-gpuwizard-accent rounded-full text-xs">
            Real-time
          </span>
        </h2>
        <p className="text-gpuwizard-text-secondary">
          Monitoring and optimization dashboard for your GPU performance
        </p>
      </div>
      
      {/* Metrics Cards */}
      <MetricsGrid metrics={gpuData.metrics} />
      
      {/* GPU Utilization Chart */}
      <div className="mb-6">
        <GPUUtilizationChart data={gpuData.history} />
      </div>
      
      {/* Process Table */}
      <div className="mb-6">
        <ProcessTable processes={gpuData.processes} />
      </div>
      
      {/* Historical Charts and Suggestions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <HistoricalChart 
          data={gpuData.history} 
          dataKey="memoryUsage" 
          color="#0EA5E9" 
          unit="GB" 
          label="Memory" 
        />
        <HistoricalChart 
          data={gpuData.history} 
          dataKey="powerConsumption" 
          color="#F97316" 
          unit="W" 
          label="Power" 
        />
        <div className="lg:col-span-1">
          <SuggestionPanel suggestions={gpuData.suggestions} />
        </div>
      </div>
    </div>
  );
};

export default Index;
