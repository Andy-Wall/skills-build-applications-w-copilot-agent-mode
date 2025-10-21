import React, { useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { useLanguage } from '../context/LanguageContext';

const Profile = () => {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage, availableLanguages } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const handleSave = async () => {
    setIsLoading(true);
    setMessage('');
    
    try {
      await changeLanguage(selectedLanguage);
      setMessage({
        type: 'success',
        text: t('profile.messages.success')
      });
    } catch (error) {
      setMessage({
        type: 'error',
        text: t('profile.messages.error')
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setSelectedLanguage(currentLanguage);
    setMessage('');
  };

  return (
    <div>
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="card-title text-info mb-3">{t('profile.title')}</h2>
          
          {message && (
            <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-danger'} mb-3`}>
              {message.text}
            </div>
          )}
          
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="language" className="form-label">
                  {t('profile.language.label')}
                </label>
                <select
                  id="language"
                  className="form-select"
                  value={selectedLanguage}
                  onChange={handleLanguageChange}
                  disabled={isLoading}
                >
                  {availableLanguages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {t(`profile.language.${lang.code === 'en' ? 'english' : 'german'}`)}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="d-flex gap-2">
                <button
                  className="btn btn-primary"
                  onClick={handleSave}
                  disabled={isLoading || selectedLanguage === currentLanguage}
                >
                  {isLoading ? t('common.loading') : t('profile.buttons.save')}
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={handleCancel}
                  disabled={isLoading}
                >
                  {t('profile.buttons.cancel')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;