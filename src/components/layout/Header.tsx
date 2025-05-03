import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Menu, Search, Settings } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title: string;
  onOpenMenu?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title, onOpenMenu }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <motion.header
      className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-neutral-200 px-4 py-3"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={onOpenMenu}
            className="rounded-full p-2 text-neutral-500 hover:bg-neutral-100"
          >
            <Menu size={20} />
          </button>
          <h1 className="text-xl font-bold text-neutral-900 truncate">{title}</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            className="rounded-full p-2 text-neutral-500 hover:bg-neutral-100"
            onClick={() => navigate('/search')}
          >
            <Search size={20} />
          </button>
          
          <button 
            className="relative rounded-full p-2 text-neutral-500 hover:bg-neutral-100"
            onClick={() => navigate('/notifications')}
          >
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary-600 rounded-full"></span>
          </button>
          
          <button 
            className="rounded-full p-2 text-neutral-500 hover:bg-neutral-100"
            onClick={() => navigate('/settings')}
          >
            <Settings size={20} />
          </button>
          
          {user && (
            <motion.div 
              className="ml-2 h-8 w-8 rounded-full bg-neutral-200 overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {user.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-primary-600 text-white text-sm font-medium">
                  {user.name.substring(0, 1)}
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </motion.header>
  );
};