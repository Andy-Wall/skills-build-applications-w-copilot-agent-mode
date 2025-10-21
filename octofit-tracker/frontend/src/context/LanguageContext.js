import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(
    localStorage.getItem('language') || 'en'
  );

  const changeLanguage = async (language) => {
    try {
      await i18n.changeLanguage(language);
      setCurrentLanguage(language);
      localStorage.setItem('language', language);
      
      // Send language preference to backend if user data is available
      // This will be implemented when user management is in place
      console.log(`Language changed to: ${language}`);
      
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  useEffect(() => {
    i18n.changeLanguage(currentLanguage);
  }, [i18n, currentLanguage]);

  const value = {
    currentLanguage,
    changeLanguage,
    availableLanguages: [
      { code: 'en', name: 'English' },
      { code: 'de', name: 'Deutsch' }
    ]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};