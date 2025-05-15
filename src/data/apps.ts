import { AppConfig } from '../types';
import { LayoutDashboard, Calendar, CloudSun, Video, Home } from 'lucide-react';

// App configurations
export const apps: AppConfig[] = [
  {
    id: 'taskboard',
    name: 'TaskBoard',
    url: 'https://apps.atsui.com/tb',
    icon: 'LayoutDashboard',
  },
  {
    id: 'weather',
    name: 'Weather',
    url: 'https://ha.redhill.atsui.com/test-area/0?kiosk=true',
    icon: 'CloudSun',
  },
  {
    id: 'calendar',
    name: 'Calendar',
    url: 'https://ha.redhill.atsui.com/test-area/1?kiosk=true',
    icon: 'Calendar',
  },
  {
    id: 'cameras',
    name: 'Cameras',
    url: 'https://ha.redhill.atsui.com/test-area/cameras?kiosk=true',
    icon: 'Video',
  },
  {
    id: 'house',
    name: 'House Control',
    url: 'https://ha.redhill.atsui.com/test-area/status?kiosk=true',
    icon: 'Home',
  },
];

// Get app by ID
export const getAppById = (id: string): AppConfig | undefined => {
  return apps.find(app => app.id === id);
};

// Get default app
export const getDefaultApp = (): AppConfig => {
  return apps[0];
};