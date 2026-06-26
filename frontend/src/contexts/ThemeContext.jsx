import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('sentinelx-theme') || 'theme-enterprise-dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    
    // Remove all previous theme classes
    root.classList.remove(
      'theme-enterprise-dark',
      'theme-midnight-blue',
      'theme-soc-green',
      'theme-purple',
      'theme-high-contrast'
    );
    
    // Add current theme class
    root.classList.add(theme);
    localStorage.setItem('sentinelx-theme', theme);
  }, [theme]);

  const value = { theme, setTheme };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
