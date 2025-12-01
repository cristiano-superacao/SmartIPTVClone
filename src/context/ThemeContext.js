import React, { createContext, useContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';
import storageService from '../services/storage';
import { STORAGE_KEYS, COLORS } from '../utils/constants';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme deve ser usado dentro de ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true);
  const [colors, setColors] = useState(COLORS.dark);

  // Carregar tema salvo
  useEffect(() => {
    loadTheme();
    
    // Listener para mudanças do sistema
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      handleSystemThemeChange(colorScheme);
    });

    return () => subscription.remove();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await storageService.getItem(STORAGE_KEYS.THEME);
      if (savedTheme !== null) {
        setIsDark(savedTheme === 'dark');
        setColors(savedTheme === 'dark' ? COLORS.dark : COLORS.light);
      } else {
        // Usar tema do sistema
        const colorScheme = Appearance.getColorScheme();
        setIsDark(colorScheme === 'dark');
        setColors(colorScheme === 'dark' ? COLORS.dark : COLORS.light);
      }
    } catch (error) {
      console.error('Erro ao carregar tema:', error);
    }
  };

  const handleSystemThemeChange = (colorScheme) => {
    // Só muda automaticamente se não houver preferência salva
    storageService.getItem(STORAGE_KEYS.THEME).then(savedTheme => {
      if (savedTheme === null) {
        setIsDark(colorScheme === 'dark');
        setColors(colorScheme === 'dark' ? COLORS.dark : COLORS.light);
      }
    });
  };

  const toggleTheme = async () => {
    try {
      const newTheme = !isDark;
      setIsDark(newTheme);
      setColors(newTheme ? COLORS.dark : COLORS.light);
      await storageService.setItem(STORAGE_KEYS.THEME, newTheme ? 'dark' : 'light');
    } catch (error) {
      console.error('Erro ao alternar tema:', error);
    }
  };

  const setTheme = async (theme) => {
    try {
      const isDarkTheme = theme === 'dark';
      setIsDark(isDarkTheme);
      setColors(isDarkTheme ? COLORS.dark : COLORS.light);
      await storageService.setItem(STORAGE_KEYS.THEME, theme);
    } catch (error) {
      console.error('Erro ao definir tema:', error);
    }
  };

  const value = {
    isDark,
    colors,
    toggleTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
