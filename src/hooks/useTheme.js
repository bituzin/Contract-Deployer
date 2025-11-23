import { useEffect } from 'react';
import { getTheme } from '../config/themes';

export const useTheme = (network) => {
  const theme = getTheme(network);

  useEffect(() => {
    // Aktualizuj CSS variables dla globalnych stylów
    document.documentElement.style.setProperty('--primary', theme.primary);
    document.documentElement.style.setProperty('--primary-light', theme.primaryLight);
    document.documentElement.style.setProperty('--primary-dark', theme.primaryDark);
    document.documentElement.style.setProperty('--bg', theme.background);
    document.documentElement.style.setProperty('--text-primary', theme.textPrimary);
  }, [theme]);

  return theme;
};