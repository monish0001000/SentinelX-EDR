import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from '../components/common/Sidebar';
import TopBar from '../components/common/TopBar';
import CyberGrid from '../components/common/CyberGrid';
import CommandPalette from '../components/common/CommandPalette';
import Footer from '../components/common/Footer';

const DashboardLayout = () => {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-transparent overflow-hidden text-textMain selection:bg-primary/30 relative">
      <CyberGrid />
      <CommandPalette />
      
      {/* Sidebar Navigation */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10">
        <TopBar />
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 pb-2">
          <div className="max-w-7xl mx-auto w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
        
        {/* Enterprise Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
