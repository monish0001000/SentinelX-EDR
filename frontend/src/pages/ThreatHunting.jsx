import React from 'react';
import ThreatGraph from '../components/common/ThreatGraph';
import { Search, Database, Terminal, Filter } from 'lucide-react';

const mockGraphData = {
  nodes: [
    { id: 'u1', type: 'user', label: 'jdoe' },
    { id: 'p1', type: 'process', label: 'explorer.exe' },
    { id: 'p2', type: 'process', label: 'WINWORD.EXE' },
    { id: 'p3', type: 'process', label: 'cmd.exe', isSuspicious: true },
    { id: 'p4', type: 'process', label: 'powershell.exe', isSuspicious: true },
    { id: 'n1', type: 'network', label: '104.16.2.14:443', isSuspicious: true },
    { id: 'f1', type: 'file', label: 'payload.exe', isSuspicious: true },
  ],
  links: [
    { source: 'u1', target: 'p1', relationship: 'logged in' },
    { source: 'p1', target: 'p2', relationship: 'spawned' },
    { source: 'p2', target: 'p3', relationship: 'spawned' },
    { source: 'p3', target: 'p4', relationship: 'spawned' },
    { source: 'p4', target: 'n1', relationship: 'connected to' },
    { source: 'p4', target: 'f1', relationship: 'dropped' },
  ]
};

const ThreatHunting = () => {
  return (
    <div className="space-y-6 h-[calc(100vh-2rem)] flex flex-col">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 flex-shrink-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-textMain">Threat Hunting</h1>
          <p className="text-textMuted mt-1">Proactively query telemetry and explore threat graphs.</p>
        </div>
      </div>

      {/* Query Bar */}
      <div className="glass-panel p-4 flex gap-4 flex-shrink-0">
        <div className="flex-1 relative">
          <Terminal className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-textMuted" />
          <input 
            type="text" 
            placeholder="SELECT * FROM processes WHERE cmdline LIKE '%powershell%enc%'"
            className="w-full bg-background/80 border border-border rounded-lg pl-10 pr-4 py-3 font-mono text-sm text-textMain focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary shadow-inner"
          />
        </div>
        <button className="btn-primary flex items-center px-6">
          <Search className="w-4 h-4 mr-2" />
          Run Query
        </button>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-0">
        {/* Left pane: Results / Graph */}
        <div className="lg:col-span-3 glass-panel p-1 flex flex-col min-h-0 relative">
          <div className="absolute top-4 left-4 z-10 flex gap-2">
            <button className="bg-surface/90 backdrop-blur text-textMain text-sm px-3 py-1.5 rounded-lg border border-border shadow-sm hover:bg-surfaceHighlight">Table View</button>
            <button className="bg-primary text-white text-sm px-3 py-1.5 rounded-lg shadow-lg">Graph View</button>
          </div>
          <ThreatGraph nodes={mockGraphData.nodes} links={mockGraphData.links} />
        </div>

        {/* Right pane: Threat Intel & Builder */}
        <div className="glass-panel p-6 flex flex-col min-h-0 overflow-y-auto">
          <h3 className="text-lg font-semibold text-textMain mb-4">Query Builder</h3>
          
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-textMuted uppercase">Table</label>
              <select className="mt-1 w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-textMain focus:outline-none focus:ring-1 focus:ring-primary">
                <option>processes</option>
                <option>network_connections</option>
                <option>file_events</option>
                <option>registry_keys</option>
              </select>
            </div>
            
            <div>
              <label className="text-xs font-medium text-textMuted uppercase">Time Range</label>
              <select className="mt-1 w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-textMain focus:outline-none focus:ring-1 focus:ring-primary">
                <option>Last 1 Hour</option>
                <option>Last 24 Hours</option>
                <option>Last 7 Days</option>
              </select>
            </div>
            
            <button className="w-full btn-secondary py-2 text-sm">Add Filter</button>
          </div>

          <hr className="border-border my-6" />
          
          <h3 className="text-lg font-semibold text-textMain mb-4">AI Hunter Assistant</h3>
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 text-sm text-textMuted">
            <p>I can help you build complex hunting queries or explain the graph structure.</p>
            <div className="mt-3">
              <input 
                type="text" 
                placeholder="Ask AI..."
                className="w-full bg-background/50 border border-border rounded px-3 py-1.5 text-textMain text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreatHunting;
