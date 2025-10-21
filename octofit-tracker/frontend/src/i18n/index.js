import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './translations/en.json';
import de from './translations/de.json';

// Get language from localStorage or default to 'en'
const defaultLanguage = localStorage.getItem('language') || 'en';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: en
      },
      de: {
        translation: de
      }
    },
    lng: defaultLanguage, // language to use
    fallbackLng: 'en', // fallback language
    interpolation: {
      escapeValue: false // react already does escaping
    },
    debug: false
  });

export default i18n;