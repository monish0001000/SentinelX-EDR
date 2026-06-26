import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShieldAlert, 
  Activity, 
  Search, 
  Server, 
  FileText, 
  Crosshair, 
  Settings,
  Menu,
  X,
  Radar,
  List,
  ActivityIcon,
  LogOut,
  Command
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useAuth } from '../../contexts/AuthContext';
import { PERMISSIONS, hasPermission } from '../../utils/permissions';

const cn = (...inputs) => twMerge(clsx(inputs));

const navItems = [
  { path: '/', label: 'Overview', icon: Activity, permission: PERMISSIONS.VIEW_DASHBOARD },
  { path: '/alerts', label: 'Alerts', icon: ShieldAlert, permission: PERMISSIONS.VIEW_ALERTS },
  { path: '/endpoints', label: 'Endpoints', icon: Server, permission: PERMISSIONS.VIEW_ENDPOINTS },
  { path: '/investigations', label: 'Investigations', icon: Search, permission: PERMISSIONS.VIEW_INVESTIGATIONS },
  { path: '/cases', label: 'Cases', icon: FileText, permission: PERMISSIONS.VIEW_CASES },
  { path: '/hunting', label: 'Threat Hunting', icon: Crosshair, permission: PERMISSIONS.VIEW_HUNTING },
  { path: '/rules', label: 'Detection Rules', icon: ShieldAlert, permission: PERMISSIONS.VIEW_RULES },
  { path: '/simulation', label: 'Validation Lab', icon: Radar, permission: PERMISSIONS.VIEW_SIMULATIONS },
  { path: '/settings', label: 'Settings', icon: Settings, permission: PERMISSIONS.VIEW_SETTINGS },
  { path: '/audit', label: 'Audit Logs', icon: List, permission: PERMISSIONS.VIEW_AUDIT },
  { path: '/health', label: 'Health Dashboard', icon: ActivityIcon, permission: PERMISSIONS.VIEW_HEALTH },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const filteredNavItems = navItems.filter(item => user && hasPermission(user.role, item.permission));

  return (
    <aside className={cn(
      "h-full bg-surface/40 backdrop-blur-xl border-r border-border/50 flex flex-col transition-all duration-300 relative z-20 shadow-2xl",
      isOpen ? "w-64" : "w-20"
    )}>
      {/* Logo Area */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-border/50 bg-surfaceHighlight/20">
        <div className={cn("flex items-center overflow-hidden transition-all duration-300", isOpen ? "w-full opacity-100" : "w-0 opacity-0")}>
          <div className="relative w-8 h-8 mr-3 flex items-center justify-center">
            <div className="absolute inset-0 bg-primary/20 blur-md rounded-full animate-pulse-slow"></div>
            <ShieldAlert className="w-6 h-6 text-primary relative z-10" />
          </div>
          <span className="font-bold text-xl tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">SentinelX</span>
        </div>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg hover:bg-surfaceHighlight text-textMuted hover:text-textMain transition-colors flex-shrink-0 focus-visible"
          aria-label="Toggle Sidebar"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1" aria-label="Main Navigation">
        {filteredNavItems.map((item) => {
          const isActive = location.pathname === item.path || 
                          (item.path !== '/' && location.pathname.startsWith(item.path));
          
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                "flex items-center px-3 py-3 rounded-xl transition-all duration-200 group relative focus-visible",
                isActive 
                  ? "text-primary" 
                  : "text-textMuted hover:text-textMain"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-xl"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              
              <item.icon className={cn(
                "w-5 h-5 flex-shrink-0 transition-transform duration-200 relative z-10",
                isActive ? "scale-110" : "group-hover:scale-110"
              )} />
              
              <span className={cn(
                "ml-3 font-medium whitespace-nowrap transition-all duration-300 relative z-10",
                isOpen ? "opacity-100 w-auto" : "opacity-0 w-0 hidden"
              )}>
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </nav>
      
      {/* Search / Command Hint */}
      {isOpen && (
        <div className="px-4 py-3 mb-2">
          <div className="flex items-center justify-between bg-surfaceHighlight/30 border border-border/50 rounded-lg px-3 py-2 text-xs text-textMuted cursor-pointer hover:bg-surfaceHighlight/50 transition-colors">
            <span className="flex items-center"><Command className="w-3 h-3 mr-1" /> Search</span>
            <kbd className="bg-surfaceHighlight rounded px-1.5 py-0.5 border border-border">Ctrl+K</kbd>
          </div>
        </div>
      )}

      {/* Bottom Profile/Status */}
      <div className="p-4 border-t border-border/50 bg-surfaceHighlight/10 backdrop-blur-md">
        <div className={cn("flex items-center justify-between", !isOpen && "justify-center")}>
          <div className="flex items-center overflow-hidden">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 shadow-[0_0_10px_rgba(var(--color-primary-rgb),0.3)]">
              <span className="font-bold text-white shadow-sm">{user?.username?.charAt(0).toUpperCase()}</span>
            </div>
            <div className={cn("ml-3 overflow-hidden transition-all duration-300", isOpen ? "w-auto opacity-100" : "w-0 opacity-0")}>
              <p className="text-sm font-semibold text-textMain whitespace-nowrap">{user?.username}</p>
              <p className="text-xs text-accent flex items-center whitespace-nowrap font-medium">
                {user?.role}
              </p>
            </div>
          </div>
          {isOpen && (
            <button 
              onClick={handleLogout} 
              className="p-2 text-textMuted hover:text-danger hover:bg-danger/10 rounded-lg transition-colors focus-visible"
              aria-label="Log Out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
