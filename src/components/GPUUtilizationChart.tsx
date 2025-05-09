
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { GPUTimeSeries } from '@/lib/types';

interface GPUUtilizationChartProps {
  data: GPUTimeSeries[];
}

const GPUUtilizationChart: React.FC<GPUUtilizationChartProps> = ({ data }) => {
  // Format timestamp for the chart
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  return (
    <div className="glass-card p-5 animate-fade-in">
      <h2 className="text-lg font-medium mb-4">GPU Activity</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="timestamp" 
              tickFormatter={formatTime}
              stroke="rgba(255,255,255,0.3)"
              tick={{ fill: "rgba(255,255,255,0.5)" }}
            />
            <YAxis 
              yAxisId="left"
              orientation="left" 
              stroke="rgba(255,255,255,0.3)"
              tick={{ fill: "rgba(255,255,255,0.5)" }}
              domain={[0, 100]}
            />
            <YAxis 
              yAxisId="right"
              orientation="right" 
              stroke="rgba(255,255,255,0.3)"
              tick={{ fill: "rgba(255,255,255,0.5)" }}
              domain={[0, 100]}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#252A3A', 
                borderColor: '#8B5CF6',
                borderRadius: '8px',
                color: '#F1F5F9'
              }} 
              formatter={(value, name) => {
                if (name === 'utilization') return [`${value}%`, 'Utilization'];
                if (name === 'temperature') return [`${value}°C`, 'Temperature'];
                return [value, name];
              }}
              labelFormatter={(label) => `Time: ${formatTime(label)}`}
            />
            <Area 
              type="monotone" 
              dataKey="utilization" 
              stroke="#8B5CF6" 
              fill="url(#utilizationGradient)" 
              strokeWidth={2}
              yAxisId="left"
            />
            <Area 
              type="monotone" 
              dataKey="temperature" 
              stroke="#F97316" 
              fill="url(#temperatureGradient)" 
              strokeWidth={2}
              yAxisId="right"
            />
            <defs>
              <linearGradient id="utilizationGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="temperatureGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F97316" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#F97316" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center mt-2 text-xs text-gpuwizard-text-secondary space-x-6">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-gpuwizard-accent rounded-full mr-1"></div>
          <span>Utilization (%)</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-gpuwizard-orange rounded-full mr-1"></div>
          <span>Temperature (°C)</span>
        </div>
      </div>
    </div>
  );
};

export default GPUUtilizationChart;
