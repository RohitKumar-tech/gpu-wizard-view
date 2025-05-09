
import React from 'react';
import { GPUMetric } from '@/lib/types';
import MetricCard from './MetricCard';

interface MetricsGridProps {
  metrics: GPUMetric[];
}

const MetricsGrid: React.FC<MetricsGridProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {metrics.map((metric) => (
        <MetricCard key={metric.id} metric={metric} />
      ))}
    </div>
  );
};

export default MetricsGrid;
