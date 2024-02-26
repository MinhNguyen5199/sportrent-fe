
import React from 'react';
import {Link} from 'react-router-dom';

import { images } from "../../constants";
import "./banner.css"
export const RentalBanner = () => {
  return (
 
    <div className="rentalBanner">
      <div className="rentalBanners">
        {/* <p className="ProductName">Cameo 4800 - Skates Women's</p> */}
        <h3>Grab Upto 50% Off On  <br />Selected Items </h3>
        {/* <h1>Summer 2022 Offer</h1> */}
        <img src={images.homeBanner}  alt="headphones" className="rentalBanner-image" />

        <div>
          <Link  className='rentalBtn-shop'
          to={`/Rentals/14`}>
            <button type="button">Buy Now</button>
          </Link>
          {/* <div className="desc">
            <h5>Description</h5>
            <p>As good as they get for frontside ripping, 
              the Cameo 4800 Skis rail turns with the best of 'em
               and handles cut up crud or variable snow conditions with confidence.
               As with the other Stormrider skis,</p>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default RentalBanner
