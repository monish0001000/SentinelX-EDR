import React from 'react';
import DataTable from '../components/common/DataTable';
import { ShieldAlert, AlertTriangle, Info, MoreVertical } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs) => twMerge(clsx(inputs));

const mockAlerts = [
  { id: 'ALT-1042', title: 'Suspicious PowerShell Download', severity: 'critical', endpoint: 'HOST-WS-01', ruleType: 'behavioral', mitre: 'T1059.001', time: '2m ago', status: 'new' },
  { id: 'ALT-1041', title: 'Mimikatz Execution Detected', severity: 'critical', endpoint: 'SRV-DB-01', ruleType: 'sigma', mitre: 'T1003.001', time: '15m ago', status: 'investigating' },
  { id: 'ALT-1040', title: 'High Entropy DNS Query', severity: 'high', endpoint: 'LAPTOP-MKT-04', ruleType: 'plugin', mitre: 'T1071.004', time: '1h ago', status: 'new' },
  { id: 'ALT-1039', title: 'Multiple Failed Logins', severity: 'medium', endpoint: 'SRV-WEB-02', ruleType: 'behavioral', mitre: 'T1110.001', time: '3h ago', status: 'resolved' },
  { id: 'ALT-1038', title: 'Unusual Process Spawn (Word -> cmd)', severity: 'high', endpoint: 'DESKTOP-HR-02', ruleType: 'behavioral', mitre: 'T1204.002', time: '5h ago', status: 'new' },
];

const columns = [
  { key: 'id', header: 'Alert ID' },
  {
    key: 'severity',
    header: 'Severity',
    render: (val) => {
      let icon = Info;
      let colorClass = "text-blue-400 bg-blue-400/10 border-blue-400/20";
      
      if (val === 'critical') {
        icon = ShieldAlert;
        colorClass = "text-danger bg-danger/10 border-danger/20";
      } else if (val === 'high') {
        icon = AlertTriangle;
        colorClass = "text-warning bg-warning/10 border-warning/20";
      } else if (val === 'medium') {
        icon = AlertTriangle;
        colorClass = "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
      }

      const Icon = icon;

      return (
        <span className={cn("inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border capitalize", colorClass)}>
          <Icon className="w-3 h-3 mr-1" />
          {val}
        </span>
      );
    }
  },
  { 
    key: 'title', 
    header: 'Detection Title',
    render: (val) => <span className="font-medium text-textMain">{val}</span>
  },
  { key: 'endpoint', header: 'Endpoint' },
  { 
    key: 'mitre', 
    header: 'MITRE ATT&CK',
    render: (val) => (
      <span className="inline-flex items-center px-2 py-0.5 rounded bg-surfaceHighlight text-xs font-mono text-textMuted border border-border">
        {val}
      </span>
    )
  },
  { 
    key: 'status', 
    header: 'Status',
    render: (val) => (
      <span className={cn(
        "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium capitalize",
        val === 'new' ? "text-primary bg-primary/10" :
        val === 'investigating' ? "text-warning bg-warning/10" :
        "text-accent bg-accent/10"
      )}>
        {val}
      </span>
    )
  },
  { key: 'time', header: 'Time' },
  {
    key: 'actions',
    header: '',
    sortable: false,
    render: () => (
      <button className="p-1 hover:bg-surfaceHighlight rounded text-textMuted hover:text-textMain transition-colors">
        <MoreVertical className="w-4 h-4" />
      </button>
    )
  }
];

const Alerts = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-textMain">Alerts</h1>
          <p className="text-textMuted mt-1">Review and triage security detections.</p>
        </div>
      </div>

      <DataTable 
        columns={columns} 
        data={mockAlerts} 
        searchPlaceholder="Search alerts by title, endpoint, or MITRE ID..."
        onRowClick={(row) => console.log('Clicked', row)}
      />
    </div>
  );
};

export default Alerts;
