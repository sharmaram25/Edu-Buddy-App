import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Header } from './Header';
import { MobileNavbar } from './MobileNavbar';
import { Sidebar } from './Sidebar';

export const Layout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  
  const getPageTitle = () => {
    const path = location.pathname;
    
    if (path === '/' || path === '/dashboard') return 'Dashboard';
    if (path.includes('lectures')) return 'Lectures';
    if (path.includes('assignments')) return 'Assignments';
    if (path.includes('events')) return 'Events';
    if (path.includes('tasks')) return 'Tasks';
    if (path.includes('expenses')) return 'Expenses';
    
    return 'Edu-Buddy';
  };
  
  return (
    <div className="flex min-h-screen bg-neutral-50">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col min-h-screen">
        <Header title={getPageTitle()} onOpenMenu={() => setIsSidebarOpen(true)} />
        
        <main className="flex-1 px-4 pb-20 pt-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="max-w-4xl mx-auto w-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
        
        <MobileNavbar />
      </div>
    </div>
  );
};