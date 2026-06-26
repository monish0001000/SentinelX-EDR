import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Monitor, ShieldAlert, Activity, GitCommit, SearchCode, Shield, Settings, ServerCrash } from 'lucide-react';

const commands = [
  { id: 'dashboard', name: 'Dashboard', icon: Activity, path: '/' },
  { id: 'endpoints', name: 'Endpoints', icon: Monitor, path: '/endpoints' },
  { id: 'alerts', name: 'Alerts', icon: ShieldAlert, path: '/alerts' },
  { id: 'investigations', name: 'Investigations', icon: SearchCode, path: '/investigations' },
  { id: 'cases', name: 'Cases', icon: GitCommit, path: '/cases' },
  { id: 'hunting', name: 'Threat Hunting', icon: Search, path: '/hunting' },
  { id: 'rules', name: 'Detection Rules', icon: Shield, path: '/rules' },
  { id: 'health', name: 'System Health', icon: ServerCrash, path: '/health' },
  { id: 'settings', name: 'Settings', icon: Settings, path: '/settings' },
];

const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const filteredCommands = commands.filter(cmd => 
    cmd.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        navigate(filteredCommands[selectedIndex].path);
        setIsOpen(false);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm"
          />

          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="w-full max-w-2xl bg-surface border border-border rounded-xl shadow-2xl overflow-hidden relative z-10"
          >
            <div className="flex items-center px-4 border-b border-border">
              <Search className="w-5 h-5 text-textMuted mr-3" />
              <input
                ref={inputRef}
                type="text"
                className="w-full bg-transparent py-4 text-textMain placeholder-textMuted focus:outline-none"
                placeholder="Type a command or search..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDown}
                aria-label="Command Palette Input"
              />
              <div className="flex items-center gap-1 text-xs text-textMuted bg-surfaceHighlight px-2 py-1 rounded">
                <kbd>ESC</kbd>
              </div>
            </div>

            <div className="max-h-96 overflow-y-auto p-2">
              {filteredCommands.length === 0 ? (
                <div className="p-4 text-center text-textMuted">No commands found.</div>
              ) : (
                filteredCommands.map((cmd, index) => {
                  const Icon = cmd.icon;
                  const isSelected = index === selectedIndex;
                  return (
                    <div
                      key={cmd.id}
                      onClick={() => {
                        navigate(cmd.path);
                        setIsOpen(false);
                      }}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`flex items-center px-4 py-3 rounded-lg cursor-pointer transition-colors ${
                        isSelected ? 'bg-primary/20 text-primary' : 'text-textMain hover:bg-surfaceHighlight'
                      }`}
                      role="option"
                      aria-selected={isSelected}
                    >
                      <Icon className={`w-5 h-5 mr-3 ${isSelected ? 'text-primary' : 'text-textMuted'}`} />
                      <span className="flex-1 font-medium">{cmd.name}</span>
                      {isSelected && (
                        <span className="text-xs text-primary hidden sm:block">Press Enter to jump</span>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
