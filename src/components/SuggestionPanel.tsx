
import React from 'react';
import { Suggestion } from '@/lib/types';
import { Button } from '@/components/ui/button';

interface SuggestionPanelProps {
  suggestions: Suggestion[];
}

const SuggestionPanel: React.FC<SuggestionPanelProps> = ({ suggestions }) => {
  // Impact badge color mapping
  const impactColor = {
    low: 'bg-blue-500/20 text-blue-300',
    medium: 'bg-yellow-500/20 text-yellow-300',
    high: 'bg-red-500/20 text-red-300'
  };

  return (
    <div className="glass-card p-5 animate-fade-in h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Smart Suggestions</h2>
        <span className="text-xs text-gpuwizard-text-secondary">
          Updated just now
        </span>
      </div>
      
      <div className="space-y-4 max-h-[calc(100%-2rem)] overflow-y-auto pr-1">
        {suggestions.length === 0 ? (
          <div className="text-center py-8 text-gpuwizard-text-secondary">
            <p>No suggestions at this time</p>
            <p className="text-xs mt-1">All systems operating optimally</p>
          </div>
        ) : (
          suggestions.map((suggestion) => (
            <div 
              key={suggestion.id} 
              className="p-3 rounded-md border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">{suggestion.title}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full ${impactColor[suggestion.impact]}`}>
                  {suggestion.impact} impact
                </span>
              </div>
              <p className="text-sm text-gpuwizard-text-secondary mb-3">
                {suggestion.description}
              </p>
              {suggestion.actionLabel && (
                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-full border-gpuwizard-accent/30 bg-gpuwizard-accent/10 hover:bg-gpuwizard-accent/20"
                >
                  {suggestion.actionLabel}
                </Button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SuggestionPanel;
