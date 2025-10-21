import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { useLanguage } from '../context/LanguageContext';

const LanguageSelector = () => {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage, availableLanguages } = useLanguage();

  const handleLanguageChange = (e) => {
    changeLanguage(e.target.value);
  };

  return (
    <div className="nav-item dropdown">
      <select
        className="form-select form-select-sm"
        value={currentLanguage}
        onChange={handleLanguageChange}
        style={{ 
          backgroundColor: 'transparent', 
          border: '1px solid rgba(255,255,255,0.5)',
          color: 'white',
          fontSize: '0.875rem'
        }}
      >
        {availableLanguages.map((lang) => (
          <option 
            key={lang.code} 
            value={lang.code}
            style={{ color: 'black' }}
          >
            {t(`profile.language.${lang.code === 'en' ? 'english' : 'german'}`)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;