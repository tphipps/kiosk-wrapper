import { useState } from 'react';
import { AppId, AppConfig } from '../types';
import { getAppById, getDefaultApp } from '../data/apps';

export const useAppNavigation = () => {
  const [currentAppId, setCurrentAppId] = useState<AppId>(getDefaultApp().id);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const currentApp = getAppById(currentAppId) || getDefaultApp();

  const switchToApp = (appId: AppId) => {
    if (appId === currentAppId) return;
    
    setIsTransitioning(true);
    
    // Small delay to allow for transition animation
    setTimeout(() => {
      setCurrentAppId(appId);
      setIsTransitioning(false);
    }, 300);
  };

  return {
    currentAppId,
    currentApp,
    switchToApp,
    isTransitioning
  };
};