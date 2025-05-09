
import React from 'react';
import { GPUMetric } from '@/lib/types';
import { Cpu, Gauge, ThermometerSnowflake, ChartBar } from 'lucide-react';

interface MetricCardProps {
  metric: GPUMetric;
}

const MetricCard: React.FC<MetricCardProps> = ({ metric }) => {
  // Status color mapping
  const statusColors = {
    normal: 'bg-gpuwizard-success',
    warning: 'bg-gpuwizard-warning',
    critical: 'bg-gpuwizard-danger animate-pulse'
  };

  // Icon mapping
  const iconMap = {
    'thermometer': ThermometerSnowflake,
    'gauge': Gauge,
    'chart-bar': ChartBar,
    'cpu': Cpu
  };

  const IconComponent = iconMap[metric.icon as keyof typeof iconMap];

  return (
    <div className="glass-card p-5 relative animate-fade-in-up flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <span className="metric-label">{metric.label}</span>
        <div className={`w-2 h-2 rounded-full ${statusColors[metric.status]}`} />
      </div>
      
      <div className="flex items-center mt-2 mb-4">
        {IconComponent && <IconComponent className="w-6 h-6 text-gpuwizard-accent mr-3" />}
        <span className="metric-value">
          {metric.id === 'memory' ? metric.value.toFixed(1) : Math.round(metric.value)}
          <span className="text-base ml-1 opacity-70">{metric.unit}</span>
        </span>
      </div>
      
      <div className={`h-1 w-full rounded-full bg-gpuwizard-accent/20 mt-auto`}>
        <div 
          className={`h-1 rounded-full ${
            metric.status === 'critical' ? 'bg-gpuwizard-danger' : 
            metric.status === 'warning' ? 'bg-gpuwizard-warning' : 
            'bg-gpuwizard-accent'
          }`}
          style={{ 
            width: `${
              metric.id === 'memory' ? (metric.value / 8) * 100 : 
              metric.id === 'temperature' ? (metric.value / 100) * 100 :
              metric.id === 'power' ? (metric.value / 320) * 100 :
              metric.value
            }%` 
          }}
        />
      </div>
    </div>
  );
};

export default MetricCard;
