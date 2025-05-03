import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ThemeContextType {
  theme: string;
  fontSize: string;
  colorScheme: string;
  compactMode: boolean;
  reducedMotion: boolean;
  updateTheme: (theme: string) => void;
  updateFontSize: (size: string) => void;
  updateColorScheme: (scheme: string) => void;
  toggleCompactMode: () => void;
  toggleReducedMotion: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved || 'light';
  });

  const [fontSize, setFontSize] = useState(() => {
    const saved = localStorage.getItem('fontSize');
    return saved || 'medium';
  });

  const [colorScheme, setColorScheme] = useState(() => {
    const saved = localStorage.getItem('colorScheme');
    return saved || 'teal';
  });

  const [compactMode, setCompactMode] = useState(() => {
    const saved = localStorage.getItem('compactMode');
    return saved === 'true';
  });

  const [reducedMotion, setReducedMotion] = useState(() => {
    const saved = localStorage.getItem('reducedMotion');
    return saved === 'true';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-font-size', fontSize);
    document.documentElement.setAttribute('data-color-scheme', colorScheme);
    document.documentElement.setAttribute('data-compact', String(compactMode));
    document.documentElement.setAttribute('data-reduced-motion', String(reducedMotion));
  }, [theme, fontSize, colorScheme, compactMode, reducedMotion]);

  const updateTheme = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const updateFontSize = (newSize: string) => {
    setFontSize(newSize);
    localStorage.setItem('fontSize', newSize);
  };

  const updateColorScheme = (newScheme: string) => {
    setColorScheme(newScheme);
    localStorage.setItem('colorScheme', newScheme);
  };

  const toggleCompactMode = () => {
    setCompactMode(prev => {
      const newValue = !prev;
      localStorage.setItem('compactMode', String(newValue));
      return newValue;
    });
  };

  const toggleReducedMotion = () => {
    setReducedMotion(prev => {
      const newValue = !prev;
      localStorage.setItem('reducedMotion', String(newValue));
      return newValue;
    });
  };

  return (
    <ThemeContext.Provider 
      value={{ 
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
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};