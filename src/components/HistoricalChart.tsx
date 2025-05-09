
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { GPUTimeSeries } from '@/lib/types';

interface HistoricalChartProps {
  data: GPUTimeSeries[];
  dataKey: keyof GPUTimeSeries;
  color: string;
  unit: string;
  label: string;
}

const HistoricalChart: React.FC<HistoricalChartProps> = ({ data, dataKey, color, unit, label }) => {
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  const formatValue = (value: number) => {
    if (dataKey === 'memoryUsage') {
      return `${(value / 1024).toFixed(1)} GB`;
    }
    return `${value}${unit}`;
  };

  return (
    <div className="glass-card p-5 animate-fade-in h-full">
      <h2 className="text-lg font-medium mb-4">{label} History</h2>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 10,
              left: 10,
              bottom: 5,
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
              stroke="rgba(255,255,255,0.3)"
              tick={{ fill: "rgba(255,255,255,0.5)" }}
              domain={
                dataKey === 'memoryUsage' ? ['dataMin', 'dataMax'] : 
                dataKey === 'powerConsumption' ? [0, 320] : 
                [0, 100]
              }
              tickFormatter={
                dataKey === 'memoryUsage' ? (value) => `${(value / 1024).toFixed(0)}` : undefined
              }
            />
            <Tooltip
              contentStyle={{ 
                backgroundColor: '#252A3A', 
                borderColor: color,
                borderRadius: '8px', 
                color: '#F1F5F9' 
              }}
              formatter={(value) => [formatValue(value as number), label]}
              labelFormatter={(label) => `Time: ${formatTime(label as number)}`}
            />
            <Line 
              type="monotone" 
              dataKey={dataKey}
              stroke={color}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HistoricalChart;
