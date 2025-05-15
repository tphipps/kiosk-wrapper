import React from 'react';
import { AppConfig, AppId } from '../types';
import { apps } from '../data/apps';
import { LayoutDashboard, Calendar, CloudSun, Video, Home } from 'lucide-react';

interface AppMenuProps {
  currentAppId: AppId;
  onAppSelect: (appId: AppId) => void;
}

const iconComponents = {
  LayoutDashboard,
  Calendar,
  CloudSun,
  Video,
  Home,
};

const AppMenu: React.FC<AppMenuProps> = ({ currentAppId, onAppSelect }) => {
  const getIconComponent = (iconName: string) => {
    const IconComponent = iconComponents[iconName as keyof typeof iconComponents];
    return IconComponent ? <IconComponent size={24} /> : null;
  };

  const handleClick = (appId: AppId) => {
    console.log('Button clicked:', appId); // Debug log
    onAppSelect(appId);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[9999] flex justify-center">
      <div 
        className="flex items-center justify-center px-6 py-2 mt-4 rounded-full bg-black/25 backdrop-blur-md shadow-lg transition-all duration-300"
        style={{ pointerEvents: 'auto' }}
      >
        {apps.map((app) => (
          <button
            key={app.id}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleClick(app.id);
            }}
            className={`
              relative flex flex-col items-center px-6 py-2 mx-1 rounded-full transition-all duration-300
              ${currentAppId === app.id 
                ? 'text-white bg-white/20' 
                : 'text-white/70 hover:text-white hover:bg-white/10'}
            `}
            style={{ pointerEvents: 'auto' }}
            type="button"
            aria-label={app.name}
          >
            <div className="flex items-center space-x-2">
              {getIconComponent(app.icon)}
              <span className="font-medium">{app.name}</span>
            </div>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default AppMenu;