import './App.css';
import React from 'react';
import WorkInProgress from './WorkInProgress';
import { Link, BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './Home';

import Register from './components/registration/Register';
import RegisterUser from './components/registration/RegisterUser';
import RegisterOrganization from './components/registration/RegisterOrganization';
import RegisterMailSent from './components/registration/RegisterMailSent';
import RegisterViaDID from './components/registration/RegisterViaDID';
import RegisterViaDIDIdP from './components/registration/RegisterViaDIDIdP';
import RegisterConfirmation from './components/registration/RegisterConfirmation';
import LoginFail from './components/login/LoginFail';
import RegisterUserViaDid from './components/registration/RegisterUserViaDid';
import Login from './components/login/Login';
import AccountHome from './components/account/AccountHome';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import RegisterDisplayVC from './components/registration/RegisterDisplayVC';
import RegisterComplianceCheck from './components/registration/RegisterComplianceCheck';
import { createBrowserHistory } from "history";
import Provider from './components/account/Provider';

import PropTypes from 'prop-types';
import Header from './components/header';
import DiscoveryItem from './components/discovery/DiscoveryItem';
import SearchView from './components/discovery/search/SearchView';
import DashboardPage from './components/dashboard/dashboard_page';
import OnboardingPage from './components/onboarding/onboarding_page';
import SolutionPackagingView from './components/solutionPackaging/SolutionPackagingView';
import { Column, Padding } from './common/styles';
import Article from './components/article/Article';

const App = (props) => {
  const { t, i18n } = useTranslation();
  const history = createBrowserHistory();

  const ViewContainer = (view) => {
    return <div className='body-container'>{view}</div>
  }

  return (

    <div className="App">
      <Router history={history}>
        <div id="content" className="content">
          <div className='home-top-border'></div>
          <Header />
          <Column>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/data" element={ViewContainer(<SearchView type="data" />)} />
              <Route path="/provider" element={ViewContainer(<SearchView type="ppr" />)} />
              <Route path="/services" element={ViewContainer(<SearchView type="services" />)} />
              <Route path="/help" element={ViewContainer(<WorkInProgress component="Help" />)} />
              <Route path="/register" element={ViewContainer(<Register />)} />
              <Route path="/register/user" element={ViewContainer(<RegisterUser />)} />
              <Route path="/register/user/viadid" element={ViewContainer(<RegisterUserViaDid />)} />
              <Route path="/register/organization" element={ViewContainer(<RegisterOrganization />)} />
              <Route path="/confirmation/:type/:key" element={ViewContainer(<RegisterConfirmation />)} />
              <Route path="/register/email" element={ViewContainer(<RegisterMailSent />)} />
              <Route path="/register/did" element={ViewContainer(<RegisterViaDID />)} />
              <Route path="/register/IdP" element={ViewContainer(<RegisterViaDIDIdP />)} />
              <Route path="/register/displayVC" element={ViewContainer(<RegisterDisplayVC />)} />
              <Route path="/register/compliance" element={ViewContainer(<RegisterComplianceCheck />)} />
              <Route path="/signin" element={ViewContainer(<Login />)} />
              <Route path="/loginfail" element={ViewContainer(<LoginFail />)} />
              <Route path="/account/user/:tab" element={ViewContainer(<AccountHome />)} />
              <Route path="/account/provider/:tab" element={ViewContainer(<Provider />)} />
              <Route path="/servicetile/:id" element={ViewContainer(<DiscoveryItem type="service" />)} />
              <Route path="/pprtile/:idd" element={ViewContainer(<DiscoveryItem type="ppr" />)} />
              <Route path="/datatile/:id" element={ViewContainer(<DiscoveryItem type="data" />)} />
              <Route path="/admin/participant" element={ViewContainer(<SearchView type="participant" />)} />
              <Route path="/admin/management" element={ViewContainer(<SearchView type="management" />)} />
              <Route path="/dashboard" element={ViewContainer(<DashboardPage />)} />
              <Route path="/onboarding" element={ViewContainer(<OnboardingPage />)} />
              <Route path="/sp/:id" element={ViewContainer(<SolutionPackagingView />)} />
            </Routes>

            {ViewContainer(<Padding vertical='120px'><Article headerMessage="article.what-is-gaiax" category="ARTICLE" /></Padding>)}

          </Column>
          <div className='home-screen'>

            <div className='footer-container'>
              <div className='footer-flex-col'>
                <div className='footer-banner'>
                  <img src='/images/logo_white.svg' height='50px' ></img>
                  <p>{t('footer_slogan_cap')}</p>
                </div>
                <div className='footer-content'>
                  2022 Deutsche Telekom IoT GmbH
                  <div>
                    <a href='#'>{t('links.imprint')}</a>
                    <a href='#'>{t('links.privacy')}</a>
                    <a href='#'>{t('links.policy')}</a>
                    <a href='#'>{t('links.cookie_settings')}</a>
                    <a href='#'>{t('links.terms_and_conditions')}</a>
                    <a href='#'>{t('links.contact')}</a>
                    <Link to="/help">{t('links.help')}</Link>
                  </div>
                </div>
              </div>
              <div className='footer-bottom'>
                <p>{t('footer_business_only')}</p>
              </div>
            </div>
          </div>


        </div>
      </Router>
    </div>

  );
}

const mapStateToProps = state => {
  return { isInSignInMenu: state.signin.isInSignInMenu };
};

App.propTypes = {
  isInSignInMenu: PropTypes.bool,
}

export default connect(mapStateToProps, {})(App);

