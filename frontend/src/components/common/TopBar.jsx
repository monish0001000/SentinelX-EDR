import React from 'react';
import { Bell, Search, User } from 'lucide-react';

const TopBar = () => {
  return (
    <header className="h-16 bg-surface/90 backdrop-blur-md border-b border-border flex items-center justify-between px-6 z-10 sticky top-0 shadow-sm">
      {/* Search */}
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-textMuted group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search endpoints, alerts, IPs, hashes (Ctrl+K)..." 
            className="w-full bg-background/50 border border-border rounded-xl pl-10 pr-4 py-2 text-sm text-textMain focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 placeholder:text-textMuted/70 shadow-inner"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden md:flex items-center space-x-1">
            <kbd className="px-2 py-0.5 text-xs font-mono bg-surface rounded border border-border text-textMuted">Ctrl</kbd>
            <kbd className="px-2 py-0.5 text-xs font-mono bg-surface rounded border border-border text-textMuted">K</kbd>
          </div>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center space-x-4 ml-6">
        <button className="relative p-2 text-textMuted hover:text-textMain hover:bg-surfaceHighlight rounded-xl transition-all duration-200">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-danger border-2 border-surface rounded-full animate-pulse"></span>
        </button>
        
        <div className="h-8 w-px bg-border"></div>
        
        <button className="flex items-center space-x-2 p-1.5 hover:bg-surfaceHighlight rounded-xl transition-all duration-200">
          <div className="text-right hidden md:block">
            <p className="text-sm font-medium text-textMain">Admin</p>
            <p className="text-xs text-textMuted">Global View</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-surfaceHighlight flex items-center justify-center border border-border">
            <User className="w-4 h-4 text-textMuted" />
          </div>
        </button>
      </div>
    </header>
  );
};

export default TopBar;
