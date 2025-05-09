
export interface GPUMetric {
  id: string;
  label: string;
  value: number;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
  icon: string;
}

export interface GPUProcess {
  id: number;
  name: string;
  memoryUsage: number;
  utilization: number;
  pid: number;
}

export interface GPUTimeSeries {
  timestamp: number;
  temperature: number;
  utilization: number;
  memoryUsage: number;
  powerConsumption: number;
}

export interface Suggestion {
  id: string;
  title: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
  actionLabel?: string;
  actionFn?: () => void;
}

export interface GPUData {
  name: string;
  metrics: GPUMetric[];
  processes: GPUProcess[];
  history: GPUTimeSeries[];
  suggestions: Suggestion[];
}
