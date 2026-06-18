import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { dictionary } from '../utils/translations';

const UiContext = createContext(null);

const getStoredPreference = (key, fallback) => {
  if (typeof window === 'undefined') {
    return fallback;
  }

  return window.localStorage.getItem(key) || fallback;
};

export const UiProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => getStoredPreference('lifelink-theme', 'light'));
  const [language, setLanguage] = useState(() => getStoredPreference('lifelink-language', 'en'));

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('lifelink-theme', theme);
  }, [theme]);

  useEffect(() => {
    window.localStorage.setItem('lifelink-language', language);
  }, [language]);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      language,
      setLanguage,
      t: (key) => dictionary[language]?.[key] || dictionary.en[key] || key,
    }),
    [language, theme]
  );

  return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
};

export const useUi = () => {
  const context = useContext(UiContext);
  if (!context) {
    throw new Error('useUi must be used inside UiProvider');
  }

  return context;
};
