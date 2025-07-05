import React, { createContext, useContext, useState } from 'react';

const GlobalStateContext = createContext(undefined);

export const GlobalStateProvider = ({ children }) => {
  const [screenClicks, setScreenClicks] = useState({});
  const [currentScreen, setCurrentScreenState] = useState('/(tabs)/home');
  const [historyStack, setHistoryStack] = useState(['/(tabs)/home']);
  const [developerName, setDeveloperName] = useState('Raj');
  const [sharedMessage, setSharedMessage] = useState('');

  const incrementClick = (screen) => {
    setScreenClicks((prev) => ({ ...prev, [screen]: (prev[screen] || 0) + 1 }));
  };

  const resetClick = (screen) => {
    setScreenClicks((prev) => ({ ...prev, [screen]: 0 }));
  };

  const setCurrentScreen = (screen) => {
    setCurrentScreenState(screen);
    setHistoryStack((prev) => {
      if (prev[prev.length - 1] !== screen) {
        return [...prev, screen];
      }
      return prev;
    });
  };

  return (
    <GlobalStateContext.Provider
      value={{
        screenClicks,
        currentScreen,
        historyStack,
        incrementClick,
        resetClick,
        setCurrentScreen,
        developerName,
        setDeveloperName,
        sharedMessage,
        setSharedMessage
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};
