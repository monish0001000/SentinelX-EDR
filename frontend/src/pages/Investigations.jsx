import React, { useState, useEffect } from 'react';
import Timeline from '../components/common/Timeline';
import { Search, Bot, Download, FileText, AlertCircle } from 'lucide-react';
import { getInvestigations } from '../services/api';

const mockInvestigationEvents = [
  {
    id: 1,
    timestamp: '2026-06-25T14:30:12Z',
    type: 'process',
    severity: 'info',
    title: 'Process Created: WINWORD.EXE',
    description: 'User opened a Word document (Invoice_June_2026.docx).',
    metadata: { pid: 4892, parent: 'explorer.exe', user: 'jdoe' }
  },
  {
    id: 2,
    timestamp: '2026-06-25T14:30:45Z',
    type: 'process',
    severity: 'warning',
    title: 'Suspicious Child Process: cmd.exe',
    description: 'WINWORD.EXE spawned cmd.exe with unusual arguments.',
    mitre: 'T1059.003',
    metadata: { pid: 5104, cmdline: 'cmd.exe /c powershell.exe -w hidden -enc JABz...' }
  },
  {
    id: 3,
    timestamp: '2026-06-25T14:30:46Z',
    type: 'alert',
    severity: 'critical',
    title: 'Encoded PowerShell Execution',
    description: 'PowerShell executed with -enc flag and hidden window style.',
    mitre: 'T1059.001',
    metadata: { pid: 5120, parent: 'cmd.exe' }
  },
  {
    id: 4,
    timestamp: '2026-06-25T14:31:02Z',
    type: 'network',
    severity: 'high',
    title: 'External Connection Established',
    description: 'powershell.exe connected to suspicious external IP.',
    mitre: 'T1071.001',
    metadata: { remote_ip: '104.16.2.14', port: 443, bytes_sent: 1024, bytes_recv: 45000 }
  },
  {
    id: 5,
    timestamp: '2026-06-25T14:31:05Z',
    type: 'file',
    severity: 'high',
    title: 'File Dropped: payload.exe',
    description: 'powershell.exe wrote a new executable to AppData\\Local\\Temp.',
    metadata: { path: 'C:\\Users\\jdoe\\AppData\\Local\\Temp\\payload.exe', hash: '8a9f...e2a' }
  }
];

const Investigations = () => {
  const [investigation, setInvestigation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestInvestigation = async () => {
      try {
        const response = await getInvestigations();
        if (response.data && response.data.length > 0) {
          setInvestigation(response.data[0]); // Take the latest one
        }
      } catch (error) {
        console.error('Error fetching investigations:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchLatestInvestigation();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full py-20">
        <div className="animate-pulse text-primary">Loading Investigations...</div>
      </div>
    );
  }

  if (!investigation) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-textMain">Investigations</h1>
            <p className="text-textMuted mt-1">AI-driven analysis of security alerts.</p>
          </div>
        </div>
        <div className="glass-panel p-10 flex flex-col items-center justify-center text-center">
          <AlertCircle className="w-12 h-12 text-textMuted mb-4" />
          <h2 className="text-xl font-semibold text-textMain">No Investigations Found</h2>
          <p className="text-textMuted mt-2 max-w-md">There are currently no active AI investigations. Investigations are triggered automatically for high-severity alerts or manually from the alerts page.</p>
        </div>
      </div>
    );
  }

  const events = investigation.timeline ? (typeof investigation.timeline === 'string' ? JSON.parse(investigation.timeline) : investigation.timeline) : mockInvestigationEvents;
  const mitreMapping = investigation.mitre_mapping ? (typeof investigation.mitre_mapping === 'string' ? JSON.parse(investigation.mitre_mapping) : investigation.mitre_mapping) : {};

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-textMain">Investigation #{investigation.id.substring(0,8).toUpperCase()}</h1>
          <p className="text-textMuted mt-1">AI-driven analysis of Alert #{investigation.alert_id}</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-secondary">
            <Download className="w-4 h-4 mr-2 inline" />
            Export PCAP
          </button>
          <button className="btn-primary">
            <FileText className="w-4 h-4 mr-2 inline" />
            Generate Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* AI Analysis Summary */}
          <div className="glass-panel p-6 border-primary/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
              <Bot className="w-32 h-32 text-primary" />
            </div>
            
            <div className="flex items-center mb-4">
              <Bot className="w-6 h-6 text-primary mr-2" />
              <h3 className="text-lg font-semibold text-textMain">AI Analysis Summary</h3>
            </div>
            
            <div className="prose prose-invert max-w-none text-sm text-textMuted">
              <p className="whitespace-pre-wrap">{investigation.summary || 'Summary is being generated...'}</p>
              
              {Object.keys(mitreMapping).length > 0 && (
                <div className="mt-4">
                  <h4 className="text-textMain font-medium mb-2">Mapped Techniques:</h4>
                  <div className="flex flex-wrap gap-2">
                    {Object.keys(mitreMapping).map(t => (
                      <span key={t} className="bg-surfaceHighlight px-2 py-1 rounded text-xs border border-border">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Timeline */}
          <div className="glass-panel p-6">
            <h3 className="text-lg font-semibold text-textMain mb-6">Attack Timeline</h3>
            <Timeline events={events} />
          </div>
        </div>

        {/* Sidebar Context */}
        <div className="space-y-6">
          <div className="glass-panel p-6">
            <h3 className="text-sm font-semibold text-textMuted uppercase tracking-wider mb-4">Investigation Details</h3>
            <div className="space-y-3">
              <div className="p-3 bg-surfaceHighlight/50 rounded-lg border border-border">
                <p className="text-xs text-textMuted mb-1">Status</p>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-textMain capitalize">{investigation.status}</p>
                </div>
              </div>
              <div className="p-3 bg-surfaceHighlight/50 rounded-lg border border-border">
                <p className="text-xs text-textMuted mb-1">Risk Score</p>
                <div className="flex items-center justify-between">
                  <p className={`text-sm font-medium ${investigation.risk_score > 70 ? 'text-danger' : investigation.risk_score > 40 ? 'text-warning' : 'text-primary'}`}>
                    {investigation.risk_score}/100
                  </p>
                </div>
              </div>
              <div className="p-3 bg-surfaceHighlight/50 rounded-lg border border-border">
                <p className="text-xs text-textMuted mb-1">Started At</p>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-textMain">{new Date(investigation.started_at).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="glass-panel p-6">
            <h3 className="text-sm font-semibold text-textMuted uppercase tracking-wider mb-4">Response Actions</h3>
            <div className="space-y-2">
              <button className="w-full text-left p-3 rounded-lg border border-danger/20 bg-danger/10 text-danger hover:bg-danger/20 transition-colors">
                <span className="font-semibold block text-sm">Isolate Endpoint</span>
                <span className="text-xs opacity-80">Disconnect from network except for EDR.</span>
              </button>
              <button className="w-full text-left p-3 rounded-lg border border-warning/20 bg-warning/10 text-warning hover:bg-warning/20 transition-colors">
                <span className="font-semibold block text-sm">Kill Process Tree</span>
                <span className="text-xs opacity-80">Terminate malicious processes.</span>
              </button>
              <button className="w-full text-left p-3 rounded-lg border border-primary/20 bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                <span className="font-semibold block text-sm">Create Case</span>
                <span className="text-xs opacity-80">Escalate to Tier 2 for full forensics.</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Investigations;
