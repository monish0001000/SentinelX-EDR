import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

const cn = (...inputs) => twMerge(clsx(inputs));

const StatCard = ({ title, value, icon: Icon, trend, trendValue, colorClass }) => {
  return (
    <motion.div 
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="glass-panel-hover p-6 relative overflow-hidden group"
    >
      <div className={cn("absolute -right-6 -top-6 w-24 h-24 rounded-full blur-2xl opacity-20 transition-opacity group-hover:opacity-40", colorClass?.split(' ')[0])}></div>
      
      <div className="flex items-start justify-between relative z-10">
        <div>
          <p className="text-textMuted text-sm font-medium uppercase tracking-wider">{title}</p>
          <h3 className="text-4xl font-bold mt-2 text-textMain tracking-tight drop-shadow-sm">{value}</h3>
          
          {trend && (
            <div className="flex items-center mt-4">
              <span className={cn(
                "text-xs font-bold px-2.5 py-1 rounded-full shadow-sm backdrop-blur-sm",
                trend === 'up' ? "text-danger bg-danger/10 border border-danger/20" : 
                trend === 'down' ? "text-accent bg-accent/10 border border-accent/20" : "text-textMuted bg-surfaceHighlight border border-border"
              )}>
                {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {trendValue}
              </span>
              <span className="text-xs text-textMuted ml-2 font-medium">vs last 24h</span>
            </div>
          )}
        </div>
        
        <div className={cn("p-4 rounded-2xl shadow-lg backdrop-blur-md border border-white/5", colorClass || "bg-primary/10 text-primary")}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;
