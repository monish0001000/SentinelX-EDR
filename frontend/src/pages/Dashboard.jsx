import React, { useState, useEffect } from 'react';
import {
  ShieldAlert, 
  Server, 
  Activity, 
  Crosshair,
  TrendingUp,
  Database,
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import StatCard from '../components/common/StatCard';
import ActivityFeed from '../components/dashboard/ActivityFeed';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { getMetrics, getMttd, getAlerts } from '../services/api';

const Dashboard = () => {
  const [metrics, setMetrics] = useState({
    total_alerts: 0,
    mttd_seconds: 0,
    mitre_coverage_pct: 0,
    alerts_trend: [],
    alerts_by_severity: {},
    endpoint_coverage: { total: 0, online: 0 }
  });
  const [mttd, setMttd] = useState({ mttd_formatted: '0m 0s' });
  const [recentAlerts, setRecentAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [metricsRes, mttdRes, alertsRes] = await Promise.all([
          getMetrics(),
          getMttd(),
          getAlerts()
        ]);
        
        setMetrics(metricsRes.data);
        setMttd(mttdRes.data);
        
        // Sort alerts by created_at or id descending and take top 5
        const sortedAlerts = alertsRes.data.sort((a, b) => b.id - a.id).slice(0, 5);
        setRecentAlerts(sortedAlerts);
        
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
    // In a real app, you might want to set up an interval to refresh data
    const interval = setInterval(fetchDashboardData, 30000); // 30s
    return () => clearInterval(interval);
  }, []);

  const mitreData = [
    { name: 'Execution', value: 85 },
    { name: 'Persistence', value: 62 },
    { name: 'Privilege Escalation', value: 45 },
    { name: 'Defense Evasion', value: 92 },
    { name: 'Credential Access', value: 54 },
    { name: 'Lateral Movement', value: 38 },
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="mt-4 text-textMuted font-mono animate-pulse">Initializing SentinelX Core...</p>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      className="space-y-6 pb-12"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-textMain to-textMuted">SOC Dashboard</h1>
          <p className="text-textMuted mt-2 font-medium">Global Threat Telemetry & Analysis</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-sm font-bold bg-surface/50 backdrop-blur-md px-4 py-2 rounded-xl border border-border/50 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-accent mr-3 shadow-[0_0_10px_#10B981] animate-pulse"></span>
            <span className="text-textMain">Core Systems Online</span>
          </div>
          <button className="btn-primary flex items-center shadow-primary/20">
            <Database className="w-4 h-4 mr-2" />
            Generate Report
          </button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Active Threats" 
          value={metrics.total_alerts?.toString() || "0"} 
          icon={ShieldAlert} 
          trend="up" 
          trendValue="+12%"
          colorClass="bg-danger/10 text-danger"
        />
        <StatCard 
          title="Monitored Agents" 
          value={metrics.endpoint_coverage?.total?.toString() || "0"} 
          icon={Server} 
          trend="up" 
          trendValue="+24"
          colorClass="bg-primary/10 text-primary"
        />
        <StatCard 
          title="Events Processed" 
          value="1.2M" 
          icon={Activity} 
          trend="up" 
          trendValue="+150k"
          colorClass="bg-secondary/10 text-secondary"
        />
        <StatCard 
          title="MTTD Average" 
          value={mttd.mttd_formatted} 
          icon={TrendingUp} 
          trend="down" 
          trendValue="-30s"
          colorClass="bg-accent/10 text-accent"
        />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <motion.div variants={itemVariants} className="glass-panel-hover p-6 lg:col-span-2 relative overflow-hidden group">
          <div className="absolute -left-32 -top-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-500"></div>
          
          <div className="flex items-center justify-between mb-8 relative z-10">
            <h3 className="text-xl font-bold text-textMain tracking-tight">Threat Velocity (24h)</h3>
            <select className="bg-surface/50 backdrop-blur-md border border-border/50 rounded-xl px-4 py-2 text-sm text-textMain font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-inner">
              <option>Last 24 Hours</option>
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          
          <div className="h-[320px] w-full relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={metrics.alerts_trend.length > 0 ? metrics.alerts_trend : [{time: 'Now', critical:0, high:0, medium:0}]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCritical" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-danger)" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="var(--color-danger)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorHigh" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-warning)" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="var(--color-warning)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorMedium" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="4 4" stroke="var(--color-border)" opacity={0.4} vertical={false} />
                <XAxis dataKey="date" stroke="var(--color-text-muted)" tick={{fontSize: 12, fontWeight: 500}} axisLine={false} tickLine={false} dy={10} />
                <YAxis stroke="var(--color-text-muted)" tick={{fontSize: 12, fontWeight: 500}} axisLine={false} tickLine={false} dx={-10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)', borderRadius: '0.75rem', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)', padding: '12px' }}
                  itemStyle={{ color: 'var(--color-text-main)', fontWeight: 600, padding: '2px 0' }}
                  labelStyle={{ color: 'var(--color-text-muted)', marginBottom: '8px' }}
                />
                <Area type="monotone" dataKey="critical" stroke="var(--color-danger)" strokeWidth={3} fillOpacity={1} fill="url(#colorCritical)" />
                <Area type="monotone" dataKey="high" stroke="var(--color-warning)" strokeWidth={3} fillOpacity={1} fill="url(#colorHigh)" />
                <Area type="monotone" dataKey="medium" stroke="var(--color-primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorMedium)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* MITRE ATT&CK Coverage */}
        <motion.div variants={itemVariants} className="glass-panel-hover p-6 flex flex-col relative overflow-hidden group">
          <div className="absolute -right-20 -bottom-20 w-48 h-48 bg-secondary/10 rounded-full blur-3xl group-hover:bg-secondary/20 transition-colors duration-500"></div>
          
          <div className="flex items-center justify-between mb-8 relative z-10">
            <h3 className="text-xl font-bold text-textMain tracking-tight">MITRE ATT&CK</h3>
            <button className="flex items-center text-secondary hover:text-white transition-colors text-sm font-semibold group/btn">
              Matrix <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
          
          <div className="flex-1 w-full relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mitreData} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" opacity={0.3} horizontal={true} vertical={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={115} stroke="var(--color-text-main)" tick={{fontSize: 12, fontWeight: 500}} axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{fill: 'var(--color-surface-highlight)'}}
                  contentStyle={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)', borderRadius: '0.75rem', padding: '8px 12px' }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                  {mitreData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.value > 80 ? 'var(--color-danger)' : entry.value > 60 ? 'var(--color-warning)' : 'var(--color-secondary)'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Alerts List */}
        <motion.div variants={itemVariants} className="glass-panel p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-textMain tracking-tight">Active Investigations</h3>
            <button className="flex items-center text-primary hover:text-white transition-colors text-sm font-semibold group/btn">
              View All <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="space-y-3">
            {recentAlerts.length > 0 ? recentAlerts.map((alert) => (
              <motion.div 
                key={alert.id} 
                whileHover={{ scale: 1.01, x: 5 }}
                className="flex items-start p-4 bg-surfaceHighlight/30 backdrop-blur-sm rounded-xl hover:bg-surfaceHighlight/50 transition-colors border border-border/40 group/alert cursor-pointer"
              >
                <div className={`w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 shadow-sm ${
                  alert.severity === 'critical' ? 'bg-danger shadow-[0_0_8px_rgba(239,68,68,0.8)]' : 
                  alert.severity === 'high' ? 'bg-warning shadow-[0_0_8px_rgba(245,158,11,0.8)]' : 
                  alert.severity === 'medium' ? 'bg-primary shadow-[0_0_8px_rgba(59,130,246,0.8)]' : 'bg-accent'
                }`}></div>
                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-textMain">{alert.title}</p>
                    <span className="text-xs font-mono text-textMuted bg-surface/50 px-2 py-1 rounded-md border border-border/50">
                      {new Date(alert.detected_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                  </div>
                  <div className="flex items-center mt-2 space-x-2">
                    <span className="text-xs text-textMuted bg-surface px-2 py-0.5 rounded border border-border/50">{alert.endpoint_id}</span>
                    <span className="text-xs text-textMuted bg-surface px-2 py-0.5 rounded border border-border/50">{alert.mitre_tactic || alert.rule_type}</span>
                  </div>
                </div>
                <div className="ml-4 opacity-0 group-hover/alert:opacity-100 transition-opacity self-center">
                  <button className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors">
                    <Crosshair className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )) : (
              <div className="text-center py-12 text-textMuted text-sm font-medium border border-dashed border-border/50 rounded-xl bg-surfaceHighlight/10">
                No active threats detected. System secure.
              </div>
            )}
          </div>
        </motion.div>

        {/* Live Activity Feed */}
        <motion.div variants={itemVariants} className="glass-panel flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50"></div>
          
          <div className="p-6 pb-2">
            <h3 className="text-xl font-bold text-textMain tracking-tight">Live Activity Stream</h3>
          </div>
          <div className="flex-1 overflow-hidden">
            <ActivityFeed />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
