import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
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
  Radar
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs) => twMerge(clsx(inputs));

const navItems = [
  { path: '/', label: 'Overview', icon: Activity },
  { path: '/alerts', label: 'Alerts', icon: ShieldAlert },
  { path: '/endpoints', label: 'Endpoints', icon: Server },
  { path: '/investigations', label: 'Investigations', icon: Search },
  { path: '/cases', label: 'Cases', icon: FileText },
  { path: '/hunting', label: 'Threat Hunting', icon: Crosshair },
  { path: '/simulation', label: 'Simulation', icon: Radar },
  { path: '/settings', label: 'Settings', icon: Settings },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  const location = useLocation();

  return (
    <aside className={cn(
      "h-full bg-surface border-r border-border flex flex-col transition-all duration-300 relative z-20",
      isOpen ? "w-64" : "w-20"
    )}>
      {/* Logo Area */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-border bg-surfaceHighlight/30">
        <div className={cn("flex items-center overflow-hidden transition-all duration-300", isOpen ? "w-full opacity-100" : "w-0 opacity-0")}>
          <ShieldAlert className="w-8 h-8 text-primary mr-3" />
          <span className="font-bold text-xl tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">SentinelX</span>
        </div>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg hover:bg-border text-textMuted hover:text-textMain transition-colors flex-shrink-0"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || 
                          (item.path !== '/' && location.pathname.startsWith(item.path));
          
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                "flex items-center px-3 py-3 rounded-xl transition-all duration-200 group relative",
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-textMuted hover:bg-surfaceHighlight hover:text-textMain"
              )}
            >
              <item.icon className={cn(
                "w-6 h-6 flex-shrink-0 transition-transform duration-200",
                isActive ? "text-primary scale-110" : "group-hover:scale-110"
              )} />
              
              <span className={cn(
                "ml-3 font-medium whitespace-nowrap transition-all duration-300",
                isOpen ? "opacity-100 w-auto" : "opacity-0 w-0 hidden"
              )}>
                {item.label}
              </span>
              
              {isActive && isOpen && (
                <div className="absolute right-2 w-1.5 h-1.5 rounded-full bg-primary animate-pulse-slow"></div>
              )}
            </NavLink>
          );
        })}
      </nav>
      
      {/* Bottom Profile/Status */}
      <div className="p-4 border-t border-border bg-surfaceHighlight/20">
        <div className={cn("flex items-center", !isOpen && "justify-center")}>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20">
            <span className="font-bold text-white">SA</span>
          </div>
          <div className={cn("ml-3 overflow-hidden transition-all duration-300", isOpen ? "w-auto opacity-100" : "w-0 opacity-0")}>
            <p className="text-sm font-medium text-textMain whitespace-nowrap">SOC Analyst</p>
            <p className="text-xs text-accent flex items-center whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-accent mr-1 animate-pulse"></span>
              System Online
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
