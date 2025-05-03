import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Assignment, Event, Lecture, Task } from '../types';

interface NotificationSettings {
  globalEnabled: boolean;
  lectures: boolean;
  assignments: boolean;
  events: boolean;
  tasks: boolean;
}

interface NotificationContextType {
  settings: NotificationSettings;
  updateSettings: (settings: Partial<NotificationSettings>) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<NotificationSettings>(() => {
    const saved = localStorage.getItem('notificationSettings');
    return saved ? JSON.parse(saved) : {
      globalEnabled: true,
      lectures: true,
      assignments: true,
      events: true,
      tasks: true,
    };
  });

  const updateSettings = (newSettings: Partial<NotificationSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    localStorage.setItem('notificationSettings', JSON.stringify(updated));
  };

  return (
    <NotificationContext.Provider value={{ settings, updateSettings }}>
      {children}
    </NotificationContext.Provider>
  );
};