import React from 'react';
import './styles/globals.css';
import AppMenu from './components/AppMenu';
import AppFrame from './components/AppFrame';
import { useAppNavigation } from './hooks/useAppNavigation';

function App() {
  const { currentAppId, currentApp, switchToApp, isTransitioning } = useAppNavigation();

  // Update page title based on current app
  React.useEffect(() => {
    document.title = `${currentApp.name} - Kiosk`;
  }, [currentApp]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* App Navigation Menu */}
      <div>
        <AppMenu 
          currentAppId={currentAppId} 
          onAppSelect={switchToApp} 
        />
      </div>
      
      {/* App Content Frame */}
      <AppFrame 
        app={currentApp} 
        isTransitioning={isTransitioning} 
      />
    </div>
  );
}

export default App;