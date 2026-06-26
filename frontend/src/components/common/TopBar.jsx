import React, { useState, useEffect, useRef } from 'react';
import { Bell, Search, User, ShieldAlert, Activity, Server, Info, Command } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

const TopBar = () => {
  const [notifications, setNotifications] = useState([]);
  const [hasUnread, setHasUnread] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const { user } = useAuth();

  useEffect(() => {
    // Close dropdown on click outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    // Connect to WebSocket for real-time notifications
    const wsUrl = 'ws://localhost:8000/api/v1/ws/notifications'; // Using a generic notifications WS
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log('Connected to real-time notifications WebSocket');
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        
        let newNotification = null;

        if (data.type === 'new_alert') {
          newNotification = {
            id: data.alert?.id || Date.now(),
            type: 'alert',
            title: data.alert?.title || 'New Security Alert',
            message: `Endpoint: ${data.alert?.endpoint_id || 'Unknown'}`,
            severity: data.alert?.severity || 'medium',
            time: new Date().toLocaleTimeString(),
            isRead: false
          };
          toast.error(newNotification.title, { id: newNotification.id });
        } else if (data.type === 'agent_status') {
          newNotification = {
            id: Date.now(),
            type: 'agent',
            title: 'Agent Status Change',
            message: `Endpoint ${data.endpoint_id} is now ${data.status}`,
            severity: data.status === 'offline' ? 'warning' : 'info',
            time: new Date().toLocaleTimeString(),
            isRead: false
          };
          if (data.status === 'offline') toast.error(newNotification.message);
          else toast.success(newNotification.message);
        } else if (data.type === 'system') {
          newNotification = {
            id: Date.now(),
            type: 'system',
            title: 'System Event',
            message: data.message || 'System update',
            severity: data.severity || 'info',
            time: new Date().toLocaleTimeString(),
            isRead: false
          };
          toast(newNotification.message, { icon: 'ℹ️' });
        }

        if (newNotification) {
          setNotifications(prev => [newNotification, ...prev].slice(0, 20)); // Keep last 20 in dropdown
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

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    setHasUnread(false);
  };

  const getIconForType = (type, severity) => {
    switch (type) {
      case 'alert':
        return <ShieldAlert className={`w-5 h-5 ${severity === 'critical' ? 'text-danger' : severity === 'high' ? 'text-warning' : 'text-primary'}`} />;
      case 'agent':
        return <Activity className={`w-5 h-5 ${severity === 'warning' ? 'text-warning' : 'text-accent'}`} />;
      case 'system':
        return <Server className={`w-5 h-5 ${severity === 'warning' ? 'text-warning' : 'text-primary'}`} />;
      default:
        return <Info className="w-5 h-5 text-textMuted" />;
    }
  };

  return (
    <header className="h-16 bg-surface/30 backdrop-blur-xl border-b border-border/50 flex items-center justify-between px-6 z-10 sticky top-0">
      {/* Search Hint */}
      <div className="flex-1 max-w-xl">
        <div 
          className="relative group cursor-pointer"
          onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }))}
        >
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-textMuted group-hover:text-primary transition-colors" />
          <div className="w-full bg-surfaceHighlight/30 border border-border/50 rounded-lg pl-10 pr-4 py-1.5 text-sm text-textMuted group-hover:bg-surfaceHighlight/50 transition-all duration-300 flex items-center justify-between shadow-inner">
            <span>Search alerts, endpoints, rules...</span>
            <div className="flex items-center space-x-1">
              <Command className="w-3 h-3" />
              <kbd className="font-mono text-[10px]">K</kbd>
            </div>
          </div>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center space-x-4 ml-6 relative">
        <div className="relative" ref={dropdownRef}>
          <button 
            className="relative p-2 text-textMuted hover:text-textMain hover:bg-surfaceHighlight/50 rounded-xl transition-all duration-200 focus-visible"
            aria-label="Notifications"
            onClick={() => {
              setShowDropdown(!showDropdown);
              if (!showDropdown) setHasUnread(false);
            }}
          >
            <Bell className="w-5 h-5" />
            {hasUnread && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-danger rounded-full shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-pulse"></span>
            )}
          </button>
          
          {/* Notifications Dropdown */}
          <AnimatePresence>
            {showDropdown && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-80 glass-panel z-50 overflow-hidden flex flex-col max-h-[400px] shadow-2xl origin-top-right"
              >
                <div className="p-3 border-b border-border/50 flex justify-between items-center bg-surfaceHighlight/30 backdrop-blur-md">
                  <h3 className="text-sm font-semibold text-textMain">Notifications</h3>
                  <button onClick={markAllRead} className="text-xs text-primary hover:text-primaryHover transition-colors">Mark all as read</button>
                </div>
                <div className="overflow-y-auto flex-1 custom-scrollbar">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-sm text-textMuted">No notifications</div>
                  ) : (
                    notifications.map(notif => (
                      <div key={notif.id} className={`p-3 border-b border-border/30 hover:bg-surfaceHighlight/30 transition-colors flex items-start ${!notif.isRead ? 'bg-primary/5' : ''}`}>
                        <div className="mr-3 mt-0.5">
                          {getIconForType(notif.type, notif.severity)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-textMain">{notif.title}</p>
                          <p className="text-xs text-textMuted mt-0.5">{notif.message}</p>
                          <p className="text-[10px] text-textMuted mt-1 opacity-70">{notif.time}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <div className="h-6 w-px bg-border/50"></div>
        
        <button className="flex items-center space-x-3 p-1.5 hover:bg-surfaceHighlight/50 rounded-xl transition-all duration-200 focus-visible group">
          <div className="text-right hidden md:block">
            <p className="text-sm font-semibold text-textMain group-hover:text-primary transition-colors">{user?.username || 'User'}</p>
            <p className="text-xs text-textMuted">{user?.role || 'Guest'}</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-surfaceHighlight to-border flex items-center justify-center border border-border/50 shadow-inner group-hover:border-primary/50 transition-colors">
            <User className="w-4 h-4 text-textMain" />
          </div>
        </button>
      </div>
    </header>
  );
};

export default TopBar;
