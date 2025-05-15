import React, { useState, useEffect } from 'react';
import './styles/globals.css';
import AppMenu from './components/AppMenu';
import AppFrame from './components/AppFrame';
import { useAppNavigation } from './hooks/useAppNavigation';

function App() {
  const { currentAppId, currentApp, switchToApp, isTransitioning } = useAppNavigation();
  const [isMenuVisible, setIsMenuVisible] = useState(true);
  const [lastMouseY, setLastMouseY] = useState(0);
  const [mouseIdle, setMouseIdle] = useState(false);
  
  // Handle mouse movement to show/hide menu
  useEffect(() => {
    let idleTimer: number;
    
    const handleMouseMove = (e: MouseEvent) => {
      // Always show menu when mouse is near the top
      if (e.clientY < 100) {
        setIsMenuVisible(true);
        setMouseIdle(false);
      } else if (Math.abs(e.clientY - lastMouseY) > 5) {
        // Show menu on significant mouse movement
        setIsMenuVisible(true);
        setMouseIdle(false);
        setLastMouseY(e.clientY);
        
        // Set idle timer to hide menu after inactivity
        clearTimeout(idleTimer);
        idleTimer = window.setTimeout(() => {
          setMouseIdle(true);
          setIsMenuVisible(false);
        }, 3000);
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Initial idle timer
    idleTimer = window.setTimeout(() => {
      setMouseIdle(true);
      setIsMenuVisible(false);
    }, 5000);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(idleTimer);
    };
  }, [lastMouseY]);
  
  // Update page title based on current app
  useEffect(() => {
    document.title = `${currentApp.name} - Kiosk`;
  }, [currentApp]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* App Navigation Menu */}
      <div className={`transition-all duration-300 ${isMenuVisible ? 'menu-slide-down' : 'menu-slide-up'}`}>
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
      
      {/* Hotspot area to show menu on hover (useful for kiosk touch screens) */}
      <div 
        className="fixed top-0 left-0 right-0 h-4 z-40 cursor-pointer"
        onMouseEnter={() => setIsMenuVisible(true)}
      />
    </div>
  );
}

export default App;