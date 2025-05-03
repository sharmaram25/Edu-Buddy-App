import React from 'react';
import { motion } from 'framer-motion';
import { Bell, BookOpen, CheckSquare, Calendar, ListTodo } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { useNotifications } from '../contexts/NotificationContext';

export const Notifications: React.FC = () => {
  const { settings, updateSettings } = useNotifications();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Notification Settings</h1>

      <div className="grid gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Bell className="text-primary-600" size={24} />
              <div>
                <h2 className="font-semibold text-lg">All Notifications</h2>
                <p className="text-neutral-600 text-sm">Enable or disable all notifications</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings.globalEnabled}
                onChange={(e) => updateSettings({ globalEnabled: e.target.checked })}
              />
              <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
              <div className="flex items-center gap-3">
                <BookOpen className="text-primary-600" size={20} />
                <div>
                  <h3 className="font-medium">Lectures</h3>
                  <p className="text-sm text-neutral-600">Reminders for upcoming lectures</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.lectures && settings.globalEnabled}
                  onChange={(e) => updateSettings({ lectures: e.target.checked })}
                  disabled={!settings.globalEnabled}
                />
                <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
              <div className="flex items-center gap-3">
                <CheckSquare className="text-primary-600" size={20} />
                <div>
                  <h3 className="font-medium">Assignments</h3>
                  <p className="text-sm text-neutral-600">Due date reminders</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.assignments && settings.globalEnabled}
                  onChange={(e) => updateSettings({ assignments: e.target.checked })}
                  disabled={!settings.globalEnabled}
                />
                <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Calendar className="text-primary-600" size={20} />
                <div>
                  <h3 className="font-medium">Events</h3>
                  <p className="text-sm text-neutral-600">Event reminders and updates</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.events && settings.globalEnabled}
                  onChange={(e) => updateSettings({ events: e.target.checked })}
                  disabled={!settings.globalEnabled}
                />
                <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
              <div className="flex items-center gap-3">
                <ListTodo className="text-primary-600" size={20} />
                <div>
                  <h3 className="font-medium">Tasks</h3>
                  <p className="text-sm text-neutral-600">Task due date reminders</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.tasks && settings.globalEnabled}
                  onChange={(e) => updateSettings({ tasks: e.target.checked })}
                  disabled={!settings.globalEnabled}
                />
                <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};