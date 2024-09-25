import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';

import history from './common/history';
import Routes from './components/Routes';
import { Footer } from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';

import './App.css';

const App = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('appLanguage');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  return (
    <div className='App'>
      <div className='main-content'>
        <HistoryRouter history={history}>
          <Navbar />
          <Routes />
        </HistoryRouter>
      </div>
      <Footer />
    </div>
  );
};

export default App;
