import React from 'react';
import DataTable from '../components/common/DataTable';
import { Briefcase, User, MessageSquare, Paperclip, CheckCircle } from 'lucide-react';

const mockCases = [
  { id: 'CASE-092', title: 'Ransomware precursor on SRV-DB-01', priority: 'High', assignee: 'Jane Smith', status: 'Open', lastUpdated: '10m ago' },
  { id: 'CASE-091', title: 'Suspicious PowerShell & lateral movement', priority: 'Critical', assignee: 'Alex Doe', status: 'In Progress', lastUpdated: '1h ago' },
  { id: 'CASE-090', title: 'Multiple failed logins from unknown IP', priority: 'Low', assignee: 'Unassigned', status: 'Open', lastUpdated: '3h ago' },
  { id: 'CASE-089', title: 'Malware infection on DESKTOP-HR-02', priority: 'High', assignee: 'Jane Smith', status: 'Resolved', lastUpdated: '1d ago' },
];

const columns = [
  { key: 'id', header: 'Case ID' },
  { 
    key: 'title', 
    header: 'Title',
    render: (val) => <span className="font-medium text-textMain">{val}</span>
  },
  { 
    key: 'priority', 
    header: 'Priority',
    render: (val) => (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
        val === 'Critical' ? 'bg-danger/10 text-danger border-danger/20' :
        val === 'High' ? 'bg-warning/10 text-warning border-warning/20' :
        'bg-surfaceHighlight text-textMuted border-border'
      }`}>
        {val}
      </span>
    )
  },
  { 
    key: 'status', 
    header: 'Status',
    render: (val) => (
      <span className={`inline-flex items-center text-sm font-medium ${
        val === 'Open' ? 'text-primary' :
        val === 'In Progress' ? 'text-warning' :
        'text-accent'
      }`}>
        {val === 'Resolved' && <CheckCircle className="w-4 h-4 mr-1.5" />}
        {val}
      </span>
    )
  },
  { 
    key: 'assignee', 
    header: 'Assignee',
    render: (val) => (
      <div className="flex items-center text-sm text-textMuted">
        <div className="w-5 h-5 rounded-full bg-surfaceHighlight flex items-center justify-center mr-2">
          {val === 'Unassigned' ? <User className="w-3 h-3" /> : <span className="text-[10px] text-textMain">{val.charAt(0)}</span>}
        </div>
        {val}
      </div>
    )
  },
  { key: 'lastUpdated', header: 'Last Updated' }
];

const Cases = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-textMain">Case Management</h1>
          <p className="text-textMuted mt-1">Track and collaborate on security incidents.</p>
        </div>
        <button className="btn-primary">
          <Briefcase className="w-4 h-4 mr-2 inline" />
          New Case
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="glass-panel p-5">
          <h3 className="text-sm font-medium text-textMuted uppercase tracking-wider mb-2">Open Cases</h3>
          <p className="text-4xl font-bold text-textMain">12</p>
        </div>
        <div className="glass-panel p-5">
          <h3 className="text-sm font-medium text-textMuted uppercase tracking-wider mb-2">Critical / High</h3>
          <p className="text-4xl font-bold text-danger">5</p>
        </div>
        <div className="glass-panel p-5">
          <h3 className="text-sm font-medium text-textMuted uppercase tracking-wider mb-2">Avg Resolution</h3>
          <p className="text-4xl font-bold text-textMain">1.4 <span className="text-xl text-textMuted font-normal">days</span></p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DataTable 
            columns={columns} 
            data={mockCases} 
            searchPlaceholder="Search cases..."
          />
        </div>
        
        {/* Quick Details Pane for selected case (Mock) */}
        <div className="glass-panel p-6 flex flex-col h-[500px]">
          <h3 className="text-lg font-semibold text-textMain mb-4">CASE-091</h3>
          <div className="flex-1 overflow-y-auto pr-2 space-y-6">
            <div>
              <p className="text-sm font-medium text-textMuted">Title</p>
              <p className="text-base text-textMain mt-1">Suspicious PowerShell & lateral movement</p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-textMuted">Description</p>
              <p className="text-sm text-textMain mt-1 leading-relaxed">
                Alert ALT-1042 escalated. Multiple endpoints showing encoded PowerShell execution followed by attempted connections to port 445 on DC-01.
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between border-b border-border pb-2 mb-3">
                <p className="text-sm font-medium text-textMain">Notes (4)</p>
                <button className="text-xs text-primary hover:text-primaryHover">Add Note</button>
              </div>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-surfaceHighlight flex-shrink-0 flex items-center justify-center">
                    <User className="w-4 h-4 text-textMuted" />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-medium text-textMain">Alex Doe</span>
                      <span className="text-xs text-textMuted">1h ago</span>
                    </div>
                    <p className="text-sm text-textMuted mt-1">Isolated SRV-DB-01. Waiting on memory dump analysis.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cases;
