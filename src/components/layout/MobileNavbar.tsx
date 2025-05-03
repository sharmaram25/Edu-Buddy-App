import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Book, Calendar, CheckSquare, DollarSign, LayoutDashboard, ListTodo } from 'lucide-react';
import { TabType } from '../../types';

const tabConfig = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
  { id: 'lectures', label: 'Lectures', icon: <Book size={20} /> },
  { id: 'assignments', label: 'Assign', icon: <CheckSquare size={20} /> },
  { id: 'events', label: 'Events', icon: <Calendar size={20} /> },
  { id: 'tasks', label: 'Tasks', icon: <ListTodo size={20} /> },
  { id: 'expenses', label: 'Expenses', icon: <DollarSign size={20} /> },
];

export const MobileNavbar: React.FC = () => {
  return (
    <motion.nav
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 py-2 px-1 z-10"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className="flex justify-around items-center">
        {tabConfig.map((tab) => (
          <NavLink
            key={tab.id}
            to={`/${tab.id === 'dashboard' ? '' : tab.id}`}
            className={({ isActive }) => 
              `flex flex-col items-center justify-center px-2 py-1 text-xs transition-colors rounded-md ${
                isActive 
                  ? 'text-primary-600 font-medium' 
                  : 'text-neutral-500 hover:text-neutral-800'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className="relative mb-1">
                  {tab.icon}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-full bg-primary-600"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </div>
                <span>{tab.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </motion.nav>
  );
};