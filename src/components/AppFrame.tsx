import React, { useRef, useEffect } from 'react';
import { AppConfig } from '../types';

interface AppFrameProps {
  app: AppConfig;
  isTransitioning: boolean;
}

const AppFrame: React.FC<AppFrameProps> = ({ app, isTransitioning }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Set focus to iframe when app changes
    if (!isTransitioning && iframeRef.current) {
      iframeRef.current.focus();
    }
  }, [app.id, isTransitioning]);

  return (
    <div 
      className={`
        fixed inset-0 pt-20 transition-opacity duration-300 z-[1]
        ${isTransitioning ? 'opacity-0' : 'opacity-100'}
      `}
      style={{ pointerEvents: 'none' }}
    >
      <iframe
        ref={iframeRef}
        src={app.url}
        title={app.name}
        className="w-full h-full border-0"
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        allow="accelerometer; camera; microphone; geolocation"
        style={{ pointerEvents: 'auto' }}
      />
    </div>
  );
};

export default AppFrame;