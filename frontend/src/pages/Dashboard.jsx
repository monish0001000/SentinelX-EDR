import React from 'react';
import { 
  ShieldAlert, 
  Server, 
  Activity, 
  Crosshair,
  TrendingUp,
  Cpu,
  Globe,
  Database
} from 'lucide-react';
import StatCard from '../components/common/StatCard';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

const mockTrendData = [
  { time: '00:00', critical: 2, high: 5, medium: 12 },
  { time: '04:00', critical: 1, high: 8, medium: 15 },
  { time: '08:00', critical: 4, high: 12, medium: 25 },
  { time: '12:00', critical: 7, high: 18, medium: 42 },
  { time: '16:00', critical: 3, high: 10, medium: 30 },
  { time: '20:00', critical: 1, high: 6, medium: 18 },
  { time: '24:00', critical: 2, high: 4, medium: 14 },
];

const mockMitreData = [
  { name: 'Execution', value: 85 },
  { name: 'Persistence', value: 62 },
  { name: 'Privilege Escalation', value: 45 },
  { name: 'Defense Evasion', value: 92 },
  { name: 'Credential Access', value: 54 },
  { name: 'Lateral Movement', value: 38 },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-textMain">SOC Dashboard</h1>
          <p className="text-textMuted mt-1">Real-time overview of your security posture.</p>
        </div>
        <div className="flex items-center space-x-3">
          <span className="flex items-center text-sm font-medium bg-accent/10 text-accent px-3 py-1.5 rounded-lg border border-accent/20">
            <span className="w-2 h-2 rounded-full bg-accent mr-2 animate-pulse"></span>
            System Healthy
          </span>
          <button className="btn-secondary flex items-center">
            <Database className="w-4 h-4 mr-2" />
            Generate Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Active Alerts" 
          value="142" 
          icon={ShieldAlert} 
          trend="up" 
          trendValue="+12%"
          colorClass="bg-danger/10 text-danger"
        />
        <StatCard 
          title="Monitored Endpoints" 
          value="8,492" 
          icon={Server} 
          trend="up" 
          trendValue="+24"
          colorClass="bg-primary/10 text-primary"
        />
        <StatCard 
          title="Events Analyzed" 
          value="1.2M" 
          icon={Activity} 
          trend="up" 
          trendValue="+150k"
          colorClass="bg-secondary/10 text-secondary"
        />
        <StatCard 
          title="Mean Time To Detect" 
          value="4m 12s" 
          icon={TrendingUp} 
          trend="down" 
          trendValue="-30s"
          colorClass="bg-accent/10 text-accent"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="glass-panel p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-textMain">Alert Trends (24h)</h3>
            <select className="bg-surface border border-border rounded-lg px-3 py-1 text-sm text-textMain focus:outline-none focus:ring-1 focus:ring-primary">
              <option>Last 24 Hours</option>
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCritical" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorHigh" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                <XAxis dataKey="time" stroke="#9CA3AF" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                <YAxis stroke="#9CA3AF" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '0.5rem' }}
                  itemStyle={{ color: '#F9FAFB' }}
                />
                <Area type="monotone" dataKey="critical" stroke="#EF4444" strokeWidth={2} fillOpacity={1} fill="url(#colorCritical)" />
                <Area type="monotone" dataKey="high" stroke="#F59E0B" strokeWidth={2} fillOpacity={1} fill="url(#colorHigh)" />
                <Area type="monotone" dataKey="medium" stroke="#3B82F6" strokeWidth={2} fillOpacity={0.1} fill="#3B82F6" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* MITRE ATT&CK Coverage */}
        <div className="glass-panel p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-textMain">MITRE ATT&CK</h3>
            <button className="text-primary hover:text-primaryHover text-sm font-medium">View Matrix</button>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockMitreData} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={true} vertical={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={110} stroke="#9CA3AF" tick={{fontSize: 11}} axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{fill: '#1F2937'}}
                  contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '0.5rem' }}
                />
                <Bar dataKey="value" fill="#8B5CF6" radius={[0, 4, 4, 0]} barSize={16}>
                  {
                    mockMitreData.map((entry, index) => (
                      <cell key={`cell-${index}`} fill={entry.value > 80 ? '#EF4444' : entry.value > 60 ? '#F59E0B' : '#8B5CF6'} />
                    ))
                  }
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Alerts List (Mock) */}
        <div className="glass-panel p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-textMain">Recent Critical Alerts</h3>
            <button className="text-primary hover:text-primaryHover text-sm font-medium">View All</button>
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-start p-3 bg-surfaceHighlight/50 rounded-lg hover:bg-surfaceHighlight transition-colors border border-border/50">
                <div className="w-2 h-2 rounded-full bg-danger mt-2 flex-shrink-0"></div>
                <div className="ml-3 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-textMain">Suspicious PowerShell Download</p>
                    <span className="text-xs text-textMuted">2m ago</span>
                  </div>
                  <p className="text-xs text-textMuted mt-1">HOST-WS-{i} • Defense Evasion</p>
                </div>
                <button className="ml-4 text-xs font-medium text-primary hover:text-primaryHover">Investigate</button>
              </div>
            ))}
          </div>
        </div>

        {/* System Health */}
        <div className="glass-panel p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-textMain">System Health</h3>
          </div>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-lg bg-surfaceHighlight flex items-center justify-center mr-4">
                  <Server className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-textMain">Agents Online</p>
                  <p className="text-xs text-textMuted">98.5% coverage</p>
                </div>
              </div>
              <span className="text-lg font-semibold text-accent">8,492 / 8,500</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-lg bg-surfaceHighlight flex items-center justify-center mr-4">
                  <Cpu className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-textMain">Engine Load</p>
                  <p className="text-xs text-textMuted">Events per second</p>
                </div>
              </div>
              <span className="text-lg font-semibold text-textMain">4,250 EPS</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-lg bg-surfaceHighlight flex items-center justify-center mr-4">
                  <Globe className="w-5 h-5 text-warning" />
                </div>
                <div>
                  <p className="text-sm font-medium text-textMain">Threat Intel Feeds</p>
                  <p className="text-xs text-textMuted">Last sync 5m ago</p>
                </div>
              </div>
              <span className="text-sm font-medium text-accent">3/3 Synced</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
