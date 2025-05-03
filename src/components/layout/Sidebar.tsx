import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Book, Calendar, CheckSquare, DollarSign, LayoutDashboard, ListTodo, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  
  // Close sidebar when clicking outside
  useEffect(() => {
    if (!isOpen) return;
    
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-sidebar]')) return;
      onClose();
    };
    
    document.addEventListener('mousedown', handleOutsideClick);
    
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onClose]);
  
  const sidebarVariants = {
    open: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    closed: { x: '-100%', transition: { type: 'spring', stiffness: 300, damping: 30 } },
  };
  
  const backdropVariants = {
    open: { opacity: 1, transition: { duration: 0.2 } },
    closed: { opacity: 0, transition: { duration: 0.2 } },
  };
  
  const navItems = [
    { path: '/', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/lectures', label: 'Lectures', icon: <Book size={20} /> },
    { path: '/assignments', label: 'Assignments', icon: <CheckSquare size={20} /> },
    { path: '/events', label: 'Events', icon: <Calendar size={20} /> },
    { path: '/tasks', label: 'Tasks', icon: <ListTodo size={20} /> },
    { path: '/expenses', label: 'Expenses', icon: <DollarSign size={20} /> },
  ];
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/30 z-40"
            initial="closed"
            animate="open"
            exit="closed"
            variants={backdropVariants}
            onClick={onClose}
          />
          
          <motion.div
            className="fixed top-0 left-0 bottom-0 w-72 bg-white z-50 shadow-xl flex flex-col"
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            data-sidebar
          >
            <div className="px-5 py-4 border-b border-neutral-200 flex items-center justify-between">
              <div className="font-bold text-xl text-primary-600">Edu-Buddy</div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-neutral-100 text-neutral-500"
              >
                <X size={20} />
              </button>
            </div>
            
            {user && (
              <div className="p-5 border-b border-neutral-200">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full overflow-hidden bg-neutral-200">
                    {user.avatar ? (
                      <img 
                        src={user.avatar}
                        alt={user.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-primary-600 text-white font-medium">
                        {user.name.substring(0, 1)}
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium">{user.name}</h3>
                    <p className="text-sm text-neutral-500">{user.email}</p>
                  </div>
                </div>
              </div>
            )}
            
            <nav className="flex-1 py-4">
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-5 py-3 transition-colors ${
                          isActive
                            ? 'bg-primary-50 text-primary-700 font-medium'
                            : 'text-neutral-700 hover:bg-neutral-100'
                        }`
                      }
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
            
            <div className="p-5 border-t border-neutral-200">
              <button
                onClick={logout}
                className="flex items-center gap-3 w-full px-4 py-2 rounded-md text-neutral-700 hover:bg-neutral-100 transition-colors"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};