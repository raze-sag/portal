import React from "react";
import { withTranslation} from 'react-i18next';
import { Link } from "react-router-dom";
import {connect} from 'react-redux';
import {compose} from 'redux';

class TopMenu extends React.Component {

  showSignInMenu() {
    if (this.props.isInSignInMenu) return null;
    return (
    <React.Fragment>
      <Link to="register"> {this.props.t('top-menu.register')}</Link>
      <Link to="signin"> {this.props.t('top-menu.signin')}</Link>
    </React.Fragment>
    );

  }

    render () {
        return (
    <div className='top-menu-container'>
        <div className='top-menu'>
          <div className='top-menu-logo'>
            <Link to="/">
              <img src="images/logo.svg" alt={this.props.t('left-menu.logo-alt-text')} height='60px'/>
            </Link>
          </div>
          <div className='top-menu-links'>
            <Link to="services"> {this.props.t('left-menu.services')}</Link>
            <Link to="data"> {this.props.t('left-menu.data')}</Link>
            <Link to="provider"> {this.props.t('left-menu.provider')}</Link>
          </div>
          <div className='top-menu-signin'>
            {this.showSignInMenu()}
        </div>

        </div>
    </div>
        );
    }

}
const mapStateToProps = state => {
  return {isInSignInMenu: state.signin.isInSignInMenu };
};

export default compose (withTranslation(),  connect( mapStateToProps,{})) (TopMenu);
