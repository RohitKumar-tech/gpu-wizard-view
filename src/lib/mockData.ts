
import { GPUData, GPUTimeSeries } from './types';

// Helper function to generate random data within range
const randomRange = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

// Helper function to generate time series data
const generateTimeSeries = (points: number): GPUTimeSeries[] => {
  const now = Date.now();
  const result: GPUTimeSeries[] = [];
  
  for (let i = points; i >= 0; i--) {
    result.push({
      timestamp: now - i * 60000, // One minute intervals
      temperature: randomRange(45, 85),
      utilization: randomRange(10, 95),
      memoryUsage: randomRange(1024, 7168),
      powerConsumption: randomRange(50, 250)
    });
  }
  
  return result;
};

// Mock GPU data
export const mockGPUData: GPUData = {
  name: "NVIDIA RTX 4080",
  metrics: [
    {
      id: "temperature",
      label: "Temperature",
      value: 72,
      unit: "°C",
      status: "normal",
      icon: "thermometer"
    },
    {
      id: "utilization",
      label: "Utilization",
      value: 87,
      unit: "%",
      status: "warning",
      icon: "gauge"
    },
    {
      id: "memory",
      label: "Memory Usage",
      value: 6.2,
      unit: "GB",
      status: "normal",
      icon: "chart-bar"
    },
    {
      id: "power",
      label: "Power",
      value: 210,
      unit: "W",
      status: "normal",
      icon: "cpu"
    }
  ],
  processes: [
    {
      id: 1,
      name: "Blender",
      memoryUsage: 2048,
      utilization: 45,
      pid: 1234
    },
    {
      id: 2,
      name: "DaVinci Resolve",
      memoryUsage: 3072,
      utilization: 30,
      pid: 5678
    },
    {
      id: 3,
      name: "TensorFlow Training",
      memoryUsage: 1024,
      utilization: 65,
      pid: 9012
    },
    {
      id: 4,
      name: "Steam Client",
      memoryUsage: 256,
      utilization: 5,
      pid: 3456
    }
  ],
  history: generateTimeSeries(30),
  suggestions: [
    {
      id: "sug-1",
      title: "Reduce Blender render quality",
      description: "Current GPU usage over 85%. Consider reducing render quality in Blender to improve performance.",
      impact: "high"
    },
    {
      id: "sug-2",
      title: "Update GPU driver",
      description: "Your current driver (version 512.15) is outdated. Update to the latest version for improved performance.",
      impact: "medium"
    },
    {
      id: "sug-3",
      title: "Optimize thermal settings",
      description: "GPU temperature is elevated but still within safe range. Consider improving airflow or custom fan curve.",
      impact: "low"
    }
  ]
};

// Function to simulate real-time data updates
export const updateMockData = (): GPUData => {
  const updatedData = { ...mockGPUData };
  
  // Update metrics with slight variations
  updatedData.metrics = mockGPUData.metrics.map(metric => {
    let newValue = metric.value;
    
    switch (metric.id) {
      case 'temperature':
        newValue = Math.max(45, Math.min(95, metric.value + randomRange(-2, 2)));
        break;
      case 'utilization':
        newValue = Math.max(5, Math.min(100, metric.value + randomRange(-5, 5)));
        break;
      case 'memory':
        newValue = Math.max(0.5, Math.min(8, +(metric.value + randomRange(-0.2, 0.2)).toFixed(1)));
        break;
      case 'power':
        newValue = Math.max(50, Math.min(320, metric.value + randomRange(-10, 10)));
        break;
    }
    
    // Update status based on new values
    let status: 'normal' | 'warning' | 'critical' = 'normal';
    
    if (metric.id === 'temperature') {
      status = newValue > 85 ? 'critical' : newValue > 75 ? 'warning' : 'normal';
    } else if (metric.id === 'utilization') {
      status = newValue > 95 ? 'critical' : newValue > 80 ? 'warning' : 'normal';
    } else if (metric.id === 'power') {
      status = newValue > 280 ? 'critical' : newValue > 250 ? 'warning' : 'normal';
    }
    
    return {
      ...metric,
      value: newValue,
      status
    };
  });
  
  // Add a new data point to history
  const lastPoint = updatedData.history[updatedData.history.length - 1];
  updatedData.history = [
    ...updatedData.history.slice(1),
    {
      timestamp: Date.now(),
      temperature: updatedData.metrics.find(m => m.id === 'temperature')!.value,
      utilization: updatedData.metrics.find(m => m.id === 'utilization')!.value,
      memoryUsage: updatedData.metrics.find(m => m.id === 'memory')!.value * 1024,
      powerConsumption: updatedData.metrics.find(m => m.id === 'power')!.value
    }
  ];
  
  // Update process utilizations slightly
  updatedData.processes = mockGPUData.processes.map(process => ({
    ...process,
    utilization: Math.max(1, Math.min(100, process.utilization + randomRange(-8, 8))),
    memoryUsage: Math.max(128, Math.min(8192, process.memoryUsage + randomRange(-128, 128)))
  }));
  
  // Occasionally update suggestions
  if (Math.random() > 0.8) {
    const highTemp = updatedData.metrics.find(m => m.id === 'temperature')!.value > 80;
    const highUtil = updatedData.metrics.find(m => m.id === 'utilization')!.value > 90;
    
    if (highTemp && highUtil && !updatedData.suggestions.some(s => s.id === 'sug-critical')) {
      updatedData.suggestions = [
        {
          id: "sug-critical",
          title: "Critical GPU Load Detected",
          description: "Your GPU is running at high temperature with maximum utilization. Consider pausing heavy workloads.",
          impact: "high",
          actionLabel: "Optimize Now"
        },
        ...updatedData.suggestions.slice(0, 2)
      ];
    }
  }
  
  return updatedData;
};
