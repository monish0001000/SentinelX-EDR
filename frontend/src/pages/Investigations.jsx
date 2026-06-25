import React from 'react';
import Timeline from '../components/common/Timeline';
import { Search, Bot, Download, FileText } from 'lucide-react';

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
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-textMain">Investigation #INV-8492</h1>
          <p className="text-textMuted mt-1">AI-driven analysis of ALT-1042 (Suspicious PowerShell Download).</p>
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
              <p>
                Based on the telemetry from <span className="text-primary font-mono bg-primary/10 px-1 rounded">HOST-WS-01</span>, this alert represents a likely <strong>phishing payload execution</strong>.
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>User <code>jdoe</code> opened a Word document which spawned a hidden PowerShell instance via <code>cmd.exe</code>.</li>
                <li>The PowerShell script used Base64 encoding to bypass static analysis.</li>
                <li>It connected to <code>104.16.2.14</code> (flagged by OTX as malicious) and downloaded a secondary payload.</li>
                <li>The secondary payload (<code>payload.exe</code>) was dropped in the Temp directory.</li>
              </ul>
              <p className="mt-4 text-warning bg-warning/10 p-3 rounded-lg border border-warning/20">
                <strong>Recommendation:</strong> Isolate the endpoint immediately to prevent lateral movement. Quarantine the dropped file and revoke the user's active sessions.
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div className="glass-panel p-6">
            <h3 className="text-lg font-semibold text-textMain mb-6">Attack Timeline</h3>
            <Timeline events={mockInvestigationEvents} />
          </div>
        </div>

        {/* Sidebar Context */}
        <div className="space-y-6">
          <div className="glass-panel p-6">
            <h3 className="text-sm font-semibold text-textMuted uppercase tracking-wider mb-4">Related Entities</h3>
            <div className="space-y-3">
              <div className="p-3 bg-surfaceHighlight/50 rounded-lg border border-border">
                <p className="text-xs text-textMuted mb-1">User</p>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-textMain">jdoe (John Doe)</p>
                  <span className="text-xs bg-danger/10 text-danger px-2 py-0.5 rounded">Compromised</span>
                </div>
              </div>
              <div className="p-3 bg-surfaceHighlight/50 rounded-lg border border-border">
                <p className="text-xs text-textMuted mb-1">Endpoint</p>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-textMain font-mono">HOST-WS-01</p>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">Online</span>
                </div>
              </div>
              <div className="p-3 bg-surfaceHighlight/50 rounded-lg border border-border">
                <p className="text-xs text-textMuted mb-1">External IP</p>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-danger font-mono">104.16.2.14</p>
                  <span className="text-xs bg-surface text-textMuted border border-border px-2 py-0.5 rounded">OTX Match</span>
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
                <span className="text-xs opacity-80">Terminate WINWORD.EXE and descendants.</span>
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
