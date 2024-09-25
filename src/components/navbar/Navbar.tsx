import GaiaXButton from 'components/buttons/GaiaXButton';
import LanguageSelector from 'components/languageSelector/LanguageSelector';
import { AuthContext } from 'context/AuthContextProvider';
import { useNavbar } from 'hooks/useNavbar';
import i18n from 'i18n';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, NavLink } from 'react-router-dom';

import logo from '../../assets/images/euprogigant-logo.png';

import styles from './Navbar.module.css';

export default function Navbar() {
  const { t } = useTranslation();
  const navbarAssets = useNavbar();
  const authContext = useContext(AuthContext);

  const changeLanguage = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles['navbar-container']}>
        <div className={styles.logo}>
          <Link to='/'>
            <img
              src={logo}
              alt='EuProGigant Logo'
              style={{ width: '200px', height: '92px' }}
            />
          </Link>
        </div>
        {authContext.isAuthenticated && (
          <ul className={styles['navigation-items']}>
            {navbarAssets.map((asset, index) => (
              <li key={index} className={styles['navigation-item']}>
                <NavLink
                  to={asset.path}
                  className={({ isActive }) =>
                    isActive
                      ? `${styles['navigation-item']} ${styles.active}`
                      : styles['navigation-item']
                  }
                >
                  {asset.navigationItemName}
                </NavLink>
              </li>
            ))}
          </ul>
        )}
        {!authContext.isAuthenticated ? (
          <GaiaXButton
            label={t('top-menu.signin')}
            handleOnClick={authContext.login}
          />
        ) : (
          <GaiaXButton
            label={t('top-menu.signout')}
            handleOnClick={authContext.logout}
          />
        )}
        <LanguageSelector
          currentLanguage={i18n.language}
          changeLanguage={changeLanguage}
        />
      </div>
    </nav>
  );
}
