import React, { useState, useEffect } from 'react';
import { Bell, Search, User, X, ShieldAlert } from 'lucide-react';

const TopBar = () => {
  const [notifications, setNotifications] = useState([]);
  const [hasUnread, setHasUnread] = useState(false);

  useEffect(() => {
    // Connect to WebSocket for real-time alerts
    const wsUrl = 'ws://localhost:8000/api/v1/ws/alerts';
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log('Connected to real-time alerts WebSocket');
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'new_alert') {
          const alert = data.alert;
          
          const newNotification = {
            id: alert.id || Date.now(),
            title: alert.title,
            endpoint: alert.endpoint_id,
            severity: alert.severity,
            time: new Date().toLocaleTimeString(),
          };

          setNotifications(prev => [newNotification, ...prev].slice(0, 5)); // Keep last 5
          setHasUnread(true);
        }
      } catch (err) {
        console.error('Error parsing websocket message:', err);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      ws.close();
    };
  }, []);

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <>
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
        <div className="flex items-center space-x-4 ml-6 relative">
          <button 
            className="relative p-2 text-textMuted hover:text-textMain hover:bg-surfaceHighlight rounded-xl transition-all duration-200"
            onClick={() => setHasUnread(false)}
          >
            <Bell className="w-5 h-5" />
            {hasUnread && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-danger border-2 border-surface rounded-full animate-pulse"></span>
            )}
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

      {/* Floating Notifications Area */}
      <div className="fixed top-20 right-6 z-50 flex flex-col space-y-3 pointer-events-none">
        {notifications.map((notif) => (
          <div 
            key={notif.id} 
            className="pointer-events-auto w-80 bg-surfaceHighlight border border-border shadow-2xl rounded-xl p-4 animate-fade-in relative flex items-start"
          >
            <ShieldAlert className={`w-5 h-5 mt-0.5 mr-3 flex-shrink-0 ${notif.severity === 'critical' ? 'text-danger' : notif.severity === 'high' ? 'text-warning' : 'text-primary'}`} />
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-textMain">{notif.title}</h4>
              <p className="text-xs text-textMuted mt-1">Endpoint: {notif.endpoint}</p>
              <p className="text-[10px] text-textMuted mt-2">{notif.time}</p>
            </div>
            <button 
              className="text-textMuted hover:text-textMain ml-2 transition-colors"
              onClick={() => removeNotification(notif.id)}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default TopBar;
