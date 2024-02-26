import React from 'react';
import { Link } from 'react-router-dom';

import { images } from '../../constants';

const HeroBanner = () => {
  return (
    <div className="hero-banner-container">
      <div className="hero-banner-content">
        <div className="hero-banner-text">
          <p className="banner__product-name">Cameo 4800 - Skates Women's</p>
          <h3>Skates Women's</h3>
          <h1 className='hero-banner-offer'>Summer 2023 Offer</h1>
          <Link className="btn-shop" to={`/Rentals/14`}>
            <button type="button">Shop Skis Carving</button>
          </Link>
        </div>
        <div className="hero-banner-image-container">
          <img src={images.homeBanner} alt="headphones" className="hero-banner-image" />
        </div>
      </div>
      <div className="hero-banner-description">
        <h5>Description</h5>
        <p>
          As good as they get for frontside ripping, the Cameo 4800 Skis rail turns with the best of 'em
          and handles cut up crud or variable snow conditions with confidence. As with the other
          Stormrider skis,the Cameo 4800 Skis are built.
        </p>
      </div>
    </div>
  );
};

export default HeroBanner;
