// IPContext.js

import { createContext, useContext, useState } from 'react';

const IPContext = createContext();

export const IPProvider = ({ children }) => {
  const [ipLocal, setIpLocal] = useState('');

  const setLocalIp = (newIp) => {
    setIpLocal(newIp);
  };

  return (
    <IPContext.Provider value={{ ipLocal, setLocalIp }}>
      {children}
    </IPContext.Provider>
  );
};

export const useIP = () => {
  const context = useContext(IPContext);
  if (!context) {
    throw new Error('useIP must be used within an IPProvider');
  }
  return context;
};

