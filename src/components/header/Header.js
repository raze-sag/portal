import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signOut } from "../../actions";

import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next';

import SignInBar from './SignInBar'

import * as S from './style';
import CenterBar from "./CenterBar";

import PropTypes from 'prop-types';
import { UPDATE_SELECTED_PAGE } from "../../actions/types";
import { Row } from "../../common/styles";

function Header(props) {
    const { t, } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSignOut = () => {
        dispatch(signOut())
        navigate('/')
    };

    const handleSignIn = () => {
        // dispatch(signIn())
        navigate('/signin')
    };

    const handleRegister = () => {
        // dispatch(signIn())
        navigate('/register')
    };

    // selected page
    const [selectedPage, setSelectedPage] = useState(useSelector((state) => state.user.selectedPage));

    console.log(`selectedPage: ${selectedPage}`)

    const _selectedPage = selectedPage === undefined ? 'home' : selectedPage['page']

    const changePage = ({ page }) => {

        setSelectedPage(page)
        dispatch({ type: UPDATE_SELECTED_PAGE, page: page })
    }

    return (
        <>
            <S.TopMenu >
                <S.TopMenuLogo>
                    <Link to="/" onClick={() => changePage({ page: 'home' })}>
                        <img src="/images/logo.svg" alt={t('left-menu.logo-alt-text')} height='60px' />
                    </Link>
                </S.TopMenuLogo>
                <CenterBar selectedPage={_selectedPage} onPageChanged={(page) => { setSelectedPage(page); dispatch({ type: UPDATE_SELECTED_PAGE, page: page }) }} />
                <Row>
                    <SignInBar handleSignOut={handleSignOut} handleSignIn={handleSignIn} handleRegister={handleRegister} />
                </Row>

            </S.TopMenu>
        </>
    )
}

Header.propTypes = {
    type: PropTypes.string,
    isInSignInMenu: PropTypes.bool,
}

export default Header;
