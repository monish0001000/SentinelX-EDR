import React, { useState, useEffect } from 'react';
import { ShieldCheck, Activity } from 'lucide-react';

const Footer = () => {
  const [buildTime] = useState(() => new Date().toISOString().split('T')[0]);
  
  return (
    <footer className="h-8 border-t border-border/50 bg-surface/30 backdrop-blur-md flex items-center justify-between px-4 text-[10px] text-textMuted font-mono z-20 relative">
      <div className="flex items-center space-x-4">
        <span className="font-semibold text-textMain tracking-wider">SENTINELX EDR</span>
        <span>v14.0.0-enterprise</span>
        <span className="hidden sm:inline">Build: {buildTime}</span>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="flex items-center gap-1.5" title="Backend Status">
          <Activity className="w-3 h-3 text-primary" />
          <span>API Connected</span>
        </div>
        <div className="flex items-center gap-1.5" title="System Security">
          <ShieldCheck className="w-3 h-3 text-accent" />
          <span>Secure</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
