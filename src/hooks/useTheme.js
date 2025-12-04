import { useEffect } from 'react';
import { getTheme } from '../config/themes';

export const useTheme = (network) => {
  const theme = getTheme(network);
  // Dodaj RGB do theme
  if (!theme.primaryRgb) {
    // Zamień hex na rgb
    const hex = theme.primary.replace('#', '');
    const bigint = parseInt(hex, 16);
    theme.primaryRgb = `${(bigint >> 16) & 255},${(bigint >> 8) & 255},${bigint & 255}`;
  }

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