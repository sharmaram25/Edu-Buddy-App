import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Moon, 
  Sun, 
  Eye, 
  PaintBucket, 
  Layout, 
  Monitor, 
  Smartphone, 
  Tablet,
  Volume2,
  VolumeX,
  Minimize2,
  Maximize2,
  Zap,
  Clock,
  BellRing,
  BellOff,
  Languages,
  Keyboard
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useNotifications } from '../contexts/NotificationContext';

export const Settings: React.FC = () => {
  const { user } = useAuth();
  const { 
    theme, 
    fontSize, 
    colorScheme, 
    compactMode, 
    reducedMotion,
    updateTheme, 
    updateFontSize, 
    updateColorScheme,
    toggleCompactMode,
    toggleReducedMotion
  } = useTheme();
  const { settings: notificationSettings, updateSettings: updateNotificationSettings } = useNotifications();
  
  const [language, setLanguage] = useState('english');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [devicePreference, setDevicePreference] = useState('system');

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Settings</h1>
        <Button variant="outline" size="sm">Reset to Defaults</Button>
      </div>

      <div className="grid gap-6">
        {/* Account Settings */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Account</h2>
          <Card className="p-6 space-y-6">
            <div className="flex items-start gap-4">
              <div className="h-20 w-20 rounded-full bg-neutral-200 overflow-hidden flex-shrink-0">
                {user?.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-primary-600 text-white text-2xl font-medium">
                    {user?.name.substring(0, 1)}
                  </div>
                )}
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <Input
                    label="Display Name"
                    value={user?.name}
                    onChange={() => {}}
                  />
                </div>
                <div>
                  <Input
                    label="Email"
                    type="email"
                    value={user?.email}
                    onChange={() => {}}
                  />
                </div>
                <div>
                  <Input
                    label="Unique ID"
                    value={user?.uniqueId}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Appearance Settings */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Appearance</h2>
          <Card className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Theme</label>
              <div className="flex gap-2">
                <Button
                  variant={theme === 'light' ? 'primary' : 'outline'}
                  onClick={() => updateTheme('light')}
                  icon={<Sun size={18} />}
                >
                  Light
                </Button>
                <Button
                  variant={theme === 'dark' ? 'primary' : 'outline'}
                  onClick={() => updateTheme('dark')}
                  icon={<Moon size={18} />}
                >
                  Dark
                </Button>
                <Button
                  variant={theme === 'system' ? 'primary' : 'outline'}
                  onClick={() => updateTheme('system')}
                  icon={<Monitor size={18} />}
                >
                  System
                </Button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Font Size</label>
              <div className="flex gap-2">
                {['small', 'medium', 'large'].map((size) => (
                  <Button
                    key={size}
                    variant={fontSize === size ? 'primary' : 'outline'}
                    onClick={() => updateFontSize(size)}
                    icon={<Eye size={18} />}
                  >
                    {size.charAt(0).toUpperCase() + size.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Color Scheme</label>
              <div className="flex gap-2 flex-wrap">
                {['teal', 'blue', 'purple', 'pink', 'orange', 'green'].map((scheme) => (
                  <Button
                    key={scheme}
                    variant={colorScheme === scheme ? 'primary' : 'outline'}
                    onClick={() => updateColorScheme(scheme)}
                    icon={<PaintBucket size={18} />}
                  >
                    {scheme.charAt(0).toUpperCase() + scheme.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Layout Density</label>
              <div className="flex gap-2">
                <Button
                  variant={compactMode ? 'outline' : 'primary'}
                  onClick={toggleCompactMode}
                  icon={<Maximize2 size={18} />}
                >
                  Comfortable
                </Button>
                <Button
                  variant={compactMode ? 'primary' : 'outline'}
                  onClick={toggleCompactMode}
                  icon={<Minimize2 size={18} />}
                >
                  Compact
                </Button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Motion</label>
              <div className="flex gap-2">
                <Button
                  variant={reducedMotion ? 'outline' : 'primary'}
                  onClick={toggleReducedMotion}
                  icon={<Zap size={18} />}
                >
                  Full
                </Button>
                <Button
                  variant={reducedMotion ? 'primary' : 'outline'}
                  onClick={toggleReducedMotion}
                  icon={<Clock size={18} />}
                >
                  Reduced
                </Button>
              </div>
            </div>
          </Card>
        </section>

        {/* Notifications */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Notifications</h2>
          <Card className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {notificationSettings.globalEnabled ? (
                  <BellRing className="text-primary-600" size={24} />
                ) : (
                  <BellOff className="text-neutral-400" size={24} />
                )}
                <div>
                  <h3 className="font-medium">Push Notifications</h3>
                  <p className="text-sm text-neutral-600">Receive notifications about important updates</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={notificationSettings.globalEnabled}
                  onChange={(e) => updateNotificationSettings({ globalEnabled: e.target.checked })}
                />
                <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {soundEnabled ? (
                  <Volume2 className="text-primary-600" size={24} />
                ) : (
                  <VolumeX className="text-neutral-400" size={24} />
                )}
                <div>
                  <h3 className="font-medium">Sound Effects</h3>
                  <p className="text-sm text-neutral-600">Play sounds for notifications and actions</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={soundEnabled}
                  onChange={(e) => setSoundEnabled(e.target.checked)}
                />
                <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </Card>
        </section>

        {/* Preferences */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Preferences</h2>
          <Card className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Language</label>
              <div className="flex gap-2">
                {['english', 'spanish', 'french', 'german'].map((lang) => (
                  <Button
                    key={lang}
                    variant={language === lang ? 'primary' : 'outline'}
                    onClick={() => setLanguage(lang)}
                    icon={<Languages size={18} />}
                  >
                    {lang.charAt(0).toUpperCase() + lang.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Device Preference</label>
              <div className="flex gap-2">
                <Button
                  variant={devicePreference === 'system' ? 'primary' : 'outline'}
                  onClick={() => setDevicePreference('system')}
                  icon={<Monitor size={18} />}
                >
                  System
                </Button>
                <Button
                  variant={devicePreference === 'mobile' ? 'primary' : 'outline'}
                  onClick={() => setDevicePreference('mobile')}
                  icon={<Smartphone size={18} />}
                >
                  Mobile
                </Button>
                <Button
                  variant={devicePreference === 'tablet' ? 'primary' : 'outline'}
                  onClick={() => setDevicePreference('tablet')}
                  icon={<Tablet size={18} />}
                >
                  Tablet
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Keyboard className="text-primary-600" size={24} />
                <div>
                  <h3 className="font-medium">Auto-save</h3>
                  <p className="text-sm text-neutral-600">Automatically save changes as you type</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={autoSave}
                  onChange={(e) => setAutoSave(e.target.checked)}
                />
                <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
};