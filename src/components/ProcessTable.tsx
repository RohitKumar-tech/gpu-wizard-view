
import React from 'react';
import { GPUProcess } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Cpu } from 'lucide-react';

interface ProcessTableProps {
  processes: GPUProcess[];
}

const ProcessTable: React.FC<ProcessTableProps> = ({ processes }) => {
  return (
    <div className="glass-card p-5 animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Running Processes</h2>
        <Button 
          variant="outline" 
          size="sm" 
          className="border-gpuwizard-accent/30 bg-transparent hover:bg-gpuwizard-accent/10 text-xs"
        >
          Refresh
        </Button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-3 text-gpuwizard-text-secondary font-medium">Process</th>
              <th className="text-left py-3 text-gpuwizard-text-secondary font-medium">PID</th>
              <th className="text-left py-3 text-gpuwizard-text-secondary font-medium">Memory Usage</th>
              <th className="text-left py-3 text-gpuwizard-text-secondary font-medium">GPU Usage</th>
              <th className="text-right py-3 text-gpuwizard-text-secondary font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {processes.map((process) => (
              <tr 
                key={process.id} 
                className="border-b border-white/5 hover:bg-white/5 transition-colors"
              >
                <td className="py-3">
                  <div className="flex items-center">
                    <Cpu className="h-4 w-4 text-gpuwizard-accent mr-2" />
                    <span>{process.name}</span>
                  </div>
                </td>
                <td className="py-3 text-gpuwizard-text-secondary">{process.pid}</td>
                <td className="py-3">
                  <div className="flex items-center">
                    <span className="mr-2">{(process.memoryUsage / 1024).toFixed(1)} GB</span>
                    <div className="w-16 h-1 bg-gpuwizard-card rounded-full">
                      <div 
                        className="h-1 bg-gpuwizard-blue rounded-full" 
                        style={{ width: `${(process.memoryUsage / 8192) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="py-3">
                  <div className="flex items-center">
                    <span className="mr-2">{process.utilization}%</span>
                    <div className="w-16 h-1 bg-gpuwizard-card rounded-full">
                      <div 
                        className="h-1 bg-gpuwizard-orange rounded-full" 
                        style={{ width: `${process.utilization}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="py-3 text-right">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-gpuwizard-text-secondary hover:text-white"
                  >
                    Optimize
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProcessTable;
