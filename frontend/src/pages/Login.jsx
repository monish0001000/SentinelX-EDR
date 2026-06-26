import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ShieldAlert, KeyRound, User, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import CyberGrid from '../components/common/CyberGrid';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      setError('');
      await login(username, password);
      navigate(from, { replace: true });
    } catch (err) {
      if (err.response?.status === 403 || err.response?.status === 423) {
        setError('Account locked due to too many failed attempts. Please try again later.');
      } else if (err.response?.data?.detail) {
        setError(err.response.data.detail);
      } else {
        setError('Invalid username or password. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden text-textMain selection:bg-primary/30">
      <CyberGrid />
      
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="max-w-md w-full space-y-8 glass-panel p-10 rounded-2xl relative z-10 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
      >
        <div>
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
            className="mx-auto h-16 w-16 text-primary flex justify-center items-center relative"
          >
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse-slow"></div>
            <ShieldAlert className="h-12 w-12 relative z-10" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-center text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-textMain to-textMuted"
          >
            SentinelX EDR
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-2 text-center text-sm font-medium text-textMuted uppercase tracking-widest"
          >
            Enterprise Console Access
          </motion.p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="sr-only" htmlFor="username">Username</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-textMuted group-focus-within:text-primary transition-colors" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="input-field w-full pl-10"
                  placeholder="Admin Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label className="sr-only" htmlFor="password">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <KeyRound className="h-5 w-5 text-textMuted group-focus-within:text-primary transition-colors" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="input-field w-full pl-10"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </motion.div>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-danger text-sm text-center bg-danger/10 py-2 px-3 rounded-lg border border-danger/20 font-medium"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center items-center py-3 px-4 btn-primary"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
              ) : null}
              {isLoading ? 'Authenticating...' : 'Secure Login'}
            </button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}
