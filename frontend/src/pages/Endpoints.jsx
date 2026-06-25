import React from 'react';
import DataTable from '../components/common/DataTable';
import { Monitor, Wifi, WifiOff, ShieldAlert, MoreVertical } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs) => twMerge(clsx(inputs));

const mockEndpoints = [
  { id: '1', hostname: 'DESKTOP-JW98K', ip: '192.168.1.45', os: 'Windows 11', status: 'online', alerts: 0, lastSeen: 'Just now' },
  { id: '2', hostname: 'SRV-DB-01', ip: '10.0.0.15', os: 'Ubuntu 22.04', status: 'online', alerts: 3, lastSeen: '2m ago' },
  { id: '3', hostname: 'LAPTOP-MKT-04', ip: '192.168.1.112', os: 'macOS 14.2', status: 'offline', alerts: 0, lastSeen: '4h ago' },
  { id: '4', hostname: 'SRV-WEB-02', ip: '10.0.0.22', os: 'Ubuntu 22.04', status: 'online', alerts: 12, lastSeen: 'Just now' },
  { id: '5', hostname: 'DESKTOP-HR-02', ip: '192.168.1.67', os: 'Windows 10', status: 'isolated', alerts: 5, lastSeen: '1m ago' },
];

const columns = [
  {
    key: 'hostname',
    header: 'Hostname',
    render: (val, row) => (
      <div className="flex items-center font-medium">
        <Monitor className={cn("w-4 h-4 mr-3", row.os.includes('Windows') ? "text-blue-400" : row.os.includes('Ubuntu') ? "text-orange-400" : "text-gray-300")} />
        {val}
      </div>
    )
  },
  { key: 'ip', header: 'IP Address' },
  { key: 'os', header: 'OS' },
  {
    key: 'status',
    header: 'Status',
    render: (val) => {
      let icon = Wifi;
      let colorClass = "text-accent bg-accent/10 border-accent/20";
      
      if (val === 'offline') {
        icon = WifiOff;
        colorClass = "text-textMuted bg-surfaceHighlight border-border";
      } else if (val === 'isolated') {
        icon = ShieldAlert;
        colorClass = "text-danger bg-danger/10 border-danger/20";
      }

      const Icon = icon;

      return (
        <span className={cn("inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border capitalize", colorClass)}>
          <Icon className="w-3 h-3 mr-1.5" />
          {val}
        </span>
      );
    }
  },
  {
    key: 'alerts',
    header: 'Active Alerts',
    render: (val) => (
      val > 0 ? (
        <span className="inline-flex items-center text-danger font-semibold bg-danger/10 px-2 py-0.5 rounded-full text-xs">
          <ShieldAlert className="w-3 h-3 mr-1" />
          {val}
        </span>
      ) : (
        <span className="text-textMuted text-xs font-medium">0</span>
      )
    )
  },
  { key: 'lastSeen', header: 'Last Seen' },
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

const Endpoints = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-textMain">Endpoints</h1>
          <p className="text-textMuted mt-1">Manage and monitor agents across your fleet.</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-secondary">Export CSV</button>
          <button className="btn-primary">Deploy Agent</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="glass-panel p-4 flex items-center justify-between">
          <div>
            <p className="text-textMuted text-sm">Total Endpoints</p>
            <p className="text-2xl font-bold text-textMain mt-1">8,492</p>
          </div>
          <Monitor className="w-8 h-8 text-primary/50" />
        </div>
        <div className="glass-panel p-4 flex items-center justify-between border-accent/30">
          <div>
            <p className="text-textMuted text-sm">Online</p>
            <p className="text-2xl font-bold text-accent mt-1">8,450</p>
          </div>
          <Wifi className="w-8 h-8 text-accent/50" />
        </div>
        <div className="glass-panel p-4 flex items-center justify-between">
          <div>
            <p className="text-textMuted text-sm">Offline</p>
            <p className="text-2xl font-bold text-textMuted mt-1">39</p>
          </div>
          <WifiOff className="w-8 h-8 text-textMuted/50" />
        </div>
        <div className="glass-panel p-4 flex items-center justify-between border-danger/30">
          <div>
            <p className="text-textMuted text-sm">Isolated</p>
            <p className="text-2xl font-bold text-danger mt-1">3</p>
          </div>
          <ShieldAlert className="w-8 h-8 text-danger/50" />
        </div>
      </div>

      <DataTable 
        columns={columns} 
        data={mockEndpoints} 
        searchPlaceholder="Search hostnames, IPs, or OS..."
        onRowClick={(row) => console.log('Clicked', row)}
      />
    </div>
  );
};

export default Endpoints;
