import React, { useState, useRef, useEffect } from "react";
import { useSelector } from 'react-redux'
import { useTranslation, withTranslation } from "react-i18next";
import Search from "./Search";
import Article from "./components/article/Article";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


import PropTypes from 'prop-types';
import { Circle, Column, SliderBullet } from "./common/styles";
import { Padding } from "./components/discovery/tabs/style";

const Home = ({ t }) => {


  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const isInSignInMenu = useSelector((state) => state.signin.isInSignInMenu)

  const buildSliderContent = ({index = 0}) => {
    return <Column>
      <h1>{t('article.what-is-new')} {index}</h1>
      <h4>{t('filler')}</h4>
      <Padding vertical='20px' />
    </Column>
  }

  const slides = [
    buildSliderContent({index: 1}),
    buildSliderContent({index: 2}),
    buildSliderContent({index: 3}),
    buildSliderContent({index: 4}),
    buildSliderContent({index: 5}),
  ]

  const CustomDot = ({ onClick, ...rest }) => {
    const {
      onMove,
      index,
      active,
      carouselState: { currentSlide, deviceType }
    } = rest;

    const carouselItems = [
      <SliderBullet key='sb01' isActive={active} onClick={() => onClick()} />,
      <SliderBullet key='sb02' isActive={active} onClick={() => onClick()} />,
      <SliderBullet key='sb04' isActive={active} onClick={() => onClick()} />,
      <SliderBullet key='sb05' isActive={active} onClick={() => onClick()} />,
      <SliderBullet key='sb06' isActive={active} onClick={() => onClick()} />,
    ];
    return <>
      {React.Children.toArray(carouselItems)[index]}
    </>;
  }

  CustomDot.propTypes = {
    onClick: PropTypes.func
  }

  const HomeSlider = () => {
    return <Carousel
      arrows={false}
      swipeable={true}
      draggable={true}
      showDots
      customDot={<CustomDot />}
      responsive={responsive}
    >
      {slides}
    </Carousel>
  }


  return (
    <div className="home">
      <div className='banner-container'>
        <div className='banner-content'>
          <div className='banner-logo'>
            <img src='/images/logo_white.svg' height='80px' width='200px'></img>
          </div>
          {HomeSlider()}
          <Padding vertical='20px'/>
          <div className='banner-slider'>
          </div>
        </div>
      </div>
      <div className='search-container'>
        <div>
          <Search />
        </div>
      </div>
      <div className="home-article">
        <Article headerMessage="article.what-is-new" category="NEWS" />
      </div>
      <div className="home-article">
        <Article headerMessage="article.what-is-gaiax" category="ARTICLE" />
      </div>
    </div>
  );
}

Home.propTypes = {
  t: PropTypes.func,
}

export default withTranslation()(Home);
