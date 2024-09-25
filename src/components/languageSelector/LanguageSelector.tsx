import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './LanguageSelector.module.css';

interface ILanguageSelector {
  currentLanguage: string;
  changeLanguage: (languageCode: string) => void;
}

const LanguageSelector = ({
  currentLanguage,
  changeLanguage,
}: ILanguageSelector) => {
  const { t } = useTranslation();

  const shortLanguageCode = currentLanguage.slice(0, 2);

  return (
    <div className={styles.languageSelector}>
      <button
        className={`${styles.languageButton} ${
          shortLanguageCode === 'de' ? styles.active : ''
        }`}
        onClick={() => changeLanguage('de')}
      >
        DE
      </button>
      <button
        className={`${styles.languageButton} ${
          shortLanguageCode === 'en' ? styles.active : ''
        }`}
        onClick={() => changeLanguage('en')}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSelector;
