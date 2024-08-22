import GaiaXButton from 'components/buttons/GaiaXButton';
import LanguageModal from 'components/modals/LanguageModal';
import { AuthContext } from 'context/AuthContextProvider';
import { useNavbar } from 'hooks/useNavbar';
import i18n from 'i18n';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, NavLink } from 'react-router-dom';

import logo from '../../assets/images/euprogigant-logo.png';

import styles from './Navbar.module.css';

export default function Navbar() {
  const { t } = useTranslation();
  const navbarAssets = useNavbar();
  const authContext = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenu, setIsMobileMenu] = useState(false);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);

  const changeLanguage = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobileMenu(window.innerWidth <= 960);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className={styles.navbar}>
      <div className={styles['navbar-container']}>
        <button className={styles['hamburger-menu']} onClick={toggleMenu}>
          &#9776;
        </button>
        <div className={styles.logo}>
          <Link to="/">
            <img
              src={logo}
              alt="Gaia-X Logo"
              style={{ width: '200px', height: '92px' }}
            />
          </Link>
        </div>

        <ul
          className={`${styles['navigation-items']} ${
            isMenuOpen ? styles['open'] : ''
          }`}
        >
          {authContext.isAuthenticated &&
            navbarAssets.map((asset, index) => (
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
          {/* Language Modal Activation Link */}
          <li
            className={styles['navigation-item']}
            onClick={() => setIsLanguageModalOpen(true)}
          >
            {t('left-menu.choose-language')}
          </li>

          {isMobileMenu &&
            (authContext.isAuthenticated ? (
              <li
                className={`${styles['navigation-item']} ${styles['mobile-auth-item']}`}
                onClick={authContext.logout}
              >
                {t('top-menu.signout')}
              </li>
            ) : (
              <li
                className={`${styles['navigation-item']} ${styles['mobile-auth-item']}`}
                onClick={authContext.login}
              >
                {t('top-menu.signin')}
              </li>
            ))}
        </ul>

        {!isMobileMenu && (
          <div className={styles['desktop-auth-button']}>
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
          </div>
        )}

        {/* Language Modal Component */}
        <LanguageModal
          isOpen={isLanguageModalOpen}
          onClose={() => setIsLanguageModalOpen(false)}
          changeLanguage={changeLanguage}
        />
      </div>
    </nav>
  );
}
