import React from 'react';
import { Target, PlayCircle, Shield, AlertTriangle } from 'lucide-react';

const mockScenarios = [];

const Simulation = () => {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-textMain">Attack Simulation</h1>
          <p className="text-textMuted mt-1">Safely validate your detections against real-world techniques.</p>
        </div>
      </div>

      <div className="bg-warning/10 border border-warning/20 p-4 rounded-xl flex items-start">
        <AlertTriangle className="w-5 h-5 text-warning mr-3 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-semibold text-warning">Simulation Safety Mode Enabled</h4>
          <p className="text-xs text-textMuted mt-1">
            All simulations are benign. No actual malware is executed. Payloads are harmless test files (e.g., EICAR) or mocked behaviors that trigger the detection engine but do not affect the host OS.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockScenarios.map((scenario) => (
          <div key={scenario.id} className="glass-panel p-6 flex flex-col group hover:-translate-y-1 transition-all duration-300 border border-border hover:border-primary/30">
            <div className="w-12 h-12 rounded-xl bg-surfaceHighlight flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Target className="w-6 h-6 text-primary" />
            </div>
            
            <h3 className="text-lg font-semibold text-textMain">{scenario.name}</h3>
            <p className="text-sm text-textMuted mt-2 flex-1">{scenario.description}</p>
            
            <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
              <div className="flex space-x-2 text-xs">
                <span className="px-2 py-1 bg-surfaceHighlight text-textMuted rounded border border-border">
                  {scenario.duration}
                </span>
                <span className={`px-2 py-1 rounded border ${
                  scenario.difficulty === 'Hard' ? 'bg-danger/10 text-danger border-danger/20' :
                  scenario.difficulty === 'Medium' ? 'bg-warning/10 text-warning border-warning/20' :
                  'bg-accent/10 text-accent border-accent/20'
                }`}>
                  {scenario.difficulty}
                </span>
              </div>
              <button className="text-primary hover:text-primaryHover transition-colors flex items-center text-sm font-medium">
                Run <PlayCircle className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        ))}

        {/* Custom Scenario Builder Card */}
        <div className="glass-panel p-6 flex flex-col items-center justify-center border border-dashed border-border hover:border-primary/50 transition-colors cursor-pointer bg-surfaceHighlight/20">
          <div className="w-12 h-12 rounded-full bg-surfaceHighlight flex items-center justify-center mb-3">
            <Shield className="w-6 h-6 text-textMuted" />
          </div>
          <h3 className="text-base font-medium text-textMain">Custom Scenario</h3>
          <p className="text-xs text-textMuted mt-1 text-center max-w-[200px]">Combine techniques to build your own custom attack chain.</p>
        </div>
      </div>
    </div>
  );
};

export default Simulation;
